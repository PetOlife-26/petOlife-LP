import { useState, useEffect, useCallback } from "react";
import logoImg from "../../assets/logo.jpg";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Product", href: "#problem" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pet Identity", href: "#pet-identity" },
  { label: "For Vets", href: "#trust" },
  { label: "Coming Soon", href: "#coming-soon" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-72px 0px 0px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (href) => {
      setDrawerOpen(false);
      const el = document.querySelector(href);
      if (el) {
        const top = el.offsetTop - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    []
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : "transparent"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner">
          {/* Logo */}
          <a
            className="navbar-logo"
            onClick={scrollToTop}
            href="#"
            aria-label="PetOlife Home"
          >
            <img src={logoImg} alt="PetOlife Logo" className="navbar-logo-img" />
            <div className="navbar-logo-text">
              Pet<span>O</span>life
            </div>
          </a>

          {/* Desktop Links */}
          <div className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                className={`navbar-link ${
                  activeSection === item.href ? "active" : ""
                }`}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <button
              className="navbar-cta desktop-only"
              onClick={() => handleNavClick("#hero")}
            >
              Create Pet ID
            </button>

            {/* Mobile Hamburger */}
            <button
              className={`navbar-hamburger ${drawerOpen ? "open" : ""}`}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle menu"
              aria-expanded={drawerOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`navbar-drawer ${drawerOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.href}
            className={`navbar-link ${
              activeSection === item.href ? "active" : ""
            }`}
            onClick={() => handleNavClick(item.href)}
          >
            {item.label}
          </button>
        ))}
        <button
          className="navbar-cta"
          onClick={() => handleNavClick("#hero")}
        >
          Create Pet ID
        </button>
      </div>
    </>
  );
}
