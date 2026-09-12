import { useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Flame } from "lucide-react";
import { SceneFrame, Eyebrow, NextButton } from "../components/Chrome";

const CANDLES = Array.from({ length: 11 });
const COLORS = ["#f472b6", "#c084fc", "#facc15", "#34d399", "#fb923c"];

export default function Candles({ onNext }) {
  const [lit, setLit] = useState(true);
  const [wished, setWished] = useState(false);

  const blow = () => {
    setLit(false);
    setWished(true);
    confetti({ particleCount: 160, spread: 95, origin: { y: 0.72 }, colors: COLORS });
    setTimeout(
      () => confetti({ particleCount: 90, angle: 60, spread: 70, origin: { x: 0.12, y: 0.85 }, colors: COLORS }),
      220,
    );
    setTimeout(
      () => confetti({ particleCount: 90, angle: 120, spread: 70, origin: { x: 0.88, y: 0.85 }, colors: COLORS }),
      340,
    );
  };

  return (
    <SceneFrame testid="scene-candles">
      <div className="w-full max-w-3xl text-center">
        <Eyebrow>chapter 03 — make a wish</Eyebrow>
        <h2
          className="font-display text-2xl tracking-tight sm:text-3xl lg:text-4xl"
          style={{ color: "var(--ink)" }}
        >
          {wished ? "Wish locked. No take-backs." : "Close your eyes. Then blow."}
        </h2>

        <div
          className="relative mx-auto mt-14 flex h-[320px] w-full max-w-xl items-end justify-center rounded-[3px]"
          style={{
            background:
              "radial-gradient(circle at 50% 4%, rgba(250,204,21,0.18), transparent 62%)",
          }}
          data-testid="cake-stage"
        >
          <motion.div
            animate={lit ? { y: [0, -4, 0] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="relative mb-8 w-[300px]"
          >
            <div className="absolute -top-20 left-0 right-0 flex justify-center gap-4">
              {CANDLES.map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <AnimatePresence>
                    {lit && (
                      <motion.span
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0, y: -14 }}
                        transition={{ delay: i * 0.04 }}
                        className="candle-flame mb-1 h-4 w-[7px] rounded-full"
                        style={{
                          background: "linear-gradient(180deg,#fff8cc,#facc15 55%,#fb923c)",
                          boxShadow: "0 0 16px 5px rgba(250,204,21,0.65)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <span
                    className="h-12 w-[6px] rounded-sm"
                    style={{
                      background: i % 2 ? "var(--lav)" : "var(--rose)",
                      boxShadow: "inset -2px 0 3px rgba(0,0,0,0.12)",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              className="relative h-16 rounded-t-xl"
              style={{ background: "linear-gradient(180deg,#fff0f7,#f9c6dd)" }}
            >
              <div
                className="absolute inset-x-0 top-0 h-6"
                style={{
                  background: "#fff",
                  opacity: 0.55,
                  borderRadius: "12px 12px 40% 40% / 12px 12px 100% 100%",
                }}
              />
            </div>
            <div
              className="h-20 rounded-b-xl"
              style={{ background: "linear-gradient(180deg,#efe0ff,#cfa9f2)" }}
            />
            <div
              className="mx-auto mt-1 h-2.5 w-[118%] -translate-x-[9%] rounded-full"
              style={{ background: "rgba(0,0,0,0.09)" }}
            />
          </motion.div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setLit(true)}
            data-testid="light-candles-button"
            className="flex items-center gap-2 rounded-full border px-6 py-3 text-sm"
            style={{ borderColor: "var(--glass-bd)", color: "var(--ink)" }}
          >
            <Flame size={14} /> light them again
          </button>
          <motion.button
            whileHover={{ y: -3 }}
            onClick={blow}
            data-testid="blow-candles-button"
            className="flex items-center gap-2 rounded-full px-7 py-3 text-sm text-white"
            style={{ background: "var(--rose)" }}
          >
            <Wind size={14} /> blow them out
          </motion.button>
        </div>

        {wished && (
          <NextButton onClick={onNext} label="There's a letter for you" testid="candles-next-button" />
        )}
      </div>
    </SceneFrame>
  );
}
