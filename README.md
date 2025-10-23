# 🖼️ ImageConvert Pro - Serverless Image Conversion Platform

A modern, serverless image conversion web application built with AWS serverless technologies. Convert images between multiple formats with AI-powered processing.

## 🌟 Features

- **Multi-Format Conversion**: Convert between PNG, JPG, WEBP, GIF, and BMP
- **Quality Control**: Adjustable image quality settings
- **Real-time Preview**: See original and converted images side-by-side
- **Instant Downloads**: One-click download of converted images
- **Modern UI**: Sleek, responsive design built with React
- **Serverless Architecture**: Scalable and cost-effective AWS infrastructure

## 🏗️ Architecture

### Frontend
- **React.js** - Modern UI with responsive design
- **AWS Amplify** - Hosting and continuous deployment

### Backend
- **AWS Lambda** (Python 3.10) - Image processing with Pillow
- **API Gateway HTTP API** - RESTful endpoints
- **AWS S3** - Secure file storage with two buckets
- **CloudWatch** - Comprehensive logging and monitoring

### Infrastructure
![Infrastructure](https://github.com/UXHERI/image-converter-app/blob/main/Infrastructure.png?raw=true)


## 🚀 Quick Start

### Using the Web Application
1. Visit the live application URL
2. Upload an image using drag & drop or file browser
3. Select target format (PNG, JPG, WEBP, GIF, BMP)
4. Adjust quality slider if desired
5. Click "Convert Image"
6. Download your converted image

### API Usage
```bash
curl -X POST "YOUR_API_GATEWAY_ENDPOINT" \
  -F "image=@your-image.jpg" \
  -F "targetFormat=png" \
  -F "quality=85"
```
### Response:
```json
{
  "success": true,
  "message": "Image converted successfully",
  "convertedImageUrl": "https://your-converted-bucket.s3.amazonaws.com/converted/uuid.png",
  "format": "png",
  "fileSize": 12345
}
```

### 🛠️ Technical Details
Supported Formats
Input Formats	Output Formats	Notes
JPEG, JPG	✅ PNG, JPG, WEBP, GIF, BMP	Maintains quality
PNG	✅ PNG, JPG, WEBP, GIF, BMP	Transparency handling
WEBP	✅ PNG, JPG, WEBP, GIF, BMP	Modern format
GIF	✅ PNG, JPG, WEBP, GIF, BMP	Animation support
BMP	✅ PNG, JPG, WEBP, GIF, BMP	Lossless conversion

Built with ❤️ using AWS Serverless Technologies
