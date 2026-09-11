// Génère un identifiant de projet du type "KR-2026-000184".
//
// LIMITE HONNÊTE : ce projet n'a pas de base de données ni de compteur
// persistant côté serveur (aucune infrastructure de stockage n'existe dans
// le projet à ce stade). Le suffixe numérique est donc dérivé d'un
// timestamp + composant aléatoire, PAS d'un compteur séquentiel réel —
// il garantit une quasi-unicité mais pas une numérotation continue
// (ex. "000184" strictement croissant). À remplacer par un vrai compteur
// dès qu'un système de stockage sera disponible (ex. table HubSpot,
// base de données propre) — voir README > Configurateur.
export function generateProjectId(date: Date = new Date()): string {
  const year = date.getFullYear();
  const suffix = String(Math.floor(Date.now() % 1000000)).padStart(6, "0");
  return `KR-${year}-${suffix}`;
}
