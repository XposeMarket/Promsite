import { createMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/showcase/Primitives";
import { LuxHero, BoundaryDiagram, AuditTicker, StrikeList, Principles } from "@/components/showcase/PageVisuals";

export const metadata = createMetadata({
  title: "Security & Privacy for a Local AI Agent",
  description:
    "Prometheus runs locally, so your data stays on your machine. Approvals for risky actions, a permission model, account isolation and audit trails.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <LuxHero kicker="Security" title="Trust your machine," accent="not our cloud." sub="Prometheus runs locally, logs every action, and only touches what you grant it." />

      <Section>
        <SectionHead kicker="Architecture" title="Everything stays" accent="inside the line." sub="Your files, memory, browser and logs live on your machine. Only prompts go to the model you picked." />
        <BoundaryDiagram />
      </Section>

      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
          <SectionHead kicker="Audit trail" title="Nothing happens" accent="in the dark." sub="Every tool call is written to a local log you can read, search or pipe anywhere. Risky actions wait for you." />
          <AuditTicker />
        </div>
      </Section>

      <Section>
        <SectionHead kicker="Controls" title="Six guardrails," accent="on by default." />
        <Principles
          items={[
            { t: "Permissions", l: "Browser, files, desktop: nothing runs without a grant." },
            { t: "Isolation", l: "Sessions, jobs and agents each get their own scope." },
            { t: "Approvals", l: "Sends, posts and purchases wait for your tap." },
            { t: "Local storage", l: "Memory and history live in a folder you own." },
            { t: "Your keys", l: "You bring the model keys. We never see them." },
            { t: "Kill switch", l: "Close it and it stops. Delete the folder and it's gone." },
          ]}
        />
      </Section>

      <Section dark>
        <SectionHead kicker="What we don't do" title="The short" accent="list of nevers." center />
        <StrikeList
          items={["Store your chats", "Train on your data", "Sell your analytics", "Require the cloud", "Hide tool calls", "Act without a log"]}
        />
        <div className="mt-16 text-center">
          <Button size="lg" href="/download">Download Prometheus</Button>
        </div>
      </Section>
    </>
  );
}
