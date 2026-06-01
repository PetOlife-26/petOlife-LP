import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        pet<span>O</span>life
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="cta-btn">Book a Visit</button>
    </nav>
  );
}