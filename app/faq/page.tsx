import type { Metadata } from "next";
import FaqPageContent from "@/components/pages/FaqPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/faq", dictionary.seo.faq);
}

export default function FAQPage() {
  return <FaqPageContent />;
}
