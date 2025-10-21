import React from 'react';
import { Slider } from './Slider';

const FormatSelector = ({ targetFormat, onFormatChange, quality, onQualityChange }) => {
  const formats = [
    { value: 'png', label: 'PNG', description: 'Lossless format with transparency' },
    { value: 'jpg', label: 'JPG', description: 'Best for photographs' },
    { value: 'webp', label: 'WEBP', description: 'Modern format, smaller size' },
    { value: 'gif', label: 'GIF', description: 'For animations' },
    { value: 'bmp', label: 'BMP', description: 'Uncompressed format' },
  ];

  return (
    <div className="format-selector">
      <div className="form-group">
        <label htmlFor="format">Target Format</label>
        <select
          id="format"
          value={targetFormat}
          onChange={(e) => onFormatChange(e.target.value)}
          className="format-dropdown"
        >
          {formats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label} - {format.description}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="quality">
          Quality: <span className="quality-value">{quality}%</span>
        </label>
        <Slider
          id="quality"
          value={quality}
          onChange={onQualityChange}
          min={1}
          max={100}
          step={1}
        />
        <div className="quality-labels">
          <span>Smaller File</span>
          <span>Better Quality</span>
        </div>
      </div>
    </div>
  );
};

export default FormatSelector;