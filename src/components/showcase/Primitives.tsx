"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

/** Kicker + serif headline with one gold-italic phrase, plus an optional one-line subtitle. */
export function SectionHead({
  kicker,
  title,
  accent,
  sub,
  center = false,
}: {
  kicker: string;
  title: string;
  accent?: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center mx-auto" : ""} max-w-3xl`}>
      <p className="kicker mb-5">{kicker}</p>
      <h2 className="text-4xl md:text-6xl leading-[1.02] tracking-tight">
        {title} {accent && <em className="text-gold-metal italic pr-1">{accent}</em>}
      </h2>
      {sub && <p className={`mt-5 text-muted text-lg leading-relaxed ${center ? "mx-auto" : ""} max-w-xl`}>{sub}</p>}
    </div>
  );
}

/** Animated count-up number. */
export function CountUp({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="num-display tabular-nums">
      {prefix}
      {v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/** Row of big serif numbers separated by gold hairlines. */
export function StatStrip({ stats }: { stats: { value: number; suffix?: string; prefix?: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-y border-gold/15">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`py-8 px-4 text-center ${i % 2 ? "border-l border-gold/15" : ""} ${i >= 2 ? "border-t md:border-t-0 border-gold/15" : ""} ${i === 2 ? "md:border-l" : ""}`}
        >
          <div className="text-4xl md:text-6xl text-foreground">
            <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix} />
          </div>
          <p className="mt-2 kicker !text-[0.62rem] !text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Infinite ticker of capabilities. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/10 py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-2xl md:text-3xl text-muted/80" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
            {t}
            <span className="text-gold text-sm">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Horizontal pipeline whose gold progress travels across the stages. */
export function Pipeline({ stages }: { stages: { name: string; hint: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), 1400);
    return () => clearInterval(id);
  }, [inView, stages.length]);
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 right-0 top-[22px] h-px bg-gold/15 hidden md:block" />
      <motion.div
        className="absolute left-0 top-[22px] h-px bg-gold hidden md:block"
        animate={{ width: `${(active / (stages.length - 1)) * 100}%` }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
        {stages.map((s, i) => {
          const on = i <= active;
          return (
            <button key={s.name} onClick={() => setActive(i)} className="relative text-left md:text-center flex md:block items-start gap-4">
              <span
                className={`relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-500 bg-background ${
                  on ? "border-gold text-gold" : "border-gold/20 text-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block md:mt-4">
                <span className={`block text-xl transition-colors ${on ? "text-foreground" : "text-muted"}`} style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {s.name}
                </span>
                <span className="block mt-1 text-sm text-muted/80 leading-snug">{s.hint}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Feature tile: icon-less, a big serif word, a one-liner and a micro visual slot. */
export function Tile({ title, line, children, href }: { title: string; line: string; children?: React.ReactNode; href?: string }) {
  const body = (
    <div className="panel h-full p-6 flex flex-col transition-colors hover:border-gold/40">
      <div className="h-28 mb-6 flex items-center justify-center">{children}</div>
      <h3 className="text-2xl" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{line}</p>
      {href && <span className="mt-4 text-sm text-gold">Explore →</span>}
    </div>
  );
  return href ? (
    <a href={href} className="block h-full">
      {body}
    </a>
  ) : (
    body
  );
}
