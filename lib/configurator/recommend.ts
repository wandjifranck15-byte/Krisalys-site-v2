import type { ClientDeclaredData, EngineDerivedData, Product } from "./types";
import { CONFIGURATOR_VERSION } from "./types";
import { getEligibleTechnologies, getFilteredProducts } from "./filter";
import { scoreTechnology, resolveTechnologyState } from "./scoreTechnology";
import { scorePitch } from "./scorePitch";

/**
 * Chaîne complète validée :
 * Projet → technologies éligibles → produits compatibles →
 * technologyRelevanceScore → sélection technologie → sélection pitch
 * (uniquement parmi les produits de la/les technologie(s) retenue(s)).
 *
 * Les clés retournées dans `reasoning`/`warnings` sont des identifiants
 * stables (ex. "existingGlazingFilm"), traduits côté UI via
 * dictionary.configurator.reasoning[key] / .warnings[key] — aucun texte
 * en dur n'est produit ici (voir consigne "toute chaîne doit être
 * traduisible").
 */
export function recommend(data: ClientDeclaredData, catalog: Product[]): EngineDerivedData {
  const reasoning: string[] = [];
  const warnings: string[] = [];

  // ÉTAPE A — éligibilité technologique (fait de catalogue uniquement)
  const eligible = getEligibleTechnologies(catalog);
  if (!eligible.includes("film-led-transparent")) warnings.push("filmNotInCatalog");
  if (!eligible.includes("ecran-led-transparent")) warnings.push("ecranNotInCatalog");

  // ÉTAPE C — technologyRelevanceScore (grille validée)
  const scores = scoreTechnology(data);

  // ÉTAPE D — sélection technologie
  const resolved = resolveTechnologyState(scores, eligible);

  // Reasoning factuel — cite le fait déclaré à l'origine de chaque point
  if (data.projectContext === "existing-glazing") reasoning.push("existingGlazingFavoursFilm");
  if (data.projectContext === "new-or-renovation") reasoning.push("newOrRenovationFavoursEcran");
  if (data.technologyPreference === "film") reasoning.push("clientPreferenceFilm");
  if (data.technologyPreference === "ecran") reasoning.push("clientPreferenceEcran");
  if (resolved.state === "technicalStudyRequired" && resolved.recommendedTechnology === null) {
    reasoning.push("insufficientDataForTechnology");
  }
  if (resolved.state === "twoRelevantSolutions") reasoning.push("twoTechnologiesRelevant");

  // Contexte conservé mais SANS influence sur le score (voir grille validée)
  if (data.transparencyPreference === "high") warnings.push("highTransparencyContextOnly");
  if (data.ambientLight === "high") warnings.push("highAmbientLightContextOnly");

  // ÉTAPE E — pitch, uniquement à l'intérieur de la/les technologie(s) retenue(s)
  let recommendedPitch: number | null = null;
  let alternativePitches: number[] | null = null;
  let pitchConfidence: "high" | "medium" | "low" = "low";

  if (resolved.recommendedTechnology) {
    const productsForTech = getFilteredProducts(catalog, resolved.recommendedTechnology);
    const pitchResult = scorePitch(productsForTech, data.viewingDistance);
    recommendedPitch = pitchResult.recommendedPitch;
    alternativePitches = pitchResult.alternativePitches;
    pitchConfidence = pitchResult.pitchConfidence;

    if (pitchResult.missingPixelDensity) warnings.push("missingPixelDensity");
    if (data.viewingDistance === "medium" || data.viewingDistance === null) {
      warnings.push("pitchStudyRequired");
      reasoning.push(data.viewingDistance === null ? "viewingDistanceUnknown" : "viewingDistanceMedium");
    } else {
      reasoning.push(data.viewingDistance === "close" ? "viewingDistanceClose" : "viewingDistanceFar");
    }
  }

  return {
    state: resolved.state,
    technologiesEligible: eligible,
    technologyRelevanceScore: { film: scores.film, ecran: scores.ecran },
    technologyConfidence: resolved.technologyConfidence,
    recommendedTechnology: resolved.recommendedTechnology,
    alternativeTechnology: resolved.alternativeTechnology,
    recommendedPitch,
    alternativePitches,
    pitchConfidence,
    reasoning,
    warnings,
    configuratorVersion: CONFIGURATOR_VERSION,
  };
}
