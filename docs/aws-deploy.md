# Deploy to AWS (App Runner + ECR + GitHub OIDC)

No long-lived AWS access keys. GitHub Actions assumes an IAM role via OIDC, pushes a Docker image to ECR, and App Runner runs it.

**Region used below:** `ap-southeast-2` (Sydney). Change if needed.

---

## Architecture

```
GitHub (push to main)
  → OIDC → IAM role (temporary credentials)
  → build Docker image → ECR
  → App Runner pulls image → your site
```

Supabase and Sanity stay external. Set their URLs in GitHub Secrets (build) and App Runner (runtime).

---

## Part 1 — One-time AWS setup

### 1. Create an ECR repository

AWS Console → **ECR** → **Create repository**

- Name: `smalltravel`
- Visibility: Private

Or CLI (with your admin/SSO session):

```bash
aws ecr create-repository \
  --repository-name smalltravel \
  --region ap-southeast-2
```

### 2. Add GitHub as an OIDC identity provider

AWS Console → **IAM** → **Identity providers** → **Add provider**

| Field | Value |
|-------|--------|
| Provider type | OpenID Connect |
| Provider URL | `https://token.actions.githubusercontent.com` |
| Audience | `sts.amazonaws.com` |

Or CLI:

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadfb12c3783b4e3
```

### 3. Create the GitHub deploy IAM role

1. IAM → **Roles** → **Create role**
2. Trusted entity: **Web identity**
3. Identity provider: `token.actions.githubusercontent.com`
4. Audience: `sts.amazonaws.com`
5. Attach a custom policy from `infra/aws/github-deploy-policy.json` (replace `ACCOUNT_ID`)
6. Role name e.g. `SmallTravelGitHubDeploy`

Or use the JSON templates in `infra/aws/`:

- Trust: `github-deploy-trust-policy.json` — replace `ACCOUNT_ID`
- Permissions: `github-deploy-policy.json` — replace `ACCOUNT_ID`

Copy the role ARN — you need it for GitHub (`arn:aws:iam::123456789012:role/SmallTravelGitHubDeploy`).

### 4. Create the App Runner access role (ECR pull)

App Runner needs its **own** role to pull images from ECR.

IAM → **Roles** → **Create role** → **AWS service** → **App Runner** → use case **App Runner**

Attach AWS managed policy: **`AWSAppRunnerServicePolicyForECRAccess`**

Role name e.g. `SmallTravelAppRunnerECRAccess`

---

## Part 2 — First App Runner service (console)

Do this once before CI can take over.

1. **Build and push the first image locally** (or wait for first GitHub Action run after Part 3):

   ```bash
   aws ecr get-login-password --region ap-southeast-2 | \
     docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.ap-southeast-2.amazonaws.com

   docker build --platform linux/amd64 \
     --build-arg NEXT_PUBLIC_SUPABASE_URL="..." \
     --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="..." \
     --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID="as3gpuo3" \
     --build-arg NEXT_PUBLIC_SANITY_DATASET="production" \
     --build-arg NEXT_PUBLIC_SANITY_API_VERSION="2024-06-13" \
     -t ACCOUNT_ID.dkr.ecr.ap-southeast-2.amazonaws.com/smalltravel:latest .

   docker push ACCOUNT_ID.dkr.ecr.ap-southeast-2.amazonaws.com/smalltravel:latest
   ```

2. **App Runner** → **Create service**

   | Setting | Value |
   |---------|--------|
   | Source | Container registry → Amazon ECR |
   | Image | `smalltravel:latest` |
   | ECR access role | `SmallTravelAppRunnerECRAccess` |
   | Deployment trigger | **Automatic** (redeploy when `:latest` changes) |
   | Port | `3000` |
   | CPU / memory | 1 vCPU, 2 GB (adjust later) |

3. **Environment variables** (runtime — App Runner console):

   ```
   SUPABASE_SECRET_KEY=sb_secret_...
   NODE_ENV=production
   ```

   `NEXT_PUBLIC_*` are baked into the image at build time; do not duplicate unless you rebuild.

4. Note the **Service ARN** (for optional `APP_RUNNER_SERVICE_ARN` secret).

5. After deploy, copy the default App Runner URL (`https://xxxxx.ap-southeast-2.awsapprunner.com`).

---

## Part 3 — GitHub repository secrets

Repo → **Settings** → **Secrets and variables** → **Actions**

| Secret | Example |
|--------|---------|
| `AWS_ROLE_TO_ASSUME` | `arn:aws:iam::123456789012:role/SmallTravelGitHubDeploy` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `as3gpuo3` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-06-13` |
| `APP_RUNNER_SERVICE_ARN` | Optional if automatic ECR deploy is enabled |

Do **not** put `SUPABASE_SECRET_KEY` in GitHub unless you must — set it on App Runner only.

---

## Part 4 — Wire up CI

The workflow lives at `.github/workflows/deploy-aws.yml`.

Push to `main` (or run **Actions → Deploy to AWS → Run workflow**).

Each run: checkout → OIDC login → `docker build` → push to ECR → optional `start-deployment`.

If App Runner **automatic deployments** are on for `:latest`, the last step is optional.

---

## Part 5 — After first deploy

1. **Supabase** → Authentication → URL configuration → add App Runner URL to redirect URLs.
2. **Sanity** → API → CORS → add App Runner URL (credentials allowed) for `/studio`.
3. Optional custom domain: Route 53 + ACM certificate → App Runner custom domains.

Editors can keep using [australia-trip-planner.sanity.studio](https://australia-trip-planner.sanity.studio) without hosting Studio separately.

---

## Checklist

```
□ ECR repo `smalltravel`
□ GitHub OIDC provider in IAM
□ IAM role `SmallTravelGitHubDeploy` (trust + ECR/App Runner policy)
□ IAM role `SmallTravelAppRunnerECRAccess` (App Runner → ECR)
□ App Runner service (port 3000, auto-deploy, runtime env vars)
□ GitHub secrets configured
□ Supabase + Sanity URLs updated
□ Push to main → verify Actions green → site loads
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| GitHub: "Not authorized to perform sts:AssumeRoleWithWebIdentity" | Trust policy `sub` must match `repo:SmallTravel/SmallTravel:ref:refs/heads/main` |
| App Runner: image pull failed | Check App Runner ECR access role |
| Site loads but auth broken | Supabase redirect URLs |
| `/studio` errors on production | Sanity CORS + rebuild with correct `NEXT_PUBLIC_SANITY_*` |
| Stale homepage content | Production uses 60s ISR; wait or redeploy |
| Health check failed (TCP/HTTP) but logs show "Ready" | App Runner sets `HOSTNAME` to the instance name; Next.js binds to it instead of `0.0.0.0`. Use `CMD ["sh", "-c", "HOSTNAME=0.0.0.0 exec node server.js"]` in the Dockerfile (see repo) |
