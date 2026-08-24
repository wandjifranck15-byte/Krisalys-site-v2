"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import CameroonMap from "@/components/sections/CameroonMap";
import { siteConfig } from "@/lib/utils";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useDictionary } from "@/lib/i18n/LocaleContext";

export default function ContactPageContent() {
  const dictionary = useDictionary();
  const c = dictionary.pages.contact;

  return (
    <section className="bg-canvas py-20">
      <Container>
        <SectionHeading eyebrow={c.eyebrow} title={c.title} description={c.description} />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-krisalys-blue-deep" />
                <div>
                  <p className="text-sm font-medium text-ink">{c.phoneLabel}</p>
                  <p className="text-sm text-ink-muted">{siteConfig.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-krisalys-blue-deep" />
                <div>
                  <p className="text-sm font-medium text-ink">{c.emailLabel}</p>
                  <p className="text-sm text-ink-muted">{siteConfig.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-krisalys-blue-deep" />
                <div>
                  <p className="text-sm font-medium text-ink">{c.addressLabel}</p>
                  <p className="text-sm text-ink-muted">
                    {siteConfig.address.locality}, {siteConfig.address.country}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-krisalys-blue-deep" />
                <div>
                  <p className="text-sm font-medium text-ink">{c.hoursLabel}</p>
                  <p className="text-sm text-ink-muted">{c.hoursValue}</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-subtle">
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
        <SectionHeading eyebrow={c.zoneEyebrow} title={c.zoneTitle} description={c.zoneDescription} />
        <div className="mt-12">
          <CameroonMap />
        </div>
      </Container>
    </section>
  );
}
