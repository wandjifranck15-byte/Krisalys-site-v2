import type { Metadata } from "next";
import SimulationsPageContent from "@/components/pages/SimulationsPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/simulations", dictionary.seo.simulations);
}

export default function SimulationsPage() {
  return <SimulationsPageContent />;
}
