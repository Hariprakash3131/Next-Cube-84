import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Characters from "./components/Characters";
import CharOverlay from "./components/CharOverlay";
import Creatures from "./components/Creatures";
import Finale from "./components/Finale";
import Footer from "./components/Footer";
import Spores from "./components/Spores";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <div className="vecna-global-bg" />
      <Spores />
      <Navbar />
      <CharOverlay />
      <main>
        <Hero />
        <Characters />
        <Finale />
        <Creatures />
      </main>
      <Footer />
    </>
  );
}
