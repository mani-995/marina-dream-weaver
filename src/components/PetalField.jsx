import { useEffect, useMemo, useState } from "react";

const COLORS = ["#FF58C7", "#77BEF8", "#FFFFFF", "#77BEF8", "#FFFFFF"];
const seeded = (index, salt) => {
  const value = Math.sin(index * 91.73 + salt * 37.19) * 10000;
  return value - Math.floor(value);
};

export const PetalField = ({ count = 26 }) => {
  const [mounted, setMounted] = useState(false);
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: seeded(i, 1) * 100,
        size: 6 + seeded(i, 2) * 12,
        dur: 12 + seeded(i, 3) * 16,
        delay: -seeded(i, 4) * 24,
        color: COLORS[i % COLORS.length],
        drift: -10 + seeded(i, 5) * 26,
      })),
    [count],
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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
