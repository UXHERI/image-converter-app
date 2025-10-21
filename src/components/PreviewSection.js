import React from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';

const PreviewSection = ({ originalImage, convertedImage, targetFormat }) => {
  const getFileName = (file) => {
    return file?.name || 'original image';
  };

  const handleDownload = () => {
    if (convertedImage) {
      const link = document.createElement('a');
      link.href = convertedImage;
      link.download = `converted-image.${targetFormat}`;
      link.click();
    }
  };

  if (!originalImage) {
    return (
      <div className="preview-placeholder">
        <ImageIcon size={64} />
        <h3>No Image Selected</h3>
        <p>Upload an image to see previews</p>
      </div>
    );
  }

  return (
    <div className="preview-section">
      <div className="preview-grid">
        <div className="preview-card">
          <h4>Original Image</h4>
          <div className="image-container">
            <img 
              src={URL.createObjectURL(originalImage)} 
              alt="Original" 
            />
          </div>
          <p className="file-info">{getFileName(originalImage)}</p>
        </div>

        <div className="preview-card">
          <h4>Converted Image</h4>
          <div className="image-container">
            {convertedImage ? (
              <img src={convertedImage} alt="Converted" />
            ) : (
              <div className="conversion-placeholder">
                <ImageIcon size={48} />
                <p>Convert to see result</p>
              </div>
            )}
          </div>
          {convertedImage && (
            <button className="download-btn" onClick={handleDownload}>
              <Download size={16} />
              Download .{targetFormat}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;