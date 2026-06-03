import React, { useState } from "react";
import "./Hero.css";
import heroImage from "./assets/hero-pets.png";

const Hero = ({ openModal }) => {
  return (
    <section className="hero" id="Hero">
      <div className="hero-container">

        <div className="hero-content">
          <h1>
            Smarter care <br />
            for <span>Happier pets</span>
          </h1>

          <p>
            Manage health records, reminders, emergencies,
            and AI-powered petcare in one intelligent platform.
          </p>

          <button className="hero-btn" onClick={openModal}>
            Subscribe for updates!
          </button>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Pet care app" />
        </div>

      </div>
    </section>
  );
};

export default Hero;