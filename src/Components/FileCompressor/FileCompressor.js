import React, { useState } from 'react';
import pako from 'pako';
import { saveAs } from 'file-saver';
import './FileCompressor.css'; // Import your updated CSS

const FileCompressor = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileChange = (event) => {
    setError('');
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
    } else {
      setError('Please select a file.');
    }
  };

  const handleCompress = () => {
    if (!file) {
      setError('No file selected.');
      return;
    }

    setError('');
    setLoading(true);
    setProgress(0);

    const reader = new FileReader();
    reader.onloadstart = () => setProgress(10);

    reader.onload = () => {
      try {
        const compressedData = pako.gzip(new Uint8Array(reader.result));
        const compressedBlob = new Blob([compressedData], { type: 'application/gzip' });

        setCompressedSize(compressedBlob.size);
        setProgress(100);
        saveAs(compressedBlob, file.name + '.gz');
      } catch (error) {
        setError('Error compressing the file.');
        setProgress(0);
      }
      setLoading(false);
    };

    reader.onerror = () => {
      setError('Error reading the file.');
      setProgress(0);
      setLoading(false);
    };

    reader.onloadend = () => setProgress(90);

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="file-compressor">
      <h1 className="title">Advanced File Compressor</h1>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".txt, .json, .xml, .csv"
      />
      {file && (
        <div className="file-info">
          <p><strong>Original Size:</strong> {originalSize} bytes</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleCompress} className="compress-button">
        Compress File
      </button>
      {loading && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <p className="progress-text">{progress}%</p>
        </div>
      )}
      {compressedSize > 0 && (
        <div className="file-info">
          <p><strong>Compressed Size:</strong> {compressedSize} bytes</p>
        </div>
      )}
    </div>
  );
};

export default FileCompressor;

