# KRISALYS — Phase 3 : Configurateur intelligent — Audit & plan
**Statut : document de travail, en attente de ton "OK". Aucun code n'a été modifié.**

---

## 1. Audit du configurateur actuel

**Fichiers impliqués aujourd'hui :**
- `components/sections/Configurator.tsx` — formulaire + fonction `computeRecommendation()` inline (règles if/else en dur dans le composant React)
- `lib/validations/contact.ts` — `configuratorSchema` (Zod) : 6 champs (buildingType, city, widthMeters, heightMeters, placement, objective)
- `types/index.ts` — `ConfiguratorFormValues`, `ConfiguratorResult` (3 champs : recommendedSolution, reasoning, disclaimer)
- `lib/i18n/dictionaries/{fr,en}.ts` — namespace `configurator` (labels + 4 couples nom/justification de résultat + disclaimer)
- `components/pages/ConfigurateurPageContent.tsx` et `SimulationsPageContent.tsx` — les deux seuls consommateurs

**Ce qui existe** : un formulaire à 6 champs, une fonction de règles à 4 issues possibles (dynamique / extérieur grand format / extérieur petit / intérieur vitré / intérieur), aucune donnée produit, aucun prix, aucune soumission (le résultat s'affiche seulement à l'écran, **rien n'est envoyé à HubSpot ni par email** — le configurateur est actuellement un outil de simulation isolé, pas un formulaire de capture de prospect).

**Ce qui doit être conservé** : le schéma général du composant (formulaire + panneau résultat côte à côte), le principe du disclaimer obligatoire, l'intégration dans `/configurateur` et `/simulations`, l'architecture i18n existante (`getX(locale)`, dictionnaire).

**Incohérences et risques identifiés :**
1. **Aucune donnée produit n'existe** dans le projet — tout est à créer.
2. **Le configurateur ne capture aucun prospect** aujourd'hui (pas de nom/email/téléphone, pas d'envoi HubSpot/Resend) — ta demande implique d'en faire un vrai point de conversion avec coordonnées finales. C'est un changement de nature du composant, pas juste un enrichissement.
3. **Champs `buildingType`/`objective` actuels sont du texte libre**, pas des enums — à restructurer pour un moteur de règles fiable.
4. **Le questionnaire à 15 étapes** demandé est bien plus long que le formulaire actuel à 6 champs — implique une refonte UX complète (probablement multi-étapes), pas un simple ajout de champs.
5. **Risque de confusion de rôle** : `/configurateur` (outil autonome) et le formulaire `/contact` existant capturent tous deux des prospects — il faudra clarifier si le configurateur remplace, complète, ou alimente différemment HubSpot par rapport au formulaire de contact classique (voir section 8).

## 2. Architecture proposée

```
data/
  products.ts          — catalogue produits (data layer pure, jamais dans les composants)
  pricing-config.ts     — frais d'installation/contrôle/accessoires configurables
lib/
  configurator/
    types.ts            — Product, ClientDeclaredData, EngineDerivedData, ConfiguratorResult
    filter.ts            — filtrage technique (compatibilité stricte)
    scoreTechnology.ts    — score Film vs Écran (normalisé, séparé du pitch)
    scorePitch.ts         — score pitch (indépendant, jamais mélangé au score techno)
    pricing.ts            — moteur de prix (totalement séparé du moteur de recommandation)
    recommend.ts          — orchestrateur : filtre → score → décide de l'état (clearRecommendation / twoRelevantSolutions / technicalStudyRequired) → construit engineDerivedData
    projectId.ts          — génération d'ID (KR-{année}-{compteur})
components/
  configurator/
    ConfiguratorWizard.tsx     — orchestrateur multi-étapes (remplace Configurator.tsx)
    steps/Step1Project.tsx ... — un composant par étape (15 questions regroupées en ~6-7 écrans logiques, pas 15 écrans séparés — voir section 4)
    ResultPanel.tsx             — affichage résultat (jamais les scores internes)
```

