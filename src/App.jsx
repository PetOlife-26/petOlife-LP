import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Problem from "./components/Problem/Problem";
import PetIdentity from "./components/PetIdentity/PetIdentity";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import TrustSecurity from "./components/TrustSecurity/TrustSecurity";
import FinalCTA from "./components/FinalCTA/FinalCTA";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="app-main">
        <Hero />
        <Problem />
        <PetIdentity />
        <HowItWorks />
        <ComingSoon />
        <TrustSecurity />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
