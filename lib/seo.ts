import type { Metadata } from "next";
import { Locale } from "@/types";
import { siteConfig } from "@/lib/utils";

interface SeoEntry {
  title: string;
  description?: string;
}

// Construit un objet Metadata cohérent (title/description/OpenGraph/Twitter/
// canonical) à partir d'une entrée du dictionnaire déjà résolue dans la
// bonne langue. Centralisé ici pour éviter de dupliquer cette logique dans
// les 15 generateMetadata() du projet (voir README > Internationalisation).
//
// `path` doit commencer par "/" (ou être vide pour la racine) — le
// canonical généré est absolu (siteConfig.url + path). Auparavant, aucune
// page ne définissait son propre canonical : toutes héritaient donc du
// canonical racine défini dans app/layout.tsx (siteConfig.url), ce qui
// pointait incorrectement TOUTES les pages vers la page d'accueil. Corrigé
// ici : chaque page reçoit désormais son canonical réel.
export function buildMetadata(
  locale: Locale,
  path: string,
  entry: SeoEntry,
  options: { absoluteTitle?: boolean } = {}
): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogLocale = locale === "en" ? "en_US" : "fr_FR";
  const description = entry.description ?? siteConfig.description;

  return {
    title: options.absoluteTitle ? { absolute: entry.title } : entry.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url,
      siteName: siteConfig.name,
      title: entry.title,
      description,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "KRISALYS" }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

// BreadcrumbList — aide Google à comprendre la hiérarchie du site autour du
// repositionnement validé (KRISALYS > technologie / secteur / preuve...),
// jamais une donnée inventée : les libellés proviennent toujours de
// dictionary.nav.labels, déjà utilisés dans la navigation visible.
export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

// Service — décrit une des deux technologies piliers comme un service
// délivré par KRISALYS (étude, fourniture, installation), jamais comme un
// produit à prix fixe (aucune offre/prix n'est affirmée ici — voir
// lib/configurator pour la logique de prix indicatif, non dupliquée dans ce
// schema). `name`/`description` proviennent toujours de data/technologies.ts.
export function buildServiceJsonLd(options: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    serviceType: options.name,
    description: options.description,
    url: `${siteConfig.url}${options.path}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.address.city,
    },
  };
}
