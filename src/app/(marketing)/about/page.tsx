import { createMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/showcase/Primitives";
import { LuxHero, TalkVsDo, Beliefs, FireMark } from "@/components/showcase/PageVisuals";
import { AgentConsole } from "@/components/showcase/AgentConsole";

export const metadata = createMetadata({
  title: "About: Why We Built a Local-First AI Agent",
  description: "The story behind Prometheus One: why we built a free, local-first AI agent focused on doing real work on your machine, not just conversation.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <LuxHero kicker="About" title="AI should do the work," accent="not talk about it." sub="That conviction is the whole reason Prometheus exists." />

      <Section>
        <SectionHead kicker="The gap" title="Same question." accent="Different outcome." sub="Most AI stops at advice. Prometheus finishes the job." />
        <TalkVsDo />
      </Section>

      <Section dark>
        <SectionHead kicker="What we believe" title="Five rules" accent="we build by." />
        <Beliefs
          items={[
            "AI should use tools, not describe them.",
            "Memory should persist. Every session builds on the last.",
            "Work should keep running while you're away.",
            "A system should orchestrate, not just respond.",
            "Your data and your control stay with you.",
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <SectionHead kicker="How it works" title="It plans, acts," accent="and remembers." sub="Connected to your browser, files, calendar and email. Watch a real run." />
          <AgentConsole />
        </div>
      </Section>

      <Section dark>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
          <div className="flex justify-center"><FireMark /></div>
          <div>
            <p className="kicker mb-5">The name</p>
            <p className="text-3xl md:text-5xl leading-[1.15] tracking-tight" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              Prometheus took fire from the gods and <em className="text-gold-metal italic">put it in human hands.</em>
            </p>
            <p className="mt-6 text-muted text-lg max-w-xl">Same idea here: the power of AI, running on your machine, as a tool you control.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/download" size="lg">Download Prometheus</Button>
              <Button href="/product" variant="secondary" size="lg">See the product</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
