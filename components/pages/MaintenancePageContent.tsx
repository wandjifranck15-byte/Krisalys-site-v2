"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import DynamicIcon from "@/components/ui/DynamicIcon";
import CTASection from "@/components/sections/CTASection";
import FadeIn from "@/components/animations/FadeIn";
import { maintenanceOfferings } from "@/data/maintenance";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function MaintenancePageContent() {
  const dictionary = useDictionary();
  return (
    <>
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading
            eyebrow={dictionary.pages.maintenance.eyebrow}
            title={dictionary.pages.maintenance.title}
            description={dictionary.pages.maintenance.description}
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {maintenanceOfferings.map((offering, i) => (
              <FadeIn key={offering.title} delay={i * 0.08}>
                <Card className="h-full">
                  <DynamicIcon name={offering.icon} className="h-8 w-8 text-krisalys-blue-deep" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">{offering.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{offering.description}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      <CTASection title={dictionary.pages.maintenance.ctaTitle} ctaLabel={dictionary.pages.maintenance.ctaLabel} />
    </>
  );
}
