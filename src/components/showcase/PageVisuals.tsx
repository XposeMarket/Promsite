"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MiniBrowser, MiniMemory, MiniTeam, MiniSchedule, MiniFiles, MiniChart } from "@/components/showcase/MicroViz";

const G = "#d6b75e";
const G2 = "rgba(214,183,94,.28)";
const serif = { fontFamily: "var(--font-display), Georgia, serif" };
const ease = [0.16, 1, 0.3, 1] as const;

/** Shared luxury page hero: kicker, serif headline, one gold-italic line, gold rule. */
export function LuxHero({
  kicker,
  title,
  accent,
  sub,
  children,
  align = "center",
}: {
  kicker: string;
  title: string;
  accent?: string;
  sub?: string;
  children?: React.ReactNode;
  align?: "center" | "left";
}) {
  const c = align === "center";
  return (
    <section className="relative pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,183,94,0.09)_0%,transparent_62%)]" />
      <div className={`relative mx-auto max-w-5xl px-6 lg:px-8 ${c ? "text-center" : ""}`}>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="kicker mb-6">
          {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.02]"
        >
          {title}
          {accent && (
            <>
              <br />
              <em className="text-gold-metal italic pr-2">{accent}</em>
            </>
          )}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          className={`h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent my-8 ${c ? "mx-auto" : "origin-left"}`}
        />
        {sub && <p className={`text-lg text-muted max-w-xl leading-relaxed ${c ? "mx-auto" : ""}`}>{sub}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ About */

const DO_STEPS = ["Searched 14 sources", "Opened 5 pricing pages", "Built pricing-oct.xlsx", "Scheduled a re-check for Nov 7"];

/** Side by side: a chatbot's advice vs Prometheus actually doing it. Loops. */
export function TalkVsDo() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= DO_STEPS.length + 3 ? 0 : v + 1)), 900);
    return () => clearInterval(id);
  }, []);
  const ask = "Find my 5 competitors and what they charge.";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="panel-quiet p-6 md:p-7 flex flex-col">
        <p className="kicker mb-5 !text-muted">A chatbot</p>
        <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-white/5 px-4 py-2.5 text-sm">{ask}</div>
        <div className="mt-4 max-w-[90%] rounded-2xl rounded-bl-sm border border-white/10 px-4 py-3 text-sm text-muted leading-relaxed">
          Great question! Here&apos;s how you could approach it:
          <br />1. Search Google for competitors
          <br />2. Visit each pricing page
          <br />3. Put it in a spreadsheet
        </div>
        <p className="mt-auto pt-8 text-2xl text-muted/70" style={serif}>
          You still do the work.
        </p>
      </div>
      <div className="panel p-6 md:p-7 flex flex-col">
        <p className="kicker mb-5">Prometheus</p>
        <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-gold/10 border border-gold/20 px-4 py-2.5 text-sm">{ask}</div>
        <ul className="mt-5 space-y-3 font-mono text-[13px]">
          {DO_STEPS.map((s, i) => {
            const done = n > i;
            const run = n === i;
            return (
              <li key={s} className={`flex items-center gap-3 transition-colors duration-500 ${done ? "text-foreground" : "text-muted/40"}`}>
                <span
                  className={`h-4 w-4 rounded-full border flex items-center justify-center text-[9px] transition-all duration-500 ${
                    done ? "bg-gold border-gold text-black" : run ? "border-gold animate-pulse" : "border-white/15"
                  }`}
                >
                  {done ? "✓" : ""}
                </span>
                {s}
              </li>
            );
          })}
        </ul>
        <motion.p
          animate={{ opacity: n > DO_STEPS.length ? 1 : 0, y: n > DO_STEPS.length ? 0 : 8 }}
          transition={{ duration: 0.6 }}
          className="mt-auto pt-8 text-2xl"
          style={serif}
        >
          Done. <em className="text-gold-metal italic">It&apos;s in your Downloads.</em>
        </motion.p>
      </div>
    </div>
  );
}

/** Large numbered serif statements that reveal on scroll. */
export function Beliefs({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {items.map((b, i) => (
        <motion.li
          key={b}
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: i * 0.06, ease }}
          className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr] items-baseline py-7 md:py-9"
        >
          <span className="font-mono text-sm text-gold/70">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-2xl md:text-4xl leading-snug transition-colors group-hover:text-gold" style={serif}>
            {b}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}

/** The myth as a mark: a spark carried from the outer ring down into your hands. */
export function FireMark() {
  return (
    <svg viewBox="0 0 220 220" className="w-56 h-56 md:w-64 md:h-64">
      <defs>
        <radialGradient id="fm-glow">
          <stop offset="0%" stopColor={G} stopOpacity=".45" />
          <stop offset="100%" stopColor={G} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="100" fill="url(#fm-glow)" opacity=".35" />
      <motion.circle cx="110" cy="110" r="88" fill="none" stroke={G2} strokeDasharray="2 6"
        animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ originX: "110px", originY: "110px" }} />
      <circle cx="110" cy="110" r="62" fill="none" stroke={G} strokeOpacity=".7" />
      <circle cx="110" cy="110" r="36" fill="none" stroke={G2} />
      <motion.circle r="4" fill={G}
        animate={{ cx: [110, 110, 110], cy: [22, 74, 110], opacity: [0, 1, 1], r: [2, 4, 7] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }} />
      <motion.circle cx="110" cy="110" fill="none" stroke={G}
        animate={{ r: [8, 60], opacity: [0.7, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, delay: 2.6, repeatDelay: 2.2 }} />
    </svg>
  );
}

