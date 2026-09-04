import type { Metadata } from "next";
import ContactPageContent from "@/components/pages/ContactPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return buildMetadata(locale, "/contact", dictionary.seo.contact);
}

export default function ContactPage() {
  return <ContactPageContent />;
}
