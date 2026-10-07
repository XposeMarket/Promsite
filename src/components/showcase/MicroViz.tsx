"use client";

import { motion } from "framer-motion";

const G = "#d6b75e";
const G2 = "rgba(214,183,94,.25)";
const loop = { repeat: Infinity, repeatType: "loop" as const };

/** Browser window with a cursor clicking a field. */
export function MiniBrowser() {
  return (
    <svg viewBox="0 0 160 100" className="w-40 h-24">
      <rect x="4" y="6" width="152" height="88" rx="8" fill="none" stroke={G2} />
      <line x1="4" y1="20" x2="156" y2="20" stroke={G2} />
      <circle cx="13" cy="13" r="2" fill={G2} /><circle cx="20" cy="13" r="2" fill={G2} />
      <rect x="18" y="32" width="70" height="6" rx="3" fill={G2} />
      <motion.rect x="18" y="46" width="124" height="12" rx="4" fill="none" stroke={G}
        animate={{ opacity: [0.3, 1, 1, 0.3] }} transition={{ duration: 3, ...loop }} />
      <motion.rect x="22" y="50" height="4" rx="2" fill={G}
        animate={{ width: [0, 0, 60, 60] }} transition={{ duration: 3, times: [0, 0.35, 0.7, 1], ...loop }} />
      <rect x="18" y="68" width="40" height="12" rx="6" fill={G} opacity=".85" />
      <motion.path d="M0 0 L0 12 L3.5 9 L6 14 L8 13 L5.5 8 L10 8 Z" fill="#f2ebdd"
        animate={{ x: [120, 60, 60, 36, 36], y: [80, 50, 50, 72, 72] }}
        transition={{ duration: 3, times: [0, 0.3, 0.7, 0.85, 1], ...loop }} />
    </svg>
  );
}

/** Memory: nodes connecting over time. */
export function MiniMemory() {
  const n = [[30, 50], [70, 22], [72, 78], [112, 46], [140, 20], [138, 80]];
  const e = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]];
  return (
    <svg viewBox="0 0 170 100" className="w-40 h-24">
      {e.map(([a, b], i) => (
        <motion.line key={i} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={G} strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0.2 }} animate={{ pathLength: [0, 1, 1], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, delay: i * 0.35, ...loop }} />
      ))}
      {n.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={i === 3 ? 6 : 4} fill={i === 3 ? G : "#0a0a09"} stroke={G}
          animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2.4, delay: i * 0.3, ...loop }} />
      ))}
    </svg>
  );
}

/** Teams: manager fanning out to three agents. */
export function MiniTeam() {
  const kids = [30, 80, 130];
  return (
    <svg viewBox="0 0 160 100" className="w-40 h-24">
      <circle cx="80" cy="18" r="9" fill="none" stroke={G} />
      <text x="80" y="21" fontSize="8" textAnchor="middle" fill={G}>M</text>
      {kids.map((x, i) => (
        <g key={x}>
          <line x1="80" y1="27" x2={x} y2="66" stroke={G2} />
          <motion.circle r="2.5" fill={G}
            animate={{ cx: [80, x], cy: [27, 66], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, delay: i * 0.5, ...loop }} />
          <rect x={x - 16} y="66" width="32" height="18" rx="5" fill="none" stroke={G} opacity=".7" />
          <motion.rect x={x - 12} y="77" height="3" rx="1.5" fill={G}
            animate={{ width: [0, 24] }} transition={{ duration: 2.2, delay: 0.6 + i * 0.5, ...loop }} />
        </g>
      ))}
    </svg>
  );
}

