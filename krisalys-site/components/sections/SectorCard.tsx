import Link from "next/link";
import { Sector } from "@/types";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ArrowRight } from "lucide-react";

export default function SectorCard({ sector }: { sector: Sector }) {
  return (
    <Link
      href={`/secteurs#${sector.slug}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-krisalys-anthracite p-6 transition-all duration-300 hover:-translate-y-1 hover:border-krisalys-blue/40 hover:shadow-glow"
    >
      <DynamicIcon name={sector.icon} className="h-7 w-7 text-krisalys-blue" />
      <h3 className="mt-4 text-base font-semibold text-white">{sector.name}</h3>
      <p className="mt-2 text-sm text-krisalys-gray-light">{sector.benefits[0]}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-krisalys-orange">
        Voir le secteur
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
