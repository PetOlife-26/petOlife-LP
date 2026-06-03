import React from "react";
import "./Navbar.css";
import logo from "./assets/logo.png";
const Navbar = ({ openModal }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <ul className="nav-links">
          <li><a href="#Hero">Home</a></li>
          <li><a href="#Solutions">Solutions</a></li>
          <li><a href="#whoisfor">Categories</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
          
        </ul>

        <button className="nav-btn" onClick={openModal}>
          Subscribe
        </button>

      </div>
    </nav>
  );
};

export default Navbar;