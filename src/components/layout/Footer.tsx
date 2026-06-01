import Link from "next/link";
import Image from "next/image";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Capabilities", href: "/capabilities" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Download", href: "/download" },
      { label: "Get Started", href: "/get-started" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Compare", href: "/compare" },
      { label: "Local-First AI", href: "/local-first-ai" },
    ],
  },
];

const socials = [
  {
    label: "X",
    href: "https://x.com/PrometheusAI_x",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L4.8 22H1.54l8.02-9.17L1.5 2h6.75l4.66 6.16L18.244 2Zm-1.16 18h1.83L7.01 3.9H5.05l12.034 16.1Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.4fr] gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/prometheus-logo.png"
                alt="Prometheus"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-foreground">
                Prometheus
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-[15rem]">
              The world&apos;s first Everything AI. Built for people who need AI
              that executes.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-ember hover:border-ember/40 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Stay updated
            </h3>
            <p className="text-sm text-muted mb-4">
              Get the latest from Prometheus.
            </p>
            <form
              action="/get-started"
              method="get"
              className="flex items-center gap-2 max-w-xs"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 min-w-0 rounded-lg bg-surface border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-ember/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex-shrink-0 w-10 h-10 rounded-lg bg-ember text-white flex items-center justify-center hover:bg-ember-dark transition-colors"
              >
                <span aria-hidden>&rarr;</span>
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Prometheus Labs, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
