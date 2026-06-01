import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Problem.css";

const FRAG_NODES = [
  { icon: "🏥", label: "Vet Clinic A" },
  { icon: "🏥", label: "Vet Clinic B" },
  { icon: "🚑", label: "Emergency Hospital" },
  { icon: "✂️", label: "Groomer" },
];

const CONNECTIONS = [
  { icon: "🏥", label: "Clinics" },
  { icon: "💉", label: "Vaccines" },
  { icon: "📋", label: "Records" },
  { icon: "🚑", label: "Emergency" },
  { icon: "✂️", label: "Care" },
];

const STATS = [
  {
    icon: "📄",
    label: "Scattered Records",
    desc: "Across multiple clinics",
  },
  {
    icon: "❓",
    label: "Missing History",
    desc: "Lost when switching vets",
  },
  {
    icon: "⏱️",
    label: "Emergency Delays",
    desc: "No instant access to data",
  },
  {
    icon: "✍️",
    label: "Manual Verification",
    desc: "Paper-based processes",
  },
];

export default function Problem() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="section problem" id="problem" ref={sectionRef}>
      <div className="container">
        <div className="problem-content">
          {/* Heading */}
          <div className="scroll-animate">
            <h2 className="section-heading">
              Pet Care Shouldn't Be Scattered
            </h2>
            <p className="section-subheading">
              Yet today, every clinic, vaccination record, treatment history, and
              emergency visit exists in separate systems.
            </p>
          </div>

          {/* Before → After Comparison */}
          <div className="problem-comparison scroll-animate">
            {/* Before */}
            <div className="fragmentation-map">
              <div className="problem-label before">Before PetOlife</div>
              <div className="frag-nodes">
                {FRAG_NODES.map((node, i) => (
                  <div key={i} className="frag-node">
                    <div className="frag-node-warning">✕</div>
                    <div className="frag-node-icon">{node.icon}</div>
                    <div className="frag-node-label">{node.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transition Arrow */}
            <div className="problem-transition">
              <div className="transition-arrow">→</div>
              <div className="transition-label">PetOlife</div>
            </div>

            {/* After */}
            <div className="connected-identity">
              <div className="problem-label after">After PetOlife</div>
              <div className="central-identity-card">
                <div className="card-paw">🐾</div>
                <div className="card-title">Pet Identity</div>
                <div className="card-sub">Connected everywhere</div>
              </div>
              <div className="connected-lines">
                {CONNECTIONS.map((conn, i) => (
                  <div key={i} className="conn-badge">
                    <span className="conn-badge-icon">{conn.icon}</span>
                    {conn.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Strip */}
          <div className="problem-stats scroll-animate">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className={`stat-card scroll-animate scroll-animate-delay-${
                  i + 1
                }`}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-desc">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
