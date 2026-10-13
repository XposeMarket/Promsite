/**
 * Indexable marketing routes, used by sitemap.xml and llms.txt.
 *
 * `updated` is the real date the page content last changed. Bump it when you
 * edit a page. Do not use `new Date()`: a sitemap that reports every URL as
 * changed on every request teaches Google to ignore lastmod.
 *
 * Auth and app routes (/login, /signup, /get-started, /dashboard...) are
 * intentionally absent: they are noindex.
 */
export interface SiteRoute {
  path: string;
  updated: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  /** One-line summary for llms.txt. */
  summary: string;
  label: string;
}

export const marketingRoutes: SiteRoute[] = [
  { path: "/", label: "Home", updated: "2026-10-09", priority: 1, changeFrequency: "weekly", summary: "Overview of Prometheus One, the local-first AI agent." },
  { path: "/product", label: "Product", updated: "2026-10-07", priority: 0.9, changeFrequency: "monthly", summary: "What Prometheus One is and how it differs from a chatbot." },
  { path: "/capabilities", label: "Capabilities", updated: "2026-10-07", priority: 0.9, changeFrequency: "monthly", summary: "Every capability: browser, desktop, code, subagents, teams, schedules, voice, image/video, memory, skills, connectors." },
  { path: "/pricing", label: "Pricing", updated: "2026-10-07", priority: 0.9, changeFrequency: "monthly", summary: "Prometheus is free for everyone, with no feature tiers." },
  { path: "/download", label: "Download", updated: "2026-10-07", priority: 0.8, changeFrequency: "monthly", summary: "Desktop app for Windows 10/11 and macOS 11+, with system requirements." },
  { path: "/how-it-works", label: "How it works", updated: "2026-10-07", priority: 0.8, changeFrequency: "monthly", summary: "How Prometheus plans, picks tools, executes, verifies and keeps context." },
  { path: "/compare", label: "Compare", updated: "2026-10-07", priority: 0.8, changeFrequency: "monthly", summary: "Prometheus compared with ChatGPT, Claude and other AI agents." },
  { path: "/use-cases", label: "Use cases", updated: "2026-10-07", priority: 0.7, changeFrequency: "monthly", summary: "Real workflows: research, data pipelines, outreach, code review, content, monitoring." },
  { path: "/ai-browser-automation", label: "AI browser automation", updated: "2026-10-07", priority: 0.7, changeFrequency: "monthly", summary: "How the agent drives a real Chrome browser to navigate, fill forms and extract data." },
  { path: "/background-tasks", label: "Background tasks", updated: "2026-10-07", priority: 0.7, changeFrequency: "monthly", summary: "Scheduled and long-running background work, subagents and results collection." },
  { path: "/local-first-ai", label: "Local-first AI", updated: "2026-10-07", priority: 0.7, changeFrequency: "monthly", summary: "Why Prometheus runs on your own machine with your own data." },
  { path: "/security", label: "Security & privacy", updated: "2026-10-07", priority: 0.7, changeFrequency: "monthly", summary: "Permission model, approvals, account isolation and audit trails." },
  { path: "/docs", label: "Docs", updated: "2026-10-07", priority: 0.7, changeFrequency: "weekly", summary: "Setup guides, tutorials and reference." },
  { path: "/about", label: "About", updated: "2026-10-07", priority: 0.5, changeFrequency: "yearly", summary: "Why Prometheus was built." },
  { path: "/blog", label: "Blog", updated: "2026-10-07", priority: 0.6, changeFrequency: "weekly", summary: "Guides and product notes." },
  { path: "/contact", label: "Contact", updated: "2026-10-07", priority: 0.4, changeFrequency: "yearly", summary: "Contact the Prometheus team." },
];
