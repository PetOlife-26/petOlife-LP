

export default function AudienceSwitch({ audience, setAudience }) {
  return (
    <div className="audience-switch">
      <button
        className={`audience-btn ${audience === "owner" ? "active" : ""}`}
        onClick={() => setAudience("owner")}
      >
        For Pet Owners
      </button>
      <button
        className={`audience-btn ${audience === "vet" ? "active" : ""}`}
        onClick={() => setAudience("vet")}
      >
        For Veterinarians
      </button>
    </div>
  );
}
