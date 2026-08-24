import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Card({
  children,
  className,
  hoverable = true,
  accent = "blue",
}: {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  /** Couleur d'accent au survol. "gold" réservé aux cartes mises en avant (ex. offre phare). */
  accent?: "blue" | "gold";
}) {
  const hoverAccent =
    accent === "gold"
      ? "hover:border-krisalys-gold/50 hover:shadow-glow-gold"
      : "hover:border-krisalys-blue-deep/40 hover:shadow-glow";

  return (
    <div
      className={cn(
        "rounded-2xl border border-subtle bg-surface p-6 shadow-sm",
        hoverable && cn("transition-all duration-300 hover:-translate-y-1", hoverAccent),
        className
      )}
    >
      {children}
    </div>
  );
}
