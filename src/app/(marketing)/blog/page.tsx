import { createMetadata } from "@/lib/seo/metadata";
import { blogPosts } from "@/content/blog/posts";
import Link from "next/link";
import { LuxHero } from "@/components/showcase/PageVisuals";
import { Marquee } from "@/components/showcase/Primitives";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Read product stories, deep dives, and SEO-friendly guides on AI execution, browser automation, background tasks, memory, and Prometheus workflows.",
  path: "/blog",
});

const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
const recentPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug);
const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

function fmtDate(d: string) {
  const dt = new Date(d + "T12:00:00Z");
  return Number.isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Prometheus Blog",
            description: metadata.description,
            url: "https://prometheusaiagent.com/blog",
            publisher: { "@type": "Organization", name: "Prometheus" },
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              author: { "@type": "Organization", name: post.author },
              url: `https://prometheusaiagent.com/blog/${post.slug}`,
            })),
          }),
        }}
      />

      <LuxHero kicker="The Journal · Field notes" title="Notes from inside" accent="Prometheus." sub="Launches, deep dives and working guides. Short, specific, and written by the system that does the work." />

      {/* ── Featured ── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Link href={`/blog/${featuredPost.slug}`} className="group panel grid overflow-hidden md:grid-cols-[1.1fr_0.9fr] transition-colors hover:border-gold/40">
            <div className="p-8 md:p-12">
              <p className="kicker mb-6">Featured · {featuredPost.category}</p>
              <h2 className="text-4xl md:text-5xl leading-[1.05] tracking-tight transition-colors group-hover:text-gold-light">
                {featuredPost.title}
              </h2>
              <p className="mt-5 max-w-xl text-muted leading-relaxed">{featuredPost.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <time dateTime={featuredPost.date}>{fmtDate(featuredPost.date)}</time>
                <span className="text-gold/50">/</span>
                <span>{featuredPost.readTime} read</span>
                <span className="text-gold/50">/</span>
                <span className="text-gold">Read →</span>
              </div>
            </div>
            <div className="relative hidden min-h-[320px] border-l border-gold/15 md:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(214,183,94,0.16),transparent_62%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                <p className="kicker !text-[0.6rem] !text-muted mb-5">{featuredPost.heroKicker}</p>
                <p className="text-2xl md:text-3xl italic leading-snug text-gold-metal" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  “{featuredPost.heroStatement}”
                </p>
                <div className="rule-gold mt-8 w-24" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Marquee items={categories.concat(Array.from(new Set(blogPosts.flatMap((p) => p.tags))).slice(0, 10))} />

      {/* ── Index ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="kicker mb-4">The index</p>
              <h2 className="text-4xl md:text-5xl tracking-tight">
                Every <em className="text-gold-metal italic pr-1">entry.</em>
              </h2>
            </div>
            <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {blogPosts.length} posts · {categories.length} categories
            </p>
          </div>

          <ol className="border-t border-gold/15">
            {recentPosts.map((post, i) => (
              <li key={post.slug} className="border-b border-gold/15">
                <Link href={`/blog/${post.slug}`} className="group grid gap-3 py-8 md:grid-cols-[4rem_1fr_11rem] md:items-baseline md:gap-8">
                  <span className="num-display text-3xl text-gold/60 transition-colors group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="kicker !text-[0.6rem] mb-3">{post.category}</p>
                    <h3 className="text-2xl md:text-3xl leading-tight tracking-tight transition-colors group-hover:text-gold-light" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{post.description}</p>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:text-right">
                    <time dateTime={post.date}>{fmtDate(post.date)}</time>
                    <div className="mt-1">{post.readTime} read</div>
                    <div className="mt-3 text-gold opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">Read →</div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
