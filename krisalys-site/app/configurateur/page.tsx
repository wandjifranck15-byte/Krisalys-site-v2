import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Configurator from "@/components/sections/Configurator";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Configurateur de projet",
  description:
    "Renseignez les caractéristiques de votre bâtiment et obtenez une première orientation sur la solution LED la plus adaptée à votre projet.",
};

export default function ConfigurateurPage() {
  return (
    <>
      <section className="bg-krisalys-black py-20">
        <Container>
          <SectionHeading
            eyebrow="Configurateur"
            title="Une première orientation pour votre projet"
            description="Cet outil donne une estimation indicative, pas un devis. Une étude personnalisée reste nécessaire pour confirmer la solution retenue."
            light
          />
          <div className="mt-12">
            <Configurator />
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
