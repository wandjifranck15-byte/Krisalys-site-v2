import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Toutes les réponses aux questions techniques, commerciales et après-vente sur les solutions d'écrans LED KRISALYS.",
};

const categories: { key: typeof faqItems[number]["category"]; label: string }[] = [
  { key: "technique", label: "Questions techniques" },
  { key: "commercial", label: "Questions commerciales" },
  { key: "apres-vente", label: "Après-vente" },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-krisalys-black py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Toutes vos questions, sans détour" light />
          <div className="mt-12 space-y-12">
            {categories.map((cat) => (
              <div key={cat.key}>
                <h2 className="mb-4 text-lg font-semibold text-krisalys-orange">{cat.label}</h2>
                <FAQAccordion items={faqItems.filter((f) => f.category === cat.key)} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTASection title="Une question sans réponse ici ?" ctaLabel="Échanger avec un conseiller" />
    </>
  );
}
