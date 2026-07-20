import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HowItWorks from "@/components/sections/HowItWorks";
import CTASection from "@/components/sections/CTASection";
import { methodSteps } from "@/data/method-steps";

export const metadata: Metadata = {
  title: "Notre méthode",
  description:
    "Découvrez les 8 étapes de la méthode KRISALYS, de la découverte de votre projet à la maintenance après installation.",
};

export default function NotreMethodePage() {
  return (
    <>
      <section className="bg-krisalys-black py-20">
        <Container>
          <SectionHeading
            eyebrow="Notre méthode"
            title="Un processus clair, du premier échange à la maintenance"
            description="Chaque projet suit les mêmes étapes, pensées pour rassurer les dirigeants et éviter toute mauvaise surprise."
            light
          />
        </Container>
      </section>
      <HowItWorks steps={methodSteps} eyebrow="Les 8 étapes" title="Comment nous travaillons" />
      <CTASection title="Prêt à démarrer la première étape ?" />
    </>
  );
}
