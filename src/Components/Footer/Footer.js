// src/components/Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css'; // Import CSS for custom styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: samraizbhatti06@gmail.com</p>
          <p>Phone: +6011-21884543</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
         
          </div>
        </div>
        
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are committed to delivering the best online tools and products.</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Toolifyco. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
