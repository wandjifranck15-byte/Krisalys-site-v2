// Tests du moteur de recommandation — cas A à L (voir
// KRISALYS-Phase3-Configurateur-Audit.md pour le détail attendu).
// Exécutable directement via ts-node dans cet environnement :
//   npx ts-node lib/configurator/__tests__/recommend.test.ts
// Écrit sans dépendance à un framework de test (aucun n'est installé dans
// le projet — voir bilan final) : assertions manuelles + rapport console.
import { recommend } from "../recommend";
import { testProducts } from "../test-products";
import type { ClientDeclaredData } from "../types";

let passed = 0;
let failed = 0;

function assertEqual(actual: unknown, expected: unknown, label: string) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    passed++;
  } else {
    failed++;
    console.error(`ÉCHEC — ${label}\n  attendu: ${JSON.stringify(expected)}\n  obtenu:  ${JSON.stringify(actual)}`);
  }
}

const base: ClientDeclaredData = {
  buildingType: "Hôtel",
  usage: "Communication",
  projectContext: null,
  widthMeters: 5,
  heightMeters: 3,
  glazedSurfaceM2: null,
  viewingDistance: null,
  ambientLight: null,
  environment: "exterieur",
  transparencyPreference: null,
  contentType: null,
  objective: "Visibilité",
  technologyPreference: "no-preference",
  constraints: null,
  city: "Douala",
  name: "Test",
  email: "test@example.com",
  phone: "699000000",
  company: null,
  photoUrl: null,
};

// A — Film clair + pitch déterminable (close → pixelDensity la + élevée : TEST-FILM-A 25600 > TEST-FILM-B 10000)
{
  const r = recommend({ ...base, projectContext: "existing-glazing", viewingDistance: "close" }, testProducts);
  assertEqual(r.state, "clearRecommendation", "A - state");
  assertEqual(r.recommendedTechnology, "film-led-transparent", "A - technology");
  assertEqual(r.technologyConfidence, "high", "A - technologyConfidence");
  assertEqual(r.recommendedPitch, 6.25, "A - pitch (TEST-FILM-A)");
  assertEqual(r.pitchConfidence, "high", "A - pitchConfidence");
}

// B — Écran clair + pitch déterminable (far → seul produit dispo TEST-ECRAN-A pitch=8, mais TEST-ECRAN-NULL a pixelDensity null donc exclu du classement)
{
  const r = recommend({ ...base, projectContext: "new-or-renovation", viewingDistance: "far" }, testProducts);
  assertEqual(r.state, "clearRecommendation", "B - state");
  assertEqual(r.recommendedTechnology, "ecran-led-transparent", "B - technology");
  assertEqual(r.recommendedPitch, 8, "B - pitch (seul TEST-ECRAN-A a une densité connue)");
  assertEqual(r.pitchConfidence, "high", "B - pitchConfidence");
  assertEqual(r.warnings.includes("missingPixelDensity"), true, "B - warning donnée manquante (TEST-ECRAN-NULL)");
}

// C — Film clair, pitch indéterminé (medium)
{
  const r = recommend({ ...base, projectContext: "existing-glazing", viewingDistance: "medium" }, testProducts);
  assertEqual(r.state, "clearRecommendation", "C - state");
  assertEqual(r.recommendedTechnology, "film-led-transparent", "C - technology");
  assertEqual(r.technologyConfidence, "high", "C - technologyConfidence");
  assertEqual(r.recommendedPitch, null, "C - pitch doit rester null");
  assertEqual(r.pitchConfidence, "low", "C - pitchConfidence low");
  assertEqual(r.warnings.includes("pitchStudyRequired"), true, "C - warning étude pitch");
}

// D — Écran clair, pitch indéterminé (viewingDistance non renseignée)
{
  const r = recommend({ ...base, projectContext: "new-or-renovation", viewingDistance: null }, testProducts);
  assertEqual(r.state, "clearRecommendation", "D - state");
  assertEqual(r.recommendedTechnology, "ecran-led-transparent", "D - technology");
  assertEqual(r.recommendedPitch, null, "D - pitch doit rester null");
  assertEqual(r.pitchConfidence, "low", "D - pitchConfidence low");
}

