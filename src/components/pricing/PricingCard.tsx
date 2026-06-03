"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PLANS } from "@/lib/stripe";

interface PricingCardProps {
  featured?: boolean;
}

const features = [
  "Full AI system access",
  "Browser automation & control",
  "Background tasks & scheduling",
  "Persistent memory across sessions",
  "Team & subagent orchestration",
  "File & workflow execution",
  "Email, calendar & integrations",
  "Desktop automation",
  "Priority support",
];

export function PricingCard({ featured = true }: PricingCardProps) {
  const plan = PLANS.pro;

  return (
    <div
      className={`rounded-2xl p-8 md:p-10 ${
        featured
          ? "bg-surface border-2 border-ember/30 glow-ember"
          : "bg-surface border border-border"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        {featured && <Badge variant="ember">Launch price</Badge>}
      </div>

      <div className="mb-2">
        <div className="flex items-end gap-3">
          <span className="text-2xl font-semibold text-muted line-through decoration-ember/80">
            ${plan.oldPrice}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold">${plan.price}</span>
            <span className="text-muted">once</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted mb-8">Everything. No limits. One-time purchase.</p>

      <Button size="lg" href="/signup" className="w-full mb-8">
        Start with Prometheus
      </Button>

      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <svg
              className="w-5 h-5 text-ember shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-muted">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