/* --------------------------------------------------- Security / local-first */

/** Architecture diagram: everything inside your machine, one narrow line out to the model you chose. */
export function BoundaryDiagram() {
  const inner = [
    { x: 110, y: 90, l: "Files" },
    { x: 110, y: 250, l: "Memory" },
    { x: 330, y: 70, l: "Browser" },
    { x: 330, y: 270, l: "Audit log" },
  ];
  const flow = { animate: { strokeDashoffset: [0, -24] }, transition: { duration: 1.2, repeat: Infinity, ease: "linear" as const } };
  return (
    <div className="panel p-4 md:p-6">
      <svg viewBox="0 0 640 340" className="w-full h-auto">
        <rect x="20" y="20" width="420" height="300" rx="22" fill="rgba(214,183,94,.03)" stroke={G} strokeOpacity=".55" strokeDasharray="6 6" />
        <text x="40" y="48" fill={G} fontSize="11" letterSpacing="3" fontFamily="ui-monospace,monospace">YOUR MACHINE</text>
        {inner.map((n) => (
          <motion.line key={n.l} x1="230" y1="170" x2={n.x} y2={n.y} stroke={G} strokeOpacity=".55" strokeDasharray="4 8" {...flow} />
        ))}
        {inner.map((n) => (
          <g key={n.l + "n"}>
            <rect x={n.x - 46} y={n.y - 16} width="92" height="32" rx="16" fill="#0b0a08" stroke={G2} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#e9e1d1" fontSize="12">{n.l}</text>
          </g>
        ))}
        <circle cx="230" cy="170" r="40" fill="#0b0a08" stroke={G} />
        <motion.circle cx="230" cy="170" fill="none" stroke={G} animate={{ r: [40, 64], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity }} />
        <text x="230" y="166" textAnchor="middle" fill={G} fontSize="13" style={serif}>Prometheus</text>
        <text x="230" y="184" textAnchor="middle" fill="#8f877a" fontSize="10">gateway</text>
        {/* out to model API */}
        <motion.line x1="270" y1="170" x2="520" y2="120" stroke={G} strokeDasharray="4 8" {...flow} />
        <rect x="470" y="96" width="150" height="48" rx="12" fill="#0b0a08" stroke={G2} />
        <text x="545" y="116" textAnchor="middle" fill="#e9e1d1" fontSize="12">Model you chose</text>
        <text x="545" y="132" textAnchor="middle" fill="#8f877a" fontSize="10">your key · prompts only</text>
        {/* phone tunnel */}
        <motion.line x1="270" y1="180" x2="520" y2="250" stroke={G} strokeOpacity=".6" strokeDasharray="4 8" {...flow} />
        <rect x="470" y="228" width="150" height="48" rx="12" fill="#0b0a08" stroke={G2} />
        <text x="545" y="248" textAnchor="middle" fill="#e9e1d1" fontSize="12">Your phone</text>
        <text x="545" y="264" textAnchor="middle" fill="#8f877a" fontSize="10">private tunnel</text>
        {/* no relay */}
        <g opacity=".55">
          <rect x="470" y="22" width="150" height="40" rx="12" fill="none" stroke="#8f877a" strokeDasharray="3 4" />
          <text x="545" y="46" textAnchor="middle" fill="#8f877a" fontSize="12">Our servers</text>
          <motion.line x1="478" y1="42" x2="612" y2="42" stroke="#c9564b" strokeWidth="1.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} />
        </g>
        <text x="545" y="80" textAnchor="middle" fill="#8f877a" fontSize="10">no relay · no telemetry</text>
      </svg>
    </div>
  );
}

const AUDIT = [
  ['browser_open', 'competitor-a.com/pricing', 'ok'],
  ['extract_table', '3 plans', 'ok'],
  ['file_write', 'Downloads/pricing-oct.xlsx', 'ok'],
  ['memory_write', 'pricing baseline', 'ok'],
  ['email_send', 'needs approval', 'held'],
  ['schedule_create', 'Nov 7 · 08:00', 'ok'],
  ['desktop_click', 'not granted', 'blocked'],
  ['web_search', '"competitor b pricing"', 'ok'],
];

