#!/usr/bin/env bash
# Deploy Sanity CMS updates: hosted Studio, optional seed content, optional production app.
#
# Usage:
#   npm run cms:deploy              # deploy hosted Studio only
#   npm run cms:deploy -- --seed    # also import default content from sanity/seed/
#   npm run cms:deploy -- --app     # also trigger AWS deploy (GitHub Actions)
#   npm run cms:deploy -- --seed --app

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

SEED=false
APP=false
STUDIO_URL="${SANITY_STUDIO_URL:-australia-trip-planner}"

usage() {
  cat <<EOF
Deploy and update Sanity CMS integration.

  npm run cms:deploy [-- --seed] [-- --app]

Options:
  --seed   Import default content from sanity/seed/ (overwrites seeded documents)
  --app    Trigger production app deploy via GitHub Actions (push to main first)
  -h       Show this help

Steps (default):
  1. Load .env.local
  2. Build and deploy hosted Studio → https://${STUDIO_URL}.sanity.studio

With --seed:
  3. Import homepage + tours page defaults into the production dataset

With --app:
  3. Run GitHub Actions "Deploy to AWS" workflow (requires gh CLI + pushed commits)
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --seed) SEED=true; shift ;;
    --app) APP=true; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

PROJECT_ID="${NEXT_PUBLIC_SANITY_PROJECT_ID:-as3gpuo3}"
DATASET="${NEXT_PUBLIC_SANITY_DATASET:-production}"

echo "→ Sanity project: ${PROJECT_ID} (dataset: ${DATASET})"

SANITY_BIN=(npx sanity)
if ! "${SANITY_BIN[@]}" projects list &>/dev/null; then
  echo "✗ Sanity CLI not authenticated. Run: npx sanity login" >&2
  exit 1
fi

echo ""
echo "→ Deploying hosted Studio (https://${STUDIO_URL}.sanity.studio)..."
SANITY_STUDIO_BASE_PATH=/ \
SANITY_STUDIO_PROJECT_ID="$PROJECT_ID" \
SANITY_STUDIO_DATASET="$DATASET" \
"${SANITY_BIN[@]}" deploy --url "$STUDIO_URL" -y

if $SEED; then
  echo ""
  echo "→ Importing seed content..."
  for file in sanity/seed/*.ndjson; do
    if [[ -f "$file" ]]; then
      echo "  • $(basename "$file")"
      "${SANITY_BIN[@]}" dataset import "$file" --dataset "$DATASET" --replace
    fi
  done
  echo ""
  echo "→ Uploading tour images to Sanity CDN..."
  npm run sanity:migrate-images
fi

if $APP; then
  echo ""
  if ! command -v gh &>/dev/null; then
    echo "✗ gh CLI not found. Install GitHub CLI or push to main manually." >&2
    exit 1
  fi

  BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"
  if [[ "$BRANCH" != "main" ]]; then
    echo "⚠ Not on main branch (currently: ${BRANCH}). Production deploys from main." >&2
  fi

  if [[ -n "$(git status --porcelain 2>/dev/null)" ]]; then
    echo "⚠ Uncommitted changes detected. Commit and push before the app deploy picks them up." >&2
  fi

  AHEAD="$(git rev-list --count @{u}..HEAD 2>/dev/null || echo 0)"
  if [[ "$AHEAD" -gt 0 ]]; then
    echo "→ Pushing ${AHEAD} commit(s) to origin/main..."
    git push origin HEAD:main
  fi

  echo "→ Triggering GitHub Actions deploy..."
  gh workflow run "Deploy to AWS" --ref main
  echo "  Watch progress: gh run watch \$(gh run list --workflow=deploy-aws.yml --limit 1 --json databaseId --jq '.[0].databaseId')"
fi

echo ""
echo "✓ Done"
echo "  Studio:  https://${STUDIO_URL}.sanity.studio"
echo "  Local:   http://localhost:3000/studio"
if $APP; then
  echo "  Production app deploy triggered (GitHub Actions → App Runner)"
fi
