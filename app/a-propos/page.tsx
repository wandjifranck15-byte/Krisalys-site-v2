import type { Metadata } from "next";
import AProposPageContent from "@/components/pages/AProposPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/a-propos", dictionary.seo.aPropos);
}

export default function AProposPage() {
  return <AProposPageContent />;
}
