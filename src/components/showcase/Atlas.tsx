"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ATLAS, ATLAS_GROUPS, type AtlasGroup, type AtlasItem } from "@/content/atlas";
import { MiniBrowser, MiniMemory, MiniTeam, MiniSchedule, MiniChart, MiniDesktop, MiniAnywhere, MiniFiles } from "@/components/showcase/MicroViz";
import {
  MiniVoice, MiniPromBot, MiniSubagents, MiniVideo, MiniImage, MiniGame,
  MiniBrain, MiniSkills, MiniConnect, MiniCode, MiniViz, MiniShield, MiniCards,
} from "@/components/showcase/AtlasViz";

const serif = { fontFamily: "var(--font-display), Georgia, serif" };

export const VIZ: Record<string, () => React.ReactElement> = {
  browser: MiniBrowser, desktop: MiniDesktop, code: MiniCode, connect: MiniConnect, prombot: MiniPromBot,
  subagents: MiniSubagents, team: MiniTeam, schedule: MiniSchedule, viz: MiniViz, cards: MiniCards,
  image: MiniImage, video: MiniVideo, chart: MiniChart, game: MiniGame, memory: MiniMemory, brain: MiniBrain,
  skills: MiniSkills, voice: MiniVoice, anywhere: MiniAnywhere, shield: MiniShield, files: MiniFiles,
};

export function AtlasViz({ id }: { id: string }) {
  const V = VIZ[id] || MiniChart;
  return <V />;
}

