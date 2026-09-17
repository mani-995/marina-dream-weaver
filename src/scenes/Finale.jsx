import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { HeartTree } from "../components/HeartTree";
import { PetalField } from "../components/PetalField";
import { Marquee } from "../components/Marquee";
import { SceneFrame } from "../components/Chrome";

const WORDS = ["HAPPY", "BIRTHDAY", "DIPUUUI"];

export default function Finale({ onRestart }) {
  useEffect(() => {
    const colors = ["#FF58C7", "#77BEF8", "#FFFFFF", "#77BEF8", "#111111"];
    const t1 = setTimeout(
      () => confetti({ particleCount: 180, spread: 120, origin: { y: 0.5 }, colors }),
      600,
    );
    return () => clearTimeout(t1);
  }, []);

  return (
    <SceneFrame testid="scene-finale" className="overflow-hidden">
      <PetalField count={30} />

      <div className="relative w-full max-w-[1200px] text-center">
        <h1 className="font-display tracking-tight">
          {WORDS.map((w, i) => (
            <span className="text-mask" key={w}>
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[13vw] leading-[0.9]"
                style={{
                  color: i === 2 ? "var(--rose)" : "var(--ink)",
                  fontStyle: i === 2 ? "italic" : "normal",
                }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 1 }}
            className="w-full max-w-2xl"
          >
            <HeartTree />
            <p className="-mt-5 text-[9px] uppercase tracking-[0.2em] text-ink/45">
              tap the tree to bloom again
            </p>
          </motion.div>
          <p
            className="font-hand max-w-xl text-2xl sm:text-3xl"
            style={{ color: "var(--ink-soft)" }}
          >
            Some people are seasons. You're the whole spring. Thank you for
            being my cousin — go be twenty-two, loudly.
          </p>
          <button
            onClick={onRestart}
            data-testid="finale-restart-button"
            className="flex items-center gap-2 rounded-full border px-7 py-3 text-xs"
            style={{ borderColor: "var(--glass-bd)", color: "var(--ink)" }}
          >
            <RotateCcw size={13} /> live it again
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute inset-x-0 bottom-0"
      >
        <Marquee slow />
      </motion.div>
    </SceneFrame>
  );
}
