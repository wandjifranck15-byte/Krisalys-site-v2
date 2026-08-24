import { Dictionary } from "@/types";

// Dictionnaire français — langue par défaut.
// Les contenus métier volumineux (solutions, secteurs, FAQ, blog, projets)
// vivent dans /data et sont traduits directement dans leurs fichiers
// respectifs (champs `fr`/`en`) plutôt qu'ici, pour rester à leur place
// naturelle. Ce dictionnaire couvre l'interface : navigation, hero, en-têtes
// de page, formulaire, thème, footer.
const fr: Dictionary = {
  common: {
    ctaPrimary: "Demander une simulation gratuite",
    ctaSecondary: "Découvrir nos solutions",
    ctaAlt: [
      "Recevoir une étude personnalisée",
      "Parlons de votre projet",
      "Transformer votre façade",
      "Obtenir un devis",
      "Prendre rendez-vous",
      "Échanger avec un conseiller",
    ],
    readMore: "En savoir plus",
    scanToDiscover: "Scannez pour en savoir plus",
  },
  theme: {
    light: "Jour",
    dark: "Nuit",
    system: "Système",
    toggleLabel: "Choisir le thème",
  },
  nav: {
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    language: "Langue",
    labels: {
      "/": "Accueil",
      "/nos-solutions": "Nos solutions",
      "/nos-solutions#transparent": "Écrans LED transparents",
      "/nos-solutions#exterieur": "Écrans LED extérieurs",
      "/nos-solutions#interieur": "Écrans LED intérieurs",
      "/nos-solutions#facades": "Façades numériques",
      "/nos-solutions#dynamique": "Affichage dynamique",
      "/secteurs": "Secteurs d'activité",
      "/simulations": "Simulations",
      "/configurateur": "Configurateur",
      "/realisations": "Réalisations",
      "/notre-methode": "Notre méthode",
      "/maintenance": "Maintenance & Support",
      "/a-propos": "À propos",
      "/blog": "Blog",
      "/faq": "FAQ",
      "/contact": "Contact",
      "/mentions-legales": "Mentions légales",
      "/confidentialite": "Politique de confidentialité",
      "/conditions": "Conditions d'utilisation",
    },
  },
  hero: {
    eyebrow: "Écrans LED & solutions visuelles — Douala, Cameroun",
    title: "Transformez votre façade en un puissant outil de communication.",
    subtitle:
      "KRISALYS accompagne les entreprises dans leur transformation grâce à des solutions d'affichage LED innovantes, élégantes et performantes.",
  },
  pages: {
    faq: { eyebrow: "FAQ", title: "Toutes vos questions, sans détour", ctaTitle: "Une question sans réponse ici ?" },
    methode: {
      eyebrow: "Notre méthode",
      title: "Un processus clair, du premier échange à la maintenance",
      description: "Chaque projet suit les mêmes étapes, pensées pour rassurer les dirigeants et éviter toute mauvaise surprise.",
      stepsEyebrow: "Les 8 étapes",
      stepsTitle: "Comment nous travaillons",
      ctaTitle: "Prêt à démarrer la première étape ?",
    },
    maintenance: {
      eyebrow: "Maintenance & Support",
      title: "KRISALYS reste à vos côtés après l'installation",
      description:
        "Un projet d'affichage LED ne s'arrête pas à la mise en service. Voici comment nous accompagnons nos clients dans la durée.",
      ctaTitle: "Une question sur la maintenance de votre installation ?",
      ctaLabel: "Échanger avec un conseiller",
    },
    contact: {
      eyebrow: "Contact",
      title: "Parlons de votre projet",
      description:
        "Remplissez le formulaire ci-dessous ou contactez-nous directement — notre équipe vous répond rapidement.",
      phoneLabel: "Téléphone",
      emailLabel: "Email",
      addressLabel: "Adresse",
      hoursLabel: "Horaires",
      hoursValue: "Lundi – Samedi, 8h – 18h",
      zoneEyebrow: "Zone d'intervention",
      zoneTitle: "Où intervient KRISALYS ?",
      zoneDescription:
        "Douala est notre siège et notre zone d'intervention active. D'autres villes rejoindront progressivement cette couverture.",
    },
    configurateur: {
      eyebrow: "Configurateur",
      title: "Une première estimation, en quelques clics",
      description:
        "Renseignez quelques informations sur votre projet pour recevoir une orientation indicative — jamais un devis.",
    },
    simulations: {
      eyebrow: "Simulations",
      title: "Visualisez votre projet avant de vous engager",
      description:
        "Chaque simulation ci-dessous est un rendu réalisé par KRISALYS à partir d'un bâtiment réel, clairement identifié comme une simulation.",
      configuratorEyebrow: "Configurateur",
      configuratorTitle: "Obtenez une première orientation pour votre projet",
      configuratorDescription:
        "Renseignez quelques informations sur votre bâtiment pour recevoir une estimation indicative du type de solution recommandé.",
      ctaLabel: "Envoyer une photo de mon bâtiment",
    },
    notFound: {
      eyebrow: "Erreur 404",
      title: "Cette page n'existe pas.",
      description: "Le lien suivi est peut-être incorrect ou la page a été déplacée.",
      cta: "Retour à l'accueil",
    },
  },
  form: {
    name: "Nom complet",
    company: "Entreprise",
    phone: "Téléphone",
    email: "Adresse email",
    city: "Ville",
    buildingType: "Type de bâtiment",
    buildingTypePlaceholder: "Sélectionnez un type de bâtiment",
    buildingTypeOptions: [
      "Hôtel",
      "Immeuble de bureaux",
      "Centre commercial",
      "Commerce / magasin",
      "Restaurant",
      "Banque / institution",
      "Autre",
    ],
    message: "Votre message",
    photo: "Photo de votre façade (optionnel)",
    submit: "Envoyer ma demande",
    submitting: "Envoi en cours...",
    successTitle: "Merci pour votre demande.",
    successBody:
      "Notre équipe analysera votre projet et vous recontactera afin de préparer une simulation personnalisée.",
    errorRequired: "Ce champ est requis.",
    errorEmail: "Merci de renseigner une adresse email valide afin que nous puissions vous répondre.",
    errorName: "Merci de renseigner votre nom.",
    errorPhone: "Merci de renseigner un numéro de téléphone valide.",
    errorCity: "Merci de renseigner votre ville.",
    errorBuildingType: "Merci de sélectionner un type de bâtiment.",
    errorMessage: "Merci de décrire brièvement votre projet.",
    errorServer:
      "Une erreur est survenue lors de l'envoi. Vous pouvez aussi nous contacter directement via WhatsApp.",
  },
  whatsapp: {
    prefilledMessage: "Bonjour KRISALYS, je souhaite obtenir une simulation de mon bâtiment.",
  },
  footer: {
    tagline: "Solutions innovantes pour votre visibilité.",
    rightsReserved: "Tous droits réservés.",
    navHeading: "Navigation",
    contactHeading: "Coordonnées",
    legalHeading: "Légal",
  },
  faqCategories: {
    technique: "Questions techniques",
    commercial: "Questions commerciales",
    apresVente: "Après-vente",
  },
};

export default fr;
