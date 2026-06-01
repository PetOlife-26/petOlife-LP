import { useState } from "react";
import AudienceSwitch from "./AudienceSwitch";
import AuthContainer from "./AuthContainer";
import StoryCarousel from "./StoryCarousel";
import logoImg from "../../assets/logo.jpg";
import "./Hero.css";

const MESSAGES = {
  owner: {
    subtitle:
      "A unified identity connecting pets, owners, veterinarians and future pet services through trusted lifelong records.",
  },
  vet: {
    subtitle:
      "Streamline your clinic workflows with instant access to verified pet histories, vaccination records, and medical timelines — all in one connected identity.",
  },
};

export default function Hero() {
  const [audience, setAudience] = useState("owner");

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* ── Left Column — Conversion ── */}
          <div className="hero-left">
            <img src={logoImg} alt="PetOlife Logo" className="hero-logo-img-mark" />
            <h1 className="hero-tagline">
              Every Pet Deserves A{" "}
              <span className="highlight">Digital Identity</span>
            </h1>
            <p className="hero-subtitle">{MESSAGES[audience].subtitle}</p>

            <AudienceSwitch audience={audience} setAudience={setAudience} />
            <AuthContainer />
          </div>

          {/* ── Right Column — Gradient Showcase ── */}
          <div className="hero-right">
            <div className="hero-showcase">
              <div className="showcase-content">
                {/* Stats banner */}
                <div className="showcase-stats-banner">
                  <div className="showcase-stat-badge">
                    <span className="badge-laurel">🏆</span>
                    <span className="badge-number">10K+</span>
                    <span>pet identities created</span>
                  </div>
                  <div className="showcase-trust-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/>
                    </svg>
                    Verified Platform
                  </div>
                </div>

                {/* Floating mockups */}
                <div className="showcase-mockups">
                  {/* Left Side: Browser Mockup rendering the StoryCarousel */}
                  <div className="mockup-browser">
                    <div className="browser-header">
                      <div className="browser-dots">
                        <span className="browser-dot-btn red" />
                        <span className="browser-dot-btn yellow" />
                        <span className="browser-dot-btn green" />
                      </div>
                      <div className="browser-address">petolife.com/identity</div>
                    </div>
                    <div className="story-carousel-container">
                      <StoryCarousel />
                    </div>
                  </div>

                  {/* Right Side: Phone Mockup overlapping the browser */}
                  <div className="mockup-phone-wrapper">
                    <div className="mockup-pet-card">
                      <div className="mockup-header">
                        <div className="mockup-avatar">🐕</div>
                        <div>
                          <div className="mockup-name">Max</div>
                          <div className="mockup-breed">Golden Retriever</div>
                        </div>
                      </div>
                      <div className="mockup-info-grid">
                        <div className="mockup-info-item">
                          <div className="mockup-info-label">Age</div>
                          <div className="mockup-info-value">3 years</div>
                        </div>
                        <div className="mockup-info-item">
                          <div className="mockup-info-label">Weight</div>
                          <div className="mockup-info-value">32 kg</div>
                        </div>
                        <div className="mockup-info-item">
                          <div className="mockup-info-label">Pet ID</div>
                          <div className="mockup-info-value">POL-2025</div>
                        </div>
                        <div className="mockup-info-item">
                          <div className="mockup-info-label">Vaccines</div>
                          <div className="mockup-info-value">Up to date</div>
                        </div>
                      </div>
                      <div className="mockup-status">
                        <span className="mockup-status-dot" />
                        All records verified
                      </div>
                    </div>

                    {/* Secondary floating card (health stats) */}
                    <div className="mockup-health-card">
                      <div className="health-card-title">Health Overview</div>
                      <div className="health-stat-row">
                        <span className="health-stat-label">Heart Rate</span>
                        <span className="health-stat-value green">72 bpm</span>
                      </div>
                      <div className="health-stat-row">
                        <span className="health-stat-label">Last Checkup</span>
                        <span className="health-stat-value blue">2 wks</span>
                      </div>
                      <div className="health-stat-row">
                        <span className="health-stat-label">Next Vaccine</span>
                        <span className="health-stat-value">Mar 25</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="showcase-bottom">
                  <span className="showcase-bottom-text">
                    Trusted by pet owners worldwide
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
