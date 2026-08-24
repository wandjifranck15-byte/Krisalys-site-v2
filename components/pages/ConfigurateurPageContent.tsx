"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Configurator from "@/components/sections/Configurator";
import CTASection from "@/components/sections/CTASection";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function ConfigurateurPageContent() {
  const dictionary = useDictionary();
  const p = dictionary.pages.configurateur;
  return (
    <>
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading eyebrow={p.eyebrow} title={p.title} description={p.description} />
          <div className="mt-12">
            <Configurator />
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
