"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { AgentConsole } from "@/components/showcase/AgentConsole";
import { VizShowcase } from "@/components/showcase/VizShowcase";
import { SectionHead, StatStrip, Marquee, Tile } from "@/components/showcase/Primitives";
import { MiniBrowser, MiniMemory, MiniTeam, MiniSchedule, MiniFiles, MiniChart, MiniDesktop, MiniAnywhere } from "@/components/showcase/MicroViz";

/** 1. Watch it work: live agent console instead of "beyond chatbots" prose. */
export function WatchItWork() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
        <SectionHead
          kicker="Watch it work"
          title="You ask once."
          accent="It does the rest."
          sub="Not a chat transcript. A real run: tools, browser, files, memory. Pick a task and watch."
        />
        <AgentConsole />
      </div>
    </Section>
  );
}

/** 2. Numbers strip + capability ticker. */
export function ProofStrip() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StatStrip
          stats={[
            { value: 170, suffix: "+", label: "Built-in skills" },
            { value: 25, label: "Inline visual types" },
            { value: 100, suffix: "%", label: "Runs on your machine" },
            { value: 0, prefix: "$", label: "To get started" },
          ]}
        />
      </div>
      <div className="mt-10">
        <Marquee
          items={["Browser automation", "Persistent memory", "Agent teams", "Scheduled jobs", "Inline dashboards", "Video generation", "Desktop control", "Voice", "Code & PRs", "Phone access"]}
        />
      </div>
    </section>
  );
}

/** 3. Capability grid with living micro-visuals, replacing FourPillars + capability prose. */
export function CapabilityGrid() {
  const tiles = [
    { t: "Operate", l: "Drives your real browser, signed in as you.", v: <MiniBrowser />, h: "/ai-browser-automation" },
    { t: "Remember", l: "Projects, preferences and decisions carry across every session.", v: <MiniMemory />, h: "/how-it-works" },
    { t: "Orchestrate", l: "Spins up agent teams that plan, build and review.", v: <MiniTeam />, h: "/capabilities" },
    { t: "Schedule", l: "Runs jobs while you sleep and briefs you after.", v: <MiniSchedule />, h: "/background-tasks" },
    { t: "Files", l: "Reads, writes and ships real files on your disk.", v: <MiniFiles />, h: "/capabilities" },
    { t: "Create", l: "Dashboards, video and design mocks right in chat.", v: <MiniChart />, h: "/product" },
    { t: "Desktop", l: "Controls any app the way you would.", v: <MiniDesktop />, h: "/capabilities" },
    { t: "Anywhere", l: "Desktop, phone and Telegram. One agent everywhere.", v: <MiniAnywhere />, h: "/download" },
  ];
  return (
    <Section dark>
      <SectionHead kicker="The system" title="One agent." accent="Every surface." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((x, i) => (
          <motion.div
            key={x.t}
            initial={{ y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
          >
            <Tile title={x.t} line={x.l} href={x.h}>
              {x.v}
            </Tile>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/** 4. Show, don't tell: the Viz Kit film + real captures. */
export function SeeItShowcase() {
  return (
    <Section>
      <SectionHead
        kicker="In chat, not in a slide deck"
        title="Answers that"
        accent="you can touch."
        sub="Prometheus draws real dashboards, simulations and design mocks inline. These are actual captures, not mockups."
      />
      <VizShowcase />
    </Section>
  );
}

/** 5. Your machine, your skin: three real phone captures. */
export function YourMachine() {
  const phones = [
    { src: "/showcase/skin-blue.webp", r: -7, x: 40, label: "Olympian Blue" },
    { src: "/showcase/git-phone.webp", r: 0, x: 0, label: "Prometheus One" },
    { src: "/showcase/skin-purple.webp", r: 7, x: -40, label: "Aether Violet" },
  ];
  return (
    <Section dark className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHead
            kicker="Local first"
            title="Your machine."
            accent="Your data."
            sub="Prometheus runs on your computer and reaches you on your phone. Your files, sessions and history never leave unless you send them."
          />
          <div className="flex flex-wrap gap-4 -mt-4">
            <Button size="lg" href="/download">Download</Button>
            <Button variant="secondary" size="lg" href="/security">How it&apos;s secured</Button>
          </div>
        </div>
        <div className="relative h-[460px] sm:h-[520px] flex items-center justify-center">
          {phones.map((p, i) => (
            <motion.div
              key={p.label}
              className="absolute frame-phone w-[180px] sm:w-[210px]"
              style={{ zIndex: i === 1 ? 3 : 1 }}
              initial={{ opacity: i === 1 ? 1 : 0.7, rotate: 0, x: 0, y: 30 }}
              whileInView={{ opacity: i === 1 ? 1 : 0.7, rotate: p.r, x: i === 1 ? 0 : p.x < 0 ? 130 : -130, y: i === 1 ? 0 : 24 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-[380px] sm:h-[440px] bg-black">
                <Image src={p.src} alt={`Prometheus on mobile, ${p.label} skin`} fill sizes="210px" className="object-cover object-top" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
