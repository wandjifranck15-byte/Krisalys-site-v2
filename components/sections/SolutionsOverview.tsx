"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import FadeIn from "@/components/animations/FadeIn";
import { getSolutions } from "@/data/solutions";
import { ArrowRight } from "lucide-react";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";

export default function SolutionsOverview() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const solutions = getSolutions(locale);
  const { solutionsEyebrow, solutionsTitle, solutionsDescription, solutionsSpecialtyBadge } = dictionary.pages.home;

  return (
    <section className="bg-surface-soft py-24">
      <Container>
        <SectionHeading eyebrow={solutionsEyebrow} title={solutionsTitle} description={solutionsDescription} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <FadeIn key={solution.slug} delay={i * 0.08}>
              <Link
                href={`/nos-solutions#${solution.slug}`}
                className={`group flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-krisalys-blue-deep/40 hover:shadow-glow ${
                  i === 0 ? "border-krisalys-blue-deep/40 bg-surface" : "border-subtle bg-surface"
                }`}
              >
                {i === 0 && (
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-krisalys-blue-deep/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-krisalys-blue-deep">
                    {solutionsSpecialtyBadge}
                  </span>
                )}
                <DynamicIcon name={solution.icon} className="h-8 w-8 text-krisalys-blue-deep" />
                <h3 className="mt-4 text-lg font-semibold text-ink">{solution.name}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-muted">
                  {solution.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-krisalys-blue-deep">
                  {dictionary.common.readMore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
