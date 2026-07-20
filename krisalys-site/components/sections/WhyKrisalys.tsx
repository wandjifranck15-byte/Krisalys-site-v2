import { Sparkles, HardHat, HeartHandshake, LifeBuoy } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

const items = [
  { icon: Sparkles, title: "Design moderne", description: "Des solutions pensées pour valoriser l'architecture existante de votre bâtiment." },
  { icon: HardHat, title: "Installation professionnelle", description: "Une équipe encadrée qui intervient selon un plan communiqué à l'avance." },
  { icon: HeartHandshake, title: "Accompagnement personnalisé", description: "Une étude propre à votre bâtiment, jamais une solution générique." },
  { icon: LifeBuoy, title: "Maintenance et assistance", description: "Un suivi dans la durée, bien après la mise en service." },
];

export default function WhyKrisalys() {
  return (
    <section className="bg-krisalys-black py-24">
      <Container>
        <SectionHeading
          eyebrow="Pourquoi KRISALYS"
          title="Des solutions complètes pour donner de la visibilité à votre entreprise."
          light
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <Card className="h-full">
                <item.icon className="h-8 w-8 text-krisalys-blue" />
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-krisalys-gray-light">{item.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
