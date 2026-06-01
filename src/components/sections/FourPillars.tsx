"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";

const pillars = [
  {
    title: "Operate",
    description:
      "Navigate, click, extract, and control any website just like you.",
    linkLabel: "Browser automation",
    href: "/ai-browser-automation",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
      </svg>
    ),
  },
  {
    title: "Orchestrate",
    description:
      "Read, write, transform, and manage files. Execute multi-step workflows.",
    linkLabel: "Workflow execution",
    href: "/capabilities",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      </svg>
    ),
  },
  {
    title: "Remember",
    description: "Persistent memory across sessions, projects, and preferences.",
    linkLabel: "Memory system",
    href: "/how-it-works",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 5 1 3 3 0 0 0 5-1 3 3 0 0 0 2-5 3 3 0 0 0-2-5 3 3 0 0 0-3-3 3 3 0 0 0-2 1 3 3 0 0 0-2-1Z" />
        <path d="M12 5v14" />
      </svg>
    ),
  },
  {
    title: "Execute",
    description: "Run background tasks, schedule work, and deliver real results.",
    linkLabel: "Background tasks",
    href: "/background-tasks",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
];

export function FourPillars() {
  return (
    <Section>
      <div className="mb-14">
        <p className="text-sm font-medium text-ember tracking-widest uppercase mb-6">
          The Prometheus system
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05]"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          Four pillars.
          <br />
          One system.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-border pt-12">
        {pillars.map((pillar) => (
          <div key={pillar.title}>
            <div className="text-ember mb-5">{pillar.icon}</div>
            <h3 className="text-lg font-semibold mb-3">{pillar.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-5">
              {pillar.description}
            </p>
            <Link
              href={pillar.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ember hover:gap-2.5 transition-all"
            >
              {pillar.linkLabel}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
