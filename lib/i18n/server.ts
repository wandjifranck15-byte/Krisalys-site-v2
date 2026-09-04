import { cookies } from "next/headers";
import { Locale } from "@/types";
import { defaultLocale, locales } from "./config";

// Doit rester synchronisé avec COOKIE_KEY dans lib/i18n/LocaleContext.tsx.
const COOKIE_KEY = "krisalys-locale";

// Lecture serveur de la langue choisie côté client (cookie posé par
// LocaleProvider). Utilisée uniquement pour les métadonnées (SEO) — le
// contenu affiché reste piloté côté client par LocaleContext, sans routing
// par segment [locale] (voir README > Internationalisation).
export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(COOKIE_KEY)?.value;
  if (value && (locales as string[]).includes(value)) {
    return value as Locale;
  }
  return defaultLocale;
}
