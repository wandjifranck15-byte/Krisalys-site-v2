// Types partagés du projet KRISALYS

export type Locale = "fr" | "en";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Solution {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  useCases: string[];
  technicalNotes: string[];
  recommendedFor: string[];
  icon: string; // nom de l'icône Lucide
}

export interface Sector {
  slug: string;
  name: string;
  icon: string;
  problems: string[];
  benefits: string[];
  useCases: string[];
  recommendedSolutionSlug: string;
  ctaLabel: string;
}

export interface Project {
  slug: string;
  title: string;
  sectorSlug: string;
  buildingType: string;
  city: string;
  objective: string;
  solutionSlug: string;
  isSimulation: boolean; // true = simulation/rendu, false = installation réelle
  description: string;
}

export interface ExternalReference {
  title: string;
  country: string;
  description: string;
  sourceLabel: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "technique" | "commercial" | "apres-vente";
}

export interface MethodStep {
  step: number;
  title: string;
  description: string;
}

export interface MaintenanceOffering {
  title: string;
  description: string;
  icon: string;
}

export interface Division {
  slug: string;
  name: string;
  tagline: string;
  status: "active" | "upcoming";
  href?: string;
}

export interface City {
  name: string;
  slug: string;
  isHeadquarters: boolean;
  status: "active" | "upcoming";
  coordinates: { x: number; y: number }; // position relative sur la carte stylisée (%)
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  content: string[];
}

export interface ConfiguratorInput {
  buildingType: string;
  city: string;
  widthMeters: number;
  heightMeters: number;
  placement: "interieur" | "exterieur";
  objective: string;
}

export interface ConfiguratorResult {
  recommendedSolution: string;
  reasoning: string;
  disclaimer: string;
}
