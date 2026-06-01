import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./HowItWorks.css";

const STEPS = [
  {
    icon: "📝",
    title: "Create Identity",
    desc: "Register your pet with basic details — name, breed, photo. A unique Pet Identity is created instantly.",
    visual: "form",
  },
  {
    icon: "🔗",
    title: "Connect Care",
    desc: "Link vaccination records, medical history, and clinic visits. Everything syncs to one unified timeline.",
    visual: "sync",
  },
  {
    icon: "🌐",
    title: "Access Anywhere",
    desc: "Share your pet's QR code with any vet. Instant access to the full medical profile, anytime, anywhere.",
    visual: "access",
  },
];

function FormVisual() {
  return (
    <div className="visual-reg-form">
      <div className="reg-field-photo">📷</div>
      <div className="reg-field">
        <span className="reg-field-icon">🐾</span> Pet Name
      </div>
      <div className="reg-field">
        <span className="reg-field-icon">🏷️</span> Breed / Species
      </div>
      <div className="reg-field">
        <span className="reg-field-icon">📅</span> Date of Birth
      </div>
    </div>
  );
}

function SyncVisual() {
  return (
    <div className="visual-sync">
      {[
        { icon: "🏥", label: "Clinic" },
        { icon: "💉", label: "Vaccines" },
        { icon: "📋", label: "Records" },
      ].map((item, i) => (
        <div key={i} className="sync-row">
          <div className="sync-source">
            <span>{item.icon}</span> {item.label}
          </div>
          <span className="sync-arrow">→</span>
          <div className="sync-target">🐾</div>
        </div>
      ))}
    </div>
  );
}

function AccessVisual() {
  const qrPattern = [
    1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1,
  ];
  return (
    <div className="visual-access">
      <div className="access-qr">
        {qrPattern.map((filled, i) => (
          <div
            key={i}
            className={`access-qr-cell ${filled ? "" : "empty"}`}
          />
        ))}
      </div>
      <div className="access-result">✅ Identity Verified</div>
    </div>
  );
}

const VISUALS = { form: FormVisual, sync: SyncVisual, access: AccessVisual };

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useScrollAnimation();
  const stepsRef = useRef([]);

  useEffect(() => {
    const observers = [];

    stepsRef.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep((prev) => Math.max(prev, index));
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="section how-it-works" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="how-it-works-content">
          <div className="scroll-animate">
            <h2 className="section-heading">Built To Be Effortless</h2>
            <p className="section-subheading">
              Three simple steps to give your pet a digital identity that lasts a
              lifetime.
            </p>
          </div>

          <div className="steps-timeline scroll-animate">
            {STEPS.map((step, i) => {
              const Visual = VISUALS[step.visual];
              const isActive = i === activeStep;
              const isVerified = i < activeStep;
              return (
                <div
                  key={i}
                  className={`step ${isActive ? "active" : ""} ${
                    isVerified ? "verified" : ""
                  }`}
                  ref={(el) => (stepsRef.current[i] = el)}
                >
                  <div className="step-circle">
                    <span className="step-icon">{step.icon}</span>
                  </div>
                  <div className="step-visual">
                    <Visual />
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
