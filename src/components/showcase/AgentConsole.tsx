"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export interface ConsoleStep {
  tool: string;
  detail: string;
  ms: number;
}
export interface ConsoleScript {
  id: string;
  label: string;
  prompt: string;
  steps: ConsoleStep[];
  result: { title: string; lines: string[] };
}

export const SCRIPTS: Record<string, ConsoleScript> = {
  research: {
    id: "research",
    label: "Research",
    prompt: "Price-check the top 5 competitors and drop it in a sheet.",
    steps: [
      { tool: "web_search", detail: "5 queries in parallel", ms: 820 },
      { tool: "browser.open", detail: "competitor pricing pages", ms: 1400 },
      { tool: "browser.extract", detail: "plans, prices, limits", ms: 900 },
      { tool: "files.write", detail: "pricing-oct.xlsx", ms: 500 },
      { tool: "memory.write", detail: "\"track competitor pricing monthly\"", ms: 400 },
    ],
    result: { title: "pricing-oct.xlsx", lines: ["5 competitors · 17 plans", "You're 22% under median", "Re-check scheduled for Nov 7"] },
  },
  browser: {
    id: "browser",
    label: "Browser",
    prompt: "Log my DoorDash week into the income ledger.",
    steps: [
      { tool: "browser.session", detail: "your Chrome profile, already signed in", ms: 900 },
      { tool: "browser.navigate", detail: "Earnings → This week", ms: 1100 },
      { tool: "browser.extract", detail: "38 deliveries, 21.4 active hrs", ms: 900 },
      { tool: "files.append", detail: "ledger.csv", ms: 450 },
    ],
    result: { title: "Week 40 logged", lines: ["$612 earned · $28.60/active hr", "Gas est. $71", "Net retained ↑ 9% vs last week"] },
  },
  team: {
    id: "team",
    label: "Teams",
    prompt: "Audit the repo for dead code. Use a team.",
    steps: [
      { tool: "team.create", detail: "planner · builder · reviewer", ms: 900 },
      { tool: "planner", detail: "split into 6 scoped tasks", ms: 1000 },
      { tool: "builder ×3", detail: "running in background", ms: 1500 },
      { tool: "reviewer", detail: "verified 41 removals, 0 regressions", ms: 1000 },
      { tool: "git.pr", detail: "opened PR #557", ms: 500 },
    ],
    result: { title: "PR #557 ready", lines: ["−3,412 lines · 41 files", "tsc + 40 checks green", "Waiting for your review"] },
  },
  schedule: {
    id: "schedule",
    label: "Scheduled",
    prompt: "Every weekday at 8am, brief me on my markets.",
    steps: [
      { tool: "schedule.create", detail: "cron 0 8 * * 1-5", ms: 700 },
      { tool: "markets.quote", detail: "NVDA · SPY · QQQ · TSLA", ms: 900 },
      { tool: "news.search", detail: "overnight catalysts", ms: 1000 },
      { tool: "deliver", detail: "phone + Telegram", ms: 500 },
    ],
    result: { title: "Morning brief armed", lines: ["Next run: tomorrow 8:00 AM", "Delivered to your phone", "Runs on your machine, on schedule"] },
  },
  voice: {
    id: "voice",
    label: "Voice",
    prompt: "(spoken) Hey Prom, rename these screenshots by date and zip them.",
    steps: [
      { tool: "voice.realtime", detail: "heard you, handing to the worker", ms: 800 },
      { tool: "workspace_read", detail: "Desktop/screens · 64 files", ms: 700 },
      { tool: "workspace_edit", detail: "renamed 64 → 2026-10-07_###.png", ms: 1100 },
      { tool: "workspace_run", detail: "zip → screens-oct.zip", ms: 600 },
    ],
    result: { title: "Done, out loud", lines: ["\"64 renamed and zipped. It's on your Desktop.\"", "Worker-confirmed, not narrated", "Hands never left the coffee"] },
  },
  video: {
    id: "video",
    label: "Video",
    prompt: "Turn this reel into a 10s GRWM with my character.",
    steps: [
      { tool: "video_project.breakdown", detail: "3 parts · speeds planned", ms: 900 },
      { tool: "generate_image", detail: "matched start frames", ms: 1100 },
      { tool: "estimate", detail: "$5.59 of $6.00 cap · approve?", ms: 900 },
      { tool: "kling-v3 motion", detail: "3 takes · auto-QA'd", ms: 1400 },
      { tool: "render", detail: "1080p · phone look", ms: 600 },
    ],
    result: { title: "grwm_v1.mp4", lines: ["9.6s · 720×1280", "Spend quoted before every run", "Defects flagged with timestamps"] },
  },
  prombot: {
    id: "prombot",
    label: "Prom Bot",
    prompt: "@Radar find today's AI launches. @Voice draft a reply.",
    steps: [
      { tool: "Radar", detail: "scanning X + web · 14 signals", ms: 1200 },
      { tool: "Strategist", detail: "ranked top 3 pitches", ms: 900 },
      { tool: "Voice", detail: "draft in your tone, no em dashes", ms: 900 },
      { tool: "approval", detail: "waiting for your tap to post", ms: 600 },
    ],
    result: { title: "3 drafts ready", lines: ["Each bot kept its own memory", "Nothing posted without you", "Roster shows who needs you"] },
  },
  create: {
    id: "create",
    label: "Create",
    prompt: "Make a 30s promo of what we shipped today.",
    steps: [
      { tool: "browser.capture", detail: "real renders, 3 skins", ms: 1000 },
      { tool: "hyperframes", detail: "8 scenes · kinetic type", ms: 1200 },
      { tool: "score", detail: "original audio, cut-synced", ms: 900 },
      { tool: "render", detail: "1080p30 · frame QA", ms: 800 },
    ],
    result: { title: "promo.mp4", lines: ["33s · black & gold", "$0: rendered from code", "Edit any scene, re-render in 2 min"] },
  },
};

