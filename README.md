# 🔧 AWS Lambda + API Gateway + Amplify Integration Fix

## 🚨 **Issues Identified**

### **1. API Gateway Route Mismatch**
- **Problem**: Lambda permission policy expected `/convert` endpoint but API Gateway route was configured for `POST /`
- **Error**: 403 Forbidden when calling API
- **Root Cause**: Permission ARN mismatch between Lambda policy and actual API route

### **2. Missing API Gateway Stage**
- **Problem**: HTTP API had no deployment stage configured
- **Error**: API endpoint not accessible
- **Root Cause**: API Gateway requires a stage for HTTP APIs to be invokable

### **3. Lambda IAM Permissions Missing**
- **Problem**: Lambda function couldn't access S3 buckets
- **Error**: `AccessDenied` when calling `s3:PutObject`
- **Root Cause**: Lambda execution role only had basic execution permissions

### **4. S3 ACL Configuration Conflict**
- **Problem**: Lambda code tried to set ACLs on S3 objects but bucket had ACLs disabled
- **Error**: `AccessControlListNotSupported`
- **Root Cause**: S3 bucket configured with `BucketOwnerEnforced` ownership controls

### **5. Download Button Not Working**
- **Problem**: Converted images opened in browser instead of downloading when clicking download button
- **Error**: Files displayed inline rather than triggering download
- **Root Cause**: Missing `Content-Disposition` header in S3 object metadata

## ✅ **Solutions Applied**

### **Fix 1: Updated Lambda Permissions**
```bash
# Removed old permission with specific path constraint
aws lambda remove-permission --function-name image-converter --statement-id old-permission

# Added new permission allowing any path
aws lambda add-permission \
  --function-name image-converter \
  --statement-id api-gateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:311141542374:rux7i7mjy5/*/*"
```

### **Fix 2: Created API Gateway Stage**
```bash
# Created production stage with auto-deploy
aws apigatewayv2 create-stage \
  --api-id rux7i7mjy5 \
  --stage-name prod \
  --auto-deploy
```

### **Fix 3: Added S3 IAM Policy**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::image-upload-uxheri/*",
                "arn:aws:s3:::image-converted-uxheri/*"
            ]
        }
    ]
}
```

### **Fix 4: Removed ACL from Lambda Code**
```python
# ❌ Before (causing error)
s3.put_object(
    Bucket=CONVERTED_BUCKET,
    Key=key,
    Body=converted_image,
    ContentType=f'image/{target_format}',
    ACL='public-read'  # This line caused the error
)

# ✅ After (working)
s3.put_object(
    Bucket=CONVERTED_BUCKET,
    Key=key,
    Body=converted_image,
    ContentType=f'image/{target_format}'
)
```

### **Fix 5: Added Content-Disposition Header for Downloads**
```python
# ✅ Added Content-Disposition header to trigger automatic downloads
s3.put_object(
    Bucket=CONVERTED_BUCKET,
    Key=key,
    Body=converted_image,
    ContentType=f'image/{target_format}',
    ContentDisposition=f'attachment; filename="converted_image.{target_format}"'
)
```

## 🎯 **Final Working Configuration**

| Component | Status | Endpoint/ARN |
|-----------|--------|--------------|
| **Lambda Function** | ✅ Active | `arn:aws:lambda:us-east-1:311141542374:function:image-converter` |
| **HTTP API Gateway** | ✅ Deployed | `https://rux7i7mjy5.execute-api.us-east-1.amazonaws.com/prod/` |
| **Amplify App** | ✅ Live | `https://d30mh5jh2cwvvi.amplifyapp.com` |
| **S3 Buckets** | ✅ Accessible | `image-upload-uxheri`, `image-converted-uxheri` |

## 🔍 **Key Learnings**

1. **API Gateway HTTP APIs** require explicit stage creation for accessibility
2. **Lambda permissions** must match exact API Gateway route patterns
3. **S3 BucketOwnerEnforced** setting disables ACL parameters completely
4. **IAM policies** need explicit S3 permissions beyond basic Lambda execution role
5. **Content-Disposition header** is required for automatic file downloads from S3

## 🚀 **Testing**

The image converter API is now fully functional:
- **POST** requests to `https://rux7i7mjy5.execute-api.us-east-1.amazonaws.com/prod/`
- Accepts multipart form data with image files
- Converts images and stores in S3
- Returns converted image URLs
