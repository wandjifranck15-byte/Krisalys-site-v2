import type { Metadata } from "next";
import ConfigurateurPageContent from "@/components/pages/ConfigurateurPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/configurateur", dictionary.seo.configurateur);
}

export default async function ConfigurateurPage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dictionary.nav.labels["/"], path: "/" },
    { name: dictionary.nav.labels["/configurateur"], path: "/configurateur" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ConfigurateurPageContent />
    </>
  );
}