/** Group filter + chapter grid. Tapping a chapter opens its detail panel. */
export function AtlasExplorer() {
  const [group, setGroup] = useState<AtlasGroup | "All">("All");
  const [open, setOpen] = useState<string | null>(null);
  const items = ATLAS.filter((x) => group === "All" || x.group === group);
  const active = ATLAS.find((x) => x.id === open) || null;

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-10 -mx-1 px-1" role="tablist">
        {(["All", ...ATLAS_GROUPS.map((g) => g.id)] as const).map((g) => {
          const n = g === "All" ? ATLAS.length : ATLAS.filter((x) => x.group === g).length;
          const on = g === group;
          return (
            <button key={g} role="tab" aria-selected={on} onClick={() => { setGroup(g); setOpen(null); }}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${on ? "bg-gold text-background border-gold" : "border-border text-muted hover:text-foreground hover:border-gold/40"}`}>
              {g} <span className="opacity-60 tabular-nums ml-1">{n}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((x, i) => (
            <motion.button layout key={x.id} type="button" onClick={() => setOpen(open === x.id ? null : x.id)}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
              className={`panel text-left p-6 flex flex-col h-full transition-colors hover:border-gold/40 ${open === x.id ? "border-gold/60" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="kicker !text-[10px]">{x.group}</span>
                {x.stat && <span className="text-[11px] text-gold tabular-nums">{x.stat}</span>}
              </div>
              <div className="h-28 my-3 flex items-center justify-center"><AtlasViz id={x.viz} /></div>
              <h3 className="text-2xl leading-tight" style={serif}>
                {x.title} <em className="text-gold-metal italic">{x.accent}</em>
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{x.line}</p>
              <span className="mt-4 text-sm text-gold">{open === x.id ? "Close" : "How it works →"}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{active && <AtlasDetail item={active} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}

function AtlasDetail({ item, onClose }: { item: AtlasItem; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div role="dialog" aria-modal="true" aria-label={item.title}
        initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} transition={{ duration: 0.3 }}
        className="relative w-full md:max-w-2xl max-h-[88vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border border-gold/30 bg-[#0a0a09] p-7 md:p-10">
        <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 h-9 w-9 rounded-full border border-border text-muted hover:text-foreground">✕</button>
        <p className="kicker mb-4">{item.group}{item.stat ? ` · ${item.stat}` : ""}</p>
        <h3 className="text-4xl md:text-5xl leading-[1.05] pr-10" style={serif}>
          {item.title} <em className="text-gold-metal italic">{item.accent}</em>
        </h3>
        <div className="my-8 flex justify-center scale-[1.6] md:scale-[1.9] origin-center h-28 items-center"><AtlasViz id={item.viz} /></div>
        <p className="text-lg text-muted leading-relaxed">{item.line}</p>
        <ul className="mt-6 space-y-3">
          {item.points.map((p, i) => (
            <li key={p} className="flex gap-4">
              <span className="text-gold tabular-nums text-sm pt-0.5" style={serif}>{String(i + 1).padStart(2, "0")}</span>
              <span className="text-foreground/90 leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-6 border-t border-border">
          <p className="kicker !text-[10px] mb-3">Under the hood</p>
          <div className="flex flex-wrap gap-2">
            {item.tools.map((t) => (
              <code key={t} className="rounded-md border border-gold/25 bg-gold/5 px-2 py-1 text-xs text-gold">{t}</code>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Compact row of all chapters for the home page: one strip per group. */
export function AtlasStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {ATLAS_GROUPS.map((g, i) => {
        const list = ATLAS.filter((x) => x.group === g.id);
        return (
          <motion.a key={g.id} href={`/capabilities#${g.id.toLowerCase()}`}
            initial={{ y: 16 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}
            className="panel p-5 block hover:border-gold/40 transition-colors">
            <p className="text-2xl" style={serif}>{g.id}</p>
            <p className="text-xs text-muted mt-1 mb-4">{g.hint}</p>
            <ul className="space-y-1.5">
              {list.map((x) => <li key={x.id} className="text-sm text-foreground/85 flex gap-2"><span className="text-gold">·</span>{x.title}</li>)}
            </ul>
          </motion.a>
        );
      })}
    </div>
  );
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

/** Long-form chapters: one per group, each feature as an alternating visual row. */
export function AtlasChapters() {
  return (
    <div className="space-y-28 md:space-y-36">
      {ATLAS_GROUPS.map((g, gi) => {
        const list = ATLAS.filter((x) => x.group === g.id);
        return (
          <section key={g.id} id={g.id.toLowerCase()} className="scroll-mt-28">
            <div className="flex items-end gap-6 mb-12 border-b border-gold/15 pb-6">
              <span className="text-6xl md:text-8xl text-gold/30 leading-none" style={serif}>{ROMAN[gi]}</span>
              <div>
                <p className="kicker mb-2">Chapter {ROMAN[gi]}</p>
                <h2 className="text-4xl md:text-6xl leading-none" style={serif}>
                  {g.id}. <em className="text-gold-metal italic">{g.hint.toLowerCase()}</em>
                </h2>
              </div>
            </div>
            <div className="space-y-16 md:space-y-20">
              {list.map((x, i) => (
                <motion.div key={x.id} id={x.id}
                  initial={{ y: 24 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0 }} transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center scroll-mt-28 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="panel aspect-[16/10] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,183,94,0.08),transparent_65%)]" />
                    <div className="scale-[1.7] md:scale-[2.2]"><AtlasViz id={x.viz} /></div>
                    {x.stat && <span className="absolute bottom-4 right-5 text-xs text-gold tabular-nums">{x.stat}</span>}
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl leading-tight" style={serif}>
                      {x.title} <em className="text-gold-metal italic">{x.accent}</em>
                    </h3>
                    <p className="mt-4 text-muted text-lg leading-relaxed">{x.line}</p>
                    <ul className="mt-6 space-y-2.5">
                      {x.points.map((p) => (
                        <li key={p} className="flex gap-3 text-foreground/85 leading-relaxed">
                          <span className="mt-2.5 h-px w-4 shrink-0 bg-gold" />{p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {x.tools.slice(0, 5).map((t) => (
                        <code key={t} className="rounded-md border border-gold/20 px-2 py-0.5 text-[11px] text-gold/90">{t}</code>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** Sticky chapter index for the atlas page. */
export function AtlasIndex() {
  return (
    <nav aria-label="Chapters" className="flex gap-2 overflow-x-auto justify-start md:justify-center -mx-1 px-1">
      {ATLAS_GROUPS.map((g, i) => (
        <a key={g.id} href={`#${g.id.toLowerCase()}`}
          className="shrink-0 rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-gold/40 transition-colors">
          <span className="text-gold mr-2" style={serif}>{ROMAN[i]}</span>{g.id}
        </a>
      ))}
    </nav>
  );
}
