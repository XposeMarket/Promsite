"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    title: "Research",
    description: "Collect competitive intel and audience insights.",
  },
  {
    title: "Create",
    description: "Draft copy, generate assets, and build the landing page.",
  },
  {
    title: "Launch",
    description: "Schedule, publish, and monitor performance.",
  },
];

const sidebar = ["Projects", "Workflows", "Tasks", "Memory", "Teams", "Settings"];

const tasks = [
  { label: "Research competitors", status: "Completed" },
  { label: "Draft copy & assets", status: "Completed" },
  { label: "Build landing page", status: "In progress" },
  { label: "Schedule & publish", status: "Pending" },
  { label: "Monitor & report", status: "Pending" },
];

const statusStyles: Record<string, string> = {
  Completed: "text-terminal-green/90 bg-terminal-green/10",
  "In progress": "text-ember bg-ember/10",
  Pending: "text-muted/70 bg-surface",
};

export function PromptToProduction() {
  return (
    <Section dark>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: narrative + steps */}
        <div>
          <p className="text-sm font-medium text-ember tracking-widest uppercase mb-6">
            In action
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            From prompt
            <br />
            to production.
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-8">
            A marketing team uses Prometheus to research, draft, and launch a
            campaign&mdash;coordinating tools, files, and people across the
            entire process.
          </p>

          <div className="space-y-6 mb-8">
            {steps.map((step) => (
              <div key={step.title} className="flex gap-4">
                <div className="mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-ember" />
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-ember font-medium hover:gap-3 transition-all"
          >
            View case study
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        {/* Right: product mockup */}
        <div className="rounded-xl border border-border bg-charcoal-light overflow-hidden shadow-2xl shadow-black/40">
          {/* window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-charcoal">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted font-medium">Prometheus</span>
          </div>

          <div className="grid grid-cols-[120px_1fr]">
            {/* sidebar */}
            <div className="border-r border-border py-4 px-3 space-y-1">
              {sidebar.map((item, i) => (
                <div
                  key={item}
                  className={`text-xs px-2.5 py-1.5 rounded-md ${
                    i === 1
                      ? "bg-ember/15 text-ember font-medium"
                      : "text-muted/70"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* main panel */}
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <h4 className="text-sm font-semibold">Campaign Launch</h4>
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-terminal-green/10 text-terminal-green/90">
                  Running
                </span>
              </div>
              <div className="space-y-2.5">
                {tasks.map((task, i) => (
                  <div
                    key={task.label}
                    className="flex items-center justify-between gap-3 text-xs"
                  >
                    <span className="flex items-center gap-2.5 text-muted">
                      <span className="text-muted/40 w-3">{i + 1}</span>
                      <span className="text-foreground/90">{task.label}</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${statusStyles[task.status]}`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
