"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AsciiReveal } from "@/components/ascii/AsciiReveal";
import { STARTUP_ASCII } from "@/content/ascii/startup";
import { parseAsciiToLines } from "@/lib/ascii/loader";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { analytics } from "@/lib/analytics";

type Phase = "startup" | "logo" | "cta";

interface IntroSequenceProps {
  onComplete: () => void;
}

const emberParticles = Array.from({ length: 46 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 37) % 84)}%`,
  delay: (index % 12) * 0.22,
  duration: 5.8 + (index % 7) * 0.45,
  size: 2 + (index % 4),
  drift: ((index % 9) - 4) * 9,
  bottom: `${-8 - (index % 5) * 4}%`,
}));

function EmberAtmosphere({ active }: { active: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(220,74,26,0.16)_0%,rgba(0,0,0,0)_46%),radial-gradient(ellipse_at_15%_55%,rgba(170,72,10,0.13)_0%,rgba(0,0,0,0)_38%)]" />
      <motion.div
        className="absolute -left-[12%] top-[18%] h-[55%] w-[46%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,132,38,0.16),rgba(0,0,0,0)_68%)] blur-3xl"
        animate={{ x: [0, 28, 0], opacity: [0.26, 0.42, 0.26] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[18%] top-[24%] h-[48%] w-[48%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(226,106,32,0.12),rgba(0,0,0,0)_70%)] blur-3xl"
        animate={{ x: [0, -34, 0], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(to_top,rgba(141,56,12,0.18),rgba(0,0,0,0))]" />

      {emberParticles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-ember-glow shadow-[0_0_14px_rgba(255,107,53,0.75)]"
          style={{
            left: particle.left,
            bottom: particle.bottom,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, particle.drift, particle.drift * -0.35],
            y: [0, -220 - particle.size * 14],
            opacity: [0, 0.66, 0.38, 0],
            scale: [0.45, 1, 0.72],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<Phase>("startup");

  const handleSkip = useCallback(() => {
    analytics.track({ name: "intro_skipped" });
    onComplete();
  }, [onComplete]);

  const handleEnter = useCallback(() => {
    analytics.track({ name: "intro_completed" });
    onComplete();
  }, [onComplete]);

  const startupLines = parseAsciiToLines(STARTUP_ASCII);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <EmberAtmosphere active={phase !== "startup"} />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-xs text-muted/40 hover:text-muted/70 transition-colors z-10 tracking-widest uppercase"
      >
        Skip intro
      </button>

      <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4">
        <AnimatePresence mode="wait">

          {/* Phase 1 — flame/particle art, green terminal */}
          {phase === "startup" && (
            <motion.div
              key="startup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AsciiReveal
                lines={startupLines}
                color="green"
                msPerLine={30}
                onComplete={() => setTimeout(() => setPhase("logo"), 600)}
              />
            </motion.div>
          )}

          {/* Phase 2 — Prometheus logo lock-in */}
          {phase === "logo" && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.16, filter: "blur(18px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
              transition={{ duration: 1.55, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => setTimeout(() => setPhase("cta"), 700)}
              className="relative flex h-[min(56vw,420px)] w-[min(56vw,420px)] items-center justify-center"
            >
              <motion.div
                className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.22),rgba(0,0,0,0)_68%)] blur-2xl"
                animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Image
                src="/images/prometheus-logo.png"
                alt="Prometheus"
                width={512}
                height={512}
                className="relative h-full w-full select-none object-contain drop-shadow-[0_0_42px_rgba(220,74,26,0.7)]"
                priority
              />
            </motion.div>
          )}

          {/* Phase 3 — CTA */}
          {phase === "cta" && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-10"
            >
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-ember/20 blur-2xl" />
                  <Image
                    src="/images/prometheus-logo.png"
                    alt="Prometheus"
                    width={128}
                    height={128}
                    className="relative drop-shadow-[0_0_28px_rgba(220,74,26,0.68)]"
                    priority
                  />
                </motion.div>
                <Button size="lg" onClick={handleEnter} className="glow-ember-strong px-10 py-4 text-lg">
                  Ignite your Flame
                </Button>
                <span className="text-sm text-muted/50 tracking-widest uppercase">
                  The World&apos;s First Everything AI
                </span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
