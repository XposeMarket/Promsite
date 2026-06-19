"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PLANS } from "@/lib/stripe";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function BillingPage() {
  const plan = PLANS.pro;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
      >
        <h1 className="text-2xl font-bold text-foreground">Access</h1>
        <p className="text-muted mt-1">
          Prometheus is free to use for everyone.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
      >
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h2>
                  <Badge variant="green">Free</Badge>
                  <Badge variant="ember">Full access</Badge>
                </div>
                <p className="text-sm text-muted">
                  No purchase, checkout, or subscription is required. Create an
                  account and use the full system.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Included features
                </h3>
                <ul className="space-y-1.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-ember)"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end shrink-0">
              <div className="text-3xl font-bold text-foreground">Free</div>
              <Button variant="secondary" size="sm" href="/dashboard">
                Go to dashboard
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Simple access
        </h2>
        <Card>
          <p className="text-sm text-muted">
            Prometheus is now free to use. Create an account, download the app,
            and use the complete system with your own connected AI providers and
            local workspace.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
