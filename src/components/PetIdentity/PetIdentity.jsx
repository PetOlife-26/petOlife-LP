import { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./PetIdentity.css";

const CARDS = [
  {
    icon: "📋",
    title: "Medical Timeline",
    desc: "Every vaccine, treatment, surgery and checkup securely stored in one place.",
    visual: "timeline",
    modalContent: {
      title: "📋 Medical Timeline",
      description:
        "A comprehensive, chronological record of your pet's entire medical journey — from first vaccination to yearly checkups.",
      examples: [
        { date: "Jan 2025", event: "💉 Rabies Vaccination", icon: "💉" },
        { date: "Mar 2025", event: "🩺 Annual Checkup", icon: "🩺" },
        { date: "Jun 2025", event: "💊 Flea Treatment", icon: "💊" },
        { date: "Sep 2025", event: "🦷 Dental Cleaning", icon: "🦷" },
      ],
    },
  },
  {
    icon: "🚨",
    title: "Emergency Access",
    desc: "Critical information instantly available during emergencies.",
    visual: "qr",
    modalContent: {
      title: "🚨 Emergency Access",
      description:
        "A unique QR code linked to your pet's profile. Any veterinarian can scan it to instantly access critical medical data — allergies, medications, conditions.",
      examples: [
        { date: "Allergies", event: "🚫 Penicillin", icon: "🚫" },
        { date: "Blood Type", event: "🩸 DEA 1.1+", icon: "🩸" },
        { date: "Condition", event: "⚠️ Heart Murmur", icon: "⚠️" },
        { date: "Meds", event: "💊 Daily Enalapril", icon: "💊" },
      ],
    },
  },
  {
    icon: "🌐",
    title: "Connected Ecosystem",
    desc: "Connect veterinarians, shelters, owners and future pet services.",
    visual: "network",
    modalContent: {
      title: "🌐 Connected Ecosystem",
      description:
        "Your pet's identity becomes the central hub connecting all stakeholders — from your primary vet to emergency hospitals, groomers, and future pet services.",
      examples: [
        { date: "Vet", event: "🏥 Dr. Smith's Clinic", icon: "🏥" },
        { date: "Groomer", event: "✂️ Happy Paws Salon", icon: "✂️" },
        { date: "Insurance", event: "🛡️ PetGuard Plus", icon: "🛡️" },
        { date: "Emergency", event: "🚑 City Animal ER", icon: "🚑" },
      ],
    },
  },
];

function TimelineVisual() {
  return (
    <div className="visual-timeline">
      {[
        { label: "Vaccinations", w: "w80", alt: false },
        { label: "Treatments", w: "w60", alt: true },
        { label: "Checkups", w: "w40", alt: false },
      ].map((item, i) => (
        <div key={i} className="timeline-item">
          <div className={`timeline-dot ${item.alt ? "alt" : ""}`} />
          <div style={{ flex: 1 }}>
            <div className="timeline-bar">
              <div className={`timeline-bar-fill ${item.w}`} />
            </div>
          </div>
          <span className="timeline-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function QRVisual() {
  const cells = [1, 1, 0, 0, 1, 0, 1, 0, 1];
  return (
    <div className="visual-qr-scan">
      <div className="qr-box">
        {cells.map((filled, i) => (
          <div key={i} className={`qr-cell-sm ${filled ? "" : "empty"}`} />
        ))}
      </div>
      <div className="qr-scan-line" />
    </div>
  );
}

function NetworkMiniVisual() {
  const nodes = ["🏥", "💊", "📋", "🛡", "✂️", "🚑"];
  return (
    <div className="visual-eco-network">
      <div className="eco-center">🐾</div>
      {nodes.map((emoji, i) => (
        <div key={i} className="eco-orbit">
          {emoji}
        </div>
      ))}
    </div>
  );
}

const VISUALS = {
  timeline: TimelineVisual,
  qr: QRVisual,
  network: NetworkMiniVisual,
};

function Modal({ card, onClose }) {
  return (
    <div className="identity-modal-overlay" onClick={onClose}>
      <div
        className="identity-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="identity-modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="identity-modal-title">
          {card.modalContent.title}
        </div>
        <div className="identity-modal-content">
          {card.modalContent.description}
        </div>
        <div className="modal-example">
          <div className="modal-example-title">Sample Data</div>
          {card.modalContent.examples.map((ex, i) => (
            <div key={i} className="modal-timeline-row">
              <span className="modal-timeline-date">{ex.date}</span>
              <span>{ex.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PetIdentity() {
  const [modalCard, setModalCard] = useState(null);
  const sectionRef = useScrollAnimation();

  return (
    <section className="section pet-identity" id="pet-identity" ref={sectionRef}>
      <div className="container">
        <div className="scroll-animate">
          <h2 className="section-heading">A Lifetime Record For Every Pet</h2>
          <p className="section-subheading">
            One identity. Every record. Always accessible.
          </p>
        </div>

        <div className="identity-cards">
          {CARDS.map((card, i) => {
            const Visual = VISUALS[card.visual];
            return (
              <div
                key={i}
                className={`identity-card scroll-animate scroll-animate-delay-${
                  i + 1
                }`}
                onClick={() => setModalCard(card)}
              >
                <div className="identity-card-icon">{card.icon}</div>
                <div className="identity-card-visual">
                  <Visual />
                </div>
                <h3 className="identity-card-title">{card.title}</h3>
                <p className="identity-card-desc">{card.desc}</p>
                <button className="identity-card-expand">
                  Learn more →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalCard && (
        <Modal card={modalCard} onClose={() => setModalCard(null)} />
      )}
    </section>
  );
}
