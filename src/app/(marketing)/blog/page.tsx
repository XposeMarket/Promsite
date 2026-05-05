import { createMetadata } from "@/lib/seo/metadata";
import { blogPosts } from "@/content/blog/posts";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Read product stories, deep dives, and SEO-friendly guides on AI execution, browser automation, background tasks, memory, and Prometheus workflows.",
  path: "/blog",
});

const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
const recentPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug);
const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).slice(0, 12);

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
            url: "https://prometheus.ai/blog",
            publisher: {
              "@type": "Organization",
              name: "Prometheus",
            },
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              author: { "@type": "Organization", name: post.author },
              url: `https://prometheus.ai/blog/${post.slug}`,
            })),
          }),
        }}
      />

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-background to-background" />
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-ember">Blog</p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Essays, product stories, and operational guides from inside Prometheus.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              This is the public brain of the product: launch notes, workflow breakdowns, execution
              patterns, and practical guides for building with an AI system instead of a chat box.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="rounded-2xl border border-border bg-surface/70 p-8 shadow-[0_0_50px_rgba(255,107,53,0.08)] backdrop-blur">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="rounded-full border border-ember/20 bg-ember/10 px-2.5 py-1 text-ember">
                  Featured
                </span>
                <span>{featuredPost.category}</span>
                <span>·</span>
                <time dateTime={featuredPost.date}>{featuredPost.date}</time>
                <span>·</span>
                <span>{featuredPost.readTime} read</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                <Link href={`/blog/${featuredPost.slug}`} className="transition-colors hover:text-ember">
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{featuredPost.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs uppercase tracking-wide text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
                >
                  Read featured post
                </Link>
                <span className="text-sm text-muted">By {featuredPost.author}</span>
              </div>
            </article>

            <aside className="rounded-2xl border border-border bg-background/80 p-8">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">Editorial system</p>
              <p className="mt-4 text-sm leading-7 text-muted">
                Built as a real content hub with clean slugs, article metadata, categories, tags,
                internal links, structured data, and room for long-tail SEO expansion.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-border bg-surface/60 p-3">
                  <dt className="text-2xl font-bold text-white">{blogPosts.length}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wide text-muted">Posts</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface/60 p-3">
                  <dt className="text-2xl font-bold text-white">{categories.length}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wide text-muted">Categories</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface/60 p-3">
                  <dt className="text-2xl font-bold text-white">{allTags.length}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wide text-muted">Tags</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">Latest posts</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Current writing from the team
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted">
              The blog is intentionally structured like a content engine: one featured story, then a
              clean grid of supporting posts for product education and search discovery.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex min-h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-ember/30 hover:shadow-[0_0_40px_rgba(255,107,53,0.08)]"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span className="text-ember">{post.category}</span>
                  <span>·</span>
                  <time dateTime={post.date}>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-ember">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">{post.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/80 px-2.5 py-1 text-[11px] uppercase tracking-wide text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-6 text-sm font-medium text-ember">Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-ember/10 to-transparent p-8">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">Browse by category</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category} className="rounded-full border border-ember/20 bg-ember/10 px-3 py-1 text-sm text-ember">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background/80 p-8">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">SEO tags</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-wide text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-gradient-to-r from-ember/10 to-transparent p-8 md:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">Editorial focus</p>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold text-white">Why this blog exists</h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Prometheus needs a content layer that does more than announce features. The blog gives
                  search engines and humans a structured place to understand how the system works in
                  practice.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">What it supports</h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Product storytelling, SEO visibility, onboarding education, trust building, and a clear
                  paper trail of how the platform evolves over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
