import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import FadeIn from "@/components/animations/FadeIn";
import { solutions } from "@/data/solutions";
import { ArrowRight } from "lucide-react";

export default function SolutionsOverview() {
  return (
    <section className="bg-surface-soft py-24">
      <Container>
        <SectionHeading
          eyebrow="Nos solutions"
          title="Une gamme complète, du vitrage à la façade entière"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <FadeIn key={solution.slug} delay={i * 0.08}>
              <Link
                href={`/nos-solutions#${solution.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-subtle bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-krisalys-blue-deep/40 hover:shadow-glow"
              >
                <DynamicIcon name={solution.icon} className="h-8 w-8 text-krisalys-blue-deep" />
                <h3 className="mt-4 text-lg font-semibold text-ink">{solution.name}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-muted">
                  {solution.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-krisalys-blue-deep">
                  En savoir plus
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
