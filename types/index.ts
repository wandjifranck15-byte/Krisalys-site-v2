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
    benefitsLabel: string;
    useCasesLabel: string;
    problemsLabel: string;
    recommendedSolutionLabel: string;
    statusActive: string;
    statusUpcoming: string;
    viewSectorLabel: string;
    simulationLabel: string;
    realizationLabel: string;
    objectiveLabel: string;
    solutionLabel: string;
    backToHome: string;
    beforeLabel: string;
    afterLabel: string;
    mapDisclaimer: string;
    mapHeadquartersDescription: string;
    mapUpcomingDescription: string;
    ctaSectionDefaultTitle: string;
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
    configuratorCta: string;
  };
  pages: {
    home: { methodEyebrow: string; methodTitle: string; faqEyebrow: string; faqTitle: string; proofsEyebrow: string; proofsTitle: string; proofsDescription: string; whyEyebrow: string; whyTitle: string; whyItems: { title: string; description: string }[]; solutionsEyebrow: string; solutionsTitle: string; solutionsDescription: string; solutionsSpecialtyBadge: string; projectionEyebrow: string; projectionTitle: string; projectionDescription: string };
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
    aPropos: {
      valuesTitle: string;
      commitmentsTitle: string;
      groupTitle: string;
      groupIntro: string;
      values: { name: string; description: string }[];
      commitments: string[];
    };
    nosSolutions: { eyebrow: string; title: string; description: string; visualPlaceholder: string; cta: string; finalCta: string };
    secteurs: { eyebrow: string; title: string; description: string };
    realisations: {
      eyebrow: string;
      title: string;
      description: string;
      intlEyebrow: string;
      intlTitle: string;
      intlDisclaimer: string;
    };
    blog: { eyebrow: string; title: string; readArticle: string };
    legal: {
      conditionsTitle: string;
      conditionsP1: string;
      conditionsP2: string;
      confidentialiteTitle: string;
      confidentialiteP1: string;
      confidentialiteP2: string;
      confidentialiteP3: string;
      mentionsTitle: string;
      denomination: string;
      formeJuridique: string;
      formeJuridiqueValue: string;
      capitalSocial: string;
      siegeSocial: string;
      rccm: string;
      niu: string;
      gerant: string;
      contact: string;
      site: string;
    };
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
  seo: {
    home: { title: string; description: string };
    aPropos: { title: string; description: string };
    nosSolutions: { title: string; description: string };
    secteurs: { title: string; description: string };
    realisations: { title: string; description: string };
    simulations: { title: string; description: string };
    configurateur: { title: string; description: string };
    notreMethode: { title: string; description: string };
    maintenance: { title: string; description: string };
    faq: { title: string; description: string };
    contact: { title: string; description: string };
    blog: { title: string; description: string };
    conditions: { title: string };
    confidentialite: { title: string };
    mentionsLegales: { title: string };
  };
  founder: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    photoComingSoon: string;
    roleLabel: string;
    paragraph3: string;
    paragraph4: string;
    quote: string;
    founderRole: string;
    methodStatusTitle: string;
    steps: string[];
  };
  configurator: {
    buildingType: string;
    buildingTypePlaceholder: string;
    city: string;
    cityPlaceholder: string;
    width: string;
    widthError: string;
    height: string;
    heightError: string;
    placement: string;
    exterior: string;
    interior: string;
    objective: string;
    objectivePlaceholder: string;
    submit: string;
    resultPrompt: string;
    estimationBadge: string;
    cta: string;
    results: {
      dynamicName: string;
      dynamicReasoning: string;
      exteriorLargeName: string;
      exteriorLargeReasoning: string;
      exteriorSmallName: string;
      exteriorSmallReasoning: string;
      interiorGlassName: string;
      interiorGlassReasoning: string;
      interiorName: string;
      interiorReasoning: string;
      disclaimer: string;
    };
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
