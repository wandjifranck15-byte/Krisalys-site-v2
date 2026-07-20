import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";
import { blogPosts } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/nos-solutions",
    "/secteurs",
    "/simulations",
    "/realisations",
    "/notre-methode",
    "/maintenance",
    "/a-propos",
    "/faq",
    "/blog",
    "/contact",
    "/configurateur",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
