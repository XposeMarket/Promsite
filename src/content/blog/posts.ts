export interface BlogPostSection {
  heading: string;
  body: string[];
}

export interface BlogPostRelatedLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
  heroKicker: string;
  heroStatement: string;
  takeaways: string[];
  sections: BlogPostSection[];
  relatedLinks: BlogPostRelatedLink[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-prometheus",
    title: "Introducing Prometheus: AI That Actually Does Things",
    description:
      "Prometheus is not a chatbot pretending to be useful. It is a system that can execute, remember, coordinate, and keep working after you close the tab.",
    date: "2026-04-01",
    author: "Prometheus Team",
    category: "Product Story",
    tags: ["announcement", "product", "ai-system"],
    readTime: "5 min",
    featured: true,
    heroKicker: "The operating layer",
    heroStatement:
      "The next useful AI product is not another prompt box. It is a system that understands intent, reaches for tools, verifies the result, and keeps the work moving.",
    takeaways: [
      "Prometheus is built around execution, not conversation theater.",
      "The product combines browser, desktop, file, scheduling, memory, and agent-team workflows in one interface.",
      "The long-term direction is a local-first command center that grows with the person or business using it.",
    ],
    sections: [
      {
        heading: "The problem with normal AI assistants",
        body: [
          "Most AI tools still stop at the edge of advice. They summarize, draft, explain, and brainstorm, but the user is left carrying the operational burden: open the browser, copy the output, move the file, check the page, run the command, and come back with the next instruction.",
          "Prometheus starts from a different assumption: useful intelligence should be able to operate. If the answer requires opening a website, reading a file, running a check, or coordinating a longer workflow, the system should be able to do that directly and show its work.",
        ],
      },
      {
        heading: "What makes Prometheus different",
        body: [
          "Prometheus is a local AI system with a tool layer, durable memory, background tasks, scheduled jobs, browser and desktop automation, and team-style subagents. The interface can still feel conversational, but the architecture is closer to an operating layer than a chat product.",
          "That difference matters because real work is rarely a single answer. It is a sequence: inspect, decide, act, verify, remember, and continue. Prometheus is designed around that sequence from the beginning.",
        ],
      },
      {
        heading: "Why local-first matters",
        body: [
          "Prometheus runs on the user's own machine, where the browser session, files, desktop apps, project folders, and connected tools already live. That gives it a practical advantage over cloud-only assistants that need every detail pasted into a remote tab.",
          "Local-first does not mean isolated. It means the user remains the center of control. Prometheus can connect outward when needed, but the durable working context stays grounded in the machine and workspace where decisions actually happen.",
        ],
      },
      {
        heading: "Where the product is going",
        body: [
          "The goal is a one-click desktop AI command center for everyday work and business operations: a system that can manage research, files, websites, communications, workflows, content, reminders, reports, and internal knowledge without forcing the user to juggle five separate apps.",
          "This blog will document that path in public: product updates, operational patterns, workflow breakdowns, and the practical philosophy behind building AI that actually does things.",
        ],
      },
    ],
    relatedLinks: [
      { label: "See the product overview", href: "/product" },
      { label: "Explore capabilities", href: "/capabilities" },
      { label: "Start with the $8 plan", href: "/pricing" },
    ],
  },
  {
    slug: "browser-automation-guide",
    title: "A Complete Guide to AI Browser Automation",
    description:
      "How Prometheus uses a real browser session to navigate, extract, and interact with websites without brittle one-off scripts.",
    date: "2026-03-28",
    author: "Prometheus Team",
    category: "Guide",
    tags: ["guide", "browser-automation", "workflow"],
    readTime: "8 min",
    heroKicker: "Live web execution",
    heroStatement:
      "Browser automation is where AI stops describing the web and starts working inside it: clicking, reading, uploading, downloading, collecting evidence, and verifying outcomes.",
    takeaways: [
      "Prometheus uses an actual browser session instead of pretending every website is a static document.",
      "Visual grounding, DOM snapshots, and structured extraction make browser workflows more reliable.",
      "The best automation combines interaction, evidence collection, and verification rather than blind clicking.",
    ],
    sections: [
      {
        heading: "Why browser automation is hard",
        body: [
          "The web is messy. Pages lazy-load, buttons move, modals interrupt flows, and important content often appears only after scripts run. A useful AI system cannot rely on static HTML or optimistic assumptions if the job is to operate a real website.",
          "Prometheus treats the browser as a live environment. It can open pages, inspect interactive elements, capture screenshots, read page text, upload files, download assets, scroll through dynamic feeds, and adapt when the visible state changes.",
        ],
      },
      {
        heading: "The Prometheus approach",
        body: [
          "The system combines DOM snapshots for precise controls, visual screenshots for high-confidence UI grounding, and page-text extraction for content-heavy surfaces. When a workflow is dynamic or risky, fresh visual evidence wins over stale assumptions.",
          "That makes browser automation useful for real workflows: researching leads, testing funnels, collecting competitor evidence, reading articles, operating dashboards, filling forms, and preparing user-approved social posts.",
        ],
      },
      {
        heading: "Automation should leave evidence",
        body: [
          "A click path is not enough. If an AI assistant visits five websites and returns a recommendation, the user should know what it saw, why it made the call, and where the supporting evidence lives.",
          "Prometheus browser workflows are designed to collect concrete artifacts: page text, screenshots, URLs, extracted fields, and task notes. That evidence makes the output inspectable instead of magical.",
        ],
      },
      {
        heading: "Where browser control becomes leverage",
        body: [
          "The practical power shows up in repeated work. One lead analysis is useful; a repeatable process that finds businesses, inspects websites, scores opportunities, saves evidence, and prepares outreach is a system.",
          "That is the direction Prometheus optimizes for: browser automation as a durable operating capability, not a demo trick.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Browser automation use case", href: "/ai-browser-automation" },
      { label: "How Prometheus works", href: "/how-it-works" },
      { label: "Read about background tasks", href: "/blog/background-tasks-explained" },
    ],
  },
  {
    slug: "background-tasks-explained",
    title: "Background Tasks: How Prometheus Works While You Sleep",
    description:
      "Learn how Prometheus queues work, runs long tasks in the background, and reports back with deterministic results instead of vague status updates.",
    date: "2026-03-25",
    author: "Prometheus Team",
    category: "Guide",
    tags: ["guide", "background-tasks", "operations"],
    readTime: "6 min",
    heroKicker: "Async execution",
    heroStatement:
      "A serious AI system needs to keep working after the chat turn ends. Background tasks turn Prometheus from a responder into an operator.",
    takeaways: [
      "Long-running work should be durable, inspectable, and recoverable.",
      "Background agents can research, build, verify, and report without blocking the main conversation.",
      "Good task design includes clear instructions, checkpoints, notes, and deterministic completion criteria.",
    ],
    sections: [
      {
        heading: "Why chat turns are too small",
        body: [
          "A normal AI chat turn is built for quick response. Real work often needs more: scanning files, comparing options, running checks, waiting for a page to load, retrying failures, and preserving partial results along the way.",
          "Prometheus background tasks create a separate execution lane for that work. The main conversation can continue while the task agent follows its plan, uses tools, records progress, and returns a verified result.",
        ],
      },
      {
        heading: "What makes a task durable",
        body: [
          "Durability means the work has state. A task should know what step it is on, what it already tried, what files changed, what evidence was collected, and what still needs verification. That makes recovery possible after interruptions.",
          "Prometheus pairs task plans with notes and audit trails so long-running work does not disappear into a black box. The system can resume from reality instead of reconstructing intent from memory.",
        ],
      },
      {
        heading: "The difference between background and scheduled work",
        body: [
          "Background tasks are usually created for a specific job right now: analyze this site, build this feature, research these leads. Scheduled jobs are recurring: check nightly, compile the morning brief, monitor a source, or run a weekly scan.",
          "Both matter. Together they let Prometheus handle work at the right cadence instead of forcing every action through the user's immediate attention.",
        ],
      },
      {
        heading: "What good completion looks like",
        body: [
          "A finished task should not merely say done. It should report what changed, what was checked, where the artifacts are, what failed if anything, and what caveats remain.",
          "That standard is what makes background work trustworthy: the user can hand off a job and get back a clean operational result, not a vibe.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Background tasks use case", href: "/background-tasks" },
      { label: "See orchestration capabilities", href: "/capabilities" },
      { label: "Read about teams and subagents", href: "/blog/teams-and-subagents" },
    ],
  },
  {
    slug: "memory-and-context",
    title: "Why Memory Changes Everything About AI Assistants",
    description:
      "Persistent memory turns AI from a disposable prompt box into a system that can learn your workflows, preferences, and priorities over time.",
    date: "2026-03-20",
    author: "Prometheus Team",
    category: "Deep Dive",
    tags: ["deep-dive", "memory", "context"],
    readTime: "7 min",
    heroKicker: "Continuity layer",
    heroStatement:
      "Memory is the difference between an assistant that answers the current prompt and a collaborator that understands the work in progress.",
    takeaways: [
      "Persistent context reduces repeated explanation and preserves project momentum.",
      "Useful memory separates durable facts from temporary chatter.",
      "Memory becomes most powerful when it is tied to files, tasks, decisions, and evidence.",
    ],
    sections: [
      {
        heading: "The reset problem",
        body: [
          "Most assistants forget the shape of the work as soon as the session gets long or the tab closes. The user ends up re-explaining preferences, project constraints, prior decisions, and known pitfalls over and over again.",
          "Prometheus treats memory as infrastructure. It can preserve durable user preferences, project facts, decisions, task notes, and operating rules so future work starts with context instead of amnesia.",
        ],
      },
      {
        heading: "Not all memory is equal",
        body: [
          "Good memory is curated. A passing mood does not need the same weight as a stable project constraint. A one-off task note should not become a permanent identity fact. Prometheus is designed around different memory surfaces for different kinds of continuity.",
          "That distinction keeps the system useful. It remembers the things that should shape future behavior while avoiding the clutter that makes assistants feel haunted by stale context.",
        ],
      },
      {
        heading: "Memory tied to action",
        body: [
          "The highest-value memory comes from work: files edited, checks run, bugs found, decisions made, blockers hit, and evidence gathered. That context gives future sessions a truthful recovery point.",
          "When Prometheus records task progress, it is not journaling for decoration. It is building the operational trail needed to keep complex work moving across sessions and agents.",
        ],
      },
      {
        heading: "What memory unlocks",
        body: [
          "With continuity, an AI system can develop taste around the user's preferences, spot repeated problems, avoid old mistakes, and proactively recommend the next useful move.",
          "That is how Prometheus becomes less like a tool you prompt and more like a working layer that knows the terrain.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Explore the product", href: "/product" },
      { label: "Security and control", href: "/security" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    slug: "teams-and-subagents",
    title: "Teams and Subagents: Delegating Work Without Losing the Thread",
    description:
      "Prometheus can split a complex task into focused sub-agents, keep ownership visible, and merge the results into one clean workflow.",
    date: "2026-03-14",
    author: "Prometheus Team",
    category: "Deep Dive",
    tags: ["deep-dive", "teams", "subagents"],
    readTime: "7 min",
    heroKicker: "Coordinated agents",
    heroStatement:
      "Complex work gets better when one system can plan, delegate, inspect, and synthesize instead of forcing a single agent to juggle every specialty at once.",
    takeaways: [
      "Subagents give complex work focused lanes: research, implementation, verification, writing, and operations.",
      "A manager layer keeps the thread intact by coordinating goals and collecting results.",
      "The user should see ownership, blockers, and final synthesis rather than scattered agent chatter.",
    ],
    sections: [
      {
        heading: "Why one agent is not always enough",
        body: [
          "Some tasks are naturally parallel. A website audit might need technical inspection, copy critique, competitor research, and conversion strategy at the same time. A single linear chat agent can do that, but it becomes slow and context-heavy.",
          "Prometheus subagents let the work split into focused roles while preserving a shared goal. Each agent can operate in its lane and report back with evidence.",
        ],
      },
      {
        heading: "The manager pattern",
        body: [
          "Delegation only helps if someone owns the whole. Prometheus teams use a manager pattern to set direction, ask the right agents for work, resolve blockers, and synthesize the final answer into something the user can act on.",
          "That keeps multi-agent work from becoming noise. The user gets the benefits of parallel execution without needing to babysit every internal thread.",
        ],
      },
      {
        heading: "Where subagents shine",
        body: [
          "Subagents are strongest when the work has separable specialties: code review, website building, lead qualification, research collection, verification, content drafting, or recurring monitoring.",
          "The key is specificity. A good subagent has a clear scope, real tools, strong constraints, and a definition of done that can be checked.",
        ],
      },
      {
        heading: "Keeping the thread visible",
        body: [
          "The danger of agent teams is fragmentation. Prometheus is built to keep artifacts, task status, team chat, and final synthesis connected so the work remains inspectable.",
          "That visibility is what makes delegation feel like leverage instead of chaos.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Capabilities overview", href: "/capabilities" },
      { label: "Read about background tasks", href: "/blog/background-tasks-explained" },
      { label: "Get started", href: "/get-started" },
    ],
  },
  {
    slug: "pricing-at-eight-dollars",
    title: "Why Prometheus Costs $8/Month",
    description:
      "The pricing model is intentionally simple: one clear plan, one honest price, and enough room to keep shipping execution features quickly.",
    date: "2026-03-08",
    author: "Prometheus Team",
    category: "Pricing",
    tags: ["pricing", "product", "subscription"],
    readTime: "4 min",
    heroKicker: "Simple subscription",
    heroStatement:
      "Prometheus is priced to be easy to try, honest to explain, and sustainable enough to keep improving the execution layer.",
    takeaways: [
      "The $8/month plan keeps the product simple and accessible.",
      "Clear pricing reduces decision friction and supports conversion.",
      "The subscription funds a product direction centered on real execution rather than shallow feature theater.",
    ],
    sections: [
      {
        heading: "Why simple pricing wins early",
        body: [
          "Complicated pricing creates hesitation. For Prometheus, the early promise is straightforward: one system that can execute real workflows from your machine. The pricing should be just as straightforward.",
          "At $8/month, the decision is easy to understand. It gives users a low-friction way to enter the product while keeping the business model subscription-first from day one.",
        ],
      },
      {
        heading: "What the plan represents",
        body: [
          "The price is not just access to a chat UI. It is access to a growing local AI operating layer: browser automation, memory, background tasks, scheduling, files, integrations, and multi-agent workflows.",
          "The goal is to make Prometheus feel like an obvious utility. If it saves one hour, catches one issue, or completes one tedious workflow, the monthly price should feel almost boring.",
        ],
      },
      {
        heading: "Why not hide everything behind tiers",
        body: [
          "Early products need trust more than pricing gymnastics. A single clear plan makes the value easier to communicate and avoids punishing users for wanting the features that make Prometheus different.",
          "Future plans may make sense for teams, businesses, hosted infrastructure, or advanced support. But the core product needs a clean starting point.",
        ],
      },
      {
        heading: "The bigger promise",
        body: [
          "Prometheus is being built for people who want an assistant that actually helps operate their life and work. The pricing should invite them in, then let the product prove itself through execution.",
          "That is the bargain: simple subscription, serious capability, and a product that keeps compounding.",
        ],
      },
    ],
    relatedLinks: [
      { label: "See pricing", href: "/pricing" },
      { label: "Read the product story", href: "/blog/introducing-prometheus" },
      { label: "Create an account", href: "/signup" },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const post = getBlogPost(slug);

  if (!post) {
    return blogPosts.filter((candidate) => candidate.slug !== slug).slice(0, limit);
  }

  return blogPosts
    .filter((candidate) => candidate.slug !== slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length + (candidate.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, limit)
    .map(({ post: candidate }) => candidate);
}
