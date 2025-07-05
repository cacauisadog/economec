terraform {
  required_version = ">= 1.5"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Optional: Configure backend for state management
  # Uncomment and configure when ready for production
  # backend "s3" {
  #   bucket = "economec-terraform-state"
  #   key    = "frontend/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "Economec"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}