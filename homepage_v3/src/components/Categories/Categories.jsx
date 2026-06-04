import React from 'react';
import './Categories.css';
import firstImg from '../../assets/firstimg.png';
import thirdImg from '../../assets/thirdimg.png';

const petParentBenefits = [
  'Store health records',
  'Track vaccines',
  'Track medications',
  'Receive reminders',
  'Stay organized',
];

const vetBenefits = [
  'Access complete history',
  'Improve treatment continuity',
  'Support follow-up care',
  'Shape future workflows',
];

const Categories = ({ openModal }) => {
  return (
    <section id="veterinarians" className="section categories-section">
      <div className="container">

        {/* Section Header */}
        <div className="cat-header">
          <span className="section-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Who Is It For
          </span>
          <h2 className="section-title">
            Made for Every <span className="text-green">Pet Journey</span>
          </h2>
          <p className="section-subtitle">
            Whether you're a dedicated pet parent or a practising veterinarian — PetOlife is built with you in mind.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="cat-grid">

          {/* Card 1 — Pet Parents */}
          <div className="cat-card cat-card--parent">
            <div className="cat-card-content">
              <h3 className="cat-card-title">Built for Responsible Pet Parenting</h3>
              <ul className="cat-benefits">
                {petParentBenefits.map((item, idx) => (
                  <li key={idx} className="cat-benefit">
                    <span className="cat-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary cat-cta" onClick={() => openModal('parent')}>Join Early Access</button>
            </div>
            <div className="cat-card-visual">
              <img src={firstImg} alt="Pet health tracking and medical records interface" />
            </div>
          </div>

          {/* Card 2 — Veterinarians */}
          <div className="cat-card cat-card--vet">
            <div className="cat-card-content">
              <h3 className="cat-card-title">Designed with Veterinary Feedback</h3>
              <ul className="cat-benefits">
                {vetBenefits.map((item, idx) => (
                  <li key={idx} className="cat-benefit">
                    <span className="cat-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary cat-cta" onClick={() => openModal('vet')}>Join Early Access</button>
            </div>
            <div className="cat-card-visual">
              <img src={thirdImg} alt="Breed guides, knowledge base, and veterinary advice interface" />
            </div>
          </div>
        </div>

        {/* Small Note */}
        <p className="cat-note">
          <span className="cat-note-icon">🌱</span>
          <strong>Planning to bring home your first pet?</strong> PetOlife will help you get started responsibly.
        </p>

      </div>
    </section>
  );
};

export default Categories;
