"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { analytics } from "@/lib/analytics";

const features = [
  "All capabilities included",
  "No feature gates",
  "No purchase required",
];

export function PricingPreview() {
  return (
    <Section id="pricing-preview">
      <div className="rounded-2xl border border-border bg-charcoal p-8 md:p-12 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.7fr_0.9fr] gap-10 lg:gap-12 items-center">
          {/* Heading */}
          <div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: "var(--font-display), Georgia, serif" }}
            >
              Free access.
              <br />
              <span className="text-ember">Full power.</span>
            </h2>
          </div>

          {/* Price */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-bold">Free</span>
              <span className="text-muted text-lg">for everyone</span>
            </div>
            <p className="text-muted mt-2">Full system access. No checkout.</p>
          </div>

          {/* Features + CTA */}
          <div>
            <ul className="space-y-3 mb-7">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ember flex-shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                href="/signup"
                className="glow-ember"
                onClick={() =>
                  analytics.track({
                    name: "pricing_cta_clicked",
                    properties: { source: "home_preview" },
                  })
                }
              >
                Get started
              </Button>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ember hover:gap-2.5 transition-all"
              >
                View pricing details
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
