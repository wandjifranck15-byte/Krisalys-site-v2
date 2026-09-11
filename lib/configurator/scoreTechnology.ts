import type { ClientDeclaredData, Technology } from "./types";

// Score maximal atteignable par la grille elle-même (2 + 1) — sert de
// dénominateur de normalisation. Recalculé explicitement ici plutôt que
// codé en dur ailleurs, pour rester cohérent si la grille évolue.
const MAX_RAW_SCORE = 3;

export interface TechnologyScoreResult {
  filmRaw: number;
  ecranRaw: number;
  film: number; // normalisé [0,1]
  ecran: number; // normalisé [0,1]
}

/**
 * technologyRelevanceScore — mesure la PERTINENCE d'une technologie par
 * rapport aux faits déclarés par le client, jamais une "performance
 * technique". Un score plus élevé ne signifie pas qu'une technologie est
 * intrinsèquement supérieure à l'autre.
 *
 * Grille validée (voir KRISALYS-Phase3-Configurateur-Audit.md) :
 * - projectContext === "existing-glazing"      → Film +2
 * - projectContext === "new-or-renovation"      → Écran +2
 * - technologyPreference === "film"             → Film +1 (préférence client, étape 3)
 * - technologyPreference === "ecran"             → Écran +1 (préférence client, étape 3)
 *
 * Volontairement EXCLUS de ce score (conservés en contexte/warnings
 * uniquement — voir buildWarnings()) : transparencyPreference, contentType,
 * ambientLight. Aucune règle métier suffisamment fiable ne justifie
 * actuellement de les transformer en points.
 */
export function scoreTechnology(data: ClientDeclaredData): TechnologyScoreResult {
  let filmRaw = 0;
  let ecranRaw = 0;

  if (data.projectContext === "existing-glazing") filmRaw += 2;
  if (data.projectContext === "new-or-renovation") ecranRaw += 2;

  if (data.technologyPreference === "film") filmRaw += 1;
  if (data.technologyPreference === "ecran") ecranRaw += 1;

  return {
    filmRaw,
    ecranRaw,
    film: filmRaw / MAX_RAW_SCORE,
    ecran: ecranRaw / MAX_RAW_SCORE,
  };
}

/**
 * ÉTAPE D — détermination de l'état à partir de l'écart en points bruts
 * (pas en pourcentage, pour rester lisible et testable) entre les deux
 * technologies ÉLIGIBLES (voir filter.ts). Si une seule technologie est
 * éligible (fait de catalogue), elle est retenue dès qu'un signal existe
 * — sur cette technologie OU sur l'autre. Une préférence/un contexte
 * favorisant la technologie absente du catalogue (ex. écran) ne doit
 * jamais se traduire par une absence de proposition : la technologie
 * disponible reste techniquement compatible et est proposée comme
 * solution, avec confidence "medium" (le contexte penchait plutôt vers
 * l'autre technologie) ou "high" (le contexte penchait vers elle ou
 * était neutre). technicalStudyRequired n'est retenu ici que lorsque
 * AUCUN signal n'existe (0-0), c'est-à-dire quand les données déclarées
 * sont réellement insuffisantes — jamais comme façon détournée de
 * signaler un fait de catalogue (voir comportement commercial validé).
 */
export function resolveTechnologyState(
  scores: TechnologyScoreResult,
  eligible: Technology[]
): {
  state: "clearRecommendation" | "twoRelevantSolutions" | "technicalStudyRequired";
  recommendedTechnology: Technology | null;
  alternativeTechnology: Technology | null;
  technologyConfidence: "high" | "medium" | "low";
} {
  const filmEligible = eligible.includes("film-led-transparent");
  const ecranEligible = eligible.includes("ecran-led-transparent");
  const hasSignal = scores.filmRaw > 0 || scores.ecranRaw > 0;

  // Une seule technologie disponible au catalogue (fait de catalogue,
  // jamais une exclusion technique supposée).
  if (filmEligible && !ecranEligible) {
    return {
      state: hasSignal ? "clearRecommendation" : "technicalStudyRequired",
      recommendedTechnology: hasSignal ? "film-led-transparent" : null,
      alternativeTechnology: null,
      technologyConfidence: !hasSignal ? "low" : scores.filmRaw >= scores.ecranRaw ? "high" : "medium",
    };
  }
  if (ecranEligible && !filmEligible) {
    return {
      state: hasSignal ? "clearRecommendation" : "technicalStudyRequired",
      recommendedTechnology: hasSignal ? "ecran-led-transparent" : null,
      alternativeTechnology: null,
      technologyConfidence: !hasSignal ? "low" : scores.ecranRaw >= scores.filmRaw ? "high" : "medium",
    };
  }
  if (!filmEligible && !ecranEligible) {
    return {
      state: "technicalStudyRequired",
      recommendedTechnology: null,
      alternativeTechnology: null,
      technologyConfidence: "low",
    };
  }

  // Les deux technologies sont éligibles : comparaison des scores bruts.
  const gap = Math.abs(scores.filmRaw - scores.ecranRaw);
  const higher: Technology = scores.filmRaw >= scores.ecranRaw ? "film-led-transparent" : "ecran-led-transparent";
  const lower: Technology = higher === "film-led-transparent" ? "ecran-led-transparent" : "film-led-transparent";

  if (scores.filmRaw === 0 && scores.ecranRaw === 0) {
    return { state: "technicalStudyRequired", recommendedTechnology: null, alternativeTechnology: null, technologyConfidence: "low" };
  }
  if (gap >= 2) {
    return { state: "clearRecommendation", recommendedTechnology: higher, alternativeTechnology: null, technologyConfidence: "high" };
  }
  // gap === 1, ou gap === 0 avec au moins un score > 0
  return { state: "twoRelevantSolutions", recommendedTechnology: higher, alternativeTechnology: lower, technologyConfidence: "medium" };
}
