import { createMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { AgentConsole } from "@/components/showcase/AgentConsole";
import { SectionHead, StatStrip, Pipeline } from "@/components/showcase/Primitives";
import { CapabilityGrid, SeeItShowcase, YourMachine } from "@/components/sections/HomeVisual";

export const metadata = createMetadata({
  title: "Product: The Local-First AI Agent",
  description:
    "Prometheus One is a local-first AI agent that does real work: browser automation, files, scheduling, memory and multi-agent teams. Not a chatbot.",
  path: "/product",
});

export default function ProductPage() {
  return (
    <>
      <Section className="pt-32 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
          <div>
            <p className="kicker mb-6">The system</p>
            <h1 className="text-5xl md:text-7xl leading-[1.02] tracking-tight mb-6">
              AI that operates. <em className="text-gold-metal italic">Not one that narrates.</em>
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-md">
              One agent on your machine that does the work and shows you the result.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" href="/download">Download</Button>
              <Button variant="secondary" size="lg" href="/how-it-works">How it works</Button>
            </div>
          </div>
          <AgentConsole />
        </div>
      </Section>

      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StatStrip
            stats={[
              { value: 8, label: "Tool families" },
              { value: 25, label: "Inline visual types" },
              { value: 3, label: "Ways to reach it" },
              { value: 1, label: "Gateway, all local" },
            ]}
          />
        </div>
      </section>

      <CapabilityGrid />

      <Section>
        <SectionHead kicker="Architecture" title="Built for" accent="action." sub="Every request runs the same loop, locally." />
        <Pipeline
          stages={[
            { name: "Gateway", hint: "Local server routes every request" },
            { name: "Plan", hint: "Picks tools, agents and success criteria" },
            { name: "Act", hint: "Browser, files, APIs, desktop" },
            { name: "Verify", hint: "Checks the result before reporting" },
            { name: "Remember", hint: "Writes what matters to memory" },
          ]}
        />
      </Section>

      <SeeItShowcase />
      <YourMachine />
    </>
  );
}
