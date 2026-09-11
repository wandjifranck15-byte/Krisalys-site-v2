# KRISALYS · Refonte stratégique · Livraison

## État

La refonte stratégique a été appliquée sur la base de la version v39 fournie.

### Positionnement

KRISALYS est désormais présenté comme un spécialiste des **solutions LED transparentes pour surfaces vitrées**, avec deux technologies piliers :

- Film LED transparent
- Écran LED transparent

Les anciennes familles « intérieur / extérieur / façades numériques / affichage dynamique » ne sont plus des offres autonomes dans la navigation. Leur contenu pertinent reste exploitable comme contexte ou variante de projet.

## Travaux réalisés

1. Architecture de données des technologies piliers conservée et renforcée.
2. Pages `/film-led-transparent` et `/ecrans-led-transparents` enrichies.
3. `/nos-solutions` transformée en page passerelle.
4. Navigation principale restructurée autour de Solutions / Applications / Votre projet / Réalisations / Ressources / À propos.
5. Homepage restructurée pour privilégier la narration commerciale sans dupliquer le site entier.
6. Configurateur reconstruit autour de la description du projet et non du choix d'un type d'écran classique.
7. Le configurateur recommande désormais une technologie transparente à étudier et un **niveau de pitch indicatif** (fin / intermédiaire / large), sans inventer de pitch fabricant précis.
8. Lorsque les critères se contredisent, le configurateur peut retourner « étude technique à confirmer ».
9. Secteurs et simulations utilisent désormais les technologies piliers comme référence.
10. Blog réorienté vers un cluster éditorial transparent LED sans changer les URLs existantes.
11. Métadonnées SEO et mots-clés réalignés autour du film LED transparent, de l'écran LED transparent, des vitrines et façades vitrées.
12. Données structurées globales enrichies avec Organization, WebSite et Service.
13. Sitemap ajusté avec une priorité renforcée pour les pages piliers et le configurateur.
14. FR/EN conservé sur l'ensemble des nouveaux contenus.

## Point volontairement non figé

Les pitches précis (par exemple P6.25, P8, P10) ne sont **pas codés comme recommandations fabricant** tant que KRISALYS n'a pas fourni/validé une matrice technique fabricant avec les modèles réellement disponibles.

Le moteur est prêt à recevoir cette matrice. Une fois les données validées, la recommandation pourra devenir précise sans réécrire le configurateur.

## Vérifications statiques

- Anciennes références de routing `recommendedSolutionSlug` / `solutionSlug` supprimées des composants métier.
- Anciennes ancres `/nos-solutions#transparent`, `#exterieur`, `#interieur`, `#facades`, `#dynamique` supprimées de la navigation.
- Parité structurelle FR/EN vérifiée sur les propriétés du dictionnaire : aucune différence détectée.
- Équilibre basique des accolades/parenthèses vérifié sur les principaux fichiers modifiés.

## Build / npm

La build et l'installation des dépendances sont laissées à l'environnement local de développement, conformément à la demande.

Commandes recommandées sur la machine de travail :

```bash
npm install
npm run build
```

Puis, si la build passe :

```bash
npm run dev
```

## Contrôle manuel recommandé avant push

1. Accueil FR puis EN.
2. Menu desktop et mobile.
3. `/nos-solutions`.
4. `/film-led-transparent`.
5. `/ecrans-led-transparents`.
6. `/configurateur` avec plusieurs profils de projet.
7. `/secteurs`.
8. `/simulations`.
9. Blog et articles.
10. Mode clair / sombre.
11. Formulaire HubSpot/contact.
12. Sitemap et robots.

## Règle SEO

Ne pas attendre d'être n°1 sur « écran LED transparent » immédiatement. Le site doit d'abord construire une autorité thématique cohérente autour des surfaces vitrées et des technologies LED transparentes, puis renforcer cette autorité avec des contenus utiles et surtout des réalisations KRISALYS réelles.
