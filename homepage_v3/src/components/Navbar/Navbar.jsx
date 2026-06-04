import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'For Pet Parents', href: '#pet-parents' },
  { label: 'For Veterinarians', href: '#veterinarians' },
  { label: 'About PetOlife', href: '#about' },
];

const Navbar = ({ openModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Navbar Header Bar */}
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <a href="#home" className="navbar-logo" aria-label="PetOlife Home">
            <img src={logo} alt="PetOlife" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="navbar-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="navbar-cta">
            <button className="btn btn-primary" onClick={() => openModal('parent')}>Join Early Access</button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu — rendered OUTSIDE header to avoid backdrop-filter stacking context */}
      <div
        className={`navbar-mobile-overlay${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
      ></div>
      <nav className={`navbar-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <button className="btn btn-primary" onClick={() => { closeMenu(); openModal('parent'); }}>
          Join Early Access
        </button>
      </nav>
    </>
  );
};

export default Navbar;
