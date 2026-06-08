import { useState, useEffect } from "react";
import "./ThankYouModal.css";

const ThankYouModal = ({ isOpen, onClose, type }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isVet = type === "vet";

  return (
    <div className="thank-overlay">
      <div className="thank-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="success-icon">{isVet ? "🩺" : "🐾"}</div>

        <h2>
          {isVet
            ? "Thank You for Joining VetConnect!"
            : "Welcome to the PetOlife Family!"}
        </h2>

        <h4>Your registration has been received.</h4>

        <div className="status-list">
          <p>✅ Our team will review your details.</p>

          <p>✅ You'll receive updates as we move closer to launch.</p>

          <p>✅ Stay connected and follow our journey.</p>
        </div>

        <div className="social-buttons">
          <a href="https://www.instagram.com/petolife.care/" target="_blank">
            📸 Follow Instagram
          </a>

          <a href="https://www.linkedin.com/company/petolife/" target="_blank">
            💼 Follow LinkedIn
          </a>
        </div>

        <button className="home-btn" onClick={onClose}>
          Return Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouModal;
