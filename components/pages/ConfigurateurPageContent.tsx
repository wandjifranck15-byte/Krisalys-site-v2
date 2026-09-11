"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ConfiguratorWizard from "@/components/configurator/ConfiguratorWizard";
import CTASection from "@/components/sections/CTASection";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function ConfigurateurPageContent() {
  const dictionary = useDictionary();
  const p = dictionary.pages.configurateur;
  return (
    <>
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading eyebrow={p.eyebrow} title={p.title} description={p.description} as="h1" />
          <div className="mt-12">
            <ConfiguratorWizard />
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
