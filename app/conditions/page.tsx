import type { Metadata } from "next";
import ConditionsPageContent from "@/components/pages/ConditionsPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/conditions", dictionary.seo.conditions);
}

export default function ConditionsPage() {
  return <ConditionsPageContent />;
}
