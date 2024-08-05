import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { useDropzone } from 'react-dropzone';
import './MemeGenerator.css';

const MemeGenerator = () => {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState('#ffffff');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  const handleDownload = () => {
    html2canvas(document.querySelector('.meme-preview')).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'meme.png';
      link.click();
    });
  };

  return (
    <div className="meme-generator">
      <h1 className="title">Meme Generator</h1>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {image && (
        <div className="meme-preview" style={{ position: 'relative', display: 'inline-block' }}>
          <img src={image} alt="Meme" style={{ maxWidth: '100%', height: 'auto' }} />
          <div className="text top-text" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            {topText}
          </div>
          <div className="text bottom-text" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            {bottomText}
          </div>
        </div>
      )}
      <div className="controls">
        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          min="10"
        />
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
        <button onClick={handleDownload} className="download-button">
          Download Meme
        </button>
      </div>
    </div>
  );
};

export default MemeGenerator;