// E — twoRelevantSolutions, écart=1 (new-or-renovation=2 écran, préférence film=+1 → film=1,ecran=2)
{
  const r = recommend({ ...base, projectContext: "new-or-renovation", technologyPreference: "film" }, testProducts);
  assertEqual(r.state, "twoRelevantSolutions", "E - state");
  assertEqual(r.recommendedTechnology, "ecran-led-transparent", "E - higher score");
  assertEqual(r.alternativeTechnology, "film-led-transparent", "E - alternative");
  assertEqual(r.technologyConfidence, "medium", "E - technologyConfidence medium");
}

// F — 0-0 → technicalStudyRequired
{
  const r = recommend({ ...base }, testProducts);
  assertEqual(r.state, "technicalStudyRequired", "F - state");
  assertEqual(r.recommendedTechnology, null, "F - no technology");
  assertEqual(r.technologyConfidence, "low", "F - confidence low");
}

// G — préférence opposée à la tendance (existing-glazing=2 film, préférence ecran=+1 → film=2,ecran=1)
{
  const r = recommend({ ...base, projectContext: "existing-glazing", technologyPreference: "ecran" }, testProducts);
  assertEqual(r.state, "twoRelevantSolutions", "G - state");
  assertEqual(r.recommendedTechnology, "film-led-transparent", "G - higher score");
  assertEqual(r.alternativeTechnology, "ecran-led-transparent", "G - alternative");
}

// H — données insuffisantes (identique à F)
{
  const r = recommend({ ...base }, testProducts);
  assertEqual(r.state, "technicalStudyRequired", "H - state");
}

// I — forte luminosité, aucune influence sur le score
{
  const r1 = recommend({ ...base, projectContext: "existing-glazing" }, testProducts);
  const r2 = recommend({ ...base, projectContext: "existing-glazing", ambientLight: "high" }, testProducts);
  assertEqual(r1.technologyRelevanceScore, r2.technologyRelevanceScore, "I - score identique avec/sans luminosité");
  assertEqual(r2.warnings.includes("highAmbientLightContextOnly"), true, "I - warning luminosité présent");
}

// J — transparence élevée, aucune influence sur le score
{
  const r1 = recommend({ ...base, projectContext: "new-or-renovation" }, testProducts);
  const r2 = recommend({ ...base, projectContext: "new-or-renovation", transparencyPreference: "high" }, testProducts);
  assertEqual(r1.technologyRelevanceScore, r2.technologyRelevanceScore, "J - score identique avec/sans transparence");
  assertEqual(r2.warnings.includes("highTransparencyContextOnly"), true, "J - warning transparence présent");
}

// K — produit avec donnée technique null (TEST-ECRAN-NULL seul produit écran dans un sous-catalogue dédié)
{
  const catalogWithOnlyNullEcran = testProducts.filter(
    (p) => p.technology === "film-led-transparent" || p.model === "TEST-ECRAN-NULL"
  );
  const r = recommend({ ...base, projectContext: "new-or-renovation", viewingDistance: "close" }, catalogWithOnlyNullEcran);
  assertEqual(r.recommendedTechnology, "ecran-led-transparent", "K - technology still recommended");
  assertEqual(r.recommendedPitch, null, "K - pitch null (seule donnée dispo est null)");
  assertEqual(r.warnings.includes("missingPixelDensity"), true, "K - warning donnée manquante");
}

// L — une technologie filtrée (fait de catalogue), l'autre disponible
// (reprend le cas documenté : Film absent du catalogue, Écran disponible,
// projet favorisant Écran → clearRecommendation malgré l'absence de Film).
{
  const ecranOnlyCatalog = testProducts.filter((p) => p.technology === "ecran-led-transparent");
  const r = recommend({ ...base, projectContext: "new-or-renovation" }, ecranOnlyCatalog);
  assertEqual(r.technologiesEligible, ["ecran-led-transparent"], "L - only ecran eligible (catalog fact)");
  assertEqual(r.warnings.includes("filmNotInCatalog"), true, "L - warning film absent du catalogue");
  assertEqual(r.state, "clearRecommendation", "L - state");
  assertEqual(r.recommendedTechnology, "ecran-led-transparent", "L - technology");
  assertEqual(r.technologyConfidence, "high", "L - confidence");
}

console.log(`\n${passed} test(s) réussi(s), ${failed} échec(s).`);
if (failed > 0) process.exit(1);
