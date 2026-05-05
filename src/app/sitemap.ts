import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prometheus.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/product",
    "/capabilities",
    "/how-it-works",
    "/pricing",
    "/security",
    "/docs",
    "/blog",
    "/about",
    "/contact",
    "/use-cases",
    "/compare",
    "/ai-browser-automation",
    "/background-tasks",
    "/local-first-ai",
    "/login",
    "/signup",
    "/get-started",
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/pricing" ? 0.9 : 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
