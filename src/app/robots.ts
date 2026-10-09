import type { MetadataRoute } from "next";
import { IS_INDEXABLE_DEPLOYMENT, absoluteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE_DEPLOYMENT) {
    // Vercel preview deployments must never compete with production in search.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /login, /signup and /get-started stay crawlable so bots can see their noindex tag.
        disallow: ["/dashboard", "/billing", "/settings", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
