import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./ComingSoon.css";

const NODES = [
  {
    icon: "🤖",
    label: "AI Pet Assistant",
    desc: "Smart health insights and care recommendations powered by AI.",
    angle: 0,
    ring: 1,
    floatDuration: "5.5s",
    floatDelay: "0s",
  },
  {
    icon: "📈",
    label: "Health Predictions",
    desc: "Proactive health alerts based on breed data and medical patterns.",
    angle: 45,
    ring: 2,
    floatDuration: "7s",
    floatDelay: "0.5s",
  },
  {
    icon: "👥",
    label: "Community",
    desc: "Connect with other pet owners, share experiences and advice.",
    angle: 90,
    ring: 1,
    floatDuration: "6s",
    floatDelay: "1s",
  },
  {
    icon: "🐾",
    label: "Pet Networking",
    desc: "Find playmates, arrange meetups, and build your pet's social circle.",
    angle: 135,
    ring: 2,
    floatDuration: "6.5s",
    floatDelay: "0.3s",
  },
  {
    icon: "🛒",
    label: "Marketplace",
    desc: "Curated products and services tailored to your pet's needs.",
    angle: 180,
    ring: 1,
    floatDuration: "5.8s",
    floatDelay: "0.8s",
  },
  {
    icon: "🛡️",
    label: "Insurance",
    desc: "Seamless insurance integrations with verified medical history.",
    angle: 225,
    ring: 2,
    floatDuration: "7.2s",
    floatDelay: "0.2s",
  },
  {
    icon: "✈️",
    label: "Travel Passport",
    desc: "Digital pet passport for hassle-free international travel.",
    angle: 270,
    ring: 1,
    floatDuration: "6.3s",
    floatDelay: "0.6s",
  },
  {
    icon: "🏥",
    label: "Cross-Clinic Data",
    desc: "Unified data infrastructure connecting veterinary clinics worldwide.",
    angle: 315,
    ring: 2,
    floatDuration: "5.5s",
    floatDelay: "1.2s",
  },
];

function getNodePosition(angle, ring) {
  const radius = ring === 1 ? 160 : 260;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  return {
    top: `calc(50% + ${y}px - 32px)`,
    left: `calc(50% + ${x}px - 32px)`,
  };
}

export default function ComingSoon() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="section coming-soon" id="coming-soon" ref={sectionRef}>
      <div className="container">
        <div className="coming-soon-content">
          <div className="scroll-animate">
            <h2 className="section-heading">
              Building The Future Of Connected Pet Care
            </h2>
            <p className="section-subheading">
              Pet identity is just the beginning. An entire ecosystem is coming.
            </p>
          </div>

          <div className="ecosystem-galaxy scroll-animate">
            {/* Orbit Rings */}
            <div className="orbit-ring orbit-ring-1" />
            <div className="orbit-ring orbit-ring-2" />

            {/* Center */}
            <div className="galaxy-center">
              <span className="galaxy-center-icon">🐾</span>
              <span className="galaxy-center-label">Pet Identity</span>
            </div>

            {/* Nodes */}
            {NODES.map((node, i) => {
              const pos = getNodePosition(node.angle, node.ring);
              return (
                <div
                  key={i}
                  className="eco-node"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    "--float-duration": node.floatDuration,
                    "--float-delay": node.floatDelay,
                  }}
                >
                  <div className="eco-node-tooltip">
                    <div className="tooltip-badge">Launching Soon</div>
                    <div className="tooltip-desc">{node.desc}</div>
                  </div>
                  <div className="eco-node-circle">{node.icon}</div>
                  <span className="eco-node-label">{node.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
