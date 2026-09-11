import { MaintenanceOffering } from "@/types";
import type { Locale } from "@/types";

// Phase 7 : les 6 prestations existantes sont conservées telles quelles
// (aucune inventée, aucune supprimée) — seul un champ `group` est ajouté
// pour permettre un regroupement visuel en 3 blocs (Maintenance / Support
// & assistance / Accompagnement de la solution) sur /maintenance, sans
// dupliquer le texte ailleurs.
const maintenanceOfferingsFr: MaintenanceOffering[] = [
  { title: "Maintenance préventive", description: "Contrôles réguliers de l'installation pour anticiper l'usure et limiter les interventions correctives.", icon: "ShieldCheck", group: "maintenance" },
  { title: "Maintenance corrective", description: "Intervention en cas de dysfonctionnement constaté, selon les délais convenus dans le contrat de suivi.", icon: "Wrench", group: "maintenance" },
  { title: "Assistance technique", description: "Un point de contact dédié pour toute question technique après l'installation.", icon: "Headset", group: "support" },
  { title: "Mise à jour des contenus", description: "Accompagnement pour l'actualisation des messages diffusés, ponctuelle ou récurrente.", icon: "RefreshCw", group: "accompaniment" },
  { title: "Formation", description: "Transfert de compétences vers vos équipes pour une gestion autonome du contenu au quotidien.", icon: "GraduationCap", group: "accompaniment" },
  { title: "Accompagnement", description: "Un suivi dans la durée pour faire évoluer votre installation selon vos besoins futurs.", icon: "Users", group: "accompaniment" },
];

const maintenanceOfferingsEn: MaintenanceOffering[] = [
  { title: "Preventive maintenance", description: "Regular checks of the installation to anticipate wear and limit corrective interventions.", icon: "ShieldCheck", group: "maintenance" },
  { title: "Corrective maintenance", description: "Intervention in case of a reported malfunction, within the timeframes agreed in the support contract.", icon: "Wrench", group: "maintenance" },
  { title: "Technical support", description: "A dedicated point of contact for any technical question after installation.", icon: "Headset", group: "support" },
  { title: "Content updates", description: "Support for updating displayed messages, one-off or recurring.", icon: "RefreshCw", group: "accompaniment" },
  { title: "Training", description: "Skills transfer to your teams for day-to-day autonomous content management.", icon: "GraduationCap", group: "accompaniment" },
  { title: "Ongoing support", description: "Long-term follow-up to evolve your installation as your needs change.", icon: "Users", group: "accompaniment" },
];

export function getMaintenanceOfferings(locale: Locale = "fr"): MaintenanceOffering[] {
  return locale === "en" ? maintenanceOfferingsEn : maintenanceOfferingsFr;
}

export function getMaintenanceOfferingsByGroup(locale: Locale = "fr") {
  const offerings = getMaintenanceOfferings(locale);
  return {
    maintenance: offerings.filter((o) => o.group === "maintenance"),
    support: offerings.filter((o) => o.group === "support"),
    accompaniment: offerings.filter((o) => o.group === "accompaniment"),
  };
}

export const maintenanceOfferings = maintenanceOfferingsFr;
