"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";

const workflows = [
  {
    title: "Morning research brief",
    description:
      "Scan news, financials, and competitor activity. Get a synthesized briefing before you start work.",
    tags: ["Scheduling", "Browser", "Email"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h9l5 5v13a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0V3Z" />
        <path d="M14 3v6h6M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: "Automated data pipeline",
    description:
      "Extract data from dashboards, transform it, and push results to your spreadsheet or database—on autopilot.",
    tags: ["Browser Automation", "Files"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 10h16M10 4v16" />
      </svg>
    ),
  },
  {
    title: "Code review & deploy prep",
    description:
      "Analyze pull requests, run checks, and prepare a deployment summary with risk assessment.",
    tags: ["Integrations", "Memory", "Teams"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
      </svg>
    ),
  },
  {
    title: "Customer outreach sequences",
    description:
      "Draft personalized emails, schedule follow-ups, and track responses—all orchestrated with persistent context.",
    tags: ["Email", "Scheduling", "Memory"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export function RealWorkflows() {
  return (
    <Section className="bg-[#f4efe6] text-[#1a1410]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start mb-14">
        <div>
          <p className="text-sm font-medium text-ember tracking-widest uppercase mb-6">
            Built for real workflows
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            From research to execution&mdash;end to end.
          </h2>
        </div>
        <p className="text-[#5c554c] text-lg leading-relaxed lg:pt-14">
          Prometheus is designed for people who need AI to operate in the real
          world. These are real workflows our users run every day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflows.map((wf) => (
          <div
            key={wf.title}
            className="bg-white/60 border border-[#e0d8ca] rounded-xl p-6 flex flex-col"
          >
            <div className="w-9 h-9 rounded-lg bg-[#ece4d6] flex items-center justify-center text-[#1a1410] mb-5">
              {wf.icon}
            </div>
            <h3 className="text-base font-semibold mb-2 leading-snug">
              {wf.title}
            </h3>
            <p className="text-sm text-[#5c554c] leading-relaxed mb-5 flex-1">
              {wf.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {wf.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#ece4d6] text-[#6b6358] border border-[#e0d8ca]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/use-cases"
          className="inline-flex items-center gap-2 text-ember font-medium hover:gap-3 transition-all"
        >
          Explore more use cases
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </Section>
  );
}
