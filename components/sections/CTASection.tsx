"use client";

import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function CTASection({
  title,
  ctaLabel,
  ctaHref = "/contact",
}: {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const dictionary = useDictionary();
  const resolvedTitle = title ?? dictionary.common.ctaSectionDefaultTitle;
  const resolvedCtaLabel = ctaLabel ?? dictionary.common.ctaPrimary;

  return (
    <section className="relative overflow-hidden bg-krisalys-black py-24">
      <div aria-hidden className="absolute inset-0 animate-glow-pulse bg-gradient-brand-radial" />
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <FadeIn className="flex flex-col items-center gap-8">
          <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">{resolvedTitle}</h2>
          <ButtonLink href={ctaHref} size="lg">
            {resolvedCtaLabel}
          </ButtonLink>
        </FadeIn>
      </Container>
    </section>
  );
}