**Principe non négociable, conforme à ta demande** : `lib/configurator/*` ne contient **aucun texte affiché à l'utilisateur** (tout passe par le dictionnaire) et **aucune caractéristique produit en dur** (tout vient de `data/products.ts`).

## 3. Schéma des données

```ts
type PriceStatus = "placeholder" | "validated";
type ValidationStatus = "unverified" | "supplier-verified" | "internally-verified";

interface Product {
  supplier: string;              // "REEFILM"
  manufacturer: string;          // "REEFILM" (peut différer du revendeur à l'avenir)
  technology: "film-led-transparent" | "ecran-led-transparent";
  model: string;                 // "O-Series P6.25"
  sku: string | null;
  pitch: number;                 // mm — 4, 5, 6.25, 8, 10, 15, 20
  pricePerM2: number | null;
  priceStatus: PriceStatus;
  transparency: number | null;   // %
  brightness: number | null;     // cd/m² (ou [min,max] si double valeur)
  brightnessMax: number | null;
  viewingAngle: number | null;
  pixelDensity: number | null;   // pixels/m²
  powerPeak: number | null;
  powerAverage: number | null;
  weight: number | null;
  thickness: number | null;
  refreshRate: number | null;
  operatingTemperature: string | null;
  humidity: string | null;
  moduleWidth: number | null;    // mm
  moduleHeight: number | null;   // mm
  source: string;                // "Données publiques REEFILM O-Series, communiquées le [date]"
  validationStatus: ValidationStatus;
  active: boolean;
}

interface ClientDeclaredData {
  buildingType: string;
  usage: string;
  glazedSurfaceM2: number | null;
  widthMeters: number;
  heightMeters: number;
  viewingDistance: "close" | "medium" | "far" | null;
  ambientLight: "low" | "medium" | "high" | null;
  environment: "interieur" | "exterieur";
  transparencyPreference: "low" | "medium" | "high" | null;
  contentType: string | null;
  objective: string;
  technologyPreference: "film" | "ecran" | "no-preference";
  constraints: string | null;
  city: string;
  // Coordonnées finales (fin de parcours)
  name: string; email: string; phone: string; company: string | null;
  photoUrl: string | null; // optionnel
}

interface EngineDerivedData {
  state: "clearRecommendation" | "twoRelevantSolutions" | "technicalStudyRequired";
  recommendedTechnology: Product["technology"] | null;
  alternativeTechnology: Product["technology"] | null;
  recommendedPitch: number | null;
  alternativePitch: number | null;
  technologyScores: { film: number; ecran: number }; // normalisés 0-1, jamais affichés
  reasoning: string[];        // clés i18n, pas de texte brut
  warnings: string[];
  confidenceLevel: "high" | "medium" | "low";
  configuratorVersion: string;
}

interface PricingResult {
  surfaceM2: number;
  pricePerM2: number | null;
  priceStatus: PriceStatus;
  installationFee: number;
  controlSystemFee: number;
  accessoriesFee: number;
  totalEstimate: number | null; // null si pricePerM2 est null
}

interface ConfiguratorSubmission {
  projectId: string;           // "KR-2026-000184"
  createdAt: string;
  configuratorVersion: string;
  supplier: string;
  clientDeclaredData: ClientDeclaredData;
  engineDerivedData: EngineDerivedData;
  pricingData: PricingResult;
}
```

## 4. Logique de filtrage (proposée)

Filtrage strict **avant** tout scoring — élimine un produit s'il est objectivement incompatible :
- `active === false` → exclu.
- `environment === "exterieur"` mais le produit n'a pas de donnée de température de fonctionnement validée pour l'extérieur (`operatingTemperature === null` et environnement extérieur) → exclu **par prudence**, pas par supposition.
- Aucune règle de filtrage n'invente une compatibilité ou une incompatibilité non fondée sur une donnée réellement présente dans `data/products.ts` — si une donnée manque, le produit est traité comme **non filtré sur ce critère** (ni inclus ni exclu abusivement), et un `warning` est ajouté (`"Donnée non disponible pour ce critère — à confirmer en étude technique"`).

## 5. Logique de scoring (proposée)

