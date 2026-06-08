import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Mission", href: "#home" },
  { label: "Contact Us", href: "mailto:tech@petolife.com" },
];

const productLinks = [
  { label: "How It Works", href: "#pet-parents" },
  { label: "For Pet Parents", href: "#veterinarians" },
  { label: "For Veterinarians", href: "#veterinarians" },
  { label: "Trust & Mission", href: "#about" },
];

const Footer = () => {
  return (
    <footer className="footer">
      {/* Wavy Top Edge */}
      <div className="footer-wave">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="currentColor"
          />
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
                  <li key={idx}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social / Contact */}
            <div className="footer-column">
              <h4 className="footer-column-title">Follow Us</h4>
              <div className="footer-socials">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/petolife/"
                  className="footer-social"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM0 8h5v16H0V8zm7.5 0h4.79v2.19h.07c.67-1.27 2.31-2.61 4.76-2.61 5.09 0 6.03 3.35 6.03 7.7V24h-5v-7.08c0-1.69-.03-3.86-2.35-3.86-2.35 0-2.71 1.84-2.71 3.74V24h-5V8z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="footer-social" aria-label="Instagram">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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
            <p>
              &copy; {new Date().getFullYear()} PetOlife. All rights reserved.
            </p>
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