/** Schedule: clock hand sweeping, ticks lighting. */
export function MiniSchedule() {
  return (
    <svg viewBox="0 0 160 100" className="w-40 h-24">
      <circle cx="80" cy="50" r="38" fill="none" stroke={G2} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <motion.line key={i} x1={80 + Math.sin(a) * 32} y1={50 - Math.cos(a) * 32} x2={80 + Math.sin(a) * 37} y2={50 - Math.cos(a) * 37}
            stroke={G} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 6, delay: (i / 12) * 6, ...loop }} />
        );
      })}
      <motion.line x1="80" y1="50" x2="80" y2="20" stroke={G} strokeWidth="1.5" style={{ originX: "80px", originY: "50px" }}
        animate={{ rotate: 360 }} transition={{ duration: 6, ease: "linear", repeat: Infinity }} />
      <circle cx="80" cy="50" r="3" fill={G} />
    </svg>
  );
}

/** Files: documents stacking. */
export function MiniFiles() {
  return (
    <svg viewBox="0 0 160 100" className="w-40 h-24">
      {[0, 1, 2].map((i) => (
        <motion.g key={i} animate={{ y: [20, 0, 0, -6], opacity: [0, 1, 1, 0.6] }} transition={{ duration: 3.6, delay: i * 0.5, ...loop }}>
          <rect x={46 + i * 14} y={18 + i * 8} width="50" height="62" rx="5" fill="#0a0a09" stroke={G} opacity={0.5 + i * 0.25} />
          <rect x={54 + i * 14} y={32 + i * 8} width="30" height="3" rx="1.5" fill={G2} />
          <rect x={54 + i * 14} y={40 + i * 8} width="24" height="3" rx="1.5" fill={G2} />
        </motion.g>
      ))}
    </svg>
  );
}

/** Create: bars growing into a chart. */
export function MiniChart() {
  const h = [22, 38, 30, 54, 46, 70];
  return (
    <svg viewBox="0 0 160 100" className="w-40 h-24">
      <line x1="14" y1="88" x2="150" y2="88" stroke={G2} />
      {h.map((v, i) => (
        <motion.rect key={i} x={20 + i * 22} width="14" rx="2" fill={i === 5 ? G : "rgba(214,183,94,.45)"}
          animate={{ height: [0, v, v], y: [88, 88 - v, 88 - v] }} transition={{ duration: 3.2, delay: i * 0.12, ...loop }} />
      ))}
    </svg>
  );
}

/** Desktop: windows and a cursor. */
export function MiniDesktop() {
  return (
    <svg viewBox="0 0 160 100" className="w-40 h-24">
      <rect x="10" y="10" width="140" height="74" rx="6" fill="none" stroke={G2} />
      <rect x="62" y="86" width="36" height="6" rx="2" fill={G2} />
      <motion.rect x="22" y="20" width="60" height="40" rx="4" fill="#0a0a09" stroke={G} animate={{ x: [22, 30, 22] }} transition={{ duration: 4, ...loop }} />
      <rect x="76" y="34" width="62" height="40" rx="4" fill="#0a0a09" stroke={G} opacity=".6" />
      <motion.path d="M0 0 L0 12 L3.5 9 L6 14 L8 13 L5.5 8 L10 8 Z" fill="#f2ebdd"
        animate={{ x: [120, 50, 50, 100], y: [70, 30, 30, 50] }} transition={{ duration: 4, ...loop }} />
    </svg>
  );
}

/** Connected surfaces: phone, desktop, Telegram dots linked. */
export function MiniAnywhere() {
  return (
    <svg viewBox="0 0 160 100" className="w-40 h-24">
      <rect x="14" y="26" width="22" height="40" rx="5" fill="none" stroke={G} />
      <rect x="60" y="20" width="44" height="32" rx="4" fill="none" stroke={G} />
      <rect x="74" y="54" width="16" height="4" fill={G2} />
      <circle cx="136" cy="46" r="12" fill="none" stroke={G} />
      {[[36, 46, 60, 36], [104, 36, 124, 46]].map(([a, b, c, d], i) => (
        <g key={i}>
          <line x1={a} y1={b} x2={c} y2={d} stroke={G2} strokeDasharray="2 3" />
          <motion.circle r="2.5" fill={G} animate={{ cx: [a, c, a], cy: [b, d, b] }} transition={{ duration: 2.4, delay: i * 0.6, ...loop }} />
        </g>
      ))}
    </svg>
  );
}
