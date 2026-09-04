import type { Metadata } from "next";
import MentionsLegalesPageContent from "@/components/pages/MentionsLegalesPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/mentions-legales", dictionary.seo.mentionsLegales);
}

export default function MentionsLegalesPage() {
  return <MentionsLegalesPageContent />;
}
