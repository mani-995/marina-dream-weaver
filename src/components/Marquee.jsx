import { motion } from "framer-motion";

import { ordinal, turningAge } from "../lib/birthday";

const TEXT = `HAPPY ${ordinal(turningAge()).toUpperCase()} BIRTHDAY DIPUUUI ✿ SEPTEMBER 29 2004 ✿ MORE LIFE MORE BLOOM ✿ `;

export const Marquee = ({ slow = false, invert = false }) => (
  <div
    className="relative overflow-hidden border-y py-5"
    style={{
      borderColor: "var(--glass-bd)",
      background: invert ? "var(--rose)" : "transparent",
    }}
    data-testid="editorial-marquee"
  >
    <div className={`marquee-track ${slow ? "marquee-slow" : ""}`}>
      {[0, 1].map((k) => (
        <span
          key={k}
          className="font-display whitespace-nowrap pr-8 text-2xl italic sm:text-4xl"
          style={{ color: invert ? "#fff" : "var(--ink)" }}
        >
          {TEXT.repeat(3)}
        </span>
      ))}
    </div>
  </div>
);

export const SectionHead = ({ index, eyebrow, title, sub }) => (
  <div className="mb-14 max-w-2xl">
    <motion.p
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="eyebrow mb-5 text-[10px] sm:text-xs"
      style={{ color: "var(--rose)" }}
    >
      {index} — {eyebrow}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="font-display text-2xl tracking-tight sm:text-3xl lg:text-4xl"
      style={{ color: "var(--ink)" }}
    >
      {title}
    </motion.h2>
    {sub && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="mt-5 text-sm sm:text-base"
        style={{ color: "var(--ink-soft)" }}
      >
        {sub}
      </motion.p>
    )}
  </div>
);
