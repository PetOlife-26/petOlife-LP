import aiAssistant from "./assets/ai-assistant.png";
import reminders from "./assets/remainder.png";
import healthMonitor from "./assets/health-monitor.png";
import careConnect from "./assets/care-connect.png";
import digitalId from "./assets/digital-id.png";
import analytics from "./assets/analytics.png";
import { useState } from "react";
import "./Features.css";

const features = [
  {
    image: aiAssistant,
    title: "AI Assistant",
    description:
      "Your intelligent pet care companion. Get personalized tips anytime.",
    backContent:
      "Get personalized pet care recommendations and AI-powered support 24/7.",
  },
  {
    image: reminders,
    title: "Smart Reminders",
    description:
      "Never miss meals, meds, or vet visits.",
    backContent:
      "Timely alerts for vaccinations, grooming, and appointments.",
  },
  {
    image: healthMonitor,
    title: "Health Monitoring",
    description:
      "Track activity, sleep, and wellness insights.",
    backContent:
      "Monitor health trends and vital indicators easily.",
  },
  {
    image: careConnect,
    title: "Care Connect",
    description:
      "Connect with veterinarians anytime.",
    backContent:
      "Consult professionals and share records instantly.",
  },
  {
    image: digitalId,
    title: "Digital Pet ID",
    description:
      "Secure QR-based pet identity.",
    backContent:
      "Quick access digital identity for emergencies.",
  },
  {
    image: analytics,
    title: "Analytics Dashboard",
    description:
      "Understand your pet’s health trends.",
    backContent:
      "Data-driven insights for smarter care.",
  },
];

function Features() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <section className="features-section" id="features">

      <div className="features-container">
        <h2 className="features-title">
          Everything You Need For Your <span className="highlight-green">Pet's Well-Being</span>
        </h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">

              {/* FRONT */}
              <div className="card-front">
                <img src={feature.image} alt={feature.title} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>

              {/* BACK */}
              <div className="card-back">
                <h3>{feature.title}</h3>
                <p>{feature.backContent}</p>

                <button onClick={() => setShowComingSoon(true)}>
                  Get Started
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showComingSoon && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button onClick={() => setShowComingSoon(false)}>✕</button>

            <h2>Coming Soon</h2>
            <p>We're building something amazing for pet care.</p>
          </div>
        </div>
      )}

    </section>
  );
}

export default Features;