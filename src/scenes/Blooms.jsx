import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flower } from "../components/Flower";
import { SceneFrame, Eyebrow, NextButton } from "../components/Chrome";

const GARDEN = [
  {
    id: 1,
    caption: "that laugh, again",
    palette: { p1: "#f472b6", p2: "#fff1f7", p3: "#c084fc" },
    photo:
      "https://images.unsplash.com/photo-1578933301026-3e5e901126dc?crop=entropy&cs=srgb&fm=jpg&w=500&q=80",
  },
  {
    id: 2,
    caption: "sunshine in a person",
    palette: { p1: "#facc15", p2: "#fffaeb", p3: "#fb923c" },
    photo:
      "https://images.unsplash.com/photo-1760124146290-a896872ae49a?crop=entropy&cs=srgb&fm=jpg&w=500&q=80",
  },
  {
    id: 3,
    caption: "golden hour, our hour",
    palette: { p1: "#c084fc", p2: "#f5f0ff", p3: "#818cf8" },
    photo:
      "https://images.unsplash.com/photo-1617643049077-7e2e755c8b8c?crop=entropy&cs=srgb&fm=jpg&w=500&q=80",
  },
  {
    id: 4,
    caption: "balloons & bad singing",
    palette: { p1: "#34d399", p2: "#effdf6", p3: "#22d3ee" },
    photo:
      "https://images.unsplash.com/flagged/photo-1563692040599-7e7d379d37b5?crop=entropy&cs=srgb&fm=jpg&w=500&q=80",
  },
  {
    id: 5,
    caption: "old photos, older jokes",
    palette: { p1: "#fb7185", p2: "#fff1f2", p3: "#fdba74" },
    photo:
      "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?crop=entropy&cs=srgb&fm=jpg&w=500&q=80",
  },
];

export default function Blooms({ onNext }) {
  const [open, setOpen] = useState([]);
  const all = open.length === GARDEN.length;

  const bloom = (id) => setOpen((o) => (o.includes(id) ? o : [...o, id]));

  return (
    <SceneFrame testid="scene-blooms">
      <div className="w-full max-w-[1200px] text-center">
        <Eyebrow>chapter 02 — the garden of you</Eyebrow>
        <h2
          className="font-display mx-auto max-w-2xl text-2xl tracking-tight sm:text-3xl lg:text-4xl"
          style={{ color: "var(--ink)" }}
        >
          Touch each bud. They only open for you.
        </h2>
        <p className="mt-5 text-sm sm:text-base" style={{ color: "var(--ink-soft)" }}>
          {all ? "The whole garden is awake." : `${open.length} of ${GARDEN.length} bloomed`}
        </p>

        <div className="mt-44 flex flex-wrap items-end justify-center gap-x-6 gap-y-28 sm:gap-x-12">
          {GARDEN.map((f, i) => {
            const isOpen = open.includes(f.id);
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
                style={{ marginTop: i % 2 ? 40 : 0 }}
              >
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.7, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        y: -150,
                        scale: 1,
                        rotate: i % 2 ? 4 : -4,
                      }}
                      transition={{
                        duration: 1.2,
                        delay: 0.75,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute left-1/2 top-6 z-20 w-[150px] -translate-x-1/2 px-2 pb-7 pt-2 shadow-[0_26px_50px_-24px_rgba(60,20,50,0.55)]"
                      style={{ background: "var(--paper-2)" }}
                      data-testid={`bloom-photo-${f.id}`}
                    >
                      <span
                        className="washi"
                        style={{
                          top: -9,
                          left: "50%",
                          transform: "translateX(-50%) rotate(-3deg)",
                          width: 54,
                          height: 18,
                        }}
                      />
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={f.photo}
                          alt={f.caption}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span
                        className="font-hand absolute inset-x-0 bottom-1 text-center text-base"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {f.caption}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => bloom(f.id)}
                  data-testid={`bloom-flower-${f.id}`}
                  aria-label={`Bloom flower ${f.id}`}
                  className="relative block"
                >
                  {isOpen ? (
                    <Flower
                      size={190}
                      petals={11}
                      rings={3}
                      palette={f.palette}
                      tilt={42}
                      delay={60}
                    />
                  ) : (
                    <motion.span
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 2.6, delay: i * 0.2 }}
                      className="block h-[76px] w-[76px] rounded-full"
                      style={{
                        margin: "57px",
                        background: `radial-gradient(circle at 35% 30%, ${f.palette.p2}, ${f.palette.p1} 70%, ${f.palette.p3})`,
                        boxShadow: `0 18px 40px -18px ${f.palette.p1}`,
                      }}
                    />
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {all ? (
          <NextButton onClick={onNext} label="Now the cake" testid="blooms-next-button" />
        ) : (
          <button
            onClick={() => setOpen(GARDEN.map((g) => g.id))}
            data-testid="bloom-all-button"
            className="mt-14 rounded-full border px-7 py-3 text-xs"
            style={{ borderColor: "var(--glass-bd)", color: "var(--ink-soft)" }}
          >
            bloom them all
          </button>
        )}
      </div>
    </SceneFrame>
  );
}
