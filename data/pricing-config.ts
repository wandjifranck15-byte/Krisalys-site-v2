import type { PricingConfig } from "@/lib/configurator/types";

// Frais annexes de l'estimation budgétaire — tarifs provisoires de
// développement, non contractuels (priceStatus = "placeholder"). Ces
// valeurs seront remplacées par des tarifs validés commercialement ;
// modifiables ici sans toucher à la logique du moteur (lib/configurator/pricing.ts).
export const pricingConfig: PricingConfig = {
  installationFeeFlat: 150000, // FCFA, forfait de base
  installationFeePerM2: 5000, // FCFA/m², vient s'ajouter au forfait
  controlSystemFee: 300000, // FCFA, système de pilotage/contenu
  accessoriesFee: 0, // FCFA, aucun accessoire facturé par défaut
  priceStatus: "placeholder",
};
