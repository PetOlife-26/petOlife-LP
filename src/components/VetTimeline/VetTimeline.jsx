import "./VetTimeline.css";

import prescription from "../../assets/vetconnect/prescription.svg";
import followup from "../../assets/vetconnect/followup.svg";
import history from "../../assets/vetconnect/history.svg";
import continuity from "../../assets/vetconnect/continuity.svg";

const steps = [
  {
    image: prescription,
    title: "Digital Prescription",
  },
  {
    image: followup,
    title: "Better Follow-up",
  },
  {
    image: history,
    title: "Organized Patient History",
  },
  {
    image: continuity,
    title: "Treatment Continuity",
  },
];

const VetTimeline = () => {
  return (
    <section className="vetTimeline">
      <div className="container">
        <div className="timelineHeader">
          <h2>
            <span className="dark">Built for</span>
            <span className="green"> Better Veterinary Care</span>
          </h2>

          <p>
            One connected workflow for smarter and continuous pet healthcare.
          </p>
        </div>

        <div className="timelineWrapper">
          <div className="timelineLine"></div>

          {steps.map((item, index) => (
            <div className="timelineItem" key={index}>
              <div className="timelineCircle">
                <img src={item.image} alt={item.title} />
              </div>

              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VetTimeline;
