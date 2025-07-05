variable "s3_bucket_name" {
  description = "Name of the S3 bucket for hosting Economec frontend"
  type        = string
  default     = "economec-frontend"
}

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "custom_domain" {
  description = "Custom domain for the application (optional)"
  type        = string
  default     = null
}

variable "ssl_certificate_arn" {
  description = "ARN of SSL certificate for custom domain (optional)"
  type        = string
  default     = null
}
