import { useEffect, useRef } from "react";

const seededRandom = (seed) => {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const heartPoint = (angle) => ({
  x: 16 * Math.sin(angle) ** 3,
  y: -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)),
});

const drawHeart = (ctx, x, y, size, rotation, color, alpha) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(size / 32, size / 32);
  ctx.beginPath();
  for (let i = 0; i <= 48; i += 1) {
    const point = heartPoint((i / 48) * Math.PI * 2);
    if (i === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.closePath();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 0.3;
  ctx.fill();
  ctx.restore();
};

export function HeartTree() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const random = seededRandom(22092004);
    let frame = 0;
    let startedAt = performance.now();
    let width = 0;
    let height = 0;

    const blossoms = Array.from({ length: 128 }, (_, index) => {
      const angle = random() * Math.PI * 2;
      const radius = Math.sqrt(random()) * 0.92;
      const edge = heartPoint(angle);
      return {
        nx: (edge.x / 16) * radius,
        ny: (edge.y / 17) * radius,
        size: 8 + random() * 10,
        rotation: random() * Math.PI * 2,
        delay: 1.25 + index * 0.009 + random() * 0.55,
        colorIndex: index % 4,
        phase: random() * Math.PI * 2,
      };
    });

    const falling = Array.from({ length: 12 }, (_, index) => ({
      x: random(),
      speed: 0.025 + random() * 0.025,
      offset: index / 12,
      sway: 8 + random() * 16,
      size: 7 + random() * 7,
      phase: random() * Math.PI * 2,
      colorIndex: index % 3,
    }));

    const branches = [
      [0, 0, -0.03, -0.48, 15],
      [-0.02, -0.25, -0.38, -0.53, 9],
      [0, -0.32, 0.4, -0.58, 9],
      [-0.18, -0.4, -0.55, -0.69, 6],
      [-0.16, -0.42, 0.03, -0.73, 6],
      [0.2, -0.47, 0.55, -0.73, 6],
      [0.16, -0.47, -0.06, -0.79, 5],
      [-0.42, -0.61, -0.65, -0.78, 4],
      [0.42, -0.62, 0.65, -0.79, 4],
      [-0.05, -0.7, -0.27, -0.9, 4],
      [0.03, -0.72, 0.28, -0.91, 4],
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = (now) => {
      const elapsed = reduceMotion ? 8 : (now - startedAt) / 1000;
      const styles = getComputedStyle(document.documentElement);
      const rose = styles.getPropertyValue("--rose").trim();
      const sky = styles.getPropertyValue("--sky").trim();
      const paper = styles.getPropertyValue("--paper").trim();
      const ink = styles.getPropertyValue("--ink").trim();
      const colors = [rose, sky, paper, rose];
      const cx = width / 2;
      const ground = height * 0.94;
      const canopyW = Math.min(width * 0.78, height * 0.82);
      const canopyH = canopyW * 0.78;
      const canopyY = ground - canopyH * 0.66;
      ctx.clearRect(0, 0, width, height);

      const grow = Math.min(1, Math.max(0, (elapsed - 0.15) / 1.5));
      ctx.lineCap = "round";
      branches.forEach(([x1, y1, x2, y2, lineWidth], index) => {
        const local = Math.min(1, Math.max(0, grow * 1.45 - index * 0.035));
        const startX = cx + x1 * canopyW;
        const startY = ground + y1 * canopyH;
        const endX = cx + (x1 + (x2 - x1) * local) * canopyW;
        const endY = ground + (y1 + (y2 - y1) * local) * canopyH;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(
          startX + (endX - startX) * 0.55 + Math.sin(index) * 8,
          startY + (endY - startY) * 0.42,
          endX,
          endY,
        );
        ctx.strokeStyle = ink;
        ctx.globalAlpha = 0.72;
        ctx.lineWidth = Math.max(1.5, lineWidth * (0.65 + local * 0.35));
        ctx.stroke();
      });

      blossoms.forEach((blossom) => {
        const bloom = Math.min(1, Math.max(0, (elapsed - blossom.delay) / 0.7));
        if (bloom <= 0) return;
        const pulse = 1 + Math.sin(elapsed * 1.15 + blossom.phase) * 0.025;
        const x = cx + blossom.nx * canopyW * 0.49;
        const y = canopyY + blossom.ny * canopyH * 0.46;
        const eased = 1 - (1 - bloom) ** 3;
        drawHeart(ctx, x, y, blossom.size * eased * pulse, blossom.rotation, colors[blossom.colorIndex], eased * 0.9);
      });

      if (elapsed > 3 || reduceMotion) {
        falling.forEach((petal) => {
          const travel = (elapsed * petal.speed + petal.offset) % 1;
          const x = cx + (petal.x - 0.5) * canopyW + Math.sin(elapsed + petal.phase) * petal.sway;
          const y = canopyY + canopyH * 0.2 + travel * canopyH * 1.2;
          drawHeart(ctx, x, y, petal.size, elapsed + petal.phase, colors[petal.colorIndex], 0.5 * (1 - travel));
        });
      }

      ctx.globalAlpha = 0.18;
      ctx.fillStyle = sky;
      ctx.beginPath();
      ctx.ellipse(cx, ground + 2, canopyW * 0.32, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    const restart = () => {
      startedAt = performance.now();
    };
    canvas.addEventListener("click", restart);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("click", restart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="heart-tree"
      data-testid="finale-heart-tree"
      aria-label="An animated tree blooming into a heart made of pink and blue petals"
      role="img"
      title="Tap to bloom again"
    />
  );
}