import React from "react";
import "./Hero.css";
import heroPets from "../../assets/hero-pets.png";

const Hero = ({ openModal }) => {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        {/* Text Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Building a Health Identity
            <br />
            for <span className="highlight">Every Pet</span>
          </h1>

          <p className="hero-description">
            Helping pet parents organize health records, track care routines,
            and stay connected with trusted veterinary care.
          </p>
          {/* Trust Badge */}
          <div className="hero-trust">
            <span className="hero-trust-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            Built with Veterinary Insights
          </div>

          {/* Hero Image */}
          <div className="hero-visual">
            <img
              src={heroPets}
              alt="Pet parent with dog and cat alongside the PetOlife app interface"
              className="hero-image"
            />
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => openModal('parent')}>Join as Pet Parent</button>
            <button className="btn btn-secondary" onClick={() => openModal('vet')}>Join as Veterinarian</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
