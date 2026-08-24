"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function NotFound() {
  const dictionary = useDictionary();
  const p = dictionary.pages.notFound;
  return (
    <section className="flex min-h-[70vh] items-center bg-canvas">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">{p.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">{p.title}</h1>
        <p className="mt-3 text-ink-muted">{p.description}</p>
        <div className="mt-8 flex justify-center gap-4">
          <ButtonLink href="/">{p.cta}</ButtonLink>
          <Link href="/contact" className="inline-flex items-center px-5 py-2.5 text-sm text-krisalys-blue">
            {dictionary.common.ctaAlt[1]}
          </Link>
        </div>
      </Container>
    </section>
  );
}
