import BackToTop from "./components/BackToTop.jsx";
import CompareTable from "./components/CompareTable.jsx";
import Devices from "./components/Devices.jsx";
import Footer from "./components/Footer.jsx";
import GameIndex from "./components/GameIndex.jsx";
import HandRanking from "./components/HandRanking.jsx";
import Hero from "./components/Hero.jsx";
import Library from "./components/Library.jsx";
import Masthead from "./components/Masthead.jsx";
import Ticker from "./components/Ticker.jsx";
import Tutorials from "./components/Tutorials.jsx";
import { useGames } from "./hooks/useGames.js";

export default function App() {
  // null until the library chunk lands; every section renders its own
  // skeleton in the meantime.
  const data = useGames();

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Masthead />

      <div className="shell">
        <Hero />
        <Devices />

        <div className="layout">
          <GameIndex games={data?.games} />

          <main className="content" id="main">
            <Library games={data?.games} />
            <Ticker games={data?.games} />
            <CompareTable rows={data?.compare} />
            <Tutorials games={data?.games} />
            <HandRanking rows={data?.handRanking} />
          </main>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
