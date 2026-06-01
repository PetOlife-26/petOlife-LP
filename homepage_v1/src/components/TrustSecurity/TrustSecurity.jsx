import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./TrustSecurity.css";

const TRUST_CARDS = [
  {
    icon: "🔒",
    title: "Encrypted Records",
    desc: "Medical-grade security protects every piece of data. End-to-end encryption ensures your pet's records stay private.",
    detail: "AES-256 encryption",
    shield: "🛡️",
  },
  {
    icon: "👤",
    title: "Owner Controlled Access",
    desc: "You decide who sees what. Grant and revoke access to veterinarians, shelters, and services at any time.",
    detail: "Granular permissions",
    shield: "🔑",
  },
  {
    icon: "✅",
    title: "Verified Veterinarians",
    desc: "Only trusted, license-verified professionals can update medical records. Every change is audited and traceable.",
    detail: "License verification",
    shield: "✓",
  },
];

export default function TrustSecurity() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="section trust-security" id="trust" ref={sectionRef}>
      <div className="container">
        <div className="scroll-animate">
          <h2 className="section-heading">
            Trust Is Built Into The Infrastructure
          </h2>
          <p className="section-subheading">
            Security isn't an afterthought. It's the foundation everything is
            built on.
          </p>
        </div>

        <div className="trust-cards">
          {TRUST_CARDS.map((card, i) => (
            <div
              key={i}
              className={`trust-card scroll-animate scroll-animate-delay-${
                i + 1
              }`}
            >
              <div className="trust-card-shield">{card.shield}</div>
              <div className="trust-card-icon">{card.icon}</div>
              <h3 className="trust-card-title">{card.title}</h3>
              <p className="trust-card-desc">{card.desc}</p>
              <div className="trust-detail">🔍 {card.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
