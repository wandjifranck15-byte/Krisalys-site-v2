import { Division } from "@/types";

// Divisions du futur groupe KRISALYS.
// KRISALYS LED est active dès le lancement ; les autres divisions
// sont volontairement affichées en "à venir" tant qu'elles ne sont pas
// validées commercialement, sans jamais laisser croire qu'elles sont
// déjà opérationnelles. Ajouter une division = ajouter une entrée ici.
export const divisions: Division[] = [
  {
    slug: "led",
    name: "KRISALYS LED",
    tagline: "Écrans LED & solutions visuelles pour façades",
    status: "active",
    href: "/",
  },
  {
    slug: "hair",
    name: "KRISALYS Hair",
    tagline: "Marque distincte, hors périmètre du site KRISALYS LED",
    status: "upcoming",
  },
  {
    slug: "display",
    name: "KRISALYS Display",
    tagline: "Division à venir",
    status: "upcoming",
  },
  {
    slug: "energy",
    name: "KRISALYS Energy",
    tagline: "Division à venir",
    status: "upcoming",
  },
  {
    slug: "industrie",
    name: "KRISALYS Industrie",
    tagline: "Division à venir",
    status: "upcoming",
  },
];
