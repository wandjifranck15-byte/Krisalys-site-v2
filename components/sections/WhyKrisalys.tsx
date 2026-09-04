"use client";

import { ScanSearch, Blocks, HardHat, LifeBuoy } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import { useDictionary } from "@/lib/i18n/LocaleContext";

const icons = [ScanSearch, Blocks, HardHat, LifeBuoy];

export default function WhyKrisalys() {
  const dictionary = useDictionary();
  const { whyEyebrow, whyTitle, whyItems } = dictionary.pages.home;

  return (
    <section className="bg-canvas py-24">
      <Container>
        <SectionHeading eyebrow={whyEyebrow} title={whyTitle} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((item, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <Card className="h-full">
                  <Icon className="h-8 w-8 text-krisalys-blue-deep" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
