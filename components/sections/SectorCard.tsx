import Link from "next/link";
import { Sector } from "@/types";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ArrowRight } from "lucide-react";

export default function SectorCard({ sector, viewLabel }: { sector: Sector; viewLabel: string }) {
  return (
    <Link
      href={`/secteurs#${sector.slug}`}
      className="group flex flex-col rounded-2xl border border-subtle bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-krisalys-blue-deep/40 hover:shadow-glow"
    >
      <DynamicIcon name={sector.icon} className="h-7 w-7 text-krisalys-blue-deep" />
      <h3 className="mt-4 text-base font-semibold text-ink">{sector.name}</h3>
      <p className="mt-2 text-sm text-ink-muted">{sector.benefits[0]}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-krisalys-blue-deep">
        {viewLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
