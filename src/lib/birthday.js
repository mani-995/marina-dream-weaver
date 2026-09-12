export const BIRTH_DATE = new Date(2004, 8, 29);
export const NAME = "Dipuuui";

export function nextBirthday(from = new Date()) {
  const y = from.getFullYear();
  let d = new Date(y, 8, 29, 0, 0, 0);
  if (d.getTime() < from.getTime()) d = new Date(y + 1, 8, 29, 0, 0, 0);
  return d;
}

export function turningAge(from = new Date()) {
  return nextBirthday(from).getFullYear() - 2004;
}

export function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function timeLeft(from = new Date()) {
  const diff = Math.max(0, nextBirthday(from) - from);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export const PALETTES = [
  { id: "rose", label: "Rose", p1: "#f472b6", p2: "#fff1f7", p3: "#c084fc" },
  { id: "lavender", label: "Lavender", p1: "#c084fc", p2: "#f5f0ff", p3: "#818cf8" },
  { id: "gold", label: "Sunflower", p1: "#facc15", p2: "#fffaeb", p3: "#fb923c" },
  { id: "mint", label: "Mint", p1: "#34d399", p2: "#effdf6", p3: "#22d3ee" },
  { id: "coral", label: "Coral", p1: "#fb7185", p2: "#fff1f2", p3: "#fdba74" },
];
