# Deploy to AWS (App Runner + ECR + GitHub OIDC)

No long-lived AWS access keys. GitHub Actions assumes an IAM role via OIDC, pushes a Docker image to ECR, and App Runner runs it.

**Region:** `ap-southeast-2` (Sydney). **Infrastructure:** [infra/terraform](../infra/terraform/).

---

## Architecture

```
GitHub (push to main)
  → OIDC → IAM role (temporary credentials)
  → build Docker image → ECR
  → App Runner pulls image → your site
```

Supabase and Sanity stay external. Set their URLs in GitHub Secrets (build) and App Runner runtime env (Terraform).

---

## Part 1 — AWS infrastructure (Terraform)

### Prerequisites

- Terraform >= 1.5, AWS CLI credentials
- First Docker image in ECR before **creating** App Runner on a brand-new account

### Apply

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars   # edit if needed
terraform init
terraform apply
terraform output                               # ARNs and live URL
```

See [infra/terraform/README.md](../infra/terraform/README.md) for import instructions if resources already exist.

### What Terraform manages

| Resource | Purpose |
|----------|---------|
| ECR `smalltravel` | Docker image registry |
| GitHub OIDC provider | Passwordless CI auth |
| `SmallTravelGitHubDeploy` role | ECR push + App Runner describe |
| `SmallTravelAppRunnerECRAccess` role | App Runner pulls from ECR |
| App Runner service | Runs the Next.js container |

Runtime secrets (e.g. `SUPABASE_SECRET_KEY`) go in `terraform.tfvars`:

```hcl
apprunner_runtime_environment_variables = {
  NODE_ENV            = "production"
  SUPABASE_SECRET_KEY = "sb_secret_..."
}
```

`NEXT_PUBLIC_*` vars are baked into the image at CI build time.

---

## Part 2 — GitHub repository secrets

Repo → **Settings** → **Secrets and variables** → **Actions**

| Secret | Source |
|--------|--------|
| `AWS_ROLE_TO_ASSUME` | `terraform output github_deploy_role_arn` |
| `APP_RUNNER_SERVICE_ARN` | `terraform output apprunner_service_arn` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `as3gpuo3` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-06-13` |
| `NEXT_PUBLIC_SUPABASE_URL` | When using Supabase auth |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | When using Supabase auth |

Do **not** put `SUPABASE_SECRET_KEY` in GitHub — set it via Terraform on App Runner.

---

## Part 3 — CI/CD

Workflow: `.github/workflows/deploy-aws.yml`

Push to `main` → build (`linux/amd64`) → push `:latest` to ECR → App Runner auto-deploys → workflow waits for `RUNNING`.

Manual run: **Actions → Deploy to AWS → Run workflow**.

---

## Part 4 — After first deploy

1. **Supabase** → Authentication → add App Runner URL to redirect URLs.
2. **Sanity** → API → CORS → add App Runner URL (credentials allowed).
3. Optional custom domain: Route 53 + ACM → App Runner custom domains (add in Terraform later).

Editors can keep using [australia-trip-planner.sanity.studio](https://australia-trip-planner.sanity.studio).

---

## Checklist

```
□ terraform apply (infra/terraform)
□ GitHub secrets configured
□ Supabase + Sanity URLs updated
□ Push to main → Actions green → site loads
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| GitHub: "Not authorized to perform sts:AssumeRoleWithWebIdentity" | Trust policy `sub` must match `repo:SmallTravel/SmallTravel:ref:refs/heads/main` |
| App Runner: image pull failed | Check `SmallTravelAppRunnerECRAccess` role |
| Site loads but auth broken | Supabase redirect URLs |
| `/studio` errors on production | Sanity CORS + rebuild with correct `NEXT_PUBLIC_SANITY_*` |
| Stale homepage content | Production uses 60s ISR; wait or redeploy |
| Health check failed but logs show "Ready" | App Runner sets `HOSTNAME`; Dockerfile forces `HOSTNAME=0.0.0.0` at start |
| Terraform drift on OIDC thumbprint | TLS data source auto-updates GitHub cert fingerprint |
