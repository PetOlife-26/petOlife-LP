import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png';

const companyLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Mission', href: '#home' },
  { label: 'Contact Us', href: 'mailto:tech@petolife.com' },
];

const productLinks = [
  { label: 'How It Works', href: '#pet-parents' },
  { label: 'For Pet Parents', href: '#veterinarians' },
  { label: 'For Veterinarians', href: '#veterinarians' },
  { label: 'Trust & Mission', href: '#about' },
];

const Footer = () => {
  return (
    <footer className="footer">
      {/* Wavy Top Edge */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">

            {/* Brand Column */}
            <div className="footer-brand">
              <img src={logo} alt="PetOlife" className="footer-logo" />
              <p className="footer-tagline">
                Building a Health Identity for Every Pet.
              </p>
            </div>

            {/* Company Links */}
            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <ul className="footer-links">
                {companyLinks.map((link, idx) => (
                  <li key={idx}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Product Links */}
            <div className="footer-column">
              <h4 className="footer-column-title">Product</h4>
              <ul className="footer-links">
                {productLinks.map((link, idx) => (
                  <li key={idx}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Social / Contact */}
            <div className="footer-column">
              <h4 className="footer-column-title">Follow Us</h4>
              <div className="footer-socials">
                {/* Facebook */}
                <a href="#" className="footer-social" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="footer-social" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="#" className="footer-social" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="footer-social" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              <div className="footer-contact">
                <p>tech@petolife.com</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} PetOlife. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <span className="footer-divider">|</span>
              <a href="#">Terms of Service</a>
              <span className="footer-divider">|</span>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
