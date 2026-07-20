import { MaintenanceOffering } from "@/types";

export const maintenanceOfferings: MaintenanceOffering[] = [
  {
    title: "Maintenance préventive",
    description: "Contrôles réguliers de l'installation pour anticiper l'usure et limiter les interventions correctives.",
    icon: "ShieldCheck",
  },
  {
    title: "Maintenance corrective",
    description: "Intervention en cas de dysfonctionnement constaté, selon les délais convenus dans le contrat de suivi.",
    icon: "Wrench",
  },
  {
    title: "Assistance technique",
    description: "Un point de contact dédié pour toute question technique après l'installation.",
    icon: "Headset",
  },
  {
    title: "Mise à jour des contenus",
    description: "Accompagnement pour l'actualisation des messages diffusés, ponctuelle ou récurrente.",
    icon: "RefreshCw",
  },
  {
    title: "Formation",
    description: "Transfert de compétences vers vos équipes pour une gestion autonome du contenu au quotidien.",
    icon: "GraduationCap",
  },
  {
    title: "Accompagnement",
    description: "Un suivi dans la durée pour faire évoluer votre installation selon vos besoins futurs.",
    icon: "Users",
  },
];
