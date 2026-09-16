import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Check, RotateCcw } from "lucide-react";
import { SceneFrame, Eyebrow, NextButton } from "../components/Chrome";
import { Tilt } from "../components/Tilt";

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
    if (stage !== "sealed") return;
    setStage("opening");
    setTimeout(() => setStage("open"), 1600);
  };

  const opening = stage === "opening";

  return (
    <SceneFrame testid="scene-letter">
      <div className="w-full max-w-2xl text-center">
        <Eyebrow>chapter 05 — the letter</Eyebrow>

        <AnimatePresence mode="wait">
          {stage !== "open" ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
              transition={{ duration: 0.7 }}
              className="mx-auto mt-6 flex flex-col items-center"
            >
              <h2
                className="font-display mb-2 text-4xl tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: "var(--ink)" }}
              >
                Sealed since September.
              </h2>
              <p
                className="mb-14 text-sm uppercase tracking-[0.25em]"
                style={{ color: "var(--ink-soft)", fontFamily: "'Work Sans', sans-serif" }}
              >
                {opening ? "opening…" : "Open it."}
              </p>

              {/* Envelope */}
              <div
                className="relative w-full max-w-md"
                style={{ perspective: "1000px", aspectRatio: "4 / 3" }}
              >
                {/* Back panel */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-lg border shadow-xl"
                  style={{ background: "var(--paper)", borderColor: "rgba(255,255,255,0.5)" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(119,190,248,0.08), transparent)" }}
                  />
                </div>

                {/* Letter card rising out */}
                <motion.div
                  animate={opening ? { y: -220 } : { y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-4 top-4 bottom-4 z-10 rounded-sm p-8"
                  style={{
                    background: "var(--paper)",
                    boxShadow: "inset 0 2px 12px rgba(17,17,17,0.08), 0 10px 30px -12px rgba(17,17,17,0.25)",
                  }}
                >
                  <motion.span
                    animate={opening ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0.35, filter: "blur(7px)" }}
                    transition={{ duration: 0.8, delay: opening ? 0.7 : 0 }}
                    className="font-hand block text-left text-2xl leading-relaxed"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    Dearest Dipuuui,
                    <br />
                    <br />
                    something has been waiting in here for you…
                  </motion.span>
                </motion.div>

                {/* Top flap */}
                <motion.div
                  animate={{ rotateX: opening ? -180 : 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-30 origin-top"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="h-1/2 w-full"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(214,235,252,0.9))",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      filter: "drop-shadow(0 8px 14px rgba(119,190,248,0.28))",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      className="h-full w-full"
                      style={{ background: "linear-gradient(180deg, rgba(119,190,248,0.12), transparent)" }}
                    />
                  </div>
                </motion.div>

                {/* Frosted front flaps */}
                <div className="pointer-events-none absolute inset-0 z-40">
                  <div
                    className="absolute inset-0 rounded-lg border"
                    style={{
                      background: "rgba(255,255,255,0.35)",
                      backdropFilter: "blur(5px)",
                      borderColor: "rgba(255,255,255,0.5)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 h-3/4 w-full"
                    style={{
                      background: "linear-gradient(0deg, rgba(255,255,255,0.82), rgba(255,255,255,0.6))",
                      backdropFilter: "blur(12px)",
                      clipPath: "polygon(0 100%, 100% 100%, 100% 20%, 50% 60%, 0 20%)",
                      boxShadow: "0 -4px 24px rgba(119,190,248,0.18)",
                    }}
                  />
                </div>

                {/* Wax seal */}
                <motion.button
                  onClick={open}
                  disabled={opening}
                  data-testid="envelope-unseal-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={opening ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  aria-label="Open the letter"
                >
                  <span className="relative block">
                    <span
                      className="grid h-16 w-16 place-items-center rounded-full"
                      style={{
                        background: "var(--rose)",
                        boxShadow:
                          "0 10px 24px -6px rgba(255,88,199,0.5), inset 0 -4px 8px rgba(0,0,0,0.12), inset 0 3px 6px rgba(255,255,255,0.35), 0 0 0 4px rgba(255,88,199,0.2)",
                      }}
                    >
                      <span className="font-display select-none text-3xl italic text-white drop-shadow-md">
                        D
                      </span>
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent)",
                        }}
                      />
                      <span className="absolute inset-1 rounded-full border border-white/10" />
                    </span>
                    {/* wax drips */}
                    <span
                      className="absolute -bottom-1 -left-1 h-6 w-6 rounded-full opacity-80 blur-[1px]"
                      style={{ background: "var(--rose)" }}
                    />
                    <span
                      className="absolute -top-1 -right-2 h-5 w-5 rounded-full opacity-60 blur-[1px]"
                      style={{ background: "var(--rose)" }}
                    />
                  </span>
                </motion.button>
              </div>

              <p className="eyebrow mt-12 text-[10px]" style={{ color: "var(--ink-soft)" }}>
                {opening ? "breaking the seal…" : "click the wax seal"}
              </p>
            </motion.div>
          ) : (
            <Tilt max={4} className="mx-auto max-w-3xl">
            <motion.div
              key="paper"
              initial={{ opacity: 0, rotateX: -14, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
