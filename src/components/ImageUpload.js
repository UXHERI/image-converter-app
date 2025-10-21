import React, { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onImageUpload }) => {
  const fileInputRef = useRef();

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="upload-container">
      <div
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-content">
          <ImageIcon size={48} className="upload-icon" />
          <h3>Drop your image here</h3>
          <p>or click to browse files</p>
          <p className="file-types">Supports: JPG, PNG, WEBP, GIF, BMP</p>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUpload;