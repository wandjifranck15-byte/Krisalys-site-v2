import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import CameroonMap from "@/components/sections/CameroonMap";
import { siteConfig } from "@/lib/utils";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez KRISALYS à Douala pour demander une simulation gratuite de votre façade ou obtenir des informations sur nos solutions LED.",
};

export default function ContactPage() {
  return (
    <section className="bg-krisalys-black py-20">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Parlons de votre projet"
          description="Remplissez le formulaire ci-dessous ou contactez-nous directement — notre équipe vous répond rapidement."
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-krisalys-blue" />
                <div>
                  <p className="text-sm font-medium text-white">Téléphone</p>
                  <p className="text-sm text-krisalys-gray-light">{siteConfig.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-krisalys-blue" />
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="text-sm text-krisalys-gray-light">{siteConfig.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-krisalys-blue" />
                <div>
                  <p className="text-sm font-medium text-white">Adresse</p>
                  <p className="text-sm text-krisalys-gray-light">
                    {siteConfig.address.locality}, {siteConfig.address.country}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-krisalys-blue" />
                <div>
                  <p className="text-sm font-medium text-white">Horaires</p>
                  <p className="text-sm text-krisalys-gray-light">Lundi – Samedi, 8h – 18h</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Localisation KRISALYS - Douala"
                src="https://www.google.com/maps?q=Douala,Cameroun&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Container>

      <Container className="mt-24">
        <SectionHeading
          eyebrow="Zone d'intervention"
          title="Où intervient KRISALYS ?"
          description="Douala est notre siège et notre zone d'intervention active. D'autres villes rejoindront progressivement cette couverture."
          light
        />
        <div className="mt-12">
          <CameroonMap />
        </div>
      </Container>
    </section>
  );
}
