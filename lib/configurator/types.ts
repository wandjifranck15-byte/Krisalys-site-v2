// Types du configurateur "intelligent" KRISALYS (Phase 3).
// Architecture validée : filtrage → pertinence → préférence client →
// classement. Voir KRISALYS-Phase3-Configurateur-Audit.md pour le détail
// du modèle de scoring et sa justification.

export type Technology = "film-led-transparent" | "ecran-led-transparent";
export type PriceStatus = "placeholder" | "validated";
export type ValidationStatus = "unverified" | "supplier-verified" | "internally-verified";
export type ConfidenceLevel = "high" | "medium" | "low";
export type EngineState = "clearRecommendation" | "twoRelevantSolutions" | "technicalStudyRequired";

// Fiche produit — data layer pure, jamais de caractéristique en dur dans
// un composant React. Toute donnée non connue doit être `null`, jamais
// inventée ou supposée.
export interface Product {
  supplier: string;
  manufacturer: string;
  technology: Technology;
  model: string;
  sku: string | null;
  pitch: number; // mm
  pricePerM2: number | null;
  priceStatus: PriceStatus;
  transparency: number | null; // %
  brightness: number | null; // cd/m² (valeur basse si double valeur constructeur)
  brightnessMax: number | null; // cd/m² (valeur haute si double valeur constructeur, sinon null)
  viewingAngle: number | null;
  pixelDensity: number | null; // pixels/m²
  powerPeak: number | null;
  powerAverage: number | null;
  weight: number | null;
  thickness: number | null;
  refreshRate: number | null;
  operatingTemperature: string | null;
  humidity: string | null;
  moduleWidth: number | null; // mm
  moduleHeight: number | null; // mm
  source: string;
  validationStatus: ValidationStatus;
  active: boolean;
}

export type ProjectContext = "existing-glazing" | "new-or-renovation" | null;
export type ViewingDistance = "close" | "medium" | "far" | null;
export type AmbientLight = "low" | "medium" | "high" | null;
export type Environment = "interieur" | "exterieur";
export type TransparencyPreference = "low" | "medium" | "high" | null;
export type TechnologyPreference = "film" | "ecran" | "no-preference";

// Données réellement déclarées par le prospect — jamais mélangées avec ce
// que le moteur calcule (EngineDerivedData ci-dessous).
export interface ClientDeclaredData {
  buildingType: string;
  usage: string;
  projectContext: ProjectContext;
  widthMeters: number;
  heightMeters: number;
  glazedSurfaceM2: number | null; // renseigné seulement si les dimensions ne représentent pas correctement la surface (cas particulier)
  viewingDistance: ViewingDistance;
  ambientLight: AmbientLight;
  environment: Environment;
  transparencyPreference: TransparencyPreference;
  contentType: string | null;
  objective: string;
  technologyPreference: TechnologyPreference;
  constraints: string | null;
  city: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  photoUrl: string | null; // toujours null dans cette phase (upload non implémenté)
}

// Résultat du moteur — jamais les scores bruts affichés au client, voir
// ResultPanel.tsx pour ce qui est réellement montré.
export interface EngineDerivedData {
  state: EngineState;
  technologiesEligible: Technology[]; // après étape A (éligibilité technologique)
  technologyRelevanceScore: { film: number; ecran: number }; // normalisé 0-1, jamais affiché au client
  technologyConfidence: ConfidenceLevel;
  recommendedTechnology: Technology | null;
  alternativeTechnology: Technology | null;
  recommendedPitch: number | null;
  alternativePitches: number[] | null;
  pitchConfidence: ConfidenceLevel;
  reasoning: string[]; // clés i18n (configurator.reasoning.*), jamais de texte brut généré
  warnings: string[]; // clés i18n (configurator.warnings.*)
  configuratorVersion: string;
}

export interface PricingConfig {
  installationFeeFlat: number;
  installationFeePerM2: number;
  controlSystemFee: number;
  accessoriesFee: number;
  priceStatus: PriceStatus; // "placeholder" tant que les frais ne sont pas validés commercialement
}

export interface PricingResult {
  surfaceM2: number;
  pricePerM2: number | null;
  priceStatus: PriceStatus;
  installationFee: number;
  controlSystemFee: number;
  accessoriesFee: number;
  totalEstimate: number | null; // null si pricePerM2 est null (aucun produit avec prix connu)
}

export interface ConfiguratorSubmission {
  projectId: string; // "KR-2026-000184"
  createdAt: string;
  configuratorVersion: string;
  supplier: string | null; // fournisseur du produit recommandé, si déterminé
  clientDeclaredData: ClientDeclaredData;
  engineDerivedData: EngineDerivedData;
  pricingData: PricingResult;
}

export const CONFIGURATOR_VERSION = "3.0.0";
