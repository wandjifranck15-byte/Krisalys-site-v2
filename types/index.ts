// Types partagés du projet KRISALYS

import type { Technology as TechnologySlug } from "@/lib/configurator/types";

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
    // Libellés des catégories de méga-menu (ne correspondent à aucune page
    // réelle, donc indexés par un id stable plutôt que par href).
    categoryLabels: {
      solutions: string;
      applications: string;
      votreProjet: string;
      ressources: string;
    };
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    configuratorCta: string;
  };
  pilier: {
    sectionHowItWorks: string;
    sectionWhyUseIt: string;
    sectionCriteria: string;
    sectionConstraints: string;
    sectionVariants: string;
    sectionApplications: string;
    applicationsCta: string;
    applicationsNote: string;
    hesitationTitle: string;
    hesitationDescription: string;
    hesitationCta: string;
    ctaConfigure: string;
    sectionPrinciple: string;
    criteriaIntro: string;
    configurationNote: string;
    sectionAccompaniment: string;
    accompanimentCta: string;
    maintenanceCta: string;
    finalCtaTitle: string;
    finalCtaStudy: string;
    finalCtaRealisations: string;
    filmHeroSubtitle: string;
    ecranHeroSubtitle: string;
  };
  pages: {
    home: { methodEyebrow: string; methodTitle: string; faqEyebrow: string; faqTitle: string; proofsEyebrow: string; proofsTitle: string; proofsDescription: string; whyEyebrow: string; whyTitle: string; whyItems: { title: string; description: string }[]; solutionsEyebrow: string; solutionsTitle: string; solutionsDescription: string; projectionEyebrow: string; projectionTitle: string; projectionDescription: string };
    faq: { eyebrow: string; title: string; ctaTitle: string };
    methode: {
      eyebrow: string;
      title: string;
      description: string;
      stepsEyebrow: string;
      stepsTitle: string;
      whySectionTitle: string;
      whySectionBody: string;
      analysisToSolutionTitle: string;
      analysisToSolutionBody: string;
      afterInstallTitle: string;
      afterInstallBody: string;
      afterInstallCta: string;
      ctaTitle: string;
      ctaConfigureLabel: string;
      ctaStudyLabel: string;
    };
    maintenance: {
      eyebrow: string;
      title: string;
      description: string;
      whySectionTitle: string;
      whySectionBody: string;
      groupMaintenanceTitle: string;
      groupSupportTitle: string;
      groupAccompanimentTitle: string;
      projectNote: string;
      warrantyNote: string;
      afterInstallTitle: string;
      afterInstallBody: string;
      afterInstallCta: string;
      ctaTitle: string;
      ctaLabel: string;
    };
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
    nosSolutions: {
      eyebrow: string;
      title: string;
      description: string;
      techLabel: string;
      cta: string;
    };
    secteurs: {
      eyebrow: string;
      title: string;
      description: string;
      introTitle: string;
      introBody: string;
      technologiesNoteLabel: string;
      technologiesNote: string;
      ctaConfigureLabel: string;
      processTitle: string;
      processBody: string;
      processCta: string;
    };
    realisations: {
      eyebrow: string;
      title: string;
      description: string;
      intlEyebrow: string;
      intlTitle: string;
      intlDisclaimer: string;
      distinctionNote: string;
      designEyebrow: string;
      designTitle: string;
      designDescription: string;
      designCta: string;
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
    filmLedTransparent: { title: string; description: string };
    ecransLedTransparents: { title: string; description: string };
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
  };
  configuratorWizard: {
    stepOf: string; // "Étape {current} sur {total}"
    next: string;
    back: string;
    steps: {
      building: { title: string; buildingType: string; buildingTypePlaceholder: string; usage: string; usagePlaceholder: string; usageHelp: string; projectContext: string; projectContextHelp: string; existingGlazing: string; newOrRenovation: string; unknownContext: string };
      dimensions: { title: string; width: string; height: string; widthHelp: string; city: string; cityPlaceholder: string; surfaceOverrideLabel: string; surfaceOverrideHelp: string; surfaceOverrideToggle: string };
      environment: { title: string; environment: string; interior: string; exterior: string; viewingDistance: string; viewingDistanceHelp: string; close: string; medium: string; far: string; unknown: string; ambientLight: string; ambientLightHelp: string; low: string; high: string };
      preferences: { title: string; transparency: string; transparencyHelp: string; contentType: string; contentTypePlaceholder: string; objective: string; objectiveHelp: string; objectivePlaceholder: string };
      technology: { title: string; preference: string; preferenceHelp: string; preferFilm: string; preferEcran: string; noPreference: string; constraints: string; constraintsPlaceholder: string };
      contact: { title: string; name: string; email: string; phone: string; company: string; photoLabel: string; photoHelp: string; submit: string; submitting: string; successTitle: string; successBody: string; errorServer: string };
    };
    result: {
      title: string;
      estimationBadge: string;
      technologyLabel: string;
      alternativeLabel: string;
      pitchLabel: string;
      pitchUnknown: string;
      pitchMultiple: string;
      studyRequiredTitle: string;
      studyRequiredBody: string;
      twoSolutionsTitle: string;
      priceEstimateLabel: string;
      priceUnavailable: string;
      priceholderNotice: string;
      ctaSimulation: string;
      ctaStudy: string;
    };
    reasoning: {
      existingGlazingFavoursFilm: string;
      newOrRenovationFavoursEcran: string;
      clientPreferenceFilm: string;
      clientPreferenceEcran: string;
      insufficientDataForTechnology: string;
      twoTechnologiesRelevant: string;
      viewingDistanceClose: string;
      viewingDistanceFar: string;
      viewingDistanceMedium: string;
      viewingDistanceUnknown: string;
    };
    warnings: {
      filmNotInCatalog: string;
      ecranNotInCatalog: string;
      highTransparencyContextOnly: string;
      highAmbientLightContextOnly: string;
      missingPixelDensity: string;
      pitchStudyRequired: string;
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
  // Identifiant stable pour les libellés de catégorie (ex. "Solutions",
  // "Applications") qui ne correspondent à aucune page réelle et ne
  // peuvent donc pas être traduits via nav.labels (indexé par href) —
  // voir nav.categoryLabels dans le dictionnaire.
  categoryId?: string;
  // true uniquement pour une catégorie qui correspond à une page réelle
  // (ex. "Solutions" → /nos-solutions) : dans ce cas, le libellé de
  // catégorie reste cliquable (navigation) EN PLUS d'ouvrir son sous-menu,
  // contrairement aux catégories purement organisationnelles.
  hasOwnPage?: boolean;
}

export interface Technology {
  slug: string;
  name: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  howItWorks: string[];
  whyUseIt: string[];
  criteria: string[];
  constraints: string[];
  recommendedFor: string[];
  variants: { title: string; description: string }[];
  icon: string; // nom de l'icône Lucide
  ctaLabel: string;
}

export interface Sector {
  slug: string;
  name: string;
  icon: string;
  problems: string[];
  benefits: string[];
  useCases: string[];
  ctaLabel: string;
}

export interface Project {
  slug: string;
  title: string;
  sectorSlug: string;
  buildingType: string;
  city: string;
  objective: string;
  // Rattachement à l'une des deux technologies piliers (voir
  // data/technologies.ts). `null` lorsque le contenu existant ne permet
  // pas de déterminer honnêtement laquelle des deux technologies
  // transparentes s'applique (ex. ancien projet "écran extérieur" classique,
  // sans mention de transparence) — jamais une supposition.
  technologySlug: TechnologySlug | null;
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

export type MethodStepCategory =
  | "understanding"
  | "analysis"
  | "recommendation"
  | "configuration"
  | "design"
  | "supply"
  | "installation"
  | "maintenance";

export interface MethodStep {
  step: number;
  title: string;
  description: string;
  // Catégorie conceptuelle stable (indépendante de la langue), utilisée
  // pour dériver des vues partielles du processus (voir data/method-steps.ts
  // getDesignSteps/getMethodSummary) sans dupliquer le texte.
  category: MethodStepCategory;
}

export type MaintenanceGroup = "maintenance" | "support" | "accompaniment";

export interface MaintenanceOffering {
  title: string;
  description: string;
  icon: string;
  group: MaintenanceGroup;
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
  // Lien contextuel vers la page pilier ou le configurateur pertinent —
  // évite de dupliquer le contenu commercial dans l'article (Phase 11).
  relatedLink: { href: string; label: string } | null;
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
