"use client";

import Container from "@/components/ui/Container";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function ConditionsPageContent() {
  const dictionary = useDictionary();
  const l = dictionary.pages.legal;
  return (
    <section className="bg-canvas py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-ink">{l.conditionsTitle}</h1>
        <div className="mt-6 space-y-4 text-sm text-ink-muted">
          <p>{l.conditionsP1}</p>
          <p>{l.conditionsP2}</p>
        </div>
      </Container>
    </section>
  );
}
