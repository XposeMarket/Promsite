"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { LineWaves } from "@/components/backgrounds/LineWaves";
import { Button } from "@/components/ui/Button";
import { analytics } from "@/lib/analytics";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal to-background" />
      <div className="absolute -inset-x-[18%] -top-[12%] -bottom-[32%] opacity-48 mix-blend-screen">
        <LineWaves
          speed={0.24}
          innerLineCount={46}
          outerLineCount={34}
          warpIntensity={0.86}
          rotation={-34}
          edgeFadeWidth={0.7}
          colorCycleSpeed={0.22}
          brightness={0.13}
          color1="#f0d98b"
          color2="#a98a3b"
          color3="#f2ebdd"
          mouseInfluence={0.8}
          interactionElement={heroRef}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,183,94,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.28)_34%,rgba(0,0,0,0.46)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,transparent_24%,transparent_64%,rgba(0,0,0,0.48)_100%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col items-center gap-5 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/p1-mark-ring.png" alt="" width={56} height={56} className="w-14 h-14 opacity-95" />
            <p className="kicker">Prometheus One · The everything agent</p>
            <div className="rule-gold w-40" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[1.02] mb-7"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          &ldquo;Everything&rdquo; just got
          <br />
          <em className="text-gold-metal italic pr-2">a whole lot easier.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Prometheus runs tools, automates your browser, manages background tasks,
          remembers context, and orchestrates workflows. Not a chatbot. A system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            href="/signup"
            className="glow-gold"
            onClick={() => analytics.track({ name: "hero_cta_clicked", properties: { cta: "get_started" } })}
          >
            Get started
          </Button>
          <Button variant="outline" size="lg" href="/how-it-works">
            See how it works
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
