import { createMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { LuxHero } from "@/components/showcase/PageVisuals";
import { StatStrip, Marquee, SectionHead } from "@/components/showcase/Primitives";
import { AgentConsole } from "@/components/showcase/AgentConsole";
import { AtlasExplorer, AtlasChapters, AtlasIndex } from "@/components/showcase/Atlas";
import { ATLAS } from "@/content/atlas";

export const metadata = createMetadata({
  title: "Capabilities",
  description:
    "Everything Prometheus One can do: in-app browser, desktop control, code, Prom Bot, subagents, teams, schedules, voice, image and video generation, game builder, in-chat visuals, memory, Brain, skills, connectors and approvals.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <LuxHero
        kicker="The atlas · Prometheus One"
        title="Everything it can do,"
        accent="in one place."
        sub={`${ATLAS.length} capabilities in six chapters. Tap any one to see how it works and which tools power it.`}
      >
        <div className="mt-10"><AtlasIndex /></div>
      </LuxHero>

      <div className="-mt-6 mb-2">
        <Marquee items={ATLAS.map((x) => x.title)} />
      </div>

      <Section>
        <StatStrip stats={[
          { value: 638, label: "tool definitions" },
          { value: 200, suffix: "+", label: "skills" },
          { value: 19, label: "native connectors" },
          { value: 25, label: "in-chat visual types" },
        ]} />
      </Section>

      <Section dark>
        <SectionHead kicker="Explore" title="Pick a chapter." accent="Tap anything." sub="Filter by what you want done. Every tile opens a detail sheet." />
        <AtlasExplorer />
      </Section>

      <Section>
        <SectionHead kicker="Live runs" title="Watch it" accent="actually work." sub="Real tool sequences: voice, video, bots, creative, teams and research." />
        <AgentConsole scripts={["voice", "video", "prombot", "create", "team", "research", "browser", "schedule"]} />
      </Section>

      <Section dark>
        <AtlasChapters />
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="kicker mb-5">No tiers</p>
          <h2 className="text-4xl md:text-6xl leading-[1.02]">All of it. <em className="text-gold-metal italic">Free.</em></h2>
          <p className="text-muted text-lg mt-5 mb-10">Every capability ships in every install. Bring your own model and keys.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" href="/download">Download Prometheus</Button>
            <Button size="lg" variant="secondary" href="/how-it-works">How it works</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
