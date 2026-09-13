import type { Metadata } from "next";
import FaqPageContent from "@/components/pages/FaqPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { getFaqItems } from "@/data/faq";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/faq", dictionary.seo.faq);
}

export default async function FAQPage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  // Schema FAQPage généré depuis la même source que le contenu affiché
  // (data/faq.ts) — aucune donnée dupliquée, aucune question inventée.
  const faqItems = getFaqItems(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dictionary.nav.labels["/"], path: "/" },
    { name: dictionary.nav.labels["/faq"], path: "/faq" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <FaqPageContent />
    </>
  );
}
