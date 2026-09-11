import { z } from "zod";

// Schéma dédié au configurateur — volontairement séparé de
// lib/validations/contact.ts (arbitrage validé : ne pas modifier la
// logique du formulaire /contact au-delà du strict nécessaire).
// Validation minimale par étape gérée côté composant (ConfiguratorWizard) ;
// ce schéma valide l'ensemble des données au moment de la soumission finale.
export const configuratorWizardSchema = z.object({
  buildingType: z.string().min(1),
  usage: z.string().min(1),
  projectContext: z.enum(["existing-glazing", "new-or-renovation"]).nullable(),
  widthMeters: z.number().positive().max(200),
  heightMeters: z.number().positive().max(100),
  glazedSurfaceM2: z.number().positive().max(20000).nullable(),
  city: z.string().min(1),
  environment: z.enum(["interieur", "exterieur"]),
  viewingDistance: z.enum(["close", "medium", "far"]).nullable(),
  ambientLight: z.enum(["low", "medium", "high"]).nullable(),
  transparencyPreference: z.enum(["low", "medium", "high"]).nullable(),
  contentType: z.string().nullable(),
  objective: z.string().min(1),
  technologyPreference: z.enum(["film", "ecran", "no-preference"]),
  constraints: z.string().nullable(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  company: z.string().nullable(),
});

export type ConfiguratorWizardValues = z.infer<typeof configuratorWizardSchema>;
