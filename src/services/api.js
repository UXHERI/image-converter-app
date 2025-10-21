import axios from 'axios';

// Replace with your actual API Gateway endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'YOUR_API_GATEWAY_URL';

export const convertImage = async (imageFile, targetFormat, quality) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('targetFormat', targetFormat);
  formData.append('quality', quality.toString());

  try {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 seconds timeout
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error || 'Conversion failed');
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Server error occurred');
    } else if (error.request) {
      throw new Error('Unable to reach server. Please check your connection.');
    } else {
      throw new Error('Request failed. Please try again.');
    }
  }
};