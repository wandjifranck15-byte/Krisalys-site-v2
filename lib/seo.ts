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
