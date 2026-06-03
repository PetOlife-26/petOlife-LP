import React from "react";
import "./Footer.css";
import logo from "./assets/petolife-logo.png";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">

        {/* TOP SECTION */}
        <div className="footer-grid">

          {/* Logo + Description */}
          <div className="footer-col">
            <img src={logo} alt="PetOlife Logo" className="footer-logo" />
            <p className="footer-text">
              Smart care for happier pets.
              <br />
              Health, Love, and everything in between.
            </p>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Product */}
          <div className="footer-col">
            <h3 className="footer-title">Product</h3>
            <ul className="footer-links">
              <li><a href="#">Features</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-col">
            <h3 className="footer-title">Follow Us</h3>

            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaXTwitter /></a>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="footer-bottom">
          <p>© 2026 PetOlife. All rights reserved.</p>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
            <span>|</span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;