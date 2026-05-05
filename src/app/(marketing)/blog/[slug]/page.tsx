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
                url: `${SITE_URL}/images/prometheus-logo.png`,
              },
            },
            mainEntityOfPage: articleUrl,
            url: articleUrl,
            keywords: post.tags.join(", "),
          }),
        }}
      />

      <article>
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-background to-background" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-ember/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
            <Link href="/blog" className="text-sm font-medium text-ember transition-colors hover:text-ember-light">
              ← Back to blog
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="rounded-full border border-ember/20 bg-ember/10 px-2.5 py-1 text-ember">
                {post.category}
              </span>
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime} read</span>
              <span>·</span>
              <span>By {post.author}</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted">{post.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs uppercase tracking-wide text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">Core thesis</p>
                <p className="mt-4 text-sm leading-7 text-muted">{post.heroStatement}</p>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-background/80 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">Key takeaways</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                  {post.takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="rounded-2xl border border-border bg-gradient-to-br from-ember/10 via-surface to-surface p-8 md:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">{post.heroKicker}</p>
                <p className="mt-4 text-2xl font-semibold leading-9 tracking-tight text-white">{post.heroStatement}</p>
              </div>

              <div className="mt-10 space-y-10">
                {post.sections.map((section) => (
                  <section key={section.heading} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{section.heading}</h2>
                    <div className="mt-5 space-y-5">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-8 text-muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-12 rounded-2xl border border-border bg-charcoal p-8">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">Keep moving</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Next steps inside Prometheus</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {post.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-xl border border-border bg-background/70 p-4 text-sm font-medium text-white transition-colors hover:border-ember/40 hover:text-ember"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-ember">Related reading</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Continue through the operating manual
              </h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-ember transition-colors hover:text-ember-light">
              View all posts →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:border-ember/30 hover:shadow-[0_0_40px_rgba(255,107,53,0.08)]"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="text-ember">{related.category}</span>
                  <span>·</span>
                  <span>{related.readTime}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-ember">
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
