// Types partagés du projet KRISALYS

export type Locale = "fr" | "en";

// Forme structurelle du dictionnaire de traduction (lib/i18n). Utiliser ce type explicite plutôt que
// `typeof fr` évite un bug de typage : avec `as const`, `typeof fr` fige des types littéraux exacts
// (ex. "Demander une simulation gratuite"), ce qui rend toute autre langue (ex. l'anglais) impossible
// à typer correctement puisque ses chaînes sont différentes. Voir lib/i18n/config.ts.
export interface Dictionary {
  common: {
    ctaPrimary: string;
    ctaSecondary: string;
    ctaAlt: string[];
    readMore: string;
    scanToDiscover: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
    toggleLabel: string;
  };
  nav: {
    menuOpen: string;
    menuClose: string;
    language: string;
    // Libellés de navigation indexés par href (data/navigation.ts reste la
    // source unique des routes ; ce dictionnaire ne fait que les traduire).
    labels: Record<string, string>;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  pages: {
    faq: { eyebrow: string; title: string; ctaTitle: string };
    methode: { eyebrow: string; title: string; description: string; stepsEyebrow: string; stepsTitle: string; ctaTitle: string };
    maintenance: { eyebrow: string; title: string; description: string; ctaTitle: string; ctaLabel: string };
    contact: {
      eyebrow: string;
      title: string;
      description: string;
      phoneLabel: string;
      emailLabel: string;
      addressLabel: string;
      hoursLabel: string;
      hoursValue: string;
      zoneEyebrow: string;
      zoneTitle: string;
      zoneDescription: string;
    };
    configurateur: { eyebrow: string; title: string; description: string };
    simulations: {
      eyebrow: string;
      title: string;
      description: string;
      configuratorEyebrow: string;
      configuratorTitle: string;
      configuratorDescription: string;
      ctaLabel: string;
    };
    notFound: { eyebrow: string; title: string; description: string; cta: string };
  };
  form: {
    name: string;
    company: string;
    phone: string;
    email: string;
    city: string;
    buildingType: string;
    buildingTypePlaceholder: string;
    buildingTypeOptions: string[];
    message: string;
    photo: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorRequired: string;
    errorEmail: string;
    errorName: string;
    errorPhone: string;
    errorCity: string;
    errorBuildingType: string;
    errorMessage: string;
    errorServer: string;
  };
  whatsapp: {
    prefilledMessage: string;
  };
  footer: {
    tagline: string;
    rightsReserved: string;
    navHeading: string;
    contactHeading: string;
    legalHeading: string;
  };
  faqCategories: {
    technique: string;
    commercial: string;
    apresVente: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Solution {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  useCases: string[];
  technicalNotes: string[];
  recommendedFor: string[];
  icon: string; // nom de l'icône Lucide
}

export interface Sector {
  slug: string;
  name: string;
  icon: string;
  problems: string[];
  benefits: string[];
  useCases: string[];
  recommendedSolutionSlug: string;
  ctaLabel: string;
}

export interface Project {
  slug: string;
  title: string;
  sectorSlug: string;
  buildingType: string;
  city: string;
  objective: string;
  solutionSlug: string;
  isSimulation: boolean; // true = simulation/rendu, false = installation réelle
  description: string;
}

export interface ExternalReference {
  title: string;
  country: string;
  description: string;
  sourceLabel: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "technique" | "commercial" | "apres-vente";
}

export interface MethodStep {
  step: number;
  title: string;
  description: string;
}

export interface MaintenanceOffering {
  title: string;
  description: string;
  icon: string;
}

export interface Division {
  slug: string;
  name: string;
  tagline: string;
  status: "active" | "upcoming";
  href?: string;
}

export interface City {
  name: string;
  slug: string;
  isHeadquarters: boolean;
  status: "active" | "upcoming";
  coordinates: { x: number; y: number }; // position relative sur la carte stylisée (%)
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  content: string[];
}

export interface ConfiguratorInput {
  buildingType: string;
  city: string;
  widthMeters: number;
  heightMeters: number;
  placement: "interieur" | "exterieur";
  objective: string;
}

export interface ConfiguratorResult {
  recommendedSolution: string;
  reasoning: string;
  disclaimer: string;
}
