import { motion } from "framer-motion";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";

export const STEPS = [
  { id: "welcome", label: "Hello" },
  { id: "questions", label: "Questions" },
  { id: "blooms", label: "Blooms" },
  { id: "candles", label: "Candles" },
  { id: "scratch", label: "Scratch" },
  { id: "letter", label: "Letter" },
  { id: "gift", label: "Gift" },
  { id: "finale", label: "Wish" },
];

export const Chrome = ({ step, goTo, dark, setDark, muted, setMuted }) => (
  <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
    <div className="glass pointer-events-auto mx-auto flex h-14 max-w-4xl items-center rounded-[22px] px-2 sm:h-16 sm:px-3">
      <div className="flex min-w-12 shrink-0 items-center gap-2 px-2 sm:min-w-32">
        <span className="font-display text-xl italic leading-none text-brand sm:text-2xl">
          {String(step + 1).padStart(2, "0")}
        </span>
        <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-ink/45 sm:block">
          {STEPS[step].label}
        </span>
      </div>

      <div className="mx-auto flex flex-1 items-center justify-center gap-0.5 px-1 sm:gap-1.5 sm:px-5" data-testid="step-progress">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            disabled={i > step}
            title={`${String(i + 1).padStart(2, "0")} — ${s.label}`}
            aria-label={`Go to ${s.label}`}
            aria-current={i === step ? "step" : undefined}
            data-testid={`step-dot-${s.id}`}
            className="group relative grid h-9 flex-1 place-items-center disabled:cursor-not-allowed"
          >
            <span
              className={`block h-1.5 w-full max-w-8 rounded-full transition-all duration-500 sm:max-w-10 ${
                i === step
                  ? "bg-brand shadow-[0_0_14px_color-mix(in_oklab,var(--rose)_48%,transparent)]"
                  : i < step
                    ? "bg-sky"
                    : "bg-ink/10"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="ml-1 flex shrink-0 items-center gap-1 border-l border-ink/10 pl-2">
        <button
          onClick={() => setMuted(!muted)}
          data-testid="chrome-audio-toggle"
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          title={muted ? "Turn sound on" : "Turn sound off"}
          className="grid size-9 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-brand/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {muted ? <VolumeX size={15} strokeWidth={1.8} /> : <Volume2 size={15} strokeWidth={1.8} />}
        </button>
        <button
          onClick={() => setDark(!dark)}
          data-testid="chrome-theme-toggle"
          aria-label={dark ? "Use light theme" : "Use dark theme"}
          title={dark ? "Use light theme" : "Use dark theme"}
          className="grid size-9 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-sky/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
        >
          {dark ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
        </button>
      </div>
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
    className={`relative flex min-h-screen w-full flex-col items-center justify-center px-5 pb-24 pt-32 sm:px-10 ${className}`}
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
    className="group relative mt-10 overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-paper ring-2 ring-ink/10"
  >
    <span className="relative z-10">{label}</span>
    <span className="absolute inset-0 translate-y-full bg-brand transition-transform duration-500 group-hover:translate-y-0" />
  </motion.button>
);
