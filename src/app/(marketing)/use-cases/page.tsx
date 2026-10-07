import { createMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHead, Marquee } from "@/components/showcase/Primitives";
import { LuxHero, UseCasePicker, type UseCase } from "@/components/showcase/PageVisuals";
import { VizShowcase } from "@/components/showcase/VizShowcase";

export const metadata = createMetadata({
  title: "Use Cases",
  description: "Discover how people use Prometheus for research automation, data pipelines, customer outreach, code review, content creation, and monitoring.",
  path: "/use-cases",
});

const cases: UseCase[] = [
  { title: "Research", line: "Browses, collects, synthesizes, and delivers a report on schedule.", caps: ["Browser", "Scheduling", "Memory"], viz: "browser",
    steps: ["Search 14 sources", "Open and read each page", "Pull the numbers into a sheet", "Write a 1-page brief"] },
  { title: "Data pipelines", line: "Pull from dashboards and docs, clean it, deliver it where it belongs.", caps: ["Background", "Files", "Integrations"], viz: "files",
    steps: ["Log into the dashboard", "Export last week's data", "Validate and dedupe", "Update the master sheet"] },
  { title: "Outreach", line: "Personal messages, follow-ups and context that never gets lost.", caps: ["Memory", "Email", "Scheduling"], viz: "memory",
    steps: ["Recall each lead's history", "Draft personal follow-ups", "Hold sends for your approval", "Schedule the next touch"] },
  { title: "Code & PRs", line: "Agent teams that branch, fix, test and open the PR for your review.", caps: ["Teams", "Files", "Git"], viz: "team",
    steps: ["Split the task across agents", "Edit in an isolated branch", "Run typecheck + tests", "Open the PR, ping you"] },
  { title: "Content", line: "Research, draft, design and schedule. You keep the voice.", caps: ["Browser", "Memory", "Media"], viz: "chart",
    steps: ["Scan what's trending", "Draft 3 posts in your voice", "Make the graphic", "Queue for your approval"] },
  { title: "Monitoring", line: "Watch prices, pages or stock, and act the moment something changes.", caps: ["Scheduling", "Browser", "Alerts"], viz: "schedule",
    steps: ["Check every 30 minutes", "Diff against last run", "Price dropped 12%", "Alert sent to your phone"] },
];

export default function UseCasesPage() {
  return (
    <>
      <LuxHero kicker="Use cases" title="Real workflows." accent="Real outcomes." sub="Pick one and watch it run." />
      <Section className="!pt-0">
        <UseCasePicker cases={cases} />
      </Section>
      <div className="py-6">
        <Marquee items={["Lead hunting", "Weekly reports", "Price watching", "Inbox triage", "PR reviews", "Video edits", "Income tracking", "Morning briefs", "Competitor research", "Social posting"]} />
      </div>
      <Section dark>
        <SectionHead kicker="And the answer comes back" title="Not a wall of text." accent="Something you can touch." />
        <VizShowcase />
        <div className="text-center mt-16">
          <Button href="/download" size="lg">Start your first workflow</Button>
        </div>
      </Section>
    </>
  );
}
