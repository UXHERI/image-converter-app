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
