import { MethodStep } from "@/types";
import type { Locale } from "@/types";

// Contenu bilingue : deux tableaux dans le même fichier (source unique),
// pas de fichier dupliqué (method-steps-en.ts). getMethodSteps(locale)
// est le seul point d'accès utilisé par les composants.
const methodStepsFr: MethodStep[] = [
  { step: 1, title: "Découverte", description: "Un échange initial pour comprendre votre bâtiment, votre secteur d'activité et vos objectifs de communication." },
  { step: 2, title: "Analyse", description: "Étude des contraintes du site : exposition, structure de la façade, visibilité, environnement immédiat." },
  { step: 3, title: "Simulation", description: "Réalisation d'une projection visuelle de votre façade avec la solution envisagée, pour vous permettre de vous projeter avant toute décision." },
  { step: 4, title: "Conseils", description: "Recommandation du type de solution le plus adapté à votre bâtiment et à votre budget, en toute transparence." },
  { step: 5, title: "Proposition", description: "Remise d'un devis détaillé, sans engagement, précisant le périmètre exact de la prestation." },
  { step: 6, title: "Installation", description: "Mise en œuvre par une équipe encadrée, avec un plan d'intervention communiqué à l'avance." },
  { step: 7, title: "Formation", description: "Prise en main de la gestion de contenu par vos équipes, pour une autonomie progressive." },
  { step: 8, title: "Maintenance", description: "Suivi technique et accompagnement dans la durée, au-delà de la seule installation." },
];

const methodStepsEn: MethodStep[] = [
  { step: 1, title: "Discovery", description: "An initial conversation to understand your building, your industry and your communication goals." },
  { step: 2, title: "Analysis", description: "Assessment of site constraints: exposure, facade structure, visibility, immediate environment." },
  { step: 3, title: "Simulation", description: "A visual projection of your facade with the envisioned solution, so you can visualize it before deciding." },
  { step: 4, title: "Recommendation", description: "A recommendation of the solution best suited to your building and budget, with full transparency." },
  { step: 5, title: "Proposal", description: "A detailed, no-obligation quote specifying the exact scope of the work." },
  { step: 6, title: "Installation", description: "Implementation by a supervised team, with a schedule communicated in advance." },
  { step: 7, title: "Training", description: "Handover of content management to your teams, for progressive autonomy." },
  { step: 8, title: "Maintenance", description: "Technical follow-up and long-term support, beyond installation alone." },
];

export function getMethodSteps(locale: Locale = "fr"): MethodStep[] {
  return locale === "en" ? methodStepsEn : methodStepsFr;
}

// Conservé pour compatibilité : usages existants non encore migrés vers
// getMethodSteps() continuent de fonctionner (contenu FR par défaut).
export const methodSteps = methodStepsFr;
