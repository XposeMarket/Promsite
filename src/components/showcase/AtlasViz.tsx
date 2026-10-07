"use client";

import { motion } from "framer-motion";

const G = "#d6b75e";
const G2 = "rgba(214,183,94,.25)";
const BONE = "#f2ebdd";
const loop = { repeat: Infinity, repeatType: "loop" as const };
const box = "w-40 h-24";

/** Voice: live waveform bars around an orb. */
export function MiniVoice() {
  const bars = Array.from({ length: 14 });
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <motion.circle cx="80" cy="50" r="16" fill="none" stroke={G} animate={{ r: [16, 20, 16], opacity: [0.9, 0.5, 0.9] }} transition={{ duration: 2.2, ...loop }} />
      <circle cx="80" cy="50" r="9" fill={G} />
      {bars.map((_, i) => {
        const x = i < 7 ? 14 + i * 6 : 106 + (i - 7) * 6;
        return (
          <motion.rect key={i} x={x} width="3" rx="1.5" fill={G}
            animate={{ height: [6, 10 + ((i * 7) % 22), 6], y: [47, 45 - ((i * 7) % 22) / 2, 47] }}
            transition={{ duration: 0.9 + (i % 4) * 0.15, delay: i * 0.05, ...loop }} />
        );
      })}
    </svg>
  );
}

/** Prom Bot: roster of bots, one "active" and one "needs you". */
export function MiniPromBot() {
  const rows = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <rect x="8" y="8" width="52" height="84" rx="6" fill="none" stroke={G2} />
      {rows.map((i) => (
        <g key={i}>
          <rect x="14" y={16 + i * 19} width="10" height="10" rx="3" fill="none" stroke={G} />
          <rect x="28" y={19 + i * 19} width="24" height="3" rx="1.5" fill={G2} />
          {i === 1 && <motion.circle cx="54" cy={21 + i * 19} r="2.5" fill={G} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, ...loop }} />}
          {i === 2 && <circle cx="54" cy={21 + i * 19} r="2.5" fill="#e5484d" />}
        </g>
      ))}
      <rect x="68" y="8" width="84" height="84" rx="6" fill="none" stroke={G} opacity=".6" />
      <motion.rect x="76" y="20" height="8" rx="4" fill={G2} animate={{ width: [0, 52, 52] }} transition={{ duration: 3, ...loop }} />
      <motion.rect x="96" y="36" height="8" rx="4" fill={G} animate={{ width: [0, 0, 48] }} transition={{ duration: 3, times: [0, 0.4, 1], ...loop }} />
      <motion.rect x="76" y="52" height="8" rx="4" fill={G2} animate={{ width: [0, 0, 0, 40] }} transition={{ duration: 3, times: [0, 0.5, 0.7, 1], ...loop }} />
    </svg>
  );
}

/** Subagents: one orchestrator spawning parallel workers with progress. */
export function MiniSubagents() {
  const lanes = [22, 44, 66, 88];
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <circle cx="18" cy="55" r="9" fill="none" stroke={G} />
      <text x="18" y="58" fontSize="8" textAnchor="middle" fill={G}>P</text>
      {lanes.map((y, i) => (
        <g key={y}>
          <path d={`M27 55 C 45 55, 40 ${y - 8}, 56 ${y - 8}`} fill="none" stroke={G2} />
          <rect x="56" y={y - 12} width="96" height="8" rx="4" fill="none" stroke={G2} />
          <motion.rect x="57" y={y - 11} height="6" rx="3" fill={i === 3 ? "rgba(214,183,94,.5)" : G}
            animate={{ width: [0, 94 * (0.5 + i * 0.15), 94] }} transition={{ duration: 3 + i * 0.6, ...loop }} />
        </g>
      ))}
    </svg>
  );
}

/** Video engine: timeline with shots and a sweeping playhead. */
export function MiniVideo() {
  const clips = [[10, 34], [46, 30], [78, 40], [120, 30]];
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <rect x="8" y="8" width="144" height="50" rx="5" fill="none" stroke={G2} />
      <motion.polygon points="72,24 72,42 88,33" fill={G} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.6, ...loop }} />
      {clips.map(([x, w], i) => (
        <rect key={i} x={x} y="66" width={w - 3} height="10" rx="2" fill={i % 2 ? G2 : "rgba(214,183,94,.5)"} />
      ))}
      <rect x="10" y="80" width="140" height="6" rx="2" fill={G2} opacity=".6" />
      <motion.line y1="62" y2="90" stroke={BONE} strokeWidth="1.2" animate={{ x1: [10, 150], x2: [10, 150] }} transition={{ duration: 4, ease: "linear", repeat: Infinity }} />
    </svg>
  );
}

