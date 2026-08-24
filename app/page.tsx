import Hero from "@/components/sections/Hero";
import WhyKrisalys from "@/components/sections/WhyKrisalys";
import SolutionsOverview from "@/components/sections/SolutionsOverview";
import HowItWorks from "@/components/sections/HowItWorks";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import TestimonialsPlaceholder from "@/components/sections/TestimonialsPlaceholder";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { methodSteps } from "@/data/method-steps";
import { faqItems } from "@/data/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyKrisalys />
      <SolutionsOverview />

      <section className="bg-surface-soft py-24">
        <Container>
          <SectionHeading
            eyebrow="Projection"
            title="Imaginez votre façade transformée"
            description="Faites glisser le curseur pour comparer une façade avant et après l'intégration d'une solution KRISALYS."
          />
          <div className="mt-12">
            <BeforeAfterSlider />
          </div>
        </Container>
      </section>

      <HowItWorks steps={methodSteps.slice(0, 5)} />
      <TestimonialsPlaceholder />

      <section className="bg-canvas py-24">
        <Container>
          <SectionHeading eyebrow="Questions fréquentes" title="Les questions les plus posées" />
          <div className="mt-10 max-w-3xl">
            <FAQAccordion items={faqItems.slice(0, 5)} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
