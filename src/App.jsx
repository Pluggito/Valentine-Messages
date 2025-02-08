import BunnyBackground from "./BunnyBackground";
import CountdownTimer from "./CountdownTimer";
import Menu from "./Menu";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";

const App = () => {
  const [countdownFinished, setCountdownFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdownFinished) {
      navigate("/"); // Redirects after countdown
    }
  }, [countdownFinished, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Bunny Background */}
      <BunnyBackground />

      {/* Main Content */}
      {!countdownFinished ? (
        <CountdownTimer onComplete={() => setCountdownFinished(true)} />
      ) : (
        <main className="relative z-10 flex justify-center items-center min-h-screen">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/next-page" element={<Menu />} />
          </Routes>
        </main>
      )}
    </div>
  );
};

export default App;
