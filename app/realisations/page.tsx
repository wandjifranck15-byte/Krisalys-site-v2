import type { Metadata } from "next";
import RealisationsPageContent from "@/components/pages/RealisationsPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/realisations", dictionary.seo.realisations);
}

export default function RealisationsPage() {
  return <RealisationsPageContent />;
}