/** Image generation: frame resolving from noise into a shape. */
export function MiniImage() {
  const dots = Array.from({ length: 24 });
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <rect x="40" y="8" width="80" height="84" rx="6" fill="none" stroke={G} />
      {dots.map((_, i) => (
        <motion.rect key={i} x={46 + (i % 6) * 12} y={14 + Math.floor(i / 6) * 18} width="10" height="16" rx="1"
          fill={G} animate={{ opacity: [0.05 + (i % 5) * 0.12, (i % 7 < 3 ? 0.85 : 0.12), 0.05 + (i % 5) * 0.12] }}
          transition={{ duration: 3, delay: (i % 6) * 0.08, ...loop }} />
      ))}
    </svg>
  );
}

/** Games: a little platformer loop. */
export function MiniGame() {
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <rect x="8" y="8" width="144" height="84" rx="6" fill="none" stroke={G2} />
      <rect x="8" y="78" width="144" height="2" fill={G2} />
      <rect x="60" y="58" width="30" height="5" rx="2" fill={G2} />
      <rect x="104" y="44" width="30" height="5" rx="2" fill={G2} />
      <motion.circle cx="118" cy="34" r="3" fill={G} animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 3, times: [0, 0.75, 0.8, 1], ...loop }} />
      <motion.rect width="8" height="10" rx="2" fill={BONE}
        animate={{ x: [20, 46, 70, 92, 114, 114], y: [68, 50, 48, 38, 34, 34] }}
        transition={{ duration: 3, times: [0, 0.2, 0.4, 0.6, 0.75, 1], ...loop }} />
    </svg>
  );
}

/** Brain: Thought / Dream cycle, moon arc with sparks. */
export function MiniBrain() {
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <path d="M20 80 Q80 -10 140 80" fill="none" stroke={G2} strokeDasharray="3 4" />
      <motion.circle r="7" fill={G}
        animate={{ cx: [20, 50, 80, 110, 140], cy: [80, 42, 30, 42, 80] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }} />
      {[40, 70, 100, 125].map((x, i) => (
        <motion.circle key={x} cx={x} cy={86} r="2" fill={G}
          animate={{ opacity: [0, 1, 0], cy: [88, 70, 60] }} transition={{ duration: 2.4, delay: i * 0.6, ...loop }} />
      ))}
      <text x="80" y="96" fontSize="7" textAnchor="middle" fill={G} opacity=".7" letterSpacing="2">THOUGHT · DREAM</text>
    </svg>
  );
}

/** Skills: a stack of cards fanning, one pulled out. */
export function MiniSkills() {
  return (
    <svg viewBox="0 0 160 100" className={box}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect key={i} x={40 + i * 8} y={20 + i * 3} width="60" height="70" rx="5" fill="#0a0a09" stroke={G} opacity={0.3 + i * 0.15}
          animate={i === 4 ? { y: [32, 10, 10, 32], x: [72, 92, 92, 72] } : {}} transition={{ duration: 3.4, ...loop }} />
      ))}
      <motion.text fontSize="9" fill={G} animate={{ x: [80, 100, 100, 80], y: [52, 30, 30, 52] }} transition={{ duration: 3.4, ...loop }}>SKILL.md</motion.text>
    </svg>
  );
}

/** Connectors: hub with service spokes pulsing data. */
export function MiniConnect() {
  const spokes = Array.from({ length: 8 }).map((_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return [80 + Math.cos(a) * 40, 50 + Math.sin(a) * 34];
  });
  return (
    <svg viewBox="0 0 160 100" className={box}>
      {spokes.map(([x, y], i) => (
        <g key={i}>
          <line x1="80" y1="50" x2={x} y2={y} stroke={G2} />
          <circle cx={x} cy={y} r="5" fill="#0a0a09" stroke={G} />
          <motion.circle r="2" fill={G} animate={{ cx: [x, 80], cy: [y, 50], opacity: [0, 1, 0] }} transition={{ duration: 1.8, delay: i * 0.22, ...loop }} />
        </g>
      ))}
      <circle cx="80" cy="50" r="10" fill={G} />
    </svg>
  );
}