**Score technologie (Film vs Écran)** — deux scores indépendants, chacun normalisé 0 à 1, construits à partir de règles explicites et documentées (pas de poids arbitraires cachés) :
- Vitrage déjà en place à préserver sans intervention lourde → point pour Film.
- Besoin de configuration/intégration architecturale plus soutenue (façade neuve, projet de rénovation) → point pour Écran.
- Préférence client (`technologyPreference`) : **pondère** le score mais ne peut jamais, à elle seule, faire remonter une technologie déjà exclue au filtrage (conforme à ta règle 6).
- Transparence recherchée très élevée → léger avantage Film (le film est conçu pour une transparence proche du vitrage existant) ; **je ne fixerai aucun seuil chiffré** (ex. "transparence > X% = Film") tant qu'il n'est pas validé par une donnée fournisseur — seule une préférence qualitative sera codée.

**Score pitch** — séparé, basé uniquement sur : distance de vision déclarée + pixelDensity réelle des produits filtrés. **Aucune plage de distance universelle ne sera codée en dur** (ex. "vision rapprochée = P4 à P6.25") sans confirmation — si les données manquent pour trancher, le moteur retombe sur `technicalStudyRequired` pour le pitch spécifiquement, même si la technologie, elle, est déterminée.

**Détermination de l'état final :**
- `clearRecommendation` : un score technologie nettement au-dessus de l'autre + un pitch identifiable avec confiance.
- `twoRelevantSolutions` : scores technologie proches (écart sous un seuil à définir avec toi) → les deux solutions sont présentées, sans hiérarchie de valeur (cohérent avec la neutralité déjà actée en Phase 2).
- `technicalStudyRequired` : filtrage n'a laissé aucun produit clairement compatible, ou données insuffisantes pour un score fiable.

## 6. Logique de prix (proposée)

Fonction pure, totalement séparée du moteur de recommandation (fichier `lib/configurator/pricing.ts`), prenant en entrée `(surfaceM2, product, pricingConfig)` :
```
total = surfaceM2 × product.pricePerM2
      + pricingConfig.installationFee(surfaceM2)   // formule configurable, pas une constante figée
      + pricingConfig.controlSystemFee
      + pricingConfig.accessoriesFee
```
`pricingConfig` vit dans `data/pricing-config.ts`, modifiable sans toucher au moteur. Si `product.pricePerM2` est `null`, `totalEstimate` est `null` et le résultat affiche "à confirmer" au lieu d'un chiffre. Les 7 prix provisoires que tu as fournis seront intégrés avec `priceStatus: "placeholder"` — **je propose d'afficher un bandeau explicite "estimation basée sur des tarifs provisoires de développement, non contractuels"** tant que ce statut n'est pas passé à `"validated"`. À confirmer.

## 7. Structure du résultat (proposée)

