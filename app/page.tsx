"use client";

import Image from "next/image";
import Hero from "@/components/sections/Hero";
import WhyKrisalys from "@/components/sections/WhyKrisalys";
import SolutionsOverview from "@/components/sections/SolutionsOverview";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import TestimonialsPlaceholder from "@/components/sections/TestimonialsPlaceholder";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
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

      {/* Applications — visuels réels (public/images/visuals), jamais
          présentés comme des chantiers livrés : cartes éditoriales sur des
          possibilités d'intégration, cohérent avec le positionnement
          commercial validé (voir dictionary.pages.home.applications*). */}
      <section className="bg-canvas py-24">
        <Container>
          <SectionHeading
            eyebrow={p.applicationsEyebrow}
            title={p.applicationsTitle}
            description={p.applicationsDescription}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FadeIn>
              <div className="group overflow-hidden rounded-2xl border border-subtle bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/visuals/ecran-led-vitrine-mall.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-ink">{p.applicationsCard1Title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{p.applicationsCard1Body}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="group overflow-hidden rounded-2xl border border-subtle bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/visuals/ecran-led-facade-architecture.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-ink">{p.applicationsCard2Title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{p.applicationsCard2Body}</p>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/secteurs" variant="secondary">
              {p.applicationsCta}
            </ButtonLink>
          </div>
        </Container>
      </section>

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
