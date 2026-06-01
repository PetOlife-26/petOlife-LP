import { useCallback } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { createPetID, partnerAsVet } from "../../api/endpoints";
import "./FinalCTA.css";

// Generate subtle paw particles
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  fallDuration: `${6 + Math.random() * 6}s`,
  fallDelay: `${Math.random() * 8}s`,
  emoji: i % 3 === 0 ? "🐾" : i % 3 === 1 ? "🐕" : "🐈",
}));

export default function FinalCTA() {
  const sectionRef = useScrollAnimation();

  const handleCreatePetID = useCallback(async () => {
    const result = await createPetID({});
    console.log("Create Pet ID:", result.message);
    alert(result.message);
  }, []);

  const handlePartnerVet = useCallback(async () => {
    const result = await partnerAsVet({});
    console.log("Partner as Vet:", result.message);
    alert(result.message);
  }, []);

  return (
    <section className="section final-cta" id="final-cta" ref={sectionRef}>
      {/* Paw Confetti */}
      <div className="paw-confetti" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="paw-particle"
            style={{
              left: p.left,
              "--fall-duration": p.fallDuration,
              "--fall-delay": p.fallDelay,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <div className="container">
        <div className="final-cta-content scroll-animate">
          <div className="final-cta-logo">🐾</div>
          <h2 className="final-cta-heading">
            A Lifetime Of Care Starts With Identity
          </h2>
          <p className="final-cta-subtext">
            Join the next generation of trusted pet care infrastructure.
          </p>
          <div className="final-cta-buttons">
            <button
              className="final-cta-btn-primary"
              onClick={handleCreatePetID}
              id="cta-create-pet-id"
            >
              Create Pet ID
            </button>
            <button
              className="final-cta-btn-secondary"
              onClick={handlePartnerVet}
              id="cta-partner-vet"
            >
              Partner As A Veterinarian
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
