import { motion } from "framer-motion";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";

export const STEPS = [
  { id: "welcome", label: "Hello" },
  { id: "questions", label: "Questions" },
  { id: "blooms", label: "Blooms" },
  { id: "candles", label: "Candles" },
  { id: "letter", label: "Letter" },
  { id: "gift", label: "Gift" },
  { id: "finale", label: "Wish" },
];

export const Chrome = ({ step, goTo, dark, setDark, muted, setMuted }) => (
  <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
    <div className="glass pointer-events-auto mx-auto flex max-w-[1200px] items-center gap-4 rounded-full px-4 py-2.5 sm:px-6">
      <span
        className="font-mono-e text-[11px] uppercase tracking-[0.3em]"
        style={{ color: "var(--ink)" }}
      >
        Dipuuui<span style={{ color: "var(--rose)" }}> • 22</span>
      </span>

      <div className="mx-auto flex items-center gap-2" data-testid="step-progress">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            disabled={i > step}
            title={s.label}
            data-testid={`step-dot-${s.id}`}
            className="group relative grid h-6 w-6 place-items-center disabled:cursor-not-allowed"
          >
            <span
              className="block rounded-full transition-all duration-500"
              style={{
                width: i === step ? 22 : 7,
                height: 7,
                background:
                  i === step
                    ? "var(--rose)"
                    : i < step
                      ? "var(--lav)"
                      : "var(--glass-bd)",
                opacity: i > step ? 0.6 : 1,
              }}
            />
          </button>
        ))}
      </div>

      <button
        onClick={() => setMuted(!muted)}
        data-testid="chrome-audio-toggle"
        aria-label="Toggle ambient sound"
        className="grid h-8 w-8 place-items-center rounded-full"
        style={{ background: "var(--paper-2)", color: "var(--ink)" }}
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
      <button
        onClick={() => setDark(!dark)}
        data-testid="chrome-theme-toggle"
        aria-label="Toggle theme"
        className="grid h-8 w-8 place-items-center rounded-full"
        style={{ background: "var(--paper-2)", color: "var(--ink)" }}
      >
        {dark ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </div>
  </div>
);

export const SceneFrame = ({ children, testid, className = "" }) => (
  <motion.section
    data-testid={testid}
    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    className={`relative flex min-h-screen w-full flex-col items-center justify-center px-5 py-28 sm:px-10 ${className}`}
  >
    {children}
  </motion.section>
);

export const Eyebrow = ({ children }) => (
  <motion.p
    initial={{ opacity: 0, letterSpacing: "0.1em" }}
    animate={{ opacity: 1, letterSpacing: "0.28em" }}
    transition={{ duration: 1 }}
    className="eyebrow mb-6 text-[10px] sm:text-xs"
    style={{ color: "var(--rose)" }}
  >
    {children}
  </motion.p>
);

export const NextButton = ({ onClick, label = "Next", testid }) => (
  <motion.button
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    whileHover={{ y: -3 }}
    onClick={onClick}
    data-testid={testid}
    className="group relative mt-10 overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium text-white"
    style={{ background: "var(--rose)" }}
  >
    <span className="relative z-10">{label}</span>
    <span
      className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0"
      style={{ background: "var(--lav)" }}
    />
  </motion.button>
);
