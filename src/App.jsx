import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Chrome, STEPS } from "@/components/Chrome";
import { PetalField } from "@/components/PetalField";
import Welcome from "@/scenes/Welcome";
import Questions from "@/scenes/Questions";
import Blooms from "@/scenes/Blooms";
import Candles from "@/scenes/Candles";
import Scratch from "@/scenes/Scratch";
import LetterScene from "@/scenes/LetterScene";
import Gift from "@/scenes/Gift";
import Finale from "@/scenes/Finale";

const Curtain = () => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 0.7, delay: 0.8 }}
    className="pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-paper"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: [0, 1, 0], scale: [0.86, 1, 1.06] }}
      transition={{ duration: 1.25 }}
      className="text-center"
    >
      <p className="font-display text-5xl italic text-brand">for Dipuuui</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-ink/45">a story in seven chapters</p>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [dark, setDark] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1600);
    return () => window.clearTimeout(timeout);
  }, []);

  const goTo = (nextStep) => {
    setStep(Math.max(0, Math.min(nextStep, STEPS.length - 1)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => goTo(step + 1);
  const scenes = [
    <Welcome key="welcome" onNext={next} />,
    <Questions key="questions" onNext={next} />,
    <Blooms key="blooms" onNext={next} />,
    <Candles key="candles" onNext={next} />,
    <Scratch key="scratch" onNext={next} />,
    <LetterScene key="letter" onNext={next} />,
    <Gift key="gift" onNext={next} />,
    <Finale key="finale" onRestart={() => goTo(0)} />,
  ];

  return (
    <div className="story-shell grain relative min-h-screen overflow-x-hidden">
      <AnimatePresence>{loading && <Curtain key="curtain" />}</AnimatePresence>
      <div className="pointer-events-none fixed inset-0 z-0">
        {step !== STEPS.length - 1 && <PetalField count={12} />}
      </div>
      <Chrome
        step={step}
        goTo={goTo}
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