import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import ClipLoader from 'react-spinners/ClipLoader'; // For the loading spinner
import './ImageResizer.css'; // Import your CSS for styling

const ImageResizer = () => {
  const [files, setFiles] = useState([]);
  const [resizedImages, setResizedImages] = useState([]);
  const [width, setWidth] = useState(800); // Default width
  const [height, setHeight] = useState(600); // Default height
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const [format, setFormat] = useState('JPEG');

  const handleFileChange = (event) => {
    setError('');
    const fileArray = Array.from(event.target.files);
    if (fileArray.length > 0) {
      setFiles(fileArray);
    } else {
      setError('Please select at least one image.');
    }
  };

  const handleResize = () => {
    if (files.length === 0) {
      setError('No image selected.');
      return;
    }

    setError('');
    setLoading(true);
    const resizedImagePromises = files.map((file) => {
      return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          width,
          height,
          format,
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          'base64'
        );
      });
    });

    Promise.all(resizedImagePromises).then((resizedImages) => {
      setResizedImages(resizedImages);
      setLoading(false);
    });
  };

  return (
    <div className="image-resizer">
      <h1 className="title">Advanced Image Resizer</h1>
      <div className="input-container">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        {error && <p className="error-message">{error}</p>}
        <div className="dimensions">
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value, 10))}
            placeholder="Width"
            min="1"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value, 10))}
            placeholder="Height"
            min="1"
          />
          <label>
            <input
              type="checkbox"
              checked={aspectRatioLocked}
              onChange={(e) => setAspectRatioLocked(e.target.checked)}
            />
            Lock Aspect Ratio
          </label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="JPEG">JPEG</option>
            <option value="PNG">PNG</option>
            <option value="WEBP">WEBP</option>
          </select>
        </div>
        <button onClick={handleResize} className="resize-button">
          Resize Images
        </button>
        {loading && (
          <div className="spinner">
            <ClipLoader color="#007bff" size={50} />
          </div>
        )}
      </div>
      {resizedImages.length > 0 && (
        <div className="image-preview">
          <h3>Resized Images</h3>
          {resizedImages.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image} alt={`Resized ${index}`} />
              <a href={image} download={`resized-image-${index}.${format.toLowerCase()}`} className="download-link">
                Download Image {index + 1}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageResizer;

