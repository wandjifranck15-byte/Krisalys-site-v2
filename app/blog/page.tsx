import type { Metadata } from "next";
import BlogPageContent from "@/components/pages/BlogPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/blog", dictionary.seo.blog);
}

export default function BlogPage() {
  return <BlogPageContent />;
}
