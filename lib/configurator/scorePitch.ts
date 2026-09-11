import type { Product, ViewingDistance, ConfidenceLevel } from "./types";

export interface PitchResult {
  recommendedPitch: number | null;
  alternativePitches: number[] | null;
  pitchConfidence: ConfidenceLevel;
  missingPixelDensity: boolean; // true si le classement n'a pas pu s'appuyer sur pixelDensity (donnée manquante)
}

/**
 * ÉTAPE E — classement du pitch, appliqué UNIQUEMENT aux produits déjà
 * filtrés pour la technologie retenue (jamais sur l'ensemble du
 * catalogue). Principe optique général, non spécifique à un fournisseur :
 * à distance rapprochée, une densité de pixels plus élevée est préférée ;
 * à distance lointaine, une densité plus faible est acceptable. Aucun
 * seuil de distance en mètres n'est codé — le classement est relatif aux
 * produits réellement disponibles, jamais une valeur absolue.
 */
export function scorePitch(products: Product[], viewingDistance: ViewingDistance): PitchResult {
  const withDensity = products.filter((p) => p.pixelDensity !== null);

  if (products.length === 0) {
    return { recommendedPitch: null, alternativePitches: null, pitchConfidence: "low", missingPixelDensity: false };
  }

  if (withDensity.length === 0) {
    // Aucun produit disponible n'a de densité de pixels connue : le
    // moteur ne fabrique aucune préférence, quelle que soit la distance.
    return { recommendedPitch: null, alternativePitches: null, pitchConfidence: "low", missingPixelDensity: true };
  }

  if (viewingDistance === "close") {
    const sorted = [...withDensity].sort((a, b) => (b.pixelDensity! - a.pixelDensity!));
    return {
      recommendedPitch: sorted[0].pitch,
      alternativePitches: sorted.slice(1).map((p) => p.pitch),
      pitchConfidence: "high",
      missingPixelDensity: withDensity.length < products.length,
    };
  }

  if (viewingDistance === "far") {
    const sorted = [...withDensity].sort((a, b) => (a.pixelDensity! - b.pixelDensity!));
    return {
      recommendedPitch: sorted[0].pitch,
      alternativePitches: sorted.slice(1).map((p) => p.pitch),
      pitchConfidence: "high",
      missingPixelDensity: withDensity.length < products.length,
    };
  }

  // "medium" ou null : aucune préférence de rang inventée. Le moteur
  // signale plusieurs pitches potentiellement pertinents plutôt que de
  // choisir arbitrairement un pitch médian.
  return {
    recommendedPitch: null,
    alternativePitches: withDensity.map((p) => p.pitch),
    pitchConfidence: "low",
    missingPixelDensity: false,
  };
}
