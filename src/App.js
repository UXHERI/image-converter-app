import React, { useState } from 'react';
import { Upload, Download, Settings, Image as ImageIcon } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import FormatSelector from './components/FormatSelector';
import PreviewSection from './components/PreviewSection';
import { convertImage } from './services/api';
import './styles/App.css';

// Add this component inside your App.js, before the main return statement
const Footer = () => (
  <footer className="footer">
    <div className="creator">
      Created with ❤️ by <strong>Uzair Khan</strong>
    </div>
    <div className="social-links">
      <a 
        href="https://github.com/UXHERI" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-link"
      >
        <img 
          src="https://skillicons.dev/icons?i=github" 
          alt="GitHub" 
          className="social-icon"
        />
        GitHub
      </a>
      <a 
        href="https://linkedin.com/in/iam-uzairkhan" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-link"
      >
        <img 
          src="https://skillicons.dev/icons?i=linkedin" 
          alt="LinkedIn" 
          className="social-icon"
        />
        LinkedIn
      </a>
    </div>
  </footer>
);

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [targetFormat, setTargetFormat] = useState('png');
  const [quality, setQuality] = useState(80);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (file) => {
    setOriginalImage(file);
    setConvertedImage(null);
    setError('');
  };

  const handleConvert = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await convertImage(originalImage, targetFormat, quality);
      setConvertedImage(result.convertedImageUrl);
    } catch (err) {
      setError(err.message || 'Conversion failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo">
            <ImageIcon size={32} />
            <h1>ImageConvert Pro</h1>
          </div>
          <p className="tagline">AI-Powered Image Format Conversion</p>
        </header>

        <main className="main-content">
          <div className="grid-layout">
            <div className="upload-section">
              <div className="card">
                <div className="card-header">
                  <Upload size={20} />
                  <h2>Upload Image</h2>
                </div>
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>

              <div className="card">
                <div className="card-header">
                  <Settings size={20} />
                  <h2>Conversion Settings</h2>
                </div>
                <FormatSelector
                  targetFormat={targetFormat}
                  onFormatChange={setTargetFormat}
                  quality={quality}
                  onQualityChange={setQuality}
                />
                
                <button
                  className={`convert-btn ${!originalImage || isLoading ? 'disabled' : ''}`}
                  onClick={handleConvert}
                  disabled={!originalImage || isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <Download size={20} />
                  )}
                  {isLoading ? 'Converting...' : 'Convert Image'}
                </button>
              </div>
            </div>

            <div className="preview-section">
              <PreviewSection
                originalImage={originalImage}
                convertedImage={convertedImage}
                targetFormat={targetFormat}
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;