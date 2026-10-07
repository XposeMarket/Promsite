"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SHOTS = [
  { key: "charts", label: "Charts", src: "/showcase/showroom-tab0.webp", note: "Annotated, crosshair tooltips, target lines." },
  { key: "break", label: "Breakdowns", src: "/showcase/showroom-tab1.webp", note: "Heatmaps, donuts, zoomable treemaps." },
  { key: "flows", label: "Flows & time", src: "/showcase/showroom-tab2.webp", note: "Sankeys and Gantt timelines." },
  { key: "sim", label: "Simulate", src: "/showcase/showroom-tab3.webp", note: "Sliders and Monte Carlo you can play." },
  { key: "design", label: "Design", src: "/showcase/showroom-tab4.webp", note: "Mock three UI variants. Tap one to build it." },
  { key: "forms", label: "Forms", src: "/showcase/showroom-tab5.webp", note: "Forms that answer back to the agent." },
];

/** Real captures of Prometheus inline visuals, framed on a phone, with the promo film beside it. */
export function VizShowcase() {
  const [i, setI] = useState(0);
  const s = SHOTS[i];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-12 items-center">
      {/* Film */}
      <div className="frame-window">
        <div className="bar">
          <i /> <i /> <i />
          <span className="ml-3 kicker !text-[0.6rem] !tracking-[0.24em] !text-muted/70">Viz Kit 1.1 · 33s film</span>
        </div>
        <video
          className="block w-full aspect-video bg-black"
          src="/showcase/viz-kit-promo.mp4"
          poster="/showcase/viz-kit-promo-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      {/* Phone with tab captures */}
      <div className="flex flex-col items-center">
        <div className="frame-phone w-[260px] sm:w-[280px]">
          <div className="relative h-[520px] sm:h-[560px] bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.key}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="relative w-full"
                  style={{ aspectRatio: "800 / 2554" }}
                  animate={{ y: ["0%", "-38%"] }}
                  transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.6 }}
                >
                  <Image src={s.src} alt={`Prometheus inline visual: ${s.label}`} fill sizes="280px" className="object-cover object-top" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-1.5 max-w-[320px]">
          {SHOTS.map((x, k) => (
            <button
              key={x.key}
              onClick={() => setI(k)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                k === i ? "border-gold/60 text-gold" : "border-border text-muted hover:text-foreground"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted text-center min-h-[1.5em]">{s.note}</p>
      </div>
    </div>
  );
}
