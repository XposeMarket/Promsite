import { createMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { LuxHero, CompareBoard, type CompareRow } from "@/components/showcase/PageVisuals";

export const metadata = createMetadata({
  title: "Compare Prometheus",
  description: "See how Prometheus compares to ChatGPT, Claude, and other AI tools. Feature-by-feature comparison of execution, memory, automation, and more.",
  path: "/compare",
});

const rows: CompareRow[] = [
  { name: "Tool execution", prometheus: true, chatgpt: "Limited", claude: "Limited" },
  { name: "Browser automation", prometheus: true, chatgpt: false, claude: false },
  { name: "Background tasks", prometheus: true, chatgpt: false, claude: false },
  { name: "Persistent memory", prometheus: true, chatgpt: "Basic", claude: "Basic" },
  { name: "Scheduling & cron", prometheus: true, chatgpt: false, claude: false },
  { name: "Agent teams", prometheus: true, chatgpt: false, claude: false },
  { name: "Desktop automation", prometheus: true, chatgpt: false, claude: false },
  { name: "File operations", prometheus: true, chatgpt: "Limited", claude: "Limited" },
  { name: "Email & calendar", prometheus: true, chatgpt: false, claude: false },
  { name: "Local-first", prometheus: true, chatgpt: false, claude: false },
  { name: "Custom workflows", prometheus: true, chatgpt: false, claude: false },
  { name: "Conversation quality", prometheus: true, chatgpt: true, claude: true },
];

export default function ComparePage() {
  return (
    <>
      <LuxHero kicker="Compare" title="Prometheus" accent="vs. the rest." sub="They're conversation windows. Prometheus is an execution system." />
      <Section className="!pt-0">
        <div className="max-w-5xl mx-auto">
          <CompareBoard rows={rows} />
          <div className="text-center mt-16">
            <Button href="/download" size="lg">Try the one that does the work</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
