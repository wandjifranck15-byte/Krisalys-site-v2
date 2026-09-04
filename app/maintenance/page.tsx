import type { Metadata } from "next";
import MaintenancePageContent from "@/components/pages/MaintenancePageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/maintenance", dictionary.seo.maintenance);
}

export default function MaintenancePage() {
  return <MaintenancePageContent />;
}
