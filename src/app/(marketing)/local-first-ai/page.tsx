import { createMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHead, StatStrip } from "@/components/showcase/Primitives";
import { LuxHero, BoundaryDiagram, Principles } from "@/components/showcase/PageVisuals";
import { YourMachine } from "@/components/sections/HomeVisual";

export const metadata = createMetadata({
  title: "Local-First AI Agent on Your Own Machine",
  description: "Prometheus runs on your machine with your data. Files, browser sessions and memory stay local, with your choice of cloud or local models.",
  path: "/local-first-ai",
});

export default function LocalFirstAIPage() {
  return (
    <>
      <LuxHero kicker="Local-first AI" title="AI that lives" accent="on your machine." sub="No lock-in. No data leaving. Prometheus executes where you are.">
        <Button href="/download" size="lg">Download Prometheus</Button>
      </LuxHero>

      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StatStrip
            stats={[
              { value: 0, label: "Servers between you and your data" },
              { value: 100, suffix: "%", label: "Of memory stored locally" },
              { value: 1, label: "Folder to back up or delete" },
              { value: 0, label: "Training on your work" },
            ]}
          />
        </div>
      </section>

      <Section>
        <SectionHead kicker="Where your data goes" title="It stays" accent="home." />
        <BoundaryDiagram />
      </Section>

      <YourMachine />

      <Section>
        <SectionHead kicker="Why it matters" title="Cloud AI holds your work." accent="Local AI hands it back." />
        <Principles
          items={[
            { t: "No hostage data", l: "Price change or shutdown? Your work stays put." },
            { t: "Works offline-ish", l: "Tools and jobs run even when the network flickers." },
            { t: "Every action logged", l: "See exactly what ran, when and why." },
            { t: "Portable", l: "Config, memory and state in one folder." },
            { t: "Your permissions", l: "You decide what it can touch." },
            { t: "Never trained on", l: "Your files and chats are yours." },
          ]}
        />
        <div className="text-center mt-14">
          <Button href="/security" variant="secondary" size="lg">How it&apos;s secured</Button>
        </div>
      </Section>
    </>
  );
}
