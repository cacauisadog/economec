output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the frontend"
  value       = aws_s3_bucket.frontend.bucket
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.id
}

output "website_url" {
  description = "URL of the deployed website"
  value       = var.custom_domain != null ? "https://${var.custom_domain}" : "https://${aws_cloudfront_distribution.frontend.domain_name}"
}
