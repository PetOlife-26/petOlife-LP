import React from 'react';
import './Solution.css';

const problems = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m14 14-4 4"/><path d="m10 14 4 4"/>
      </svg>
    ),
    label: 'Missed vaccines',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/>
      </svg>
    ),
    label: 'Paper records',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    label: 'WhatsApp chaos',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
      </svg>
    ),
    label: 'Lost prescriptions',
  },
];

const solutions = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>
      </svg>
    ),
    label: 'Digital records',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    label: 'Health timeline',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
      </svg>
    ),
    label: 'Smart reminders',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    label: 'Care continuity',
  },
];

const Solution = () => {
  return (
    <section id="pet-parents" className="section solution-section">
      <div className="container">

        {/* Section Header */}
        <div className="solution-header">
          <h2 className="section-title">
            Pet care shouldn't depend on <span className="text-teal">memory</span>.
          </h2>
          <p className="section-subtitle">
            PetOlife brings scattered pet health information together in one place.
          </p>
        </div>

        {/* Horizontal Comparison */}
        <div className="solution-row">

          {/* Problem Side */}
          <div className="solution-side solution-side--problem">
            <span className="solution-badge solution-badge--problem">The Problem</span>
            <ul className="solution-list">
              {problems.map((item, idx) => (
                <li key={idx} className="solution-item solution-item--problem">
                  <span className="solution-icon solution-icon--problem">{item.icon}</span>
                  <span className="solution-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="solution-divider">
            <div className="solution-divider-line"></div>
            <div className="solution-divider-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
            <div className="solution-divider-line"></div>
          </div>

          {/* Solution Side */}
          <div className="solution-side solution-side--solution">
            <span className="solution-badge solution-badge--solution">PetOlife</span>
            <ul className="solution-list">
              {solutions.map((item, idx) => (
                <li key={idx} className="solution-item solution-item--solution">
                  <span className="solution-icon solution-icon--solution">{item.icon}</span>
                  <span className="solution-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Solution;
