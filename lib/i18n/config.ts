import { Locale, Dictionary } from "@/types";
import fr from "./dictionaries/fr";
import en from "./dictionaries/en";

// Architecture d'internationalisation légère, sans routing par segment
// [locale] (pour ne pas modifier les URLs existantes — voir README). Le
// changement de langue est piloté côté client par LocaleProvider
// (lib/i18n/LocaleContext.tsx), qui persiste le choix (cookie + localStorage)
// et fournit le dictionnaire actif via useDictionary().
export const defaultLocale: Locale = "fr";
export const locales: Locale[] = ["fr", "en"];

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
