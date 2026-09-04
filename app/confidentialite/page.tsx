import type { Metadata } from "next";
import ConfidentialitePageContent from "@/components/pages/ConfidentialitePageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/confidentialite", dictionary.seo.confidentialite);
}

export default function ConfidentialitePage() {
  return <ConfidentialitePageContent />;
}
