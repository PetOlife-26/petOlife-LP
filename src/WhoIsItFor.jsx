import React from "react";
import "./WhoIsItFor.css";

import secimg from "./assets/secimg.png";
import firstimg from "./assets/firstimg.png";
import thirdimg from "./assets/thirdimg.png";

const PetJourney = ({ openModal }) => {
  return (
    <section className="pet-journey-section" id="whoisfor">
      <div className="pet-journey-container">

        {/* HEADER */}
        <div className="pet-journey-header">
          <h2 className="main-title">
            Made for Every <span className="highlight-text">Pet Journey</span>
          </h2>

          <p className="main-subtitle">
            Whether you're already a pet parent, just getting started, or planning to
            welcome a furry friend — we're here to help.
          </p>
        </div>

        {/* ROW 1 */}
        <div className="journey-row bg-green-tint">
          <div className="journey-content-column">
            <h3 className="journey-card-title">
              Already Caring for Your Pet?
            </h3>

            <p className="journey-card-description">
              Track health, manage reminders, access records, and give your pet smarter care.
            </p>

            <button
              className="journey-btn green-btn"
              onClick={() => openModal("pet-login")}
            >
              Login
            </button>
          </div>

          <div className="journey-image-column">
            <img src={firstimg} alt="Pet care" />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="journey-row row-reverse bg-white-tint">
          <div className="journey-content-column">
            <h3 className="journey-card-title">
              New to Pet Parenting?
            </h3>

            <p className="journey-card-description">
              Start your journey with confidence and expert guidance.
            </p>

            <button
              className="journey-btn dark-green-btn"
              onClick={() => openModal("pet-signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="journey-image-column">
            <img src={secimg} alt="Pet guidance" />
          </div>
        </div>

        {/* ROW 3 */}
        <div className="journey-row bg-purple-tint">
          <div className="journey-content-column">
            <h3 className="journey-card-title">
              Are You a Veterinarian?
            </h3>

            <p className="journey-card-description">
              Manage digital records and connect with pet parents.
            </p>

            <button
              className="journey-btn green-btn"
              onClick={() => openModal("vet-signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="journey-image-column">
            <img src={thirdimg} alt="Vet system" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PetJourney;