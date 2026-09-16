import { useEffect, useMemo, useRef, useState } from "react";

const COLORS = ["#FF58C7", "#77BEF8", "#FFFFFF", "#77BEF8", "#FFFFFF"];
const seeded = (index, salt) => {
  const value = Math.sin(index * 91.73 + salt * 37.19) * 10000;
  return value - Math.floor(value);
};

export const PetalField = ({ count = 26 }) => {
  const [mounted, setMounted] = useState(false);
  const nearRef = useRef(null);
  const farRef = useRef(null);

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
        near: seeded(i, 6) > 0.45,
      })),
    [count],
  );

  useEffect(() => setMounted(true), []);

  // Cursor parallax — petals drift away from the pointer like a breath of air
  useEffect(() => {
    if (!mounted) return;
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        if (nearRef.current)
          nearRef.current.style.transform = `translate3d(${nx * -42}px, ${ny * -26}px, 0)`;
        if (farRef.current)
          farRef.current.style.transform = `translate3d(${nx * -16}px, ${ny * -10}px, 0)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted]);

  if (!mounted) return null;

  const renderPetal = (p) => (
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
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      data-testid="petal-field"
    >
      <div ref={farRef} className="absolute inset-0 opacity-70 transition-transform duration-300 ease-out will-change-transform">
        {petals.filter((p) => !p.near).map(renderPetal)}
      </div>
      <div ref={nearRef} className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform">
        {petals.filter((p) => p.near).map(renderPetal)}
      </div>
    </div>
  );
};
