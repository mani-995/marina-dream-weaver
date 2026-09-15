import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneFrame, Eyebrow, NextButton } from "../components/Chrome";

const QUESTIONS = [
  {
    q: "Who is the most dramatic?",
    options: ["you", "me"],
    reactions: { you: "yes", me: "no" },
    yes: "Correct. The Oscar committee has already been notified.",
    no: "Denial is the most dramatic move of all. Impressive.",
  },
  {
    q: "Do you still blame me for things you 100% did?",
    yes: "Respect for the honesty. The broken cup case is now closed.",
    no: "Interesting. Shall we review the evidence?",
  },
  {
    q: "Would you cry if I told you the cake is already gone?",
    yes: "Relax — it's safe. There's a whole cake later in this journey.",
    no: "Brave words. I'll test that in about three scenes.",
  },
  {
    q: "Is 22 going to be your main-character year?",
    yes: "Correct answer. Camera's already rolling.",
    no: "Too late, I've booked the soundtrack and everything.",
  },
  {
    q: "Do you know exactly how loved you are?",
    yes: "Good. But I'm still going to prove it for five more scenes.",
    no: "Wrong answer. Keep scrolling, let me show you.",
  },
];

export default function Questions({ onNext }) {
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState(null);
  const done = i === QUESTIONS.length - 1 && answer;
  const current = QUESTIONS[i];

  const options = current.options || ["yes", "no"];
  const reactionKey = current.reactions?.[answer] || answer;
  const pick = (val) => setAnswer(val);
  const advance = () => {
    setAnswer(null);
    setI((n) => n + 1);
  };

  return (
    <SceneFrame testid="scene-questions">
      <div className="w-full max-w-2xl text-center">
        <Eyebrow>chapter 01 — interrogation</Eyebrow>
        <p className="eyebrow mb-8 text-[10px]" style={{ color: "var(--ink-soft)" }}>
          {i + 1} / {QUESTIONS.length}
        </p>

        <AnimatePresence mode="wait">
          <motion.h2
            key={current.q}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl leading-snug tracking-tight sm:text-3xl lg:text-4xl"
            style={{ color: "var(--ink)" }}
          >
            {current.q}
          </motion.h2>
        </AnimatePresence>

        <div className="mt-10 flex justify-center gap-4">
          {options.map((v) => (
            <motion.button
              key={v}
              whileHover={{ y: -4, rotate: v === options[0] ? -2 : 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => pick(v)}
              data-testid={`answer-${v}-button`}
              className="rounded-full border px-10 py-3 text-sm capitalize transition-colors"
              style={{
                borderColor: answer === v ? "var(--rose)" : "var(--glass-bd)",
                background: answer === v ? "var(--rose)" : "transparent",
                color: answer === v ? "#fff" : "var(--ink)",
              }}
            >
              {v}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {answer && (
            <motion.p
              key={current.q + answer}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="font-hand mx-auto mt-10 max-w-lg text-2xl sm:text-3xl"
              style={{ color: "var(--lav)" }}
              data-testid="answer-reaction"
            >
              {current[answer]}
            </motion.p>
          )}
        </AnimatePresence>

        {answer &&
          (done ? (
            <NextButton
              onClick={onNext}
              label="Okay, show me something pretty"
              testid="questions-next-scene-button"
            />
          ) : (
            <NextButton
              onClick={advance}
              label="Next question"
              testid="next-question-button"
            />
          ))}
      </div>
    </SceneFrame>
  );
}
