import type { Metadata } from "next";
import MethodePageContent from "@/components/pages/MethodePageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/notre-methode", dictionary.seo.notreMethode);
}

export default function NotreMethodePage() {
  return <MethodePageContent />;
}
