"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Locale, Dictionary } from "@/types";
import { defaultLocale, getDictionary, locales } from "./config";

const STORAGE_KEY = "krisalys-locale";
const COOKIE_KEY = "krisalys-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

// Retourne `null` quand aucune préférence explicite n'est stockée (première
// visite, stockage vidé, etc.) — distinct de `defaultLocale`, pour ne
// jamais faire régresser silencieusement un `initialLocale` déjà résolu
// côté serveur depuis le cookie vers "fr" simplement parce que localStorage
// est vide (voir LocaleProvider ci-dessous).
function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  // localStorage peut lever (navigation privée Safari, stockage désactivé,
  // certaines webviews embarquées) : une lecture de préférence ne doit
  // jamais faire planter l'application — repli silencieux sur `null`,
  // comme le fait déjà themeInitScript pour le thème.
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (locales as string[]).includes(stored)) return stored as Locale;
  } catch {
    // Stockage indisponible : aucune préférence à appliquer.
  }
  return null;
}

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  // Initialisé à `initialLocale` (résolu côté serveur depuis le cookie
  // krisalys-locale — voir app/layout.tsx > getServerLocale()) : le premier
  // rendu client hydrate exactement le HTML déjà envoyé par le serveur avec
  // cette même valeur, donc aucun mismatch d'hydratation (contrairement à
  // un défaut fixe sur "fr", qui produisait un contenu de page en français
  // alors que <title> et <html lang> reflétaient déjà "en" côté serveur —
  // incohérence FR/EN visible par les moteurs de recherche, corrigée ici).
  // Après montage, si la préférence stockée localement diffère (ex. cookie
  // expiré mais localStorage toujours présent), elle prend le relais.
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored !== null && stored !== initialLocale) setLocaleState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    // Persistance best-effort : si localStorage/cookies sont indisponibles
    // (navigation privée, stockage bloqué), le choix reste actif pour la
    // session en cours (état React déjà mis à jour ci-dessus) sans faire
    // planter le gestionnaire d'événement ni bloquer les écritures suivantes.
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Stockage indisponible : préférence non persistée, session en cours préservée.
    }
    try {
      // Cookie lu côté serveur par getServerLocale() (voir lib/i18n/server.ts)
      // pour résoudre `initialLocale` dès le rendu serveur (title, html lang,
      // et maintenant le contenu de page lui-même via ce Provider) :
      document.cookie = `${COOKIE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // Écriture cookie indisponible : sans impact sur l'affichage client.
    }
  };

  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale doit être utilisé à l'intérieur de <LocaleProvider>.");
  }
  return ctx;
}

export function useDictionary(): Dictionary {
  return useLocale().dictionary;
}

// Traduit un libellé de navigation à partir de son href, avec repli sur le
// libellé français d'origine si aucune traduction n'est trouvée (garde-fou :
// n'affiche jamais de clé technique côté utilisateur).
export function useNavLabel() {
  const { dictionary } = useLocale();
  return (href: string, fallback: string) => dictionary.nav.labels[href] ?? fallback;
}
