import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <span className="badge">🐾 Premium Pet Care Experience</span>
        <h1>Give Your <span>Pets</span> The Care They Deserve</h1>
        <p>
          At petOlife, we combine professional luxury grooming, reliable medical health checks, 
          and safe interactive daycare options to keep your best friends happy, healthy, and thriving.
        </p>
        <div className="hero-btns">
          <button className="cta-btn">View Services</button>
          <button className="secondary-btn">Our Story</button>
        </div>
      </div>
      <div className="hero-image-container">
        <img 
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600" 
          alt="Happy Healthy Dog" 
          className="hero-image"
        />
      </div>
    </section>
  );
}