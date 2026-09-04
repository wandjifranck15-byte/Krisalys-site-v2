"use client";

import Container from "@/components/ui/Container";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function ConfidentialitePageContent() {
  const dictionary = useDictionary();
  const l = dictionary.pages.legal;
  return (
    <section className="bg-canvas py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-ink">{l.confidentialiteTitle}</h1>
        <div className="mt-6 space-y-4 text-sm text-ink-muted">
          <p>{l.confidentialiteP1}</p>
          <p>{l.confidentialiteP2}</p>
          <p>{l.confidentialiteP3}</p>
        </div>
      </Container>
    </section>
  );
}