type Phase = "typing" | "running" | "done";

export function AgentConsole({
  scripts = ["research", "browser", "team", "schedule"],
  className = "",
}: {
  scripts?: string[];
  className?: string;
}) {
  const list = scripts.map((s) => SCRIPTS[s]).filter(Boolean);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [stepN, setStepN] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [auto, setAuto] = useState(true);
  const s = list[idx];

  // restart when switching script
  useEffect(() => {
    setTyped(0);
    setStepN(0);
    setPhase("typing");
  }, [idx]);

  useEffect(() => {
    if (!inView || !s) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed < s.prompt.length) t = setTimeout(() => setTyped((n) => n + 1), 22);
      else t = setTimeout(() => setPhase("running"), 350);
    } else if (phase === "running") {
      if (stepN < s.steps.length) t = setTimeout(() => setStepN((n) => n + 1), s.steps[stepN].ms * 0.7);
      else t = setTimeout(() => setPhase("done"), 300);
    } else if (auto) {
      t = setTimeout(() => setIdx((i) => (i + 1) % list.length), 3600);
    }
    return () => clearTimeout(t);
  }, [inView, phase, typed, stepN, s, auto, list.length]);

  if (!s) return null;

  return (
    <div ref={ref} className={`frame-window ${className}`}>
      <div className="bar">
        <i /> <i /> <i />
        <span className="ml-3 kicker !text-[0.6rem] !tracking-[0.24em] !text-muted/70">Prometheus · live run</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted">
          <span className={`h-1.5 w-1.5 rounded-full ${phase === "done" ? "bg-gold" : "bg-gold animate-pulse"}`} />
          {phase === "done" ? "Done" : "Working"}
        </span>
      </div>

      {/* Script tabs */}
      <div className="flex gap-1 overflow-x-auto px-3 pt-3">
        {list.map((x, i) => (
          <button
            key={x.id}
            onClick={() => {
              setAuto(false);
              setIdx(i);
            }}
            className={`shrink-0 rounded-full px-3 py-1 text-xs transition-colors border ${
              i === idx ? "border-gold/60 text-gold" : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-5 min-h-[340px] font-mono text-[13px] leading-relaxed">
        {/* Prompt */}
        <div className="flex gap-3">
          <span className="text-gold select-none">›</span>
          <p className="text-foreground">
            {s.prompt.slice(0, typed)}
            {phase === "typing" && <span className="inline-block w-[7px] h-[15px] -mb-[2px] bg-gold/80 animate-pulse" />}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-4 space-y-2 border-l border-gold/15 pl-4 ml-[3px]">
          <AnimatePresence initial={false}>
            {s.steps.slice(0, stepN + (phase === "running" ? 1 : 0)).map((st, i) => {
              const live = phase === "running" && i === stepN;
              return (
                <motion.div
                  key={s.id + i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-baseline gap-3"
                >
                  <span className={live ? "text-gold animate-pulse" : "text-gold/70"}>{live ? "◌" : "✓"}</span>
                  <span className="text-gold-light">{st.tool}</span>
                  <span className="text-muted truncate">{st.detail}</span>
                  {!live && <span className="ml-auto text-muted/40 tabular-nums">{(st.ms / 1000).toFixed(1)}s</span>}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Result */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 panel p-4 font-sans"
            >
              <p className="kicker !text-[0.6rem] mb-2">Result</p>
              <p className="text-lg text-foreground" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {s.result.title}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {s.result.lines.map((l) => (
                  <li key={l}>— {l}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
