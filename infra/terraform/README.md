# AWS infrastructure (Terraform)

Manages ECR, GitHub OIDC, IAM deploy roles, and App Runner for SmallTravel.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads) >= 1.5
- AWS CLI credentials with permission to manage IAM, ECR, and App Runner
- An image already pushed to ECR (`:latest`) before **first** App Runner create on a greenfield account

## Quick start (existing account — import)

Resources were bootstrapped manually; import them once:

```bash
cd infra/terraform
terraform init
terraform plan    # imports.tf brings existing resources into state
terraform apply
rm imports.tf     # only needed once
terraform apply   # confirm empty plan
```

## Quick start (new account)

1. Copy `terraform.tfvars.example` → `terraform.tfvars`
2. Remove or skip `imports.tf`
3. Build and push the first Docker image to ECR (see [docs/aws-deploy.md](../../docs/aws-deploy.md))
4. `terraform init && terraform apply`

## Day-to-day

| Task | Command |
|------|---------|
| Preview changes | `terraform plan` |
| Apply infra changes | `terraform apply` |
| Show outputs (URLs, ARNs) | `terraform output` |

App **code** deploys via GitHub Actions on push to `main` — Terraform manages the platform, not each release.

## Outputs → GitHub secrets

After apply:

```bash
terraform output github_deploy_role_arn    # → AWS_ROLE_TO_ASSUME
terraform output apprunner_service_arn     # → APP_RUNNER_SERVICE_ARN
```

## Adding resources later

Extend this stack or split into `infra/terraform/modules/` as it grows (Route 53, ACM, WAF, staging env, etc.).

For remote state in a team, use `backend.tf.example`.

## Layout

```
infra/terraform/
  apprunner.tf       App Runner service
  ecr.tf             ECR repository
  iam_github.tf      GitHub OIDC + deploy role
  iam_apprunner.tf   App Runner → ECR pull role
  variables.tf       Inputs
  outputs.tf         ARNs and URLs
```
