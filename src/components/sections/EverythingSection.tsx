"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/showcase/Primitives";
import { AtlasStrip } from "@/components/showcase/Atlas";
import { AgentConsole } from "@/components/showcase/AgentConsole";
import { ATLAS } from "@/content/atlas";

/** Home: the whole atlas at a glance, plus live runs of the newer surfaces. */
export function EverythingSection() {
  return (
    <Section>
      <SectionHead
        kicker={`The full atlas · ${ATLAS.length} capabilities`}
        title="It doesn't stop at"
        accent="chat and code."
        sub="Voice, Prom Bot, subagents, teams, video, games, Brain, connectors. Six chapters, all in one install."
      />
      <AtlasStrip />
      <div className="mt-16">
        <AgentConsole scripts={["voice", "prombot", "video", "create"]} />
      </div>
      <div className="mt-10 flex justify-center">
        <Button size="lg" href="/capabilities">Open the atlas</Button>
      </div>
    </Section>
  );
}
