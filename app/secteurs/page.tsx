import type { Metadata } from "next";
import SecteursPageContent from "@/components/pages/SecteursPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/secteurs", dictionary.seo.secteurs);
}

export default function SecteursPage() {
  return <SecteursPageContent />;
}
