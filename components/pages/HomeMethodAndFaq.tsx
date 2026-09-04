"use client";

import HowItWorks from "@/components/sections/HowItWorks";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getMethodSteps } from "@/data/method-steps";
import { getFaqItems } from "@/data/faq";
import { useLocale } from "@/lib/i18n/LocaleContext";

export default function HomeMethodAndFaq() {
  const { locale, dictionary } = useLocale();
  const steps = getMethodSteps(locale).slice(0, 5);
  const faq = getFaqItems(locale).slice(0, 5);

  return (
    <>
      <HowItWorks steps={steps} title={dictionary.pages.home.methodTitle} />

      <section className="bg-canvas py-24">
        <Container>
          <SectionHeading eyebrow={dictionary.pages.home.faqEyebrow} title={dictionary.pages.home.faqTitle} />
          <div className="mt-10 max-w-3xl">
            <FAQAccordion items={faq} />
          </div>
        </Container>
      </section>
    </>
  );
}
