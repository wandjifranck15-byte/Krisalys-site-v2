"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBlogPosts } from "@/data/blog-posts";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

export default function BlogPageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const blogPosts = getBlogPosts(locale);
  const p = dictionary.pages.blog;

  return (
    <section className="bg-canvas py-20">
      <Container>
        <SectionHeading eyebrow={p.eyebrow} title={p.title} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-subtle bg-surface p-6 transition-all hover:-translate-y-1 hover:border-krisalys-blue/40"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-krisalys-blue-deep">
                {post.category} · {post.readingTime}
              </p>
              <h2 className="mt-3 text-lg font-semibold text-ink">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink-muted">{post.excerpt}</p>
              <span className="mt-4 text-sm font-medium text-krisalys-blue">{p.readArticle}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
