import type { Product, Technology } from "./types";

const ALL_TECHNOLOGIES: Technology[] = ["film-led-transparent", "ecran-led-transparent"];

/**
 * ÉTAPE A — Éligibilité technologique.
 * Par défaut, Film ET Écran sont tous deux éligibles : aucune règle
 * n'exclut une technologie entière faute de données fournisseur validées
 * établissant une incompatibilité. La SEULE exclusion appliquée ici est un
 * fait de catalogue (zéro produit actif pour cette technologie), jamais
 * une supposition technique.
 */
export function getEligibleTechnologies(catalog: Product[]): Technology[] {
  return ALL_TECHNOLOGIES.filter((tech) =>
    catalog.some((p) => p.technology === tech && p.active)
  );
}

/**
 * ÉTAPE B — Filtrage produit à l'intérieur d'une technologie éligible.
 * Un produit n'est exclu QUE s'il est inactif (`active === false`). Une
 * donnée technique manquante (null) ne justifie jamais une exclusion :
 * le produit est conservé, et l'absence de donnée est gérée plus loin
 * (score pitch, warnings) — jamais ici par une supposition.
 */
export function getFilteredProducts(catalog: Product[], technology: Technology): Product[] {
  return catalog.filter((p) => p.technology === technology && p.active);
}
