"use client";

import { Section } from "@/components/ui/Section";

const comparisons = [
  { feature: "Answers your question", prometheus: "Executes your task" },
  { feature: "Forgets between sessions", prometheus: "Remembers everything" },
  { feature: "Can only suggest", prometheus: "Can actually act" },
  {
    feature: "Single conversation",
    prometheus: "Background work, teams, scheduling",
  },
  {
    feature: "Generic responses",
    prometheus: "Context-aware, tool-equipped execution",
  },
];

export function PrometheusExecutes() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-sm font-medium text-ember tracking-widest uppercase mb-6">
            Not a chatbot
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            Prometheus{" "}
            <span className="text-ember">executes.</span>
          </h2>
        </div>

        <div>
          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_0.6fr_1.2fr] gap-4 pb-3 border-b border-border text-sm font-semibold">
            <span />
            <span className="text-muted">Typical AI Chat</span>
            <span className="text-ember">Prometheus</span>
          </div>
          {comparisons.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1.4fr_0.6fr_1.2fr] gap-4 py-4 border-b border-border text-sm items-start"
            >
              <span className="text-muted/80">{row.feature}</span>
              <span className="text-muted/60">Yes</span>
              <span className="text-ember">{row.prometheus}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
