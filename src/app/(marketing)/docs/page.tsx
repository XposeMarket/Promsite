import { createMetadata } from "@/lib/seo/metadata";
import { docSections } from "@/content/docs/sections";
import Link from "next/link";
import { LuxHero, InstallSteps } from "@/components/showcase/PageVisuals";
import { Button } from "@/components/ui/Button";

export const metadata = createMetadata({
  title: "Docs: Setup Guides & Tutorials",
  description: "Learn to install and use Prometheus One: setup guides, tutorials and reference for the local-first AI agent on Windows and Mac.",
  path: "/docs",
});

/** Articles that already have a real page on the site. Everything else is marked "Soon" instead of linking to a 404. */
const LIVE: Record<string, string> = {
  quickstart: "/download",
  installation: "/download",
  "first-task": "/how-it-works",
  "how-it-works": "/how-it-works",
  tools: "/capabilities",
  memory: "/capabilities",
  "browser-automation": "/ai-browser-automation",
  "background-tasks": "/background-tasks",
  scheduling: "/background-tasks",
  teams: "/capabilities",
  integrations: "/capabilities",
  authentication: "/security",
};

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

export default function DocsPage() {
  return (
    <>
      <LuxHero kicker="Documentation" title="The operating" accent="manual." sub="From first install to multi-agent teams. Start at chapter one, or jump to what you need.">
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/download" size="lg">Quickstart</Button>
          <Button href="/how-it-works" variant="secondary" size="lg">How it works</Button>
        </div>
      </LuxHero>

      <section className="pb-8">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <InstallSteps
            steps={[
              { t: "Install", l: "One installer for your platform." },
              { t: "Connect a model", l: "Sign in to Claude or ChatGPT, or add a key." },
              { t: "Ask for anything", l: "It plans, runs the tools, and reports back." },
            ]}
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="kicker mb-4">Contents</p>
          <h2 className="mb-12 text-4xl tracking-tight md:text-5xl">
            Four <em className="text-gold-metal italic pr-1">chapters.</em>
          </h2>

          <div className="border-t border-gold/15">
            {docSections.map((section, i) => (
              <div key={section.slug} id={section.slug} className="grid gap-6 border-b border-gold/15 py-10 md:grid-cols-[5rem_1fr_1.2fr] md:gap-10">
                <span className="num-display text-5xl text-gold/70">{NUMERALS[i] ?? i + 1}</span>
                <div>
                  <h3 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{section.description}</p>
                </div>
                <ul className="divide-y divide-gold/10">
                  {section.articles.map((article, ai) => {
                    const href = LIVE[article.slug];
                    const inner = (
                      <>
                        <span className="font-mono text-[11px] text-gold/60 tabular-nums">
                          {String(i + 1)}.{String(ai + 1)}
                        </span>
                        <span className="flex-1">{article.title}</span>
                        {href ? (
                          <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
                        ) : (
                          <span className="rounded-full border border-gold/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Soon</span>
                        )}
                      </>
                    );
                    return (
                      <li key={article.slug}>
                        {href ? (
                          <Link href={href} className="group flex items-center gap-4 py-3 text-sm text-foreground/85 transition-colors hover:text-gold-light">
                            {inner}
                          </Link>
                        ) : (
                          <div className="flex items-center gap-4 py-3 text-sm text-muted/70">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
