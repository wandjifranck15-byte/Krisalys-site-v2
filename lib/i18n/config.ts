import { Locale, Dictionary } from "@/types";
import fr from "./dictionaries/fr";
import en from "./dictionaries/en";

// Architecture d'internationalisation légère.
// Locale par défaut et seule locale activée au lancement : "fr".
// Pour activer l'anglais : compléter dictionaries/en.ts, ajouter "en" à
// `locales`, puis introduire le routing par segment [locale] (ex. avec
// next-intl) — voir le README, section "Internationalisation".
export const defaultLocale: Locale = "fr";
export const locales: Locale[] = ["fr"]; // ajouter "en" ici quand la traduction sera complète

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
