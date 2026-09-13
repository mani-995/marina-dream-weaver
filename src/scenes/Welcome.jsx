import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flower } from "../components/Flower";
import { SceneFrame, NextButton } from "../components/Chrome";
import { timeLeft } from "../lib/birthday";

const Unit = ({ value, label, testid }) => (
  <div className="flex flex-col items-center px-3 sm:px-5" data-testid={testid}>
    <span className="font-display text-3xl leading-none sm:text-4xl">
      {value === null ? "—" : String(value).padStart(2, "0")}
    </span>
    <span className="eyebrow mt-2 text-[9px]" style={{ color: "var(--ink-soft)" }}>
      {label}
    </span>
  </div>
);

export default function Welcome({ onNext }) {
  const [t, setT] = useState({ days: null, hours: null, minutes: null, seconds: null });
  const [bloom, setBloom] = useState(false);

  useEffect(() => {
    setT(timeLeft());
    const i = setInterval(() => setT(timeLeft()), 1000);
    const b = setTimeout(() => setBloom(true), 900);
    return () => {
      clearInterval(i);
      clearTimeout(b);
    };
  }, []);

  return (
    <SceneFrame testid="scene-welcome">
      <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <div className="torn-paper pointer-events-none absolute -left-6 -top-8 h-40 w-72 -rotate-6 bg-brand opacity-90 shadow-xl" />
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="eyebrow relative mb-6 text-[10px] sm:text-xs"
            style={{ color: "var(--ink-soft)" }}
          >
            29 September 2004 — a garden began
          </motion.p>

          <h1 className="font-display relative text-[clamp(4.5rem,11vw,10rem)] leading-[0.82]">
            <motion.span initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .35, duration: 1 }} className="block text-ink">Dipuuui</motion.span>
            <motion.span initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .52, duration: 1 }} className="block text-transparent" style={{ WebkitTextStroke: "2px var(--ink)" }}>turns 22</motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="mt-7 max-w-md text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--ink-soft)" }}
          >
            Some people are seasons. You're the whole spring. Walk through seven
            little handmade moments — a garden, a wish, a letter, and one last page.
          </motion.p>

          <NextButton
            onClick={onNext}
            label="Begin the story"
            testid="welcome-begin-button"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="glass mt-8 flex w-fit max-w-full items-center overflow-hidden rounded-2xl px-1 py-3"
            data-testid="welcome-countdown"
          >
            <Unit value={t.days} label="days" testid="countdown-days-value" />
            <Unit value={t.hours} label="hours" testid="countdown-hours-value" />
            <Unit value={t.minutes} label="mins" testid="countdown-minutes-value" />
            <Unit value={t.seconds} label="secs" testid="countdown-seconds-value" />
            <span className="hidden pl-3 pr-4 text-[10px] uppercase tracking-[.16em] text-ink/45 sm:block">till the big day</span>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="absolute -right-4 -top-6 h-full w-full rounded-[28px] bg-sky/30 ring-1 ring-ink/10" />
          <div className="glass relative rounded-[22px] p-6 sm:p-8">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-ink/45"><span>now playing</span><span className="rounded-full bg-brand/15 px-2.5 py-1 text-brand">scene 01</span></div>
            <p className="font-display mt-6 text-3xl leading-tight text-ink">“Some people are seasons.<br />You're the <em className="text-brand">whole spring.</em>”</p>
            <div className="mt-3 flex min-h-[270px] items-center justify-center">
              <button onClick={() => { setBloom(false); setTimeout(() => setBloom(true), 140); }} data-testid="welcome-bloom-button" aria-label="Bloom again">
                <Flower size={280} petals={12} rings={3} bloom={bloom} tilt={44} />
              </button>
            </div>
            <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-[10px] uppercase tracking-[.18em] text-ink/45"><span>tap to bloom</span><span>handmade · keep forever</span></div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
