import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Flower } from "../components/Flower";
import { SceneFrame, NextButton } from "../components/Chrome";
import { timeLeft, ordinal, turningAge } from "../lib/birthday";

const LINES = ["Happy", `${ordinal(turningAge())} Birthday,`, "Dipuuui"];

const Mask = ({ children, delay, italic }) => (
  <span className="text-mask">
    <motion.span
      initial={{ y: "110%", rotate: 4, opacity: 0 }}
      animate={{ y: "0%", rotate: 0, opacity: 1 }}
      transition={{ delay, duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      className={`block ${italic ? "italic" : ""}`}
    >
      {children}
    </motion.span>
  </span>
);

const Unit = ({ value, label, testid }) => (
  <div className="flex flex-col items-center px-3 sm:px-5" data-testid={testid}>
    <span className="font-display text-3xl leading-none sm:text-4xl">
      {String(value).padStart(2, "0")}
    </span>
    <span className="eyebrow mt-2 text-[9px]" style={{ color: "var(--ink-soft)" }}>
      {label}
    </span>
  </div>
);

export default function Welcome({ onNext }) {
  const [t, setT] = useState(timeLeft());
  const [bloom, setBloom] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setT(timeLeft()), 1000);
    const b = setTimeout(() => setBloom(true), 900);
    return () => {
      clearInterval(i);
      clearTimeout(b);
    };
  }, []);

  return (
    <SceneFrame testid="scene-welcome">
      <div className="grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="eyebrow mb-6 flex items-center gap-3 text-[10px] sm:text-xs"
            style={{ color: "var(--ink-soft)" }}
          >
            <Sparkles size={13} style={{ color: "var(--rose)" }} />
            29 September 2004 — a garden began
          </motion.p>

          <h1 className="font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            {LINES.map((line, i) => (
              <Mask key={line} delay={0.4 + i * 0.18} italic={i === 2}>
                <span style={{ color: i === 2 ? "var(--rose)" : "var(--ink)" }}>
                  {line}
                </span>
              </Mask>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="mt-7 max-w-md text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--ink-soft)" }}
          >
            This isn't a website, it's a little journey made only for you. Seven
            stops. No skipping. Ready?
          </motion.p>

          <NextButton
            onClick={onNext}
            label="Begin the journey"
            testid="welcome-begin-button"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="glass mt-12 flex w-fit items-center rounded-3xl px-2 py-4"
            data-testid="welcome-countdown"
          >
            <Unit value={t.days} label="days" testid="countdown-days-value" />
            <Unit value={t.hours} label="hours" testid="countdown-hours-value" />
            <Unit value={t.minutes} label="mins" testid="countdown-minutes-value" />
            <Unit value={t.seconds} label="secs" testid="countdown-seconds-value" />
            <span className="font-hand pl-3 pr-4 text-xl" style={{ color: "var(--lav)" }}>
              till the big day
            </span>
          </motion.div>
        </div>

        <div className="relative flex justify-center">
          <button
            onClick={() => {
              setBloom(false);
              setTimeout(() => setBloom(true), 140);
            }}
            data-testid="welcome-bloom-button"
            aria-label="Bloom again"
          >
            <Flower size={360} petals={12} rings={3} bloom={bloom} tilt={44} />
          </button>
          <span
            className="font-hand absolute -bottom-4 right-2 text-xl"
            style={{ color: "var(--ink-soft)" }}
          >
            tap the flower ✿
          </span>
        </div>
      </div>
    </SceneFrame>
  );
}
