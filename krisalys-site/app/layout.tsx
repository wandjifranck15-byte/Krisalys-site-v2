import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackToTop from "@/components/layout/BackToTop";
import { siteConfig } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "KRISALYS — Écrans LED & solutions visuelles au Cameroun",
    template: "%s | KRISALYS",
  },
  description: siteConfig.description,
  keywords: [
    "écran LED Douala",
    "écran LED Cameroun",
    "façade numérique Douala",
    "affichage dynamique Cameroun",
    "écran publicitaire Cameroun",
    "écran transparent Douala",
    "installation écran LED Cameroun",
    "communication digitale Cameroun",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "KRISALYS — Écrans LED & solutions visuelles au Cameroun",
    description: siteConfig.description,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "KRISALYS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KRISALYS — Écrans LED & solutions visuelles au Cameroun",
    description: siteConfig.description,
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
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
              description: siteConfig.description,
            }),
          }}
        />
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