/** Scrolling local audit log, the way it is written on disk. */
export function AuditTicker() {
  const [i, setI] = useState(4);
  useEffect(() => {
    const id = setInterval(() => setI((v) => v + 1), 1400);
    return () => clearInterval(id);
  }, []);
  const rows = Array.from({ length: 6 }, (_, k) => {
    const idx = i - 5 + k;
    const r = AUDIT[((idx % AUDIT.length) + AUDIT.length) % AUDIT.length];
    const s = 2 + ((idx * 7) % 50);
    return { key: idx, t: `09:14:${String(s).padStart(2, "0")}`, tool: r[0], arg: r[1], st: r[2] };
  });
  const tone = (s: string) => (s === "ok" ? "text-gold" : s === "held" ? "text-amber-300" : "text-red-400");
  return (
    <div className="frame-window">
      <div className="bar">
        <i /><i /><i />
        <span className="ml-3 font-mono text-[11px] text-muted">~/.prometheus/audit/2026-10-07.jsonl</span>
      </div>
      <div className="p-4 md:p-5 font-mono text-[11.5px] md:text-[12.5px] leading-6 min-h-[180px] overflow-hidden">
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.div key={r.key} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex gap-3 whitespace-nowrap overflow-hidden">
              <span className="text-muted/50">{r.t}</span>
              <span className="text-foreground/90 w-[9.5rem] shrink-0 truncate">{r.tool}</span>
              <span className="text-muted truncate flex-1">{r.arg}</span>
              <span className={tone(r.st)}>{r.st}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** "What we don't do": each phrase gets struck through as it scrolls in. */
export function StrikeList({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((t, i) => (
        <div key={t} className="panel-quiet px-5 py-5">
          <span className="relative inline-block text-xl text-muted" style={serif}>
            {t}
            <motion.span
              className="absolute left-0 top-1/2 h-[1.5px] w-full bg-gold origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Compact principle cards: big serif title, one line. */
export function Principles({ items }: { items: { t: string; l: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
      {items.map((p, i) => (
        <div key={p.t} className="bg-background p-7 group">
          <span className="font-mono text-xs text-gold/60">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 text-2xl group-hover:text-gold transition-colors" style={serif}>{p.t}</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">{p.l}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Compare */

type Val = boolean | string;
export type CompareRow = { name: string; prometheus: Val; chatgpt: Val; claude: Val };
const score = (v: Val) => (v === true ? 1 : v === false ? 0 : 0.5);

function Dot({ v }: { v: Val }) {
  if (v === true) return <span className="inline-block h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_rgba(214,183,94,.5)]" title="Yes" />;
  if (v === false) return <span className="inline-block h-px w-3 bg-white/20" title="No" />;
  return (
    <span className="inline-flex items-center gap-1.5" title={String(v)}>
      <span className="inline-block h-3 w-3 rounded-full border border-gold/60 bg-[linear-gradient(90deg,rgba(214,183,94,.6)_50%,transparent_50%)]" />
      <span className="hidden sm:inline text-[11px] text-muted">{v}</span>
    </span>
  );
}

/** Scoreboard bars + dot matrix. */
export function CompareBoard({ rows }: { rows: CompareRow[] }) {
  const cols = [
    { k: "prometheus" as const, l: "Prometheus" },
    { k: "chatgpt" as const, l: "ChatGPT" },
    { k: "claude" as const, l: "Claude" },
  ];
  const max = rows.length;
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {cols.map((c, ci) => {
          const s = rows.reduce((a, r) => a + score(r[c.k]), 0);
          return (
            <div key={c.k} className={`${ci === 0 ? "panel" : "panel-quiet"} p-4 md:p-6`}>
              <p className={`text-xs md:text-sm ${ci === 0 ? "text-gold" : "text-muted"}`}>{c.l}</p>
              <p className="mt-2 text-4xl md:text-6xl" style={serif}>
                {s % 1 ? s.toFixed(1) : s}
                <span className="text-base md:text-xl text-muted">/{max}</span>
              </p>
              <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className={`h-full ${ci === 0 ? "bg-gold" : "bg-white/30"}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(s / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, delay: 0.15 * ci, ease }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[1fr_4.5rem_4.5rem_4.5rem] sm:grid-cols-[1fr_8rem_8rem_8rem] px-4 md:px-6 py-3 border-b border-white/[0.06] text-xs">
          <span className="text-muted">Capability</span>
          {cols.map((c, ci) => (
            <span key={c.k} className={`text-center ${ci === 0 ? "text-gold" : "text-muted"}`}>{c.l}</span>
          ))}
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ x: -10 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`grid grid-cols-[1fr_4.5rem_4.5rem_4.5rem] sm:grid-cols-[1fr_8rem_8rem_8rem] items-center px-4 md:px-6 py-3.5 border-b border-white/[0.04] last:border-0 transition-colors ${
              hover === i ? "bg-gold/[0.05]" : ""
            }`}
          >
            <span className="text-sm text-foreground/90">{r.name}</span>
            {cols.map((c) => (
              <span key={c.k} className="flex justify-center">
                <Dot v={r[c.k]} />
              </span>
            ))}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 text-xs text-muted">
        <span className="flex items-center gap-2"><Dot v={true} /> Built in</span>
        <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full border border-gold/60 bg-[linear-gradient(90deg,rgba(214,183,94,.6)_50%,transparent_50%)]" /> Partial</span>
        <span className="flex items-center gap-2"><Dot v={false} /> Not available</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Use cases */

export type UseCase = { title: string; line: string; caps: string[]; steps: string[]; viz: "browser" | "files" | "memory" | "team" | "chart" | "schedule" };
const VIZ = { browser: MiniBrowser, files: MiniFiles, memory: MiniMemory, team: MiniTeam, chart: MiniChart, schedule: MiniSchedule };

/** Picker: list on the left, a living run of the selected workflow on the right. Auto-cycles until touched. */
export function UseCasePicker({ cases }: { cases: UseCase[] }) {
  const [a, setA] = useState(0);
  const [auto, setAuto] = useState(true);
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    const id = setInterval(() => setStep((s) => s + 1), 800);
    return () => clearInterval(id);
  }, [a]);
  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => setA((v) => (v + 1) % cases.length), 5200);
    return () => clearTimeout(id);
  }, [a, auto, cases.length]);
  const c = cases[a];
  const V = VIZ[c.viz];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-10">
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-6 px-6 lg:mx-0 lg:px-0 pb-2 lg:pb-0">
        {cases.map((u, i) => (
          <button
            key={u.title}
            onClick={() => { setA(i); setAuto(false); }}
            className={`shrink-0 text-left rounded-xl px-5 py-4 border transition-all ${
              i === a ? "border-gold/50 bg-gold/[0.06]" : "border-white/[0.06] hover:border-gold/25"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={`font-mono text-xs ${i === a ? "text-gold" : "text-muted/60"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className={`text-lg md:text-xl whitespace-nowrap ${i === a ? "text-foreground" : "text-muted"}`} style={serif}>{u.title}</span>
            </span>
            {i === a && auto && (
              <motion.span key={"bar" + a} className="block mt-3 h-px bg-gold origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5.2, ease: "linear" }} />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={a} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }}
          className="panel p-6 md:p-8 flex flex-col">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl" style={serif}>{c.title}</h3>
              <p className="mt-3 text-muted leading-relaxed max-w-md">{c.line}</p>
            </div>
            <div className="hidden sm:block shrink-0 opacity-90"><V /></div>
          </div>
          <ul className="mt-8 space-y-3 font-mono text-[13px]">
            {c.steps.map((s, i) => {
              const done = step > i;
              return (
                <li key={s} className={`flex items-center gap-3 transition-colors duration-500 ${done ? "text-foreground" : step === i ? "text-gold" : "text-muted/40"}`}>
                  <span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[9px] ${done ? "bg-gold border-gold text-black" : step === i ? "border-gold animate-pulse" : "border-white/15"}`}>{done ? "✓" : ""}</span>
                  {s}
                </li>
              );
            })}
          </ul>
          <div className="mt-auto pt-8 flex flex-wrap gap-2">
            {c.caps.map((k) => (
              <span key={k} className="text-xs px-3 py-1 rounded-full border border-gold/20 text-gold/80">{k}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------------------------------------- Download */

/** Three install steps with a drawing connector. */
export function InstallSteps({ steps }: { steps: { t: string; l: string }[] }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div className="absolute hidden md:block left-[16%] right-[16%] top-[22px] h-px bg-gold/50 origin-left"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} />
      {steps.map((s, i) => (
        <motion.div key={s.t} className="relative text-center"
          initial={{ y: 14 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0 }} transition={{ duration: 0.6, delay: 0.25 * i }}>
          <span className="relative z-10 mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-background text-gold text-sm">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 text-2xl" style={serif}>{s.t}</h3>
          <p className="mt-1 text-sm text-muted">{s.l}</p>
        </motion.div>
      ))}
    </div>
  );
}

/** Spec tiles: label + big value. */
export function SpecTiles({ items }: { items: { k: string; v: string; n?: string }[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((s) => (
        <div key={s.k} className="panel-quiet p-5">
          <p className="kicker !text-[10px] !tracking-[0.25em]">{s.k}</p>
          <p className="mt-3 text-2xl md:text-3xl" style={serif}>{s.v}</p>
          {s.n && <p className="mt-1 text-xs text-muted">{s.n}</p>}
        </div>
      ))}
    </div>
  );
}
