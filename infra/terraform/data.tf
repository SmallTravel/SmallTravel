data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

# GitHub Actions OIDC — fingerprint tracks certificate rotation.
data "tls_certificate" "github_actions" {
  url = "https://token.actions.githubusercontent.com"
}
