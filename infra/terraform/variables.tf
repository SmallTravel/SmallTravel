variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "ap-southeast-2"
}

variable "project_name" {
  description = "Short project name used in resource names (ECR repo, App Runner service)."
  type        = string
  default     = "smalltravel"
}

variable "github_repository" {
  description = "GitHub repo allowed to assume the deploy role (org/name)."
  type        = string
  default     = "SmallTravel/SmallTravel"
}

variable "github_branch" {
  description = "Git branch allowed to assume the deploy role."
  type        = string
  default     = "main"
}

variable "github_deploy_role_name" {
  description = "IAM role name for GitHub Actions OIDC deploy."
  type        = string
  default     = "SmallTravelGitHubDeploy"
}

variable "apprunner_ecr_role_name" {
  description = "IAM role name for App Runner ECR image pull."
  type        = string
  default     = "SmallTravelAppRunnerECRAccess"
}

variable "apprunner_cpu" {
  description = "App Runner instance CPU (1024 = 1 vCPU)."
  type        = string
  default     = "1024"
}

variable "apprunner_memory" {
  description = "App Runner instance memory in MB."
  type        = string
  default     = "2048"
}

variable "apprunner_port" {
  description = "Container port exposed by the Next.js app."
  type        = string
  default     = "3000"
}

variable "apprunner_runtime_environment_variables" {
  description = "Runtime env vars for App Runner (secrets like SUPABASE_SECRET_KEY go here)."
  type        = map(string)
  default = {
    NODE_ENV = "production"
  }
  sensitive = true
}

variable "ecr_image_tag" {
  description = "ECR image tag App Runner tracks (CI pushes :latest)."
  type        = string
  default     = "latest"
}

variable "ecr_scan_on_push" {
  description = "Scan images on push to ECR."
  type        = bool
  default     = true
}
