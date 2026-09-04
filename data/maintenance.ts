import { MaintenanceOffering } from "@/types";
import type { Locale } from "@/types";

const maintenanceOfferingsFr: MaintenanceOffering[] = [
  { title: "Maintenance préventive", description: "Contrôles réguliers de l'installation pour anticiper l'usure et limiter les interventions correctives.", icon: "ShieldCheck" },
  { title: "Maintenance corrective", description: "Intervention en cas de dysfonctionnement constaté, selon les délais convenus dans le contrat de suivi.", icon: "Wrench" },
  { title: "Assistance technique", description: "Un point de contact dédié pour toute question technique après l'installation.", icon: "Headset" },
  { title: "Mise à jour des contenus", description: "Accompagnement pour l'actualisation des messages diffusés, ponctuelle ou récurrente.", icon: "RefreshCw" },
  { title: "Formation", description: "Transfert de compétences vers vos équipes pour une gestion autonome du contenu au quotidien.", icon: "GraduationCap" },
  { title: "Accompagnement", description: "Un suivi dans la durée pour faire évoluer votre installation selon vos besoins futurs.", icon: "Users" },
];

const maintenanceOfferingsEn: MaintenanceOffering[] = [
  { title: "Preventive maintenance", description: "Regular checks of the installation to anticipate wear and limit corrective interventions.", icon: "ShieldCheck" },
  { title: "Corrective maintenance", description: "Intervention in case of a reported malfunction, within the timeframes agreed in the support contract.", icon: "Wrench" },
  { title: "Technical support", description: "A dedicated point of contact for any technical question after installation.", icon: "Headset" },
  { title: "Content updates", description: "Support for updating displayed messages, one-off or recurring.", icon: "RefreshCw" },
  { title: "Training", description: "Skills transfer to your teams for day-to-day autonomous content management.", icon: "GraduationCap" },
  { title: "Ongoing support", description: "Long-term follow-up to evolve your installation as your needs change.", icon: "Users" },
];

export function getMaintenanceOfferings(locale: Locale = "fr"): MaintenanceOffering[] {
  return locale === "en" ? maintenanceOfferingsEn : maintenanceOfferingsFr;
}

export const maintenanceOfferings = maintenanceOfferingsFr;
