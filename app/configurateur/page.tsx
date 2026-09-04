import type { Metadata } from "next";
import ConfigurateurPageContent from "@/components/pages/ConfigurateurPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/configurateur", dictionary.seo.configurateur);
}

export default function ConfigurateurPage() {
  return <ConfigurateurPageContent />;
}
