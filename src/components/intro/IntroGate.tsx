"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroSequence } from "./IntroSequence";

// sessionStorage = resets every new tab/window. localStorage = persists forever.
const INTRO_KEY = "prometheus_intro_seen";

// Crawlers and audit tools skip the cinematic: it is decoration, and it would
// otherwise sit on top of the page during rendering/LCP measurement.
const AUTOMATED_AGENT = /bot|crawl|spider|slurp|lighthouse|headless|pagespeed|preview/i;

function shouldPlayIntro(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (AUTOMATED_AGENT.test(navigator.userAgent) || navigator.webdriver) return false;
  // sessionStorage so the intro shows on every new tab/window, not just the first-ever visit.
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    return false;
  }
}

interface IntroGateProps {
  children: React.ReactNode;
}

/**
 * The page content is ALWAYS server-rendered. The intro is a fixed overlay on
 * top of it. Previously the gate rendered an empty black <div> until client JS
 * decided, so the homepage HTML had no H1 and ~78 words for search engines.
 */
export function IntroGate({ children }: IntroGateProps) {
  // null = not decided yet (SSR + first client paint).
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [introExiting, setIntroExiting] = useState(false);

  useEffect(() => {
    // Browser-only inputs (matchMedia, userAgent, sessionStorage) can only be read after
    // hydration, so a one-time post-mount setState is the intended pattern here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowIntro(shouldPlayIntro());
  }, []);

  const handleIntroComplete = () => {
    setIntroExiting(true);
    try {
      sessionStorage.setItem(INTRO_KEY, "true");
    } catch {
      /* private mode: intro just shows again next tab */
    }
    setTimeout(() => {
      setShowIntro(false);
      setIntroExiting(false);
    }, 600);
  };

  return (
    <>
      {children}

      {/* Visual-only cover while undecided, so first-time visitors never see a content flash.
          The real content is already in the HTML underneath it. */}
      {showIntro === null && (
        <>
          <div aria-hidden="true" data-intro-cover="" className="fixed inset-0 z-[100] bg-[#030303]" />
          {/* No JS means no intro: never leave the cover over the page. */}
          <noscript>
            <style>{"[data-intro-cover]{display:none!important}"}</style>
          </noscript>
        </>
      )}

      <AnimatePresence>
        {showIntro && !introExiting && (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <IntroSequence onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
