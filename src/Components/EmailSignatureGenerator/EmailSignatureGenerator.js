import React, { useState } from 'react';
import './EmailSignatureGenerator.css'; // Import your CSS for styling and animations

const EmailSignatureGenerator = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [fontSize, setFontSize] = useState('16px');
  const [fontColor, setFontColor] = useState('#333');
  const [bgColor, setBgColor] = useState('#f9f9f9');
  const [logo, setLogo] = useState(null);

  const generateSignature = () => {
    return `
      <div style="font-family: Arial, sans-serif; font-size: ${fontSize}; color: ${fontColor}; background-color: ${bgColor}; padding: 10px; border-radius: 5px;">
        <strong>${name}</strong><br/>
        ${title}<br/>
        <a href="mailto:${email}" style="color: ${fontColor}; text-decoration: none;">${email}</a><br/>
        ${phone}<br/>
        <a href="${website}" target="_blank" rel="noopener noreferrer" style="color: ${fontColor}; text-decoration: none;">${website}</a><br/>
        ${address}<br/>
        ${logo ? `<img src="${logo}" alt="Logo" style="width: 100px; height: auto; margin-top: 10px;" />` : ''}
      </div>
    `;
  };

  const copyToClipboard = () => {
    const signatureHTML = generateSignature();
    navigator.clipboard.writeText(signatureHTML).then(
      () => alert('Signature copied to clipboard!'),
      (err) => alert('Failed to copy signature: ', err)
    );
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

  return (
    <div className="email-signature-generator">
      <h1 className="title">Advanced Email Signature Generator</h1>
      <div className="input-fields">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="url"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          placeholder="Font Size (px)"
          value={parseInt(fontSize, 10)}
          onChange={(e) => setFontSize(`${e.target.value}px`)}
        />
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <label>
          Upload Logo:
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </label>
        <button onClick={copyToClipboard} className="copy-button">
          Copy to Clipboard
        </button>
      </div>
      <div className="signature-preview">
        <h3>Signature Preview</h3>
        <div className="signature-content" dangerouslySetInnerHTML={{ __html: generateSignature() }} />
      </div>
    </div>
  );
};

export default EmailSignatureGenerator;
