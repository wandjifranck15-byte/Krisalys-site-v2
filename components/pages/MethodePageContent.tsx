"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HowItWorks from "@/components/sections/HowItWorks";
import CTASection from "@/components/sections/CTASection";
import { getMethodSteps } from "@/data/method-steps";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

export default function MethodePageContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  return (
    <>
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading
            eyebrow={dictionary.pages.methode.eyebrow}
            title={dictionary.pages.methode.title}
            description={dictionary.pages.methode.description}
          />
        </Container>
      </section>
      <HowItWorks
        steps={getMethodSteps(locale)}
        eyebrow={dictionary.pages.methode.stepsEyebrow}
        title={dictionary.pages.methode.stepsTitle}
      />
      <CTASection title={dictionary.pages.methode.ctaTitle} />
    </>
  );
}
