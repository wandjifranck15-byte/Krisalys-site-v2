"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMethodSteps } from "@/data/method-steps";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

// Résumé visuel court de l'accompagnement KRISALYS, pour les pages piliers.
// Dérive désormais de la source de vérité unique (data/method-steps.ts,
// Phase 6) — plus de liste dupliquée dans le dictionnaire.
export default function TechnologyMethodSummary() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const p = dictionary.pilier;
  const steps = getMethodSteps(locale);

  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-krisalys-blue-deep">
        {p.sectionAccompaniment}
      </h2>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {steps.map((step, i) => (
          <span key={step.step} className="flex items-center gap-2">
            <span className="rounded-full border border-subtle bg-surface px-3 py-1.5 text-sm text-ink-muted">
              {step.title}
            </span>
            {i < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-ink-muted" />}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <Link href="/notre-methode" className="text-sm font-medium text-krisalys-blue-deep hover:underline">
          {p.accompanimentCta}
        </Link>
        <Link href="/maintenance" className="text-sm font-medium text-krisalys-blue-deep hover:underline">
          {p.maintenanceCta}
        </Link>
      </div>
    </div>
  );
}
