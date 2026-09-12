import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Gift as GiftIcon } from "lucide-react";
import { Flower } from "../components/Flower";
import { SceneFrame, Eyebrow, NextButton } from "../components/Chrome";

const SPOTS = [
  { x: -22, y: -12 },
  { x: 18, y: 10 },
  { x: -6, y: 16 },
  { x: 24, y: -14 },
  { x: 2, y: -4 },
];

export default function Gift({ onNext }) {
  const [i, setI] = useState(0);
  const [caught, setCaught] = useState(false);

  useEffect(() => {
    if (caught) return;
    const t = setInterval(() => setI((n) => (n + 1) % SPOTS.length), 2200);
    return () => clearInterval(t);
  }, [caught]);

  const catchIt = () => {
    setCaught(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#c084fc", "#facc15", "#34d399"],
      shapes: ["circle"],
    });
  };

  return (
    <SceneFrame testid="scene-gift">
      <div className="w-full max-w-3xl text-center">
        <Eyebrow>chapter 05 — catch it</Eyebrow>
        <h2
          className="font-display text-2xl tracking-tight sm:text-3xl lg:text-4xl"
          style={{ color: "var(--ink)" }}
        >
          {caught ? "Caught it. Obviously." : "It's floating around. Go on, grab it."}
        </h2>

        <div
          className="relative mx-auto mt-10 flex min-h-[380px] w-full flex-col items-center justify-center"
          data-testid="gift-stage"
        >
          <AnimatePresence mode="wait">
            {!caught ? (
              <motion.button
                key="box"
                onClick={catchIt}
                data-testid="gift-box-button"
                aria-label="Catch the gift"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: `${SPOTS[i].x}vw`,
                  y: `${SPOTS[i].y}vh`,
                  rotate: SPOTS[i].x / 4,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.9, ease: [0.42, 0, 0.58, 1] }}
                whileHover={{ scale: 1.08 }}
                className="absolute grid h-32 w-32 place-items-center rounded-2xl text-white shadow-[0_26px_60px_-24px_rgba(244,114,182,0.9)]"
                style={{
                  background: "linear-gradient(150deg,#f472b6,#c084fc)",
                }}
              >
                <span
                  className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2"
                  style={{ background: "rgba(255,255,255,0.55)" }}
                />
                <span
                  className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2"
                  style={{ background: "rgba(255,255,255,0.55)" }}
                />
                <GiftIcon size={30} className="relative z-10" />
              </motion.button>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center"
                data-testid="gift-revealed"
              >
                <Flower size={260} petals={13} rings={3} tilt={40} delay={150} />
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="glass mt-6 max-w-md rounded-2xl px-8 py-6"
                >
                  <p className="font-hand text-2xl" style={{ color: "var(--ink)" }}>
                    Your gift: one full year of me saying yes to your plans,
                    your playlists and your 2 a.m. snack runs. Redeemable
                    anytime, no expiry.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {caught && (
          <NextButton onClick={onNext} label="One last thing" testid="gift-next-button" />
        )}
      </div>
    </SceneFrame>
  );
}
