import React, { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProblemSolution from "./ProblemSolution";
import WhoIsItFor from "./WhoIsItFor";


const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar openModal={() => openModal("subscribe")} />

      {/* HERO */}
      <Hero openModal={() => openModal("subscribe")} />

      {/* SECTIONS */}
      <ProblemSolution />
      <WhoIsItFor openModal={openModal} />


      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {/* SUBSCRIBE */}
            {modalType === "subscribe" && (
              <>
                <h2>Subscribe</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input placeholder="Name" />
                  <input placeholder="Email" />
                  <button type="submit">Subscribe</button>
                </form>
              </>
            )}

            {/* PET LOGIN */}
            {modalType === "pet-login" && (
              <>
                <h2>Pet Parent Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input placeholder="Pet Life ID" />
                  <input placeholder="Email" />
                  <input placeholder="Password" />
                  <button type="submit">Login</button>
                </form>
              </>
            )}

            {/* PET SIGNUP */}
            {modalType === "pet-signup" && (
              <>
                <h2>Pet Parent Signup</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input placeholder="Pet Name" />
                  <input placeholder="Pet owner Name" />
                  <input placeholder="Email" />
                  <input placeholder="Password" />
                  <button type="submit">Create Account</button>
                </form>
              </>
            )}

            {/* VET SIGNUP */}
            {modalType === "vet-signup" && (
              <>
                <h2>Veterinarian Signup</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input placeholder="Veterinarian Name" />
                  <input placeholder="Clinic Name" />
                  <input placeholder="Email" />
                  <input placeholder="Password" />
                  <button type="submit">Create Account</button>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default App;