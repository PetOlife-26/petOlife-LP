import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Solution from "./components/Solution/Solution";
import Workingprocess from "./components/Workingprocess/Workingprocess";
import VetTimeline from "./components/VetTimeline/VetTimeline";
import BeforeAfter from "./components/BeforeAfter/BeforeAfter";
import Categories from "./components/Categories/Categories";
import Trust from "./components/Trust/Trust";
import Footer from "./components/Footer/Footer";
import RegistrationModal from "./components/RegistrationModal/RegistrationModal";
import ThankYouModal from "./components/ThankYouModal/ThankYouModal";

function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState("parent");

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankType, setThankType] = useState("parent");

  return (
    <>
      <Navbar openModal={openModal} />
      <main>
        <Hero openModal={openModal} />
        <Solution />
        <Workingprocess />
        <VetTimeline />
        <BeforeAfter />
        <Categories openModal={openModal} />
        <Trust openModal={openModal} />
      </main>
      <Footer />
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        onRegisterSuccess={(type) => {
          setModalOpen(false);
          setThankType(type);
          setShowThankYou(true);
        }}
      />
      <ThankYouModal
        isOpen={showThankYou}
        type={thankType}
        onClose={() => setShowThankYou(false)}
      />
    </>
  );
}

export default App;
