import type { Metadata } from "next";
import MaintenancePageContent from "@/components/pages/MaintenancePageContent";

export const metadata: Metadata = {
  title: "Maintenance & Support",
  description:
    "KRISALYS reste présent après l'installation : maintenance préventive, corrective, assistance technique, formation et accompagnement.",
};

export default function MaintenancePage() {
  return <MaintenancePageContent />;
}
