output "aws_account_id" {
  description = "AWS account ID."
  value       = data.aws_caller_identity.current.account_id
}

output "aws_region" {
  description = "AWS region."
  value       = var.aws_region
}

output "ecr_repository_url" {
  description = "ECR repository URL (without tag)."
  value       = aws_ecr_repository.app.repository_url
}

output "github_deploy_role_arn" {
  description = "Set as GitHub secret AWS_ROLE_TO_ASSUME."
  value       = aws_iam_role.github_deploy.arn
}

output "apprunner_service_arn" {
  description = "Set as GitHub secret APP_RUNNER_SERVICE_ARN."
  value       = aws_apprunner_service.app.arn
}

output "apprunner_service_url" {
  description = "Public App Runner URL."
  value       = "https://${aws_apprunner_service.app.service_url}"
}

output "apprunner_ecr_role_arn" {
  description = "IAM role App Runner uses to pull from ECR."
  value       = aws_iam_role.apprunner_ecr.arn
}