Ce que voit le client (jamais les scores bruts) :
- Technologie recommandée (nom + courte explication, textes tirés du dictionnaire, pas générés dynamiquement en dur dans le moteur)
- Pitch recommandé, **seulement si `confidenceLevel !== "low"`** — sinon la mention "pitch à confirmer en étude technique" remplace un chiffre
- Points forts (2-3 max, issus de `reasoning`)
- Estimation budgétaire avec mention "indicative" systématique
- CTA : "Demander une simulation gratuite" (état clair) ou "Demander une étude technique gratuite" (état incertain) — texte du CTA piloté par l'état, pas codé en dur par écran
- Cas `twoRelevantSolutions` : les deux résultats affichés côte à côte, formulation strictement symétrique (même contrainte de neutralité qu'en Phase 2)

## 8. Intégration HubSpot — POINT À DÉCIDER avant codage

Le configurateur actuel n'envoie **rien** à HubSpot aujourd'hui. Ta demande implique de lui ajouter une vraie soumission de fin de parcours (coordonnées + résultat technique complet). Cela veut dire créer un **second point d'entrée HubSpot**, distinct de celui du formulaire `/contact` (`lib/hubspot.ts` actuel). Deux options :
- **(a)** Réutiliser `syncContactToHubSpot()` existant en lui passant des propriétés supplémentaires (projectId, technologie recommandée, pitch, estimation, version configurateur) — nécessite d'étendre sa signature et probablement de nouvelles propriétés personnalisées côté HubSpot (à créer manuellement dans ton compte, comme pour les précédentes).
- **(b)** Créer une fonction dédiée `syncConfiguratorSubmission()` dans `lib/hubspot.ts`, plus explicite sur les champs propres au configurateur, au risque d'une petite duplication de la logique Contact/Company/Deal.
Je recommande **(a)** pour éviter la duplication, mais c'est ton arbitrage. Photo : uniquement stockée si un mécanisme d'upload existe déjà (à ma connaissance, **aucun système d'upload de fichier n'existe actuellement dans ce projet** — ni pour le formulaire de contact ni ailleurs) ; il faudra soit l'ajouter (upload + stockage, hors périmètre HubSpot pur), soit se limiter à transmettre un lien si le prospect le fournit autrement. **Ce point technique doit être tranché avant codage.**

## 9. Stratégie de tests

Aucun framework de test n'existe dans ce projet (confirmé lors de l'audit initial, tour précédent). Je propose des **tests unitaires purs** (sans dépendance UI) sur `lib/configurator/recommend.ts` et `pricing.ts`, couvrant explicitement les 12 scénarios demandés (petite vitrine, grande façade, forte lumière, forte transparence, vision rapprochée, vision lointaine, intérieur, extérieur, données insuffisantes, deux solutions pertinentes, préférence contradictoire, donnée technique null). **Limite technique à signaler** : je ne peux pas exécuter ces tests dans cet environnement (pas d'accès réseau pour installer un framework de test comme Vitest/Jest) — je peux les écrire et vérifier leur logique par relecture manuelle, mais pas les exécuter réellement. À signaler clairement dans le bilan final, comme pour le build.

## 10. Fichiers qui seront modifiés
`data/products.ts` (nouveau), `data/pricing-config.ts` (nouveau), `lib/configurator/*` (nouveau, ~6 fichiers), `types/index.ts` (nouveaux types), `components/sections/Configurator.tsx` → remplacé par `components/configurator/ConfiguratorWizard.tsx` + sous-composants d'étapes, `lib/validations/contact.ts` (nouveau schéma multi-étapes), `lib/i18n/dictionaries/{fr,en}.ts` (nouveau namespace configurateur complet), `lib/hubspot.ts` (extension, selon arbitrage section 8), `app/api/contact/route.ts` **ou nouvelle route `app/api/configurateur/route.ts`** (à trancher — je recommande une route dédiée pour ne pas complexifier la route existante), `components/pages/ConfigurateurPageContent.tsx` et `SimulationsPageContent.tsx` (adaptation à la nouvelle interface).

## 11. Fichiers qui ne seront PAS modifiés
Navigation, `/nos-solutions`, pages piliers, `/secteurs`, `/realisations`, `/notre-methode`, `/maintenance`, `/a-propos`, `/blog`, `/faq`, pages légales, thème, SEO/metadata des autres pages, sitemap/robots (sauf ajout éventuel d'une route API, invisible au sitemap), le formulaire `/contact` existant et son intégration HubSpot actuelle (sauf extension additive décrite en section 8).

---

## Points nécessitant explicitement ton arbitrage avant codage
1. **Intégration HubSpot** : option (a) ou (b) — section 8.
2. **Upload de photo** : aucun système n'existe — l'ajouter maintenant (hors périmètre strict du moteur), ou reporter et transmettre uniquement les coordonnées sans photo dans un premier temps ?
3. **Statut des prix provisoires** : bandeau "tarifs non contractuels" explicite — à valider.
4. **Seuil de bascule vers `twoRelevantSolutions`** : à définir ensemble (ex. écart de score < 15 %) plutôt que je ne le fixe seul.
5. **Découpage du parcours en ~6-7 écrans** (regroupant les 15 questions) plutôt que 15 écrans séparés — à valider, ou préfères-tu un écran par question ?

**J'attends ton "OK" avant toute modification de code.**
