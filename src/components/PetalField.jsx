import { useMemo } from "react";

const COLORS = ["#f472b6", "#c084fc", "#fbcfe8", "#fde68a", "#a7f3d0"];

export const PetalField = ({ count = 26 }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 12,
        dur: 12 + Math.random() * 16,
        delay: -Math.random() * 24,
        color: COLORS[i % COLORS.length],
        drift: -10 + Math.random() * 26,
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      data-testid="petal-field"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal-fall"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}vw`,
          }}
        />
      ))}
    </div>
  );
};
