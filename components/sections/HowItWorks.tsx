import { MethodStep } from "@/types";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

export default function HowItWorks({
  steps,
  eyebrow = "Notre méthode",
  title = "Comment ça fonctionne ?",
  light = false,
}: {
  steps: MethodStep[];
  eyebrow?: string;
  title?: string;
  light?: boolean;
}) {
  return (
    <section className={light ? "bg-krisalys-black py-24" : "bg-canvas py-24"}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} light={light} />
        <div className="relative mt-14">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-brand sm:left-1/2" />
          <div className="space-y-10">
            {steps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.05}>
                <div
                  className={`relative flex flex-col gap-4 sm:flex-row ${
                    i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""
                  }`}
                >
                  <div className="flex sm:w-1/2" />
                  <div className="absolute left-5 top-1 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white sm:left-1/2">
                    {step.step}
                  </div>
                  <div className={`ml-14 sm:ml-0 sm:w-1/2 ${i % 2 === 1 ? "sm:pr-14" : "sm:pl-14"}`}>
                    <h3 className={`text-lg font-semibold ${light ? "text-white" : "text-ink"}`}>
                      {step.title}
                    </h3>
                    <p className={`mt-1 text-sm ${light ? "text-krisalys-gray-light" : "text-ink-muted"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
