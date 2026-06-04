import React from 'react';
import './BeforeAfter.css';
import problemSolutionImg from '../../assets/problem-solution.jpeg';

const BeforeAfter = () => {
  return (
    <section className="section ba-section">
      <div className="container">
        <div className="ba-header">
          <h2 className="section-title">
            Struggling with <span className="text-teal">Pet Care</span>?{' '}
            We've Got the <span className="text-green">Solution!</span>
          </h2>
          <p className="section-subtitle">
            Bridging the gap between stressful pet care and happy companionship.
          </p>
        </div>

        <div className="ba-image-wrapper">
          <img
            src={problemSolutionImg}
            alt="Before and after PetOlife — from scattered pet care to organized health management"
            className="ba-image"
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
