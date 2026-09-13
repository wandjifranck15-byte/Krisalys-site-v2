import type { Metadata } from "next";
import SecteursPageContent from "@/components/pages/SecteursPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/secteurs", dictionary.seo.secteurs);
}

export default async function SecteursPage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dictionary.nav.labels["/"], path: "/" },
    { name: dictionary.nav.labels["/secteurs"], path: "/secteurs" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SecteursPageContent />
    </>
  );
}
