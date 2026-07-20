import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import DynamicIcon from "@/components/ui/DynamicIcon";
import CTASection from "@/components/sections/CTASection";
import FadeIn from "@/components/animations/FadeIn";
import { maintenanceOfferings } from "@/data/maintenance";

export const metadata: Metadata = {
  title: "Maintenance & Support",
  description:
    "KRISALYS reste présent après l'installation : maintenance préventive, corrective, assistance technique, formation et accompagnement.",
};

export default function MaintenancePage() {
  return (
    <>
      <section className="bg-krisalys-black py-20">
        <Container>
          <SectionHeading
            eyebrow="Maintenance & Support"
            title="KRISALYS reste à vos côtés après l'installation"
            description="Un projet d'affichage LED ne s'arrête pas à la mise en service. Voici comment nous accompagnons nos clients dans la durée."
            light
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {maintenanceOfferings.map((offering, i) => (
              <FadeIn key={offering.title} delay={i * 0.08}>
                <Card className="h-full">
                  <DynamicIcon name={offering.icon} className="h-8 w-8 text-krisalys-blue" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{offering.title}</h3>
                  <p className="mt-2 text-sm text-krisalys-gray-light">{offering.description}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      <CTASection title="Une question sur la maintenance de votre installation ?" ctaLabel="Échanger avec un conseiller" />
    </>
  );
}
