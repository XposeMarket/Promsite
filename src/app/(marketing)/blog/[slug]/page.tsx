import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getRelatedBlogPosts } from "@/content/blog/posts";
import { createMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/metadata";

interface BlogArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createMetadata({
      title: "Blog post not found",
      description: "The requested Prometheus blog post could not be found.",
      path: "/blog",
      noIndex: true,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Organization", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "Prometheus",
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/images/p1-mark-ring.png`,
              },
            },
            mainEntityOfPage: articleUrl,
            url: articleUrl,
            keywords: post.tags.join(", "),
          }),
        }}
      />

      <article>
        {/* ── Masthead ── */}
        <header className="relative overflow-hidden pt-32 md:pt-40 pb-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,183,94,0.09)_0%,transparent_62%)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
            <Link href="/blog" className="kicker !text-muted transition-colors hover:!text-gold">
              ← The Journal
            </Link>
            <p className="kicker mt-10">{post.category}</p>
            <h1 className="mt-6 text-4xl leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">{post.title}</h1>
            <div className="rule-draw mx-auto my-8 w-28" />
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">{post.description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <time dateTime={post.date}>{post.date}</time>
              <span className="text-gold/50">/</span>
              <span>{post.readTime} read</span>
              <span className="text-gold/50">/</span>
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {/* ── Pull quote ── */}
        <section className="mx-auto max-w-4xl px-6 lg:px-8">
          <figure className="border-y border-gold/20 py-10 text-center">
            <p className="kicker !text-[0.6rem] mb-5">{post.heroKicker}</p>
            <blockquote className="text-2xl italic leading-snug text-gold-metal md:text-4xl" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              “{post.heroStatement}”
            </blockquote>
          </figure>
        </section>

        {/* ── Body ── */}
        <section className="py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[15rem_1fr] lg:px-8">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="kicker mb-5">In brief</p>
              <ol className="space-y-5">
                {post.takeaways.map((takeaway, i) => (
                  <li key={takeaway} className="grid grid-cols-[2rem_1fr] gap-2 text-sm leading-6 text-muted">
                    <span className="num-display text-lg text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-gold/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </aside>

            <div className="min-w-0 max-w-[68ch]">
              {post.sections.map((section, si) => (
                <section key={section.heading} className="scroll-mt-28 [&+&]:mt-14">
                  <p className="kicker !text-[0.6rem] !text-muted mb-3">§ {String(si + 1).padStart(2, "0")}</p>
                  <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">{section.heading}</h2>
                  <div className="mt-6 space-y-6">
                    {section.body.map((paragraph, pi) => (
                      <p
                        key={paragraph}
                        className={`text-[1.06rem] leading-8 text-foreground/80 ${
                          si === 0 && pi === 0
                            ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-[family-name:var(--font-display)] first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-gold"
                            : ""
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="mt-16 border-t border-gold/20 pt-10">
                <p className="kicker mb-6">Keep moving</p>
                <div className="grid gap-px overflow-hidden rounded-xl border border-gold/15 bg-gold/15 sm:grid-cols-3">
                  {post.relatedLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="group bg-background p-5 transition-colors hover:bg-surface">
                      <span className="text-lg transition-colors group-hover:text-gold-light" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                        {link.label}
                      </span>
                      <span className="mt-2 block text-gold">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* ── Related ── */}
      <section className="border-t border-gold/15 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="kicker mb-4">Related reading</p>
              <h2 className="text-3xl tracking-tight md:text-5xl">
                Continue the <em className="text-gold-metal italic pr-1">manual.</em>
              </h2>
            </div>
            <Link href="/blog" className="kicker !text-muted transition-colors hover:!text-gold">
              All posts →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="group panel p-6 transition-colors hover:border-gold/40">
                <p className="kicker !text-[0.6rem]">{related.category} · {related.readTime}</p>
                <h3 className="mt-4 text-2xl leading-tight tracking-tight transition-colors group-hover:text-gold-light" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {related.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{related.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

