import { z } from "zod";

// Schéma volontairement court : peu de champs obligatoires pour
// maximiser le taux de complétion (principe validé dans le brief
// copywriting : "ne pas demander trop d'informations").
export const contactFormSchema = z.object({
  name: z.string().min(2, "Merci de renseigner votre nom."),
  company: z.string().optional(),
  phone: z.string().min(6, "Merci de renseigner un numéro de téléphone valide."),
  email: z.string().email("Merci de renseigner une adresse email valide afin que nous puissions vous répondre."),
  city: z.string().min(2, "Merci de renseigner votre ville."),
  buildingType: z.string().min(2, "Merci de préciser le type de bâtiment concerné."),
  message: z.string().min(10, "Merci de décrire brièvement votre projet."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Schéma des entrées du configurateur (page /configurateur).
export const configuratorSchema = z.object({
  buildingType: z.string().min(1),
  city: z.string().min(1),
  widthMeters: z.number().positive().max(200),
  heightMeters: z.number().positive().max(100),
  placement: z.enum(["interieur", "exterieur"]),
  objective: z.string().min(1),
});

export type ConfiguratorFormValues = z.infer<typeof configuratorSchema>;
