import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import { divisions } from "@/data/divisions";

export const metadata: Metadata = {
  title: "À propos de KRISALYS",
  description:
    "KRISALYS est une entreprise technologique camerounaise dont la mission est de transformer les bâtiments africains grâce aux technologies visuelles modernes.",
};

export default function AProposPage() {
  return (
    <>
      <section className="bg-krisalys-black py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="À propos" title="Notre vision" light />
          <p className="mt-6 text-krisalys-gray-light">
            KRISALYS n&apos;est pas une simple entreprise qui vend des écrans LED. Notre mission est
            d&apos;accompagner la transformation visuelle des bâtiments en Afrique, en donnant aux
            entreprises les moyens de communiquer plus efficacement avec leur environnement.
          </p>
          <p className="mt-4 text-krisalys-gray-light">
            Aujourd&apos;hui, KRISALYS commercialise principalement des solutions d&apos;affichage LED
            à travers sa division KRISALYS LED, basée à Douala. Cette activité constitue la première
            étape d&apos;une ambition plus large : construire, avec le temps et la rigueur nécessaires,
            un groupe capable d&apos;intervenir sur plusieurs marchés.
          </p>

          <h2 className="mt-12 text-xl font-semibold text-white">Nos valeurs</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-krisalys-gray-light sm:grid-cols-4">
            {["Innovation", "Qualité", "Excellence", "Modernité", "Fiabilité", "Professionnalisme", "Accompagnement", "Service premium"].map(
              (value) => (
                <li key={value} className="rounded-lg border border-white/10 px-3 py-2 text-center">
                  {value}
                </li>
              )
            )}
          </ul>

          <h2 className="mt-12 text-xl font-semibold text-white">Le groupe KRISALYS, une ambition progressive</h2>
          <p className="mt-4 text-krisalys-gray-light">
            KRISALYS LED constitue aujourd&apos;hui l&apos;activité active du groupe. D&apos;autres
            divisions sont envisagées à mesure que les conditions le permettront, sans précipitation :
          </p>
          <ul className="mt-4 space-y-2">
            {divisions.map((division) => (
              <li key={division.slug} className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{division.name}</p>
                  <p className="text-xs text-krisalys-gray-light">{division.tagline}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    division.status === "active" ? "bg-krisalys-blue/20 text-krisalys-blue" : "bg-white/10 text-krisalys-gray-light"
                  }`}
                >
                  {division.status === "active" ? "Actif" : "À venir"}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
