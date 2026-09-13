"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/types";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";

export default function Providers({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  return (
    <ThemeProvider>
      <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
