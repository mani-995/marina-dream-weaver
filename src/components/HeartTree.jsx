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
  const fill = ctx.createLinearGradient(-13, -14, 13, 15);
  fill.addColorStop(0, "#FFFFFF");
  fill.addColorStop(0.16, color);
  fill.addColorStop(1, color);
  ctx.fillStyle = fill;
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 0.34;
  ctx.shadowOffsetY = Math.max(1, size * 0.08);
  ctx.fill();

  ctx.globalAlpha = alpha * 0.72;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.ellipse(-6.7, -7.2, 3.9, 2.35, -0.5, 0, Math.PI * 2);
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

    const blossoms = Array.from({ length: 270 }, (_, index) => {
      const angle = random() * Math.PI * 2;
      const radius = Math.sqrt(random()) * 0.98;
      const edge = heartPoint(angle);
      return {
        nx: (edge.x / 16) * radius,
        ny: (edge.y / 17) * radius,
        size: 9 + random() * 14,
        rotation: (random() - 0.5) * 0.62,
        delay: 1.05 + index * 0.0045 + random() * 0.55,
        colorIndex: Math.floor(random() * 5),
        phase: random() * Math.PI * 2,
        depth: random(),
      };
    }).sort((a, b) => a.depth - b.depth);

    const falling = Array.from({ length: 22 }, (_, index) => ({
      x: random(),
      speed: 0.018 + random() * 0.028,
      offset: index / 22,
      sway: 10 + random() * 22,
      size: 7 + random() * 10,
      phase: random() * Math.PI * 2,
      colorIndex: index % 5,
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
      const colors = [rose, rose, rose, sky, paper];
      const cx = width / 2;
      const ground = height * 0.96;
      const canopyW = Math.min(width * 0.92, height * 1.02);
      const canopyH = canopyW * 0.82;
      const canopyY = ground - canopyH * 0.72;
      ctx.clearRect(0, 0, width, height);

      const grow = Math.min(1, Math.max(0, (elapsed - 0.15) / 1.5));
      ctx.lineCap = "round";
      const trunkTop = ground - canopyH * 0.63 * grow;
      const trunkGradient = ctx.createLinearGradient(cx - 7, ground, cx + 7, trunkTop);
      trunkGradient.addColorStop(0, ink);
      trunkGradient.addColorStop(0.48, rose);
      trunkGradient.addColorStop(1, sky);
      ctx.beginPath();
      ctx.moveTo(cx - 7, ground);
      ctx.bezierCurveTo(cx - 5, ground - canopyH * 0.25 * grow, cx - 3, trunkTop + 24, cx, trunkTop);
      ctx.bezierCurveTo(cx + 3, trunkTop + 24, cx + 7, ground - canopyH * 0.25 * grow, cx + 7, ground);
      ctx.closePath();
      ctx.fillStyle = trunkGradient;
      ctx.globalAlpha = 0.78;
      ctx.fill();

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
        ctx.globalAlpha = 0.34;
        ctx.lineWidth = Math.max(1.25, lineWidth * (0.55 + local * 0.3));
        ctx.stroke();
      });

      blossoms.forEach((blossom) => {
        const bloom = Math.min(1, Math.max(0, (elapsed - blossom.delay) / 0.7));
        if (bloom <= 0) return;
        const pulse = 1 + Math.sin(elapsed * 1.05 + blossom.phase) * 0.018;
        const x = cx + blossom.nx * canopyW * 0.49;
        const y = canopyY + blossom.ny * canopyH * 0.46;
        const eased = 1 - (1 - bloom) ** 3;
        const overshoot = 1 + Math.sin(Math.min(1, bloom) * Math.PI) * 0.18;
        drawHeart(
          ctx,
          x,
          y,
          blossom.size * eased * overshoot * pulse,
          blossom.rotation,
          colors[blossom.colorIndex],
          eased * (0.78 + blossom.depth * 0.2),
        );
      });

      if (elapsed > 3 || reduceMotion) {
        falling.forEach((petal) => {
          const travel = (elapsed * petal.speed + petal.offset) % 1;
          const x = cx + (petal.x - 0.5) * canopyW + Math.sin(elapsed + petal.phase) * petal.sway;
           const y = canopyY + canopyH * 0.18 + travel * canopyH * 1.34;
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