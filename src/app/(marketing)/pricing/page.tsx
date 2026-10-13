import { createMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/Section";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/showcase/Primitives";
import { LuxHero, CompareBoard } from "@/components/showcase/PageVisuals";
import { MiniBrowser, MiniMemory, MiniTeam, MiniSchedule } from "@/components/showcase/MicroViz";
import { PricingFAQ } from "./faq";

export const metadata = createMetadata({
  title: "Pricing: Free AI Agent, No Feature Tiers",
  description:
    "Prometheus One is free for everyone: the full AI agent with browser automation, scheduling, teams, memory and desktop control. No feature tiers.",
  path: "/pricing",
});

const included = [
  { t: "Browser", v: <MiniBrowser /> },
  { t: "Memory", v: <MiniMemory /> },
  { t: "Agent teams", v: <MiniTeam /> },
  { t: "Scheduling", v: <MiniSchedule /> },
];

export default function PricingPage() {
  return (
    <>
      <LuxHero kicker="Pricing" title="One plan. Full power." accent="Free for everyone." sub="No tiers. No card. No checkout. You bring the model, we bring everything else." />

      <Section className="!pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="kicker mb-6">Every user gets all of it</p>
            <div className="grid grid-cols-2 gap-3">
              {included.map((i) => (
                <div key={i.t} className="panel-quiet p-5 flex flex-col items-center text-center">
                  <div className="h-24 flex items-center justify-center scale-90">{i.v}</div>
                  <p className="mt-2 text-xl" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>{i.t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-lg w-full mx-auto">
            <PricingCard featured />
          </div>
        </div>
      </Section>

      <Section dark>
        <SectionHead kicker="Free, and still more" title="What $0 gets you" accent="vs. $20 a month." center />
        <div className="max-w-5xl mx-auto">
          <CompareBoard
            rows={[
              { name: "Browser automation", prometheus: true, chatgpt: false, claude: false },
              { name: "Background tasks", prometheus: true, chatgpt: false, claude: false },
              { name: "Persistent memory", prometheus: true, chatgpt: "Basic", claude: "Basic" },
              { name: "Agent teams", prometheus: true, chatgpt: false, claude: false },
              { name: "Runs on your machine", prometheus: true, chatgpt: false, claude: false },
            ]}
          />
        </div>
      </Section>

      <Section id="faq">
        <SectionHead kicker="FAQ" title="Straight answers." accent="No deflection." center />
        <PricingFAQ />
      </Section>

      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl tracking-tight leading-[1.05] mb-8">
            Stop paying for promises. <em className="text-gold-metal italic">Start executing.</em>
          </h2>
          <Button size="lg" href="/download">Download Prometheus</Button>
        </div>
      </Section>
    </>
  );
}
