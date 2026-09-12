import { useEffect, useState } from "react";

export const Flower = ({
  size = 220,
  petals = 10,
  palette = { p1: "#f472b6", p2: "#fff1f7", p3: "#c084fc" },
  bloom = true,
  delay = 0,
  className = "",
  rings = 3,
  photo,
  tilt = 46,
  stem = false,
}) => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!bloom) return setOn(false);
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [bloom, delay]);

  return (
    <div className={`stage3d ${className}`} aria-hidden="true">
      <div
        className={`flower ${on ? "bloomed" : ""}`}
        style={{
          "--fs": `${size}px`,
          "--p1": palette.p1,
          "--p2": palette.p2,
          "--p3": palette.p3,
          "--tilt": `${tilt}deg`,
          "--stem-h": `${size * 0.75}px`,
        }}
      >
        <span className="halo" />
        {stem && <span className="stem" />}
        {Array.from({ length: rings }).map((_, r) => (
          <div
            className="petal-ring"
            key={r}
            style={{
              transform: `rotateZ(${(r * 180) / petals}deg) translateZ(${r * 12}px) scale(${1 - r * 0.2})`,
            }}
          >
            {Array.from({ length: petals }).map((_, i) => (
              <span
                className="petal"
                key={i}
                style={{
                  "--rz": `${(360 / petals) * i}deg`,
                  "--pd": `${i * 60 + r * 260}ms`,
                  "--cup": `${16 + r * 13}deg`,
                  "--tz": `${r * 4}px`,
                }}
              />
            ))}
          </div>
        ))}
        <span className="core" />
        {photo && (
          <span className="core-photo">
            <img src={photo} alt="" loading="lazy" />
          </span>
        )}
      </div>
    </div>
  );
};
