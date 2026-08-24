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

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && (locales as string[]).includes(stored)) return stored as Locale;
  return defaultLocale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Initialisé à defaultLocale côté serveur/premier rendu pour éviter tout
  // mismatch d'hydratation ; synchronisé avec la préférence stockée juste
  // après le montage (voir useEffect ci-dessous).
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    // Cookie en complément (utile si une lecture serveur est ajoutée plus tard) :
    document.cookie = `${COOKIE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
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
