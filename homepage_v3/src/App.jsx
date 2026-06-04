import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Solution from './components/Solution/Solution';
import BeforeAfter from './components/BeforeAfter/BeforeAfter';
import Categories from './components/Categories/Categories';
import Trust from './components/Trust/Trust';
import Footer from './components/Footer/Footer';
import RegistrationModal from './components/RegistrationModal/RegistrationModal';

function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState('parent');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };
  return (
    <>
      <Navbar openModal={openModal} />
      <main>
        <Hero openModal={openModal} />
        <Solution />
        <BeforeAfter />
        <Categories openModal={openModal} />
        <Trust openModal={openModal} />
      </main>
      <Footer />
      <RegistrationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        type={modalType} 
      />
    </>
  );
}

export default App;
