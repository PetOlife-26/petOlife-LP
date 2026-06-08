import "./Workingprocess.css";

import profileImg from "../../assets/pet-profile.png";
import recordsImg from "../../assets/health-records.png";
import reminderImg from "../../assets/health-timeline.png";

const steps = [
  {
    id: "01",
    title: "Create Your Pet Profile",
    description:
      "Add your pet's basic details like name, breed, age, and medical information to get started.",
    image: profileImg,
  },
  {
    id: "02",
    title: "Upload Health Records",
    description:
      "Store vaccination records, prescriptions, reports, and other important health documents securely.",
    image: recordsImg,
  },
  {
    id: "03",
    title: "Get Reminders & Health Timeline",
    description:
      "Receive smart reminders and track your pet's complete healthcare journey in one place.",
    image: reminderImg,
  },
];

const Workingprocess = () => {
  return (
    <section className="working-process">
      <div className="container">
        <div className="section-header">
          <span className="tag">🐾 3 steps to pet parenthood 😊</span>

          <h2>
            <span className="dark">How</span>
            <span className="green"> PetOlife Works</span>
          </h2>

          <p>Keep your furry friends healthy with just three simple steps.</p>
        </div>

        <div className="process-grid">
          {steps.map((step) => (
            <div className="process-card" key={step.id}>
              <div className="step-number">{step.id}</div>

              <div className="image-box">
                <img src={step.image} alt={step.title} />
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bottom-banner">
          <span>💚</span>
          <p>
            Smart reminders, secure records, and a lifelong health timeline —
            all in one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Workingprocess;
