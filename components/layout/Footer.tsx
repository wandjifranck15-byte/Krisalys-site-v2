"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { footerNav, legalNav } from "@/data/navigation";
import { siteConfig } from "@/lib/utils";
import { Mail, Phone, MapPin } from "lucide-react";
import { useDictionary, useNavLabel } from "@/lib/i18n/LocaleContext";

export default function Footer() {
  const dictionary = useDictionary();
  const navLabel = useNavLabel();

  return (
    <footer className="border-t border-white/10 bg-krisalys-black">
      <Container className="grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        <div>
          <Logo variant="full" withGlow={false} />
          <p className="mt-4 text-sm text-krisalys-gray-light">{dictionary.footer.tagline}</p>
          <p className="mt-6 text-xs uppercase tracking-widest text-krisalys-gray-dark">
            {siteConfig.legalName}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
            {dictionary.footer.navHeading}
          </h3>
          <ul className="space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-krisalys-gray-light hover:text-white">
                  {navLabel(item.href, item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
            {dictionary.footer.contactHeading}
          </h3>
          <ul className="space-y-3 text-sm text-krisalys-gray-light">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-krisalys-blue" /> {siteConfig.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-krisalys-blue" /> {siteConfig.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-krisalys-blue" /> {siteConfig.address.locality}, {siteConfig.address.country}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-krisalys-blue">
            {dictionary.footer.legalHeading}
          </h3>
          <ul className="space-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-krisalys-gray-light hover:text-white">
                  {navLabel(item.href, item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-krisalys-gray-dark sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {dictionary.footer.rightsReserved}
          </p>
          <p>Douala, Cameroun</p>
        </Container>
      </div>
    </footer>
  );
}
