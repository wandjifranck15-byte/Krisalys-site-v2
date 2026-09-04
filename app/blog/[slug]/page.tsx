import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import BlogPostContent from "@/components/pages/BlogPostContent";
import { getServerLocale } from "@/lib/i18n/server";
import { buildMetadata } from "@/lib/seo";

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
  return <BlogPostContent slug={slug} />;
}
