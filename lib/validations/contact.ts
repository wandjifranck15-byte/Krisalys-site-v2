import { z } from "zod";
import type { Dictionary } from "@/types";

// Schéma volontairement court : peu de champs obligatoires pour
// maximiser le taux de complétion (principe validé dans le brief
// copywriting : "ne pas demander trop d'informations").
//
// Factory plutôt que schéma statique : permet des messages d'erreur
// traduits (dictionary.form.error*) sans dupliquer la structure du schéma
// par langue. Utiliser createContactFormSchema(dictionary) dans les
// composants ; contactFormSchema (FR, ci-dessous) reste disponible pour
// toute utilisation non liée à la locale (ex. validation côté API).
export function createContactFormSchema(dictionary: Dictionary) {
  return z.object({
    name: z.string().min(2, dictionary.form.errorName),
    company: z.string().optional(),
    phone: z.string().min(6, dictionary.form.errorPhone),
    email: z.string().email(dictionary.form.errorEmail),
    city: z.string().min(2, dictionary.form.errorCity),
    buildingType: z.string().min(1, dictionary.form.errorBuildingType),
    message: z.string().min(10, dictionary.form.errorMessage),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

// Schéma FR statique (utilisé par la route API, indépendante de la locale
// choisie côté client — le serveur ne connaît pas la langue du visiteur).
export const contactFormSchema = z.object({
  name: z.string().min(2, "Merci de renseigner votre nom."),
  company: z.string().optional(),
  phone: z.string().min(6, "Merci de renseigner un numéro de téléphone valide."),
  email: z.string().email("Merci de renseigner une adresse email valide afin que nous puissions vous répondre."),
  city: z.string().min(2, "Merci de renseigner votre ville."),
  buildingType: z.string().min(1, "Merci de préciser le type de bâtiment concerné."),
  message: z.string().min(10, "Merci de décrire brièvement votre projet."),
});

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
