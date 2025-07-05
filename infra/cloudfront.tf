resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "economec-frontend-oac"
  description                       = "Origin Access Control for Economec frontend"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_cache_policy" "frontend" {
  name        = "economec-frontend-cache-policy"
  comment     = "Cache policy for Economec frontend"
  default_ttl = 86400
  max_ttl     = 31536000
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true

    query_strings_config {
      query_string_behavior = "none"
    }

    headers_config {
      header_behavior = "none"
    }

    cookies_config {
      cookie_behavior = "none"
    }
  }
}

resource "aws_cloudfront_response_headers_policy" "frontend" {
  name = "economec-frontend-security-headers"

  security_headers_config {
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      override                   = true
    }

    content_type_options {
      override = true
    }

    frame_options {
      frame_option = "DENY"
      override     = true
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
  }

  custom_headers_config {
    items {
      header   = "X-Robots-Tag"
      value    = "index, follow"
      override = true
    }
  }
}

resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"  # US, Canada, Europe only (cost optimization)

  aliases = var.custom_domain != null ? [var.custom_domain] : []

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.frontend.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    target_origin_id           = "S3-${aws_s3_bucket.frontend.id}"
    viewer_protocol_policy     = "redirect-to-https"
    compress                   = true
    cache_policy_id            = aws_cloudfront_cache_policy.frontend.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.frontend.id
  }

  # SPA fallback - redirect 403/404 to index.html
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = var.custom_domain == null
    acm_certificate_arn            = var.ssl_certificate_arn
    ssl_support_method             = var.custom_domain != null ? "sni-only" : null
    minimum_protocol_version       = var.custom_domain != null ? "TLSv1.2_2021" : null
  }

  tags = {
    Name = "Economec Frontend Distribution"
  }
}

# Update S3 bucket policy to work with OAC (not OAI)
data "aws_iam_policy_document" "s3_policy" {
  statement {
    sid    = "AllowCloudFrontServicePrincipal"
    effect = "Allow"
    
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.frontend.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.frontend.arn]
    }
  }
}