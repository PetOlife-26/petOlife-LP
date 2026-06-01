import { useState, useEffect, useCallback, useRef } from "react";

const SLIDES = [
  {
    id: 1,
    heading: "Pet care is fragmented.",
    visual: "fragmented",
  },
  {
    id: 2,
    heading: "One pet. One identity. Lifetime access.",
    visual: "identity",
  },
  {
    id: 3,
    heading: "Create. Connect. Access.",
    visual: "flow",
  },
  {
    id: 4,
    heading: "Information when it matters most.",
    visual: "qr",
  },
  {
    id: 5,
    heading: "Building the future of connected pet care.",
    visual: "network",
  },
];

function FragmentedVisual() {
  return (
    <div className="visual-fragmented">
      <div className="frag-card">
        <div className="frag-icon">🏥</div>
        Vet Clinic A
      </div>
      <div className="frag-card">
        <div className="frag-icon">🏥</div>
        Vet Clinic B
      </div>
      <div className="frag-card">
        <div className="frag-icon">🚑</div>
        Emergency
      </div>
      <div className="frag-card">
        <div className="frag-icon">✂️</div>
        Groomer
      </div>
    </div>
  );
}

function IdentityVisual() {
  return (
    <div className="visual-identity">
      <div className="identity-card-preview">
        <div className="pet-emoji">🐕</div>
        <div className="pet-name">Max</div>
        <div className="pet-id">PET-2025-0001</div>
      </div>
      <div className="identity-connections">
        <div className="identity-conn">🏥</div>
        <div className="identity-conn">💉</div>
        <div className="identity-conn">📋</div>
        <div className="identity-conn">🚑</div>
      </div>
    </div>
  );
}

function FlowVisual() {
  return (
    <div className="visual-flow">
      <div className="flow-step">
        <div className="flow-circle">📝</div>
        <div className="flow-label">Create</div>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-step">
        <div className="flow-circle">🔗</div>
        <div className="flow-label">Connect</div>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-step">
        <div className="flow-circle">🌐</div>
        <div className="flow-label">Access</div>
      </div>
    </div>
  );
}

function QRVisual() {
  const pattern = [1,1,0,1, 0,1,1,0, 1,0,1,1, 1,1,0,1];
  return (
    <div className="visual-qr">
      <div className="qr-phone">
        <div className="qr-grid">
          {pattern.map((filled, i) => (
            <div key={i} className={`qr-cell ${filled ? "" : "empty"}`} />
          ))}
        </div>
        <div className="qr-label">PET ID</div>
      </div>
    </div>
  );
}

function NetworkVisual() {
  const nodes = ["🏥", "💊", "📋", "🛡️", "👥", "🐾"];
  return (
    <div className="visual-network">
      <div className="network-center">🐾</div>
      {nodes.map((emoji, i) => (
        <div key={i} className="network-node">
          {emoji}
        </div>
      ))}
    </div>
  );
}

const VISUALS = {
  fragmented: FragmentedVisual,
  identity: IdentityVisual,
  flow: FlowVisual,
  qr: QRVisual,
  network: NetworkVisual,
};

export default function StoryCarousel() {
  const [current, setCurrent] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      setPrevSlide(current);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Reset timer on manual interaction
  const handleManual = useCallback(
    (fn) => {
      clearInterval(timerRef.current);
      fn();
      timerRef.current = setInterval(next, 5000);
    },
    [next]
  );

  return (
    <div>
      <div className="story-carousel">
        {SLIDES.map((slide, index) => {
          const Visual = VISUALS[slide.visual];
          return (
            <div
              key={slide.id}
              className={`carousel-slide ${
                index === current
                  ? "active"
                  : index === prevSlide
                  ? "exit"
                  : ""
              }`}
            >
              <div className="carousel-visual">
                <Visual />
              </div>
              <h3 className="carousel-heading">{slide.heading}</h3>
            </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-arrow"
          onClick={() => handleManual(prev)}
          aria-label="Previous slide"
        >
          ◀
        </button>
        <div className="carousel-dots">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === current ? "active" : ""}`}
              onClick={() => handleManual(() => goTo(index))}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          className="carousel-arrow"
          onClick={() => handleManual(next)}
          aria-label="Next slide"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
