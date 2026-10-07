// Capability atlas: every major Prometheus surface, verified against the
// PromSRC self guidebook (workspace/self, a48712ccc) and generated inventories.
export type AtlasGroup = "Operate" | "Agents" | "Create" | "Mind" | "Reach" | "Trust";

export interface AtlasItem {
  id: string;
  group: AtlasGroup;
  title: string;
  accent: string;
  line: string;
  points: string[];
  tools: string[];
  viz: string;
  stat?: string;
}

export const ATLAS_GROUPS: { id: AtlasGroup; hint: string }[] = [
  { id: "Operate", hint: "Hands on your machine" },
  { id: "Agents", hint: "More than one mind" },
  { id: "Create", hint: "Images, video, games, visuals" },
  { id: "Mind", hint: "Memory that compounds" },
  { id: "Reach", hint: "Voice, phone, apps" },
  { id: "Trust", hint: "Gated, audited, yours" },
];

export const ATLAS: AtlasItem[] = [
  {
    id: "browser", group: "Operate", title: "In-app browser", accent: "signed in as you",
    line: "A real browser panel inside Prometheus with your persistent profile. Prom navigates, clicks, fills and extracts while you watch.",
    points: ["Agent, copilot and teach modes: watch it, work alongside it, or teach it a flow once", "Login walls hand control to you: you type the password, Prom never sees it", "Subagents share the same browser profile, and the panel follows whichever thread is working"],
    tools: ["browser_session", "browser_observe", "browser_act", "browser_extract", "request_browser_login"],
    viz: "browser", stat: "33 browser tools",
  },
  {
    id: "desktop", group: "Operate", title: "Desktop control", accent: "any app",
    line: "Native screen, window, keyboard and mouse control for apps that don't have an API.",
    points: ["Screenshot-grounded: it looks before every click", "Focus windows, launch apps, type, drag, record and replay macros", "Small, verified action batches instead of blind scripts"],
    tools: ["desktop_screen", "desktop_apps", "desktop_window", "desktop_input", "desktop_macro"],
    viz: "desktop", stat: "52 desktop tools",
  },
  {
    id: "code", group: "Operate", title: "Files, terminal & code", accent: "real repos",
    line: "Typed read, edit, run, git and code-navigation tools that work on your real filesystem, not a sandbox.",
    points: ["Surgical edits with post-edit context, patchsets across many files", "Supervised processes: dev servers, builds and watchers with live logs", "Branches, commits, pushes and PRs through GitHub, with snapshots and one-step revert"],
    tools: ["workspace_read", "workspace_edit", "workspace_run", "workspace_git", "workspace_safety", "workspace_code_nav"],
    viz: "code",
  },
  {
    id: "native", group: "Operate", title: "Native tools", accent: "638 of them",
    line: "Web search and fetch across several engines, media download and analysis, delivery, timers, questions, approvals. All built in.",
    points: ["Tool categories load on demand, so the model only sees what the job needs", "tool_search finds any connected-app or MCP tool without bloating the prompt", "Saved composite tools turn a multi-step routine into one call"],
    tools: ["web_search", "web_fetch", "analyze_image", "analyze_video", "download_media", "tool_search", "delivery_send"],
    viz: "connect", stat: "638 tool definitions",
  },
  {
    id: "prombot", group: "Agents", title: "Prom Bot mode", accent: "your bot roster",
    line: "Flip the sidebar into a roster of your own bots. Each one gets a full chat in the main window, with its own memory, model and workspace.",
    points: ["Create bots from templates: researcher, analyst, builder, writer, or blank", "Live roster badges show which bots are working and which need you", "Search and switch bots without losing anyone's thread"],
    tools: ["Prom Bot sidebar", "bot templates", "per-bot model routing"],
    viz: "prombot",
  },
  {
    id: "subagents", group: "Agents", title: "Standalone subagents", accent: "specialists on call",
    line: "Persistent specialists with their own identity, workspace and model. Chat with them directly or hand them formal tasks.",
    points: ["Each subagent keeps its own chat history, files and soul", "Route each one to a different model: Opus for code, a fast model for scans", "Background agents run in parallel and report back before the reply finalizes"],
    tools: ["agent_ops", "agent_chat_ops", "background_ops", "agent_run_ops"],
    viz: "subagents",
  },
  {
    id: "teams", group: "Agents", title: "Managed teams", accent: "plan, build, review",
    line: "A manager plus members in a shared room with a shared workspace. The manager dispatches, members build and review, and the manager verifies the result.",
    points: ["Event-driven: finished work wakes the manager, no polling", "Goals, focus and pause controls for the whole team", "Teams can point at a real project folder and work inside it"],
    tools: ["team_ops_wrapper", "team_collab_ops", "manage_team_goal"],
    viz: "team",
  },
  {
    id: "automations", group: "Agents", title: "Schedules & triggers", accent: "while you sleep",
    line: "Cron jobs, one-off timers, a proactive heartbeat and event-driven trigger rules. Four separate engines for four kinds of later.",
    points: ["Each job can have its own model or team", "Jobs run concurrently and never double-run", "Results land in chat, on your phone, or in Telegram"],
    tools: ["schedule_job", "timer", "update_heartbeat", "trigger rules"],
    viz: "schedule",
  },
  {
    id: "visuals", group: "Create", title: "In-chat visuals", accent: "you can touch",
    line: "The Viz Kit draws analyst-grade dashboards in the reply: charts, heatmaps, zoomable treemaps, sankeys, timelines and simulations.",
    points: ["Tap any data point and a question about it lands in your composer", "Sliders, forms and design-variant pickers that send results back to Prom", "Export PNG, a 1600×900 X post or CSV, all in your theme"],
    tools: ["ui.chart", "ui.treemap", "ui.sankey", "ui.compare", "ui.params", "ui.form"],
    viz: "viz", stat: "25 components",
  },
  {
    id: "cards", group: "Create", title: "Live cards", accent: "real data",
    line: "Weather, markets, prediction markets, sports, maps, places, news, products and more, fetched live and rendered as native cards.",
    points: ["Quizzes, flashcards, polls, calculators and unit converters Prom writes itself", "Drafts arrive as copy-ready writing cards", "Images and videos from your workspace play inline"],
    tools: ["show_ui_card", "quiz", "flashcards", "poll", "calculator", "writing"],
    viz: "cards", stat: "19 card types",
  },
  {
    id: "image", group: "Create", title: "Image generation", accent: "built in",
    line: "OpenAI and xAI image models, including Codex sign-in, wired straight into chat and the creative studio.",
    points: ["Exact sizes honored across chat and video stills", "Reference stills, product shots and storyboard frames", "Analyze any image or screenshot with vision"],
    tools: ["generate_image", "media_generate", "analyze_image"],
    viz: "image",
  },
  {
    id: "video", group: "Create", title: "Video engine", accent: "quoted before it spends",
    line: "Projects with characters, shots, takes, a layered timeline, captions and renders. Every paid run is estimated first, with a hard budget cap.",
    points: ["fal, Higgsfield, OpenAI and xAI video models, with exact input checks", "Trend transfer: split a reel, match start frames, regenerate motion, reassemble", "Automatic take QA flags defects with timestamps"],
    tools: ["video_project", "estimate", "trend_transfer", "qa", "render"],
    viz: "video",
  },
  {
    id: "studio", group: "Create", title: "Creative studio", accent: "design · canvas · motion",
    line: "A full editor with design, image, canvas and video modes. Scenes, brand kits, templates, HyperFrames motion and Remotion renders.",
    points: ["Edits are small and inspectable, with undo history", "HyperFrames catalog: blocks, templates, lint, QA and export", "Motion graphics like this site's promo film, rendered from code"],
    tools: ["creative_project", "creative_scene", "hyperframes_*", "creative_quality_ops"],
    viz: "chart", stat: "130 creative tools",
  },
  {
    id: "games", group: "Create", title: "Game builder", accent: "playable in chat",
    line: "Describe a game, approve the art, and get a running HTML or Three.js build with a live preview card.",
    points: ["Design questions first, then the core loop, controls and win state", "Generated art is approved piece by piece, and sound is procedural and free", "Multiplayer room relay included"],
    tools: ["game_project", "scaffold", "generate_assets", "play_url"],
    viz: "game",
  },
  {
    id: "memory", group: "Mind", title: "Memory", accent: "that stays",
    line: "Who you are, what you're building and what you decided. Searchable across every past conversation, note and file.",
    points: ["USER, SOUL and MEMORY files you can read and edit", "Search across transcripts, notes, memory and ideas, with strong/partial/weak hit labels", "Open notes carry unfinished work into tomorrow"],
    tools: ["memory", "write_note", "memory_search", "projects"],
    viz: "memory",
  },
  {
    id: "brain", group: "Mind", title: "Brain", accent: "thinks between chats",
    line: "Every few hours a Thought pass reflects on recent work. Each night a Dream pass consolidates memory and proposes improvements.",
    points: ["Carry-forward context so tomorrow starts where today stopped", "Active-work ledger of what's open, blocked or done", "Pulse cards and proposals you approve"],
    tools: ["Brain Thought", "Brain Dream", "active-work ledger"],
    viz: "brain",
  },
  {
    id: "skills", group: "Mind", title: "Skills", accent: "playbooks it reads",
    line: "Reusable procedures on disk. Prom checks for a matching skill before real work and follows it.",
    points: ["Precise prompt signals instead of loose keyword matching", "A skill curator reviews and improves skills from real usage", "Write, import, package and share your own"],
    tools: ["skill_list", "skill_read", "skill_ops"],
    viz: "skills", stat: "200+ skills",
  },
  {
    id: "voice", group: "Reach", title: "Voice mode", accent: "talk, it works",
    line: "Real-time voice with OpenAI Realtime or xAI. You talk to the voice agent while a worker does the actual tool work in the background.",
    points: ["Hands-free on desktop and phone", "Silent dictation mode for typing by voice", "It only reports work the worker has actually confirmed"],
    tools: ["OpenAI Realtime", "xAI voice", "dictation"],
    viz: "voice",
  },
  {
    id: "mobile", group: "Reach", title: "Phone & Telegram", accent: "same agent",
    line: "A full mobile app talking to your own machine, plus Telegram. Start a job on desktop and check it from the couch.",
    points: ["Live tool streams, approvals and question cards on your phone", "Skins: Prometheus One, Olympian Blue, Aether Violet", "Telegram delivery for task and team updates"],
    tools: ["mobile PWA", "delivery_send", "Telegram"],
    viz: "anywhere",
  },
  {
    id: "connectors", group: "Reach", title: "Connectors & MCP", accent: "every service, fully",
    line: "GitHub, Gmail, Drive, Notion, Slack, Stripe, HubSpot, Salesforce, GA4, Reddit, Vercel, X and more, plus any MCP server.",
    points: ["First-class tools plus an approval-gated API escape hatch for each connector", "Reads run automatically; writes ask you first", "MCP presets for Brave, Filesystem, GitHub, Apple Messages and more"],
    tools: ["connector_list", "connection_ops", "<connector>_api_request", "mcp__*"],
    viz: "connect", stat: "19 connectors · 9 MCP presets",
  },
  {
    id: "models", group: "Reach", title: "Any model", accent: "your choice",
    line: "Anthropic, OpenAI (API or ChatGPT sign-in), xAI and local models. Switch mid-chat, and route each agent to a different one.",
    points: ["A fast or careful tier for lighter steps, automatically", "Per-agent and per-schedule model routing", "Fallback when one provider hits its limits"],
    tools: ["set_current_model", "switch_model", "model routing"],
    viz: "subagents",
  },
  {
    id: "safety", group: "Trust", title: "Approvals & audit", accent: "nothing silent",
    line: "Posting, sending, purchasing and deleting all stop for a one-tap approval. Every action is written to an audit log on your disk.",
    points: ["Default and Lite permission modes; dangerous commands are always blocked", "Admin commands need fresh approval every time", "Snapshots, restore and revert for workspace changes"],
    tools: ["request_final_action_approval", "workspace_safety", "audit log"],
    viz: "shield",
  },
  {
    id: "local", group: "Trust", title: "Local-first", accent: "your disk",
    line: "Memory, files, sessions, the audit log and your vault all live on your machine. Only the model you pick sees the prompt.",
    points: ["No Prometheus servers in the loop", "Reach it from your phone through your own machine", "Encrypted vault for keys and connector credentials"],
    tools: ["vault", "storage layout", "audit log"],
    viz: "files",
  },
];
