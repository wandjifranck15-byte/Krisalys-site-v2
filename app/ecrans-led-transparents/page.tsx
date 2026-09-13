import type { Metadata } from "next";
import TechnologyPageContent from "@/components/pages/TechnologyPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/lib/seo";
import { getTechnologyBySlug } from "@/data/technologies";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/ecrans-led-transparents", dictionary.seo.ecransLedTransparents);
}

export default async function EcransLedTransparentsPage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const tech = getTechnologyBySlug("ecran-led-transparent", locale);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dictionary.nav.labels["/"], path: "/" },
    { name: dictionary.nav.labels["/ecrans-led-transparents"], path: "/ecrans-led-transparents" },
  ]);
  const serviceJsonLd = tech
    ? buildServiceJsonLd({ name: tech.name, description: tech.description, path: "/ecrans-led-transparents" })
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {serviceJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      )}
      <TechnologyPageContent slug="ecran-led-transparent" />
    </>
  );
}
