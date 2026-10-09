import { blogPosts } from "@/content/blog/posts";
import { marketingRoutes } from "@/lib/seo/routes";
import { absoluteUrl, PRODUCT_NAME, TWITTER_URL } from "@/lib/seo/site";

export const dynamic = "force-static";

/** llms.txt (https://llmstxt.org): a plain-text map so AI search tools describe the product accurately. */
export function GET() {
  const pages = marketingRoutes
    .map((r) => `- [${r.label}](${absoluteUrl(r.path)}): ${r.summary}`)
    .join("\n");
  const posts = blogPosts
    .map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`)
    .join("\n");

  const body = `# Prometheus (${PRODUCT_NAME})

> ${PRODUCT_NAME} is a free, local-first AI agent for Windows and macOS. It runs on the user's own machine and does real work instead of only chatting: it drives a real browser, controls desktop apps, edits files and code, runs scheduled and background tasks, delegates to subagents and managed teams, generates images and video, remembers context across sessions, and connects to external services. Risky actions go through approvals.

Prometheus (the AI agent at prometheusaiagent.com) is unrelated to Prometheus the open-source monitoring system (prometheus.io).

Key facts:
- Price: free for everyone, no paid feature tiers.
- Platforms: Windows 10/11 and macOS 11+ desktop app, plus phone access to the same agent.
- Models: works with the user's choice of AI model providers, including local models.
- Data: local-first; files, memory and browser sessions stay on the user's machine.

## Pages
${pages}

## Blog
${posts}

## Optional
- [Sitemap](${absoluteUrl("/sitemap.xml")})
- [X / Twitter](${TWITTER_URL})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
