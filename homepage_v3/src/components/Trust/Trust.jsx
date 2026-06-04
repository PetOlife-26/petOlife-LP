import React from 'react';
import './Trust.css';

const trustIndicators = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      </svg>
    ),
    label: 'Veterinary Feedback',
    desc: 'Shaped by insights from practising veterinarians.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    ),
    label: 'Real Clinic Learnings',
    desc: 'Built on real-world clinic workflows and challenges.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Pet Parent Community',
    desc: 'Designed around real needs of responsible pet parents.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    label: 'Privacy-Focused',
    desc: 'Your pet\'s data stays secure and under your control.',
  },
];

const Trust = ({ openModal }) => {
  return (
    <section id="about" className="section trust-section">
      <div className="container">

        {/* Mission Badge */}
        <div className="trust-header">
          <span className="section-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Trust &amp; Credibility
          </span>
          <h2 className="section-title">
            Built with <span className="text-teal">Pet Parents</span>.<br />
            Built with <span className="text-green">Veterinarians</span>.
          </h2>
          <p className="trust-mission">
            Building a Health Identity for Every Pet.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="trust-grid">
          {trustIndicators.map((item, idx) => (
            <div key={idx} className={`trust-card trust-card--${idx + 1}`}>
              <div className="trust-card-icon">{item.icon}</div>
              <h4 className="trust-card-label">{item.label}</h4>
              <p className="trust-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="trust-cta-block">
          <p className="trust-cta-text">
            Join the growing community of pet parents and veterinarians who are shaping the future of pet healthcare.
          </p>
          <div className="trust-cta-actions">
            <button className="btn btn-primary" onClick={() => openModal('parent')}>Join as Pet Parent</button>
            <button className="btn btn-secondary" onClick={() => openModal('vet')}>Join as Veterinarian</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Trust;
