import type { Metadata } from "next";
import TechnologyPageContent from "@/components/pages/TechnologyPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/ecrans-led-transparents", dictionary.seo.ecransLedTransparents);
}

export default function EcransLedTransparentsPage() {
  return <TechnologyPageContent slug="ecran-led-transparent" />;
}
