import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCodeGenerator.css'; // Import the CSS file for styles and animations

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [color, setColor] = useState('#000000'); // Default color is black
  const [borderRadius, setBorderRadius] = useState(0); // Default border radius
  const [logo, setLogo] = useState(null); // For logo image

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(Number(event.target.value));
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleBorderRadiusChange = (event) => {
    setBorderRadius(Number(event.target.value));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = () => {
    const svgElement = document.querySelector('.qr-code-svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'qrcode.svg';
      document.body.appendChild(link); // Append link to body
      link.click();
      document.body.removeChild(link); // Remove link from body
    }
  };

  return (
    <div className="qr-code-generator">
      <h1 className="title">Advanced QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={handleInputChange}
        className="input"
      />
      <div className="controls">
        <label>
          Size:
          <input
            type="range"
            min="100"
            max="500"
            step="10"
            value={size}
            onChange={handleSizeChange}
            className="control-input"
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="control-input"
          />
        </label>
        <label>
          Border Radius:
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={borderRadius}
            onChange={handleBorderRadiusChange}
            className="control-input"
          />
        </label>
        <label>
          Upload Logo:
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="control-input"
          />
        </label>
        <button onClick={downloadQRCode} className="download-button">
          Download QR Code
        </button>
      </div>
      {text && (
        <div className="qr-code-container">
          <QRCodeSVG
            value={text}
            width={size}
            height={size}
            fgColor={color}
            className="qr-code-svg"
            style={{ borderRadius: `${borderRadius}px` }}
            imageSettings={logo ? {
              src: logo,
              x: null, // Center the logo horizontally
              y: null, // Center the logo vertically
              height: size / 5, // Adjust logo size
              width: size / 5, // Adjust logo size
              excavate: true,
            } : null}
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;


