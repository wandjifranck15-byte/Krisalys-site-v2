import { Dictionary } from "@/types";

// English dictionary — scaffold only.
// KRISALYS launches in French; this file demonstrates that the
// architecture supports adding a language without touching components.
// TODO: complete full translation before enabling the "en" locale.
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
  nav: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Language",
  },
  form: {
    name: "Full name",
    company: "Company",
    phone: "Phone",
    email: "Email address",
    city: "City",
    buildingType: "Building type",
    message: "Your message",
    photo: "Photo of your facade (optional)",
    submit: "Send my request",
    submitting: "Sending...",
    successTitle: "Thank you for your request.",
    successBody: "Our team will review your project and get back to you to prepare a personalized simulation.",
    errorRequired: "This field is required.",
    errorEmail: "Please provide a valid email address so we can get back to you.",
  },
  whatsapp: {
    prefilledMessage: "Hello KRISALYS, I would like a simulation for my building.",
  },
  footer: {
    tagline: "Innovative solutions for your visibility.",
    rightsReserved: "All rights reserved.",
  },
};

export default en;
