"use client";

import Hero from "@/components/sections/Hero";
import WhyKrisalys from "@/components/sections/WhyKrisalys";
import SolutionsOverview from "@/components/sections/SolutionsOverview";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import TestimonialsPlaceholder from "@/components/sections/TestimonialsPlaceholder";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HomeMethodAndFaq from "@/components/pages/HomeMethodAndFaq";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function HomePage() {
  const dictionary = useDictionary();
  const p = dictionary.pages.home;
  return (
    <>
      <Hero />
      <WhyKrisalys />
      <SolutionsOverview />

      <section className="bg-surface-soft py-24">
        <Container>
          <SectionHeading
            eyebrow={p.projectionEyebrow}
            title={p.projectionTitle}
            description={p.projectionDescription}
          />
          <div className="mt-12">
            <BeforeAfterSlider />
          </div>
        </Container>
      </section>

      <HomeMethodAndFaq />
      <TestimonialsPlaceholder />

      <CTASection />
    </>
  );
}
