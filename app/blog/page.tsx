import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Innovation, technologie et communication digitale",
  description:
    "Articles sur l'affichage LED, la façade numérique et la communication digitale des entreprises au Cameroun.",
};

export default function BlogPage() {
  return (
    <section className="bg-canvas py-20">
      <Container>
        <SectionHeading eyebrow="Blog" title="Ressources & actualités KRISALYS" />
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
              <span className="mt-4 text-sm font-medium text-krisalys-blue">Lire l&apos;article</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
