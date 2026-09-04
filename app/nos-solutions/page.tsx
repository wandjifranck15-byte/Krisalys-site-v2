import type { Metadata } from "next";
import NosSolutionsPageContent from "@/components/pages/NosSolutionsPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/nos-solutions", dictionary.seo.nosSolutions);
}

export default function NosSolutionsPage() {
  return <NosSolutionsPageContent />;
}
