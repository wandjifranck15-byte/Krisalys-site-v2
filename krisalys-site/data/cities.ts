import { City } from "@/types";

// Carte des villes couvertes. Douala est le siège et le seul point actif
// au lancement. Coordonnées exprimées en pourcentage (x, y) sur le
// composant CameroonMap — une illustration stylisée, pas une carte
// géographique de précision. Ajouter une ville = ajouter une entrée ici.
export const cities: City[] = [
  { name: "Douala", slug: "douala", isHeadquarters: true, status: "active", coordinates: { x: 28, y: 62 } },
  { name: "Yaoundé", slug: "yaounde", isHeadquarters: false, status: "upcoming", coordinates: { x: 42, y: 55 } },
  { name: "Kribi", slug: "kribi", isHeadquarters: false, status: "upcoming", coordinates: { x: 30, y: 78 } },
  { name: "Bafoussam", slug: "bafoussam", isHeadquarters: false, status: "upcoming", coordinates: { x: 35, y: 38 } },
  { name: "Garoua", slug: "garoua", isHeadquarters: false, status: "upcoming", coordinates: { x: 55, y: 15 } },
  { name: "Bamenda", slug: "bamenda", isHeadquarters: false, status: "upcoming", coordinates: { x: 25, y: 35 } },
];
