import React from "react";
import "./ProblemSolution.css";
import problemSolutionImg from "./assets/problem-solution.jpeg";

const ProblemSolution = () => {
  return (
    <section className="problem-solution" id="Solutions">
      <div className="container">
        {/* Heading */}
        <h2 className="section-title"><span>Pet care</span> shouldn't depend on <span>memory.</span> 
        </h2>

        {/* Subtitle */}
        <p className="section-subtitle">
          Bridging the gap between stressful pet care and happy
          companionship.
        </p>

        {/* Whole Image */}
        <div className="solution-image">
          <img
            src={problemSolutionImg}
            alt="Problems and solutions for pet care"
          />
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;