"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";

export function BeyondChatbots() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <div>
          <p className="text-sm font-medium text-ember tracking-widest uppercase mb-6">
            Beyond chatbots
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            AI systems should <span className="italic">do</span> more than
            answer questions.
          </h2>
        </div>

        <div className="lg:pt-14">
          <p className="text-muted text-lg leading-relaxed mb-6">
            Most AI tools stop at conversation. Prometheus goes
            further&mdash;executing real work across your browser, desktop, and
            tools with persistent memory and full context.
          </p>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-ember font-medium hover:gap-3 transition-all"
          >
            Read our principles
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
