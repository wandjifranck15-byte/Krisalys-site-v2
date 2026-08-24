import { Dictionary } from "@/types";

// English dictionary — now fully wired into the site (see
// lib/i18n/LocaleContext.tsx). Business content living in /data (solutions,
// sectors, FAQ, blog, projects) is translated directly in its own files via
// `fr`/`en` fields, not here — this dictionary covers interface chrome only.
const en: Dictionary = {
  common: {
    ctaPrimary: "Request a free simulation",
    ctaSecondary: "Discover our solutions",
    ctaAlt: [
      "Get a personalized study",
      "Let's talk about your project",
      "Transform your facade",
      "Get a quote",
      "Book an appointment",
      "Talk to an advisor",
    ],
    readMore: "Read more",
    scanToDiscover: "Scan to learn more",
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System",
    toggleLabel: "Choose theme",
  },
  nav: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Language",
    labels: {
      "/": "Home",
      "/nos-solutions": "Our solutions",
      "/nos-solutions#transparent": "Transparent LED screens",
      "/nos-solutions#exterieur": "Outdoor LED screens",
      "/nos-solutions#interieur": "Indoor LED screens",
      "/nos-solutions#facades": "Digital facades",
      "/nos-solutions#dynamique": "Dynamic displays",
      "/secteurs": "Industries",
      "/simulations": "Simulations",
      "/configurateur": "Configurator",
      "/realisations": "Case studies",
      "/notre-methode": "Our method",
      "/maintenance": "Maintenance & Support",
      "/a-propos": "About",
      "/blog": "Blog",
      "/faq": "FAQ",
      "/contact": "Contact",
      "/mentions-legales": "Legal notice",
      "/confidentialite": "Privacy policy",
      "/conditions": "Terms of use",
    },
  },
  hero: {
    eyebrow: "LED screens & visual solutions — Douala, Cameroon",
    title: "Turn your facade into a powerful communication tool.",
    subtitle:
      "KRISALYS helps businesses transform their premises with innovative, elegant and high-performance LED display solutions.",
  },
  pages: {
    faq: { eyebrow: "FAQ", title: "All your questions, straight answers", ctaTitle: "Still have a question?" },
    methode: {
      eyebrow: "Our method",
      title: "A clear process, from first contact to maintenance",
      description: "Every project follows the same steps, designed to reassure decision-makers and avoid surprises.",
      stepsEyebrow: "The 8 steps",
      stepsTitle: "How we work",
      ctaTitle: "Ready to get started?",
    },
    maintenance: {
      eyebrow: "Maintenance & Support",
      title: "KRISALYS stays by your side after installation",
      description:
        "An LED display project doesn't end at commissioning. Here's how we support our clients over the long term.",
      ctaTitle: "A question about maintaining your installation?",
      ctaLabel: "Talk to an advisor",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your project",
      description:
        "Fill in the form below or contact us directly — our team responds quickly.",
      phoneLabel: "Phone",
      emailLabel: "Email",
      addressLabel: "Address",
      hoursLabel: "Hours",
      hoursValue: "Monday – Saturday, 8am – 6pm",
      zoneEyebrow: "Service area",
      zoneTitle: "Where does KRISALYS operate?",
      zoneDescription:
        "Douala is our headquarters and active service area. Other cities will progressively join this coverage.",
    },
    configurateur: {
      eyebrow: "Configurator",
      title: "A first estimate, in just a few clicks",
      description:
        "Share a few details about your project to get an indicative recommendation — never a quote.",
    },
    simulations: {
      eyebrow: "Simulations",
      title: "Visualize your project before committing",
      description:
        "Each simulation below is a rendering produced by KRISALYS from a real building, clearly labeled as a simulation.",
      configuratorEyebrow: "Configurator",
      configuratorTitle: "Get a first recommendation for your project",
      configuratorDescription:
        "Share a few details about your building to receive an indicative estimate of the recommended solution type.",
      ctaLabel: "Send a photo of my building",
    },
    notFound: {
      eyebrow: "Error 404",
      title: "This page doesn't exist.",
      description: "The link you followed may be broken, or the page may have moved.",
      cta: "Back to home",
    },
  },
  form: {
    name: "Full name",
    company: "Company",
    phone: "Phone",
    email: "Email address",
    city: "City",
    buildingType: "Building type",
    buildingTypePlaceholder: "Select a building type",
    buildingTypeOptions: [
      "Hotel",
      "Office building",
      "Shopping mall",
      "Retail store",
      "Restaurant",
      "Bank / institution",
      "Other",
    ],
    message: "Your message",
    photo: "Photo of your facade (optional)",
    submit: "Send my request",
    submitting: "Sending...",
    successTitle: "Thank you for your request.",
    successBody:
      "Our team will review your project and get back to you to prepare a personalized simulation.",
    errorRequired: "This field is required.",
    errorEmail: "Please provide a valid email address so we can get back to you.",
    errorName: "Please enter your name.",
    errorPhone: "Please enter a valid phone number.",
    errorCity: "Please enter your city.",
    errorBuildingType: "Please select a building type.",
    errorMessage: "Please briefly describe your project.",
    errorServer:
      "Something went wrong while sending your request. You can also reach us directly via WhatsApp.",
  },
  whatsapp: {
    prefilledMessage: "Hello KRISALYS, I would like a simulation for my building.",
  },
  footer: {
    tagline: "Innovative solutions for your visibility.",
    rightsReserved: "All rights reserved.",
    navHeading: "Navigation",
    contactHeading: "Contact details",
    legalHeading: "Legal",
  },
  faqCategories: {
    technique: "Technical questions",
    commercial: "Commercial questions",
    apresVente: "After-sales",
  },
};

export default en;
