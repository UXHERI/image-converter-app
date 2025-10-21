import React from 'react';

export const Slider = ({ value, onChange, min, max, step, ...props }) => {
  return (
    <input
      type="range"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className="slider"
      {...props}
    />
  );
};