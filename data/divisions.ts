import { Division } from "@/types";
import type { Locale } from "@/types";

// Divisions du futur groupe KRISALYS.
// KRISALYS LED est active dès le lancement ; les autres divisions
// sont volontairement affichées en "à venir" tant qu'elles ne sont pas
// validées commercialement, sans jamais laisser croire qu'elles sont
// déjà opérationnelles. Ajouter une division = ajouter une entrée ici.
// Noms de marque (KRISALYS LED/Hair/Display/Energy/Industrie) non traduits :
// ce sont des noms propres.
const divisionsFr: Division[] = [
  { slug: "led", name: "KRISALYS LED", tagline: "Écrans LED & solutions visuelles pour façades", status: "active", href: "/" },
  { slug: "hair", name: "KRISALYS Hair", tagline: "Marque distincte, hors périmètre du site KRISALYS LED", status: "upcoming" },
  { slug: "display", name: "KRISALYS Display", tagline: "Division à venir", status: "upcoming" },
  { slug: "energy", name: "KRISALYS Energy", tagline: "Division à venir", status: "upcoming" },
  { slug: "industrie", name: "KRISALYS Industrie", tagline: "Division à venir", status: "upcoming" },
];

const divisionsEn: Division[] = [
  { slug: "led", name: "KRISALYS LED", tagline: "LED screens & visual solutions for facades", status: "active", href: "/" },
  { slug: "hair", name: "KRISALYS Hair", tagline: "Separate brand, outside the scope of the KRISALYS LED site", status: "upcoming" },
  { slug: "display", name: "KRISALYS Display", tagline: "Upcoming division", status: "upcoming" },
  { slug: "energy", name: "KRISALYS Energy", tagline: "Upcoming division", status: "upcoming" },
  { slug: "industrie", name: "KRISALYS Industrie", tagline: "Upcoming division", status: "upcoming" },
];

export function getDivisions(locale: Locale = "fr"): Division[] {
  return locale === "en" ? divisionsEn : divisionsFr;
}

export const divisions = divisionsFr;