/** Code: diff lines appearing, green/red gutters, a commit dot. */
export function MiniCode() {
  const lines = [[70, 0], [50, 1], [86, 2], [40, 1], [64, 0], [56, 2]];
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <rect x="8" y="8" width="144" height="84" rx="6" fill="none" stroke={G2} />
      {lines.map(([w, k], i) => (
        <motion.g key={i} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 4, delay: i * 0.25, times: [0, 0.15, 0.85, 1], ...loop }}>
          <rect x="14" y={16 + i * 12} width="3" height="8" fill={k === 1 ? "#22a06b" : k === 2 ? "#e5484d" : G2} />
          <rect x="22" y={18 + i * 12} width={w} height="4" rx="2" fill={k === 0 ? G2 : G} opacity={k === 0 ? 1 : 0.8} />
        </motion.g>
      ))}
      <motion.circle cx="140" cy="80" r="5" fill={G} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: 4, times: [0, 0.9, 1], ...loop }} />
    </svg>
  );
}

/** In-chat visuals: a mini dashboard that redraws. */
export function MiniViz() {
  const pts = [70, 58, 62, 40, 46, 26, 30];
  const d = pts.map((y, i) => `${i ? "L" : "M"}${20 + i * 20} ${y}`).join(" ");
  return (
    <svg viewBox="0 0 160 100" className={box}>
      {[0, 1, 2].map((i) => <rect key={i} x={14 + i * 46} y="8" width="40" height="14" rx="3" fill="none" stroke={G2} />)}
      {[0, 1, 2].map((i) => <motion.rect key={i} x={18 + i * 46} y="13" height="4" rx="2" fill={G} animate={{ width: [4, 20 + i * 6, 4] }} transition={{ duration: 3, delay: i * 0.3, ...loop }} />)}
      <motion.path d={d} fill="none" stroke={G} strokeWidth="1.6" animate={{ pathLength: [0, 1, 1] }} transition={{ duration: 3, ...loop }} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={20 + i * 22} y="84" width="16" height="6" rx="1" fill={G} opacity={0.15 + i * 0.13} />)}
    </svg>
  );
}

/** Safety: shield with an approval check. */
export function MiniShield() {
  return (
    <svg viewBox="0 0 160 100" className={box}>
      <path d="M80 10 L112 22 L112 50 Q112 76 80 90 Q48 76 48 50 L48 22 Z" fill="none" stroke={G} />
      <motion.path d="M66 50 L77 61 L96 40" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 3, times: [0, 0.3, 0.85, 1], ...loop }} />
      <motion.circle cx="80" cy="50" r="40" fill="none" stroke={G2} animate={{ r: [30, 46], opacity: [0.6, 0] }} transition={{ duration: 2.4, ...loop }} />
    </svg>
  );
}

/** Live cards: stacked cards sliding through (weather, stock, map). */
export function MiniCards() {
  return (
    <svg viewBox="0 0 160 100" className={box}>
      {[0, 1, 2].map((i) => (
        <motion.g key={i} animate={{ x: [60, 0, 0, -60], opacity: [0, 1, 1, 0] }} transition={{ duration: 4.5, delay: i * 1.5, times: [0, 0.15, 0.7, 1], ...loop }}>
          <rect x="34" y="16" width="92" height="68" rx="8" fill="#0a0a09" stroke={G} />
          {i === 0 && <><circle cx="58" cy="44" r="10" fill={G} /><text x="80" y="50" fontSize="16" fill={BONE}>72°</text></>}
          {i === 1 && <><path d="M44 66 L60 54 L74 60 L92 38 L116 30" fill="none" stroke={G} strokeWidth="2" /><text x="44" y="32" fontSize="9" fill={G}>NVDA +3.8%</text></>}
          {i === 2 && <><path d="M80 30 Q92 30 92 42 Q92 52 80 66 Q68 52 68 42 Q68 30 80 30" fill={G} /><circle cx="80" cy="42" r="4" fill="#0a0a09" /></>}
        </motion.g>
      ))}
    </svg>
  );
}
