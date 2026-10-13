import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog/posts";
import { marketingRoutes } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = marketingRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(`${route.updated}T00:00:00Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
