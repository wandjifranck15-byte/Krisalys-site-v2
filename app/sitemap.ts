import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";
import { blogPosts } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/nos-solutions",
    "/film-led-transparent",
    "/ecrans-led-transparents",
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
    priority: route === "" ? 1 : route.startsWith("/film-led") || route.startsWith("/ecrans-led") ? 0.9 : 0.7,
  }));

  // Pages juridiques : présentes dans le sitemap (contenu réel, indexable)
  // mais priorité minimale et fréquence de changement faible — jamais mises
  // en avant dans le classement face aux pages commerciales ci-dessus.
  const legalRoutes = ["/mentions-legales", "/conditions", "/confidentialite"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...legalRoutes, ...blogRoutes];
}
