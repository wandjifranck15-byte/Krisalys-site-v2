import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import BlogPostContent from "@/components/pages/BlogPostContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// Chantier SEO (Phase 4) : la locale est désormais résolue côté serveur
// via le cookie de langue, comme pour toutes les autres pages — cette
// route n'est plus une exception.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const post = getBlogPostBySlug(slug, locale);
  if (!post) return {};
  return buildMetadata(locale, `/blog/${slug}`, { title: post.title, description: post.excerpt });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const post = getBlogPostBySlug(slug, locale);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dictionary.nav.labels["/"], path: "/" },
    { name: dictionary.nav.labels["/blog"], path: "/blog" },
    ...(post ? [{ name: post.title, path: `/blog/${slug}` }] : []),
  ]);

  // BlogPosting — auteur déclaré comme l'organisation KRISALYS (aucun
  // auteur individuel n'existe dans data/blog-posts.ts, jamais inventé ici).
  const articleJsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        author: { "@type": "Organization", name: siteConfig.legalName },
        publisher: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
        mainEntityOfPage: `${siteConfig.url}/blog/${slug}`,
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {articleJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      )}
      <BlogPostContent slug={slug} />
    </>
  );
}
