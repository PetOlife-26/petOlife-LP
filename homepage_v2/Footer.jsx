import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>pet<span>O</span>life</h3>
          <p>Redefining absolute wellness standards for your lovable furry family members.</p>
        </div>
        <div className="footer-links">
          <h4>Navigate</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Get In Touch</h4>
          <ul>
            <li>📍 Chennai, Tamil Nadu</li>
            <li>✉️ support@petolife.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} petOlife. Built with React + Vite.</p>
      </div>
    </footer>
  );
}