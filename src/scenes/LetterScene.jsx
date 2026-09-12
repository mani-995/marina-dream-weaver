import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Check, RotateCcw } from "lucide-react";
import { SceneFrame, Eyebrow, NextButton } from "../components/Chrome";

const KEY = "dipuuui-letter";
const PLACEHOLDER = `My dearest Dipuuui,

(this space is yours — tap "write your own" and put your real words here.)

Happy birthday. Keep blooming, loudly.`;

export default function LetterScene({ onNext }) {
  const [stage, setStage] = useState("sealed");
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(PLACEHOLDER);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setText(saved);
  }, []);

  const open = () => {
    setStage("opening");
    setTimeout(() => setStage("open"), 1500);
  };

  return (
    <SceneFrame testid="scene-letter">
      <div className="w-full max-w-3xl text-center">
        <Eyebrow>chapter 04 — the letter</Eyebrow>

        <AnimatePresence mode="wait">
          {stage !== "open" ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
              transition={{ duration: 0.7 }}
              className="mx-auto mt-6"
            >
              <h2
                className="font-display mb-24 text-2xl tracking-tight sm:text-3xl lg:text-4xl"
                style={{ color: "var(--ink)" }}
              >
                Sealed since September. Open it.
              </h2>

              <div
                className="relative mx-auto h-[240px] w-[380px] max-w-full"
                style={{ perspective: "1200px" }}
              >
                <motion.div
                  animate={
                    stage === "opening"
                      ? { y: -140, opacity: 1, scale: 1.02 }
                      : { y: 0, opacity: 1 }
                  }
                  transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-8 top-6 h-[160px] rounded-[2px] border"
                  style={{
                    background: "var(--paper)",
                    borderColor: "var(--glass-bd)",
                    zIndex: 1,
                  }}
                >
                  <span
                    className="font-hand absolute inset-0 grid place-items-center text-xl"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    for you ✿
                  </span>
                </motion.div>

                <div
                  className="absolute inset-0 rounded-[2px] border"
                  style={{
                    background: "linear-gradient(180deg,#fbe3ef,#f3cfe3)",
                    borderColor: "var(--glass-bd)",
                    zIndex: 2,
                    clipPath: "polygon(0 22%, 100% 22%, 100% 100%, 0 100%)",
                  }}
                />

                <motion.div
                  animate={{ rotateX: stage === "opening" ? -162 : 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 top-0 h-[52%] origin-top"
                  style={{
                    background: "linear-gradient(180deg,#f9d3e6,#f0b8d4)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    zIndex: 3,
                    transformStyle: "preserve-3d",
                  }}
                />

                <motion.button
                  onClick={open}
                  disabled={stage === "opening"}
                  data-testid="envelope-unseal-button"
                  whileHover={{ scale: 1.08, rotate: -5 }}
                  whileTap={{ scale: 0.93 }}
                  animate={stage === "opening" ? { scale: 0, opacity: 0 } : {}}
                  className="absolute left-1/2 top-[42%] z-[4] grid h-20 w-20 -translate-x-1/2 place-items-center rounded-full text-white shadow-[0_12px_34px_-8px_rgba(244,114,182,0.9)]"
                  style={{ background: "var(--rose)" }}
                >
                  <span className="font-display text-xl italic">D</span>
                </motion.button>
              </div>

              <p className="eyebrow mt-10 text-[10px]" style={{ color: "var(--ink-soft)" }}>
                {stage === "opening" ? "opening…" : "click the wax seal"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="paper"
              initial={{ opacity: 0, rotateX: -18, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="paper-card relative mx-auto max-w-3xl rounded-[3px] border px-7 py-12 text-left sm:px-14 sm:py-16"
              style={{ borderColor: "var(--glass-bd)" }}
            >
              <span className="washi" style={{ top: -10, left: 40, transform: "rotate(-4deg)" }} />
              <span className="washi" style={{ top: -10, right: 40, transform: "rotate(5deg)" }} />

              {editing ? (
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  data-testid="letter-textarea"
                  rows={11}
                  className="font-hand w-full resize-none bg-transparent text-2xl leading-relaxed outline-none"
                  style={{ color: "var(--ink)" }}
                />
              ) : (
                <p
                  className="font-hand whitespace-pre-wrap text-2xl leading-relaxed sm:text-3xl"
                  style={{ color: "var(--ink)" }}
                  data-testid="letter-text"
                >
                  {text}
                </p>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {editing ? (
                  <button
                    onClick={() => {
                      localStorage.setItem(KEY, text);
                      setEditing(false);
                    }}
                    data-testid="letter-save-button"
                    className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm text-white"
                    style={{ background: "var(--rose)" }}
                  >
                    <Check size={14} /> save letter
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    data-testid="edit-letter-toggle-button"
                    className="flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm"
                    style={{ borderColor: "var(--glass-bd)", color: "var(--ink)" }}
                  >
                    <Pencil size={14} /> write your own
                  </button>
                )}
                <button
                  onClick={() => {
                    localStorage.removeItem(KEY);
                    setText(PLACEHOLDER);
                    setEditing(false);
                  }}
                  data-testid="letter-reset-button"
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <RotateCcw size={12} /> reset
                </button>
              </div>

              <div className="text-center">
                <NextButton onClick={onNext} label="Wait — there's a gift" testid="letter-next-button" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneFrame>
  );
}
