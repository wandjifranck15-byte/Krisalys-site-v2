// Dictionnaire français — langue de lancement.
// Les textes des pages (solutions, secteurs, FAQ, etc.) vivent dans /data
// et sont déjà externalisés des composants. Ce dictionnaire couvre les
// chaînes d'interface récurrentes (navigation, boutons, formulaires),
// pour lesquelles la traduction est indépendante du contenu métier.
const fr = {
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
  nav: {
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    language: "Langue",
  },
  form: {
    name: "Nom complet",
    company: "Entreprise",
    phone: "Téléphone",
    email: "Adresse email",
    city: "Ville",
    buildingType: "Type de bâtiment",
    message: "Votre message",
    photo: "Photo de votre façade (optionnel)",
    submit: "Envoyer ma demande",
    submitting: "Envoi en cours...",
    successTitle: "Merci pour votre demande.",
    successBody: "Notre équipe analysera votre projet et vous recontactera afin de préparer une simulation personnalisée.",
    errorRequired: "Ce champ est requis.",
    errorEmail: "Merci de renseigner une adresse email valide afin que nous puissions vous répondre.",
  },
  whatsapp: {
    prefilledMessage: "Bonjour KRISALYS, je souhaite obtenir une simulation de mon bâtiment.",
  },
  footer: {
    tagline: "Solutions innovantes pour votre visibilité.",
    rightsReserved: "Tous droits réservés.",
  },
} as const;

export default fr;
