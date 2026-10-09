/**
 * Single source of truth for the public site origin and SEO constants.
 *
 * The canonical origin is a product fact, not deploy config: it is NOT read
 * from NEXT_PUBLIC_SITE_URL on purpose. A stale env value previously pointed
 * robots.txt and sitemap.xml at prometheusaiagent.vercel.app with a double
 * slash. prometheusaiagent.com (apex) 308-redirects to www, so www is canonical.
 */
export const SITE_URL = "https://www.prometheusaiagent.com";

export const SITE_NAME = "Prometheus";
/** Brand used in <title> suffixes. "Prometheus AI" disambiguates from prometheus.io (monitoring). */
export const TITLE_BRAND = "Prometheus AI";
export const PRODUCT_NAME = "Prometheus One";
export const TWITTER_HANDLE = "@PrometheusAI_x";
export const TWITTER_URL = "https://x.com/PrometheusAI_x";

export const DEFAULT_OG_IMAGE = {
  url: "/og/p1-og.jpg",
  width: 1200,
  height: 630,
  alt: "Prometheus One, the local-first AI agent. Everything just got a whole lot easier.",
};
export const SQUARE_OG_IMAGE = {
  url: "/og/p1-og-square.jpg",
  width: 1200,
  height: 1200,
  alt: "Prometheus One logo",
};
export const LOGO_URL = `${SITE_URL}/images/p1-mark-ring.png`;

/**
 * Only the production deployment may be indexed. Vercel preview deployments
 * (VERCEL_ENV=preview) get noindex + a disallow-all robots.txt. Local/dev
 * builds (no VERCEL_ENV) behave like production so output can be inspected.
 */
export const IS_INDEXABLE_DEPLOYMENT = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : true;

/** Absolute URL on the canonical origin. Never produces a double slash or a trailing slash on "/". */
export function absoluteUrl(path = "/"): string {
  const clean = `/${String(path).trim().replace(/^\/+/, "")}`.replace(/\/+$/, "");
  return clean === "" ? SITE_URL : `${SITE_URL}${clean}`;
}
