import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";
import { SceneFrame, Eyebrow, NextButton } from "../components/Chrome";
import duo from "@/assets/duo.jpg.asset.json";

const W = 900;
const H = 675;

export default function Scratch({ onNext }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  const paint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#FF58C7");
    g.addColorStop(0.55, "#77BEF8");
    g.addColorStop(1, "#FFFFFF");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    for (let i = 0; i < 900; i += 1) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      ctx.fillRect(x, y, 2, 2);
    }
    ctx.fillStyle = "rgba(17,17,17,0.55)";
    ctx.font = "italic 44px 'Instrument Serif', serif";
    ctx.textAlign = "center";
    ctx.fillText("scratch me", W / 2, H / 2 - 8);
    ctx.font = "500 16px 'Work Sans', sans-serif";
    ctx.fillText("drag your finger across the card", W / 2, H / 2 + 34);
  };

  useEffect(() => {
    paint();
    setRevealed(false);
    setProgress(0);
  }, []);

  const check = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { data } = ctx.getImageData(0, 0, W, H);
    let clear = 0;
    for (let i = 3; i < data.length; i += 4 * 60) {
      if (data[i] < 24) clear += 1;
    }
    const ratio = clear / (data.length / (4 * 60));
    setProgress(Math.min(1, ratio));
    if (ratio > 0.5) setRevealed(true);
  };

  const scratchAt = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const point = "touches" in event && event.touches?.length ? event.touches[0] : event;
    const x = ((point.clientX - rect.left) / rect.width) * W;
    const y = ((point.clientY - rect.top) / rect.height) * H;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 52, 0, Math.PI * 2);
    ctx.fill();
  };

  const start = (e) => {
    drawing.current = true;
    scratchAt(e);
  };
  const move = (e) => {
    if (!drawing.current) return;
    scratchAt(e);
  };
  const end = () => {
    drawing.current = false;
    check();
  };

  const revealAll = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillRect(0, 0, W, H);
    setRevealed(true);
    setProgress(1);
  };

  const reset = () => {
    paint();
    setRevealed(false);
    setProgress(0);
  };

  return (
    <SceneFrame testid="scene-scratch">
      <div className="w-full max-w-3xl text-center">
        <Eyebrow>chapter 04 — scratch to remember</Eyebrow>
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
          {revealed ? "Shaant bhai × chanchal behen" : "There's a photo under here."}
        </h2>
        <p className="mt-3 text-sm" style={{ color: "var(--ink-soft)" }}>
          {revealed ? "the duo we are." : "Scratch the card to see who we were."}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="paper-card relative mx-auto mt-10 w-full max-w-xl overflow-hidden rounded-[18px] p-3"
        >
          <div className="relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: "4 / 3" }}>
            <img src={duo.url} alt="Two cousins laughing together as children" className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-left"
              style={{ background: "linear-gradient(0deg, rgba(17,17,17,.62), transparent)" }}
            >
              <p className="font-display text-xl italic text-white sm:text-2xl">Shaant bhai × chanchal behen</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">the duo we are</p>
            </div>
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              data-testid="scratch-canvas"
              onMouseDown={start}
              onMouseMove={move}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
              className="absolute inset-0 h-full w-full touch-none transition-opacity duration-700"
              style={{ opacity: revealed ? 0 : 1, cursor: "grab" }}
            />
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={revealAll}
            data-testid="scratch-reveal-button"
            className="flex items-center gap-2 rounded-full px-7 py-3 text-sm text-white"
            style={{ background: "var(--rose)" }}
          >
            <Sparkles size={14} /> reveal it for me
          </button>
          <button
            onClick={reset}
            data-testid="scratch-reset-button"
            className="flex items-center gap-2 rounded-full border px-6 py-3 text-sm"
            style={{ borderColor: "var(--glass-bd)", color: "var(--ink)" }}
          >
            <RotateCcw size={14} /> cover it again
          </button>
        </div>

        {!revealed && progress > 0 && (
          <p className="mt-4 text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--ink-soft)" }}>
            {Math.round(progress * 100)}% scratched
          </p>
        )}

        {revealed && <NextButton onClick={onNext} label="There's a letter for you" testid="scratch-next-button" />}
      </div>
    </SceneFrame>
  );
}
