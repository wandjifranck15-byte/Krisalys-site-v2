import type { Product, PricingConfig, PricingResult } from "./types";

/**
 * Moteur de prix — fonction pure, aucune dépendance au moteur de
 * recommandation (lib/configurator/scoreTechnology.ts, scorePitch.ts).
 * Le prix n'intervient JAMAIS dans le choix de la technologie ou du
 * pitch — uniquement dans cette estimation, calculée après coup à partir
 * du produit déjà recommandé.
 */
export function computePricing(
  surfaceM2: number,
  product: Product | null,
  config: PricingConfig
): PricingResult {
  const pricePerM2 = product?.pricePerM2 ?? null;
  const priceStatus = product?.priceStatus ?? config.priceStatus;

  const installationFee = config.installationFeeFlat + config.installationFeePerM2 * surfaceM2;
  const controlSystemFee = config.controlSystemFee;
  const accessoriesFee = config.accessoriesFee;

  const totalEstimate =
    pricePerM2 === null ? null : surfaceM2 * pricePerM2 + installationFee + controlSystemFee + accessoriesFee;

  return {
    surfaceM2,
    pricePerM2,
    priceStatus,
    installationFee,
    controlSystemFee,
    accessoriesFee,
    totalEstimate,
  };
}
