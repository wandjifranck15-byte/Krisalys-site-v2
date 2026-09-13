import type { Metadata } from "next";
import RealisationsPageContent from "@/components/pages/RealisationsPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/realisations", dictionary.seo.realisations);
}

export default async function RealisationsPage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dictionary.nav.labels["/"], path: "/" },
    { name: dictionary.nav.labels["/realisations"], path: "/realisations" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RealisationsPageContent />
    </>
  );
}
