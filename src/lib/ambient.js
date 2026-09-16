// Generative music-box ambience — soft pentatonic plucks over a slow pad.
// No audio files; everything is synthesized with Web Audio.

const SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];
const BASS = [130.81, 164.81, 196.0, 220.0];

let ctx = null;
let master = null;
let timer = null;
let step = 0;
let melodyIndex = 3;

function pluck(time, freq, vol, decay = 2.2) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;

  const shimmer = ctx.createOscillator();
  const shimmerGain = ctx.createGain();
  shimmer.type = "sine";
  shimmer.frequency.value = freq * 2;
  shimmerGain.gain.value = vol * 0.22;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

  osc.connect(gain);
  shimmer.connect(shimmerGain);
  shimmerGain.connect(gain);
  gain.connect(master);

  osc.start(time);
  shimmer.start(time);
  osc.stop(time + decay + 0.1);
  shimmer.stop(time + decay + 0.1);
}

function pad(time, freq) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.05, time + 2.4);
  gain.gain.linearRampToValueAtTime(0.0001, time + 6.5);
  osc.connect(gain);
  gain.connect(master);
  osc.start(time);
  osc.stop(time + 6.6);
}

function tick() {
  if (!ctx) return;
  const t = ctx.currentTime + 0.06;

  // Slow random-walk melody with occasional rests
  if (Math.random() > 0.22) {
    melodyIndex += Math.floor(Math.random() * 5) - 2;
    melodyIndex = Math.max(0, Math.min(SCALE.length - 1, melodyIndex));
    pluck(t, SCALE[melodyIndex], 0.16);
  }
  // Sparse sparkle an octave up
  if (Math.random() > 0.86) pluck(t + 0.18, SCALE[melodyIndex] * 2, 0.05, 1.4);
  // Warm bass pad every 8 steps
  if (step % 8 === 0) pad(t, BASS[(step / 8) % BASS.length]);

  step += 1;
}

export function startMusic() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;

    // Gentle feedback delay for a dreamy tail
    const delay = ctx.createDelay(1.2);
    delay.delayTime.value = 0.42;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.32;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    master.connect(ctx.destination);
    master.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(ctx.destination);
  }
  ctx.resume();
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(0.5, ctx.currentTime, 0.8);
  if (!timer) {
    step = 0;
    timer = window.setInterval(tick, 460);
  }
}

export function stopMusic() {
  if (!ctx || !master) return;
  master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
  if (timer) {
    window.clearInterval(timer);
    timer = null;
  }
}
