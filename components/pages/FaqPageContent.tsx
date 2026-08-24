"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";
import { faqItems } from "@/data/faq";
import type { FAQItem } from "@/types";
import { useDictionary } from "@/lib/i18n/LocaleContext";

type FaqCategory = FAQItem["category"];

const categoryKeys: FaqCategory[] = ["technique", "commercial", "apres-vente"];

export default function FaqPageContent() {
  const dictionary = useDictionary();
  const categoryLabels: Record<FaqCategory, string> = {
    technique: dictionary.faqCategories.technique,
    commercial: dictionary.faqCategories.commercial,
    "apres-vente": dictionary.faqCategories.apresVente,
  };

  return (
    <>
      <section className="bg-canvas py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={dictionary.pages.faq.eyebrow} title={dictionary.pages.faq.title} />
          <div className="mt-12 space-y-12">
            {categoryKeys.map((key) => (
              <div key={key}>
                <h2 className="mb-4 text-lg font-semibold text-krisalys-blue-deep">{categoryLabels[key]}</h2>
                <FAQAccordion items={faqItems.filter((f) => f.category === key)} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTASection title={dictionary.pages.faq.ctaTitle} ctaLabel={dictionary.common.ctaAlt[5]} />
    </>
  );
}
