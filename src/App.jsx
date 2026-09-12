import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chrome, STEPS } from "@/components/Chrome";
import { PetalField } from "@/components/PetalField";
import Welcome from "@/scenes/Welcome";
import Questions from "@/scenes/Questions";
import Blooms from "@/scenes/Blooms";
import Candles from "@/scenes/Candles";
import LetterScene from "@/scenes/LetterScene";
import Gift from "@/scenes/Gift";
import Finale from "@/scenes/Finale";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Curtain = () => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 0.9, delay: 1.2 }}
    className="pointer-events-none fixed inset-0 z-[90] grid place-items-center"
    style={{ background: "var(--paper)" }}
  >
    <motion.span
      initial={{ opacity: 0, letterSpacing: "0.1em" }}
      animate={{ opacity: [0, 1, 0], letterSpacing: "0.5em" }}
      transition={{ duration: 1.7 }}
      className="eyebrow text-[10px]"
      style={{ color: "var(--rose)" }}
    >
      for dipuuui
    </motion.span>
  </motion.div>
);

function App() {
  const [step, setStep] = useState(0);
  const [dark, setDark] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  useSmoothScroll();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));

  const scenes = [
    <Welcome key="welcome" onNext={next} />,
    <Questions key="questions" onNext={next} />,
    <Blooms key="blooms" onNext={next} />,
    <Candles key="candles" onNext={next} />,
    <LetterScene key="letter" onNext={next} />,
    <Gift key="gift" onNext={next} />,
    <Finale key="finale" onRestart={() => setStep(0)} />,
  ];

  return (
    <div className="grain relative min-h-screen overflow-x-hidden">
      <AnimatePresence>{loading && <Curtain key="curtain" />}</AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(244,114,182,0.22), transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(192,132,252,0.2), transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        {step !== 6 && <PetalField count={16} />}
      </div>

      <Chrome
        step={step}
        goTo={(i) => setStep(i)}
        dark={dark}
        setDark={setDark}
        muted={muted}
        setMuted={setMuted}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">{scenes[step]}</AnimatePresence>
      </main>
    </div>
  );
}

export default App;
