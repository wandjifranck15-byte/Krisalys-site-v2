import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackToTop from "@/components/layout/BackToTop";
import Providers from "@/components/providers/Providers";
import { siteConfig } from "@/lib/utils";
import { themeInitScript } from "@/lib/theme/ThemeContext";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Fallback global (utilisé par les pages sans metadata propre, ex.
// app/not-found.tsx) — désormais localisé via le cookie de langue (voir
// lib/i18n/server.ts). Les mots-clés restent globaux et volontairement non
// dupliqués par langue : ce sont des termes de recherche techniques FR,
// le marché camerounais ciblé restant majoritairement francophone ; à
// revoir si une stratégie de mots-clés anglais dédiée est souhaitée.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    ...buildMetadata(locale, "", dictionary.seo.home, { absoluteTitle: false }),
    title: {
      default: dictionary.seo.home.title,
      template: "%s | KRISALYS",
    },
    keywords: [
      "film LED transparent Cameroun",
      "film LED transparent Douala",
      "écran LED transparent",
      "façade LED transparente",
      "vitrine LED transparente",
      "solution LED vitrine",
      "écran LED Douala",
      "écran LED Cameroun",
      "façade numérique Douala",
      "affichage dynamique Cameroun",
      "écran publicitaire Cameroun",
      "écran transparent Douala",
      "installation écran LED Cameroun",
      "communication digitale Cameroun",
    ],
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <Script id="krisalys-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.legalName,
              url: siteConfig.url,
              logo: `${siteConfig.url}/images/brand_logo_full.png`,
              email: siteConfig.email,
              telephone: siteConfig.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: siteConfig.address.locality,
                addressCountry: siteConfig.address.country,
              },
              description: dictionary.seo.home.description,
            }),
          }}
        />
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
