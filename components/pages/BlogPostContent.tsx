"use client";

import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import { getBlogPostBySlug } from "@/data/blog-posts";
import { useLocale } from "@/lib/i18n/LocaleContext";

export default function BlogPostContent({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const post = getBlogPostBySlug(slug, locale);
  if (!post) notFound();

  return (
    <>
      <article className="bg-canvas py-20">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-krisalys-blue-deep">
            {post.category} · {post.readingTime}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{post.title}</h1>
          <div className="mt-8 space-y-5 text-ink-muted">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </article>
      <CTASection />
    </>
  );
}
