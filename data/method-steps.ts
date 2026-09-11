import { MethodStep, MethodStepCategory } from "@/types";
import type { Locale } from "@/types";

// SOURCE DE VÉRITÉ UNIQUE du processus KRISALYS (Phase 6). Toute page qui
// affiche "notre méthode" — /notre-methode, pages piliers, /realisations,
// homepage — dérive désormais de cette même liste, jamais d'un texte
// dupliqué ailleurs. Voir les fonctions getMethodSteps/getMethodSummary/
// getDesignSteps ci-dessous.
//
// Le processus est volontairement neutre vis-à-vis de la technologie :
// la recommandation (étape 3) peut aboutir à Film LED transparent OU Écran
// LED transparent — jamais choisie avant l'analyse (étape 2). Le
// configurateur (Phase 3) est un outil d'orientation/préconfiguration : il
// n'est jamais présenté ici comme remplaçant l'analyse ou la validation
// technique réelle.
const methodStepsFr: MethodStep[] = [
  { step: 1, category: "understanding", title: "Compréhension du projet", description: "Un échange initial pour comprendre votre bâtiment, votre secteur d'activité et vos objectifs de communication." },
  { step: 2, category: "analysis", title: "Analyse", description: "Étude de la surface, de l'environnement et des contraintes du site : exposition, structure, visibilité, usage prévu." },
  { step: 3, category: "recommendation", title: "Recommandation", description: "Détermination de la technologie la plus pertinente pour votre projet — film LED transparent ou écran LED transparent — sans a priori, sur la base de l'analyse." },
  { step: 4, category: "configuration", title: "Configuration", description: "Définition des caractéristiques de la solution retenue à partir des données disponibles, avec une validation technique lorsque nécessaire." },
  { step: 5, category: "design", title: "Conception et intégration", description: "Définition de la manière dont la solution s'intègre à votre bâtiment et à son architecture." },
  { step: 6, category: "supply", title: "Fourniture", description: "Préparation et fourniture des éléments nécessaires à l'installation." },
  { step: 7, category: "installation", title: "Installation et mise en service", description: "Mise en œuvre par une équipe encadrée, avec un plan d'intervention communiqué à l'avance, jusqu'à la mise en service." },
  { step: 8, category: "maintenance", title: "Maintenance et accompagnement", description: "Suivi technique et accompagnement dans la durée, au-delà de la seule installation." },
];

const methodStepsEn: MethodStep[] = [
  { step: 1, category: "understanding", title: "Project understanding", description: "An initial conversation to understand your building, your industry and your communication goals." },
  { step: 2, category: "analysis", title: "Analysis", description: "Assessment of the surface, environment and site constraints: exposure, structure, visibility, intended use." },
  { step: 3, category: "recommendation", title: "Recommendation", description: "Determining the most relevant technology for your project — transparent LED film or transparent LED screen — with no preconception, based on the analysis." },
  { step: 4, category: "configuration", title: "Configuration", description: "Defining the characteristics of the chosen solution from the data available, with technical validation where needed." },
  { step: 5, category: "design", title: "Design and integration", description: "Defining how the solution integrates with your building and its architecture." },
  { step: 6, category: "supply", title: "Supply", description: "Preparing and supplying the elements needed for installation." },
  { step: 7, category: "installation", title: "Installation and commissioning", description: "Implementation by a supervised team, with a schedule communicated in advance, through to commissioning." },
  { step: 8, category: "maintenance", title: "Maintenance and support", description: "Technical follow-up and long-term support, beyond installation alone." },
];

export function getMethodSteps(locale: Locale = "fr"): MethodStep[] {
  return locale === "en" ? methodStepsEn : methodStepsFr;
}

// Vue résumée (homepage) : les N premières étapes du processus complet —
// pas un texte différent, juste une sélection.
export function getMethodSummary(locale: Locale = "fr", count = 5): MethodStep[] {
  return getMethodSteps(locale).slice(0, count);
}

// Vue "conception" (/realisations, section "Notre capacité de conception") :
// uniquement les étapes pertinentes pour la conception/intégration —
// analyse, recommandation, configuration, conception. Ni fourniture, ni
// installation, ni maintenance (hors sujet pour cette section).
const DESIGN_CATEGORIES: MethodStepCategory[] = ["analysis", "recommendation", "configuration", "design"];
export function getDesignSteps(locale: Locale = "fr"): MethodStep[] {
  return getMethodSteps(locale).filter((s) => DESIGN_CATEGORIES.includes(s.category));
}

// Conservé pour compatibilité : usages existants non encore migrés vers
// getMethodSteps() continuent de fonctionner (contenu FR par défaut).
export const methodSteps = methodStepsFr;
