import type { Metadata } from "next";
import SimulationsPageContent from "@/components/pages/SimulationsPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/simulations", dictionary.seo.simulations);
}

export default async function SimulationsPage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dictionary.nav.labels["/"], path: "/" },
    { name: dictionary.nav.labels["/simulations"], path: "/simulations" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SimulationsPageContent />
    </>
  );
}
