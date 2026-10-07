"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { analytics } from "@/lib/analytics";

/**
 * Prometheus One intro: a ~6s cinematic in four beats.
 *  0  dark       – black, a gold hairline draws across the horizon
 *  1  mark       – the P1 ring assembles out of light, slow rotation
 *  2  word       – PROMETHEUS letterspaced reveal, "ONE" in gold italic
 *  3  capabilities – four words flash beneath (Operate · Remember · Orchestrate · Create)
 *  4  enter      – flat gold CTA
 */
type Beat = 0 | 1 | 2 | 3 | 4;

interface IntroSequenceProps {
  onComplete: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const WORD = "PROMETHEUS".split("");
const CAPS = ["Operate", "Remember", "Orchestrate", "Create"];

// Slow drifting gold dust (deterministic so SSR/CSR match)
const dust = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 1 + (i % 3),
  dur: 9 + (i % 6),
  delay: (i % 7) * 0.6,
}));

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [beat, setBeat] = useState<Beat>(0);
  const [cap, setCap] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setBeat(1), 900),
      setTimeout(() => setBeat(2), 2300),
      setTimeout(() => setBeat(3), 3700),
      setTimeout(() => setBeat(4), 5600),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (beat !== 3) return;
    const id = setInterval(() => setCap((c) => Math.min(c + 1, CAPS.length - 1)), 430);
    return () => clearInterval(id);
  }, [beat]);

  const handleSkip = useCallback(() => {
    analytics.track({ name: "intro_skipped" });
    onComplete();
  }, [onComplete]);

  const handleEnter = useCallback(() => {
    analytics.track({ name: "intro_completed" });
    onComplete();
  }, [onComplete]);

  return (
    <div className="grain fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center overflow-hidden">
      {/* Ambient: a single warm pool of light that breathes in once the mark lands */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 1 ? 1 : 0 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(42% 38% at 50% 46%, rgba(214,183,94,0.13), rgba(0,0,0,0) 70%), radial-gradient(120% 60% at 50% 120%, rgba(169,138,59,0.10), rgba(0,0,0,0) 60%)",
        }}
      />

      {/* Gold dust */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {dust.map((d) => (
          <motion.span
            key={d.id}
            className="absolute rounded-full bg-gold-light"
            style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
            initial={{ opacity: 0 }}
            animate={{ opacity: beat >= 1 ? [0, 0.5, 0] : 0, y: [0, -40] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Horizon hairline */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 h-px origin-center"
        style={{ background: "linear-gradient(90deg, transparent, rgba(240,217,139,0.85), transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          beat === 0
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 1.2, opacity: 0, y: beat >= 2 ? 120 : 0 }
        }
        transition={{ duration: beat === 0 ? 1.1 : 1.4, ease: EASE }}
      />

      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-10 kicker !text-[0.62rem] !text-muted/50 hover:!text-gold transition-colors"
      >
        Skip
      </button>

      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Ring mark */}
        <motion.div
          className="relative h-[clamp(120px,22vw,190px)] w-[clamp(120px,22vw,190px)]"
          initial={{ opacity: 0, scale: 0.6, rotate: -40, filter: "blur(16px)" }}
          animate={
            beat >= 1
              ? { opacity: 1, scale: beat >= 2 ? 0.62 : 1, rotate: 0, filter: "blur(0px)", y: beat >= 2 ? -10 : 0 }
              : {}
          }
          transition={{ duration: 1.6, ease: EASE }}
        >
          <motion.div
            aria-hidden
            className="absolute -inset-6 rounded-full border border-gold/20"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={beat >= 1 ? { scale: [0.4, 1.6], opacity: [0.7, 0] } : {}}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
          <Image
            src="/images/p1-mark-ring.png"
            alt="Prometheus One"
            fill
            sizes="190px"
            priority
            className="object-contain select-none"
          />
        </motion.div>

        {/* Wordmark */}
        <div className="mt-2 h-[clamp(48px,9vw,92px)] flex items-end justify-center overflow-hidden">
          {beat >= 2 &&
            WORD.map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block text-foreground"
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(34px,7.2vw,78px)",
                  letterSpacing: "0.18em",
                  lineHeight: 1,
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: i * 0.055, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
        </div>

        {/* "One" + rule */}
        <motion.div
          className="mt-3 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: beat >= 2 ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <span className="h-px w-10 sm:w-16 bg-gold/50" />
          <em
            className="text-gold-metal"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(22px,3.4vw,34px)" }}
          >
            One
          </em>
          <span className="h-px w-10 sm:w-16 bg-gold/50" />
        </motion.div>

        {/* Capability words */}
        <div className="mt-8 h-6">
          <AnimatePresence mode="wait">
            {beat === 3 && (
              <motion.p
                key={CAPS[cap]}
                className="kicker"
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.28 }}
              >
                {CAPS[cap]}
              </motion.p>
            )}
            {beat === 4 && (
              <motion.p
                key="tagline"
                className="kicker !text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                The everything agent
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Enter */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 14 }}
          animate={beat === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Button size="lg" onClick={handleEnter} className="px-12 tracking-[0.18em] uppercase text-sm">
            Enter
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
