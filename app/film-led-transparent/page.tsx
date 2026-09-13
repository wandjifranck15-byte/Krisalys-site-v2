import type { Metadata } from "next";
import TechnologyPageContent from "@/components/pages/TechnologyPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/lib/seo";
import { getTechnologyBySlug } from "@/data/technologies";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/film-led-transparent", dictionary.seo.filmLedTransparent);
}

export default async function FilmLedTransparentPage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const tech = getTechnologyBySlug("film-led-transparent", locale);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dictionary.nav.labels["/"], path: "/" },
    { name: dictionary.nav.labels["/film-led-transparent"], path: "/film-led-transparent" },
  ]);
  const serviceJsonLd = tech
    ? buildServiceJsonLd({ name: tech.name, description: tech.description, path: "/film-led-transparent" })
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {serviceJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      )}
      <TechnologyPageContent slug="film-led-transparent" />
    </>
  );
}
