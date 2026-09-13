import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "premium";

interface BaseProps {
  variant?: Variant;
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
}

// Balayage lumineux au hover (CTA à forte valeur — primary/premium
// uniquement, jamais sur secondary/ghost qui restent volontairement plus
// discrets). Pur CSS (pseudo-élément ::before), aucune dépendance
// supplémentaire. Très discret : opacité faible, passage rapide, désactivé
// sous prefers-reduced-motion via le variant Tailwind motion-reduce.
const shine =
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-1/4 before:-skew-x-12 before:bg-white/20 before:content-[''] before:-translate-x-[250%] before:transition-transform before:duration-500 before:ease-out hover:before:translate-x-[500%] motion-reduce:before:hidden";

const variantClasses: Record<Variant, string> = {
  primary: cn(
    // Glow bicolore de marque (bleu dominant, touche orange en profondeur) —
    // reste sobre au repos, s'intensifie légèrement au hover.
    "bg-krisalys-blue-deep text-white shadow-glow hover:bg-krisalys-blue-dark hover:shadow-[0_0_36px_rgba(17,93,178,0.4),0_10px_26px_-10px_rgba(228,114,20,0.35)]",
    shine
  ),
  secondary:
    "border border-krisalys-blue-deep text-krisalys-blue-deep hover:-translate-y-px hover:border-krisalys-blue-deep/70 hover:bg-krisalys-blue-deep/10",
  ghost: "text-ink hover:text-accent",
  // Variant premium (Partie 7 du Master Prompt KOS) : dégradé de marque réel + halo doré, réservé aux
  // appels à l'action à plus forte valeur perçue (ex. CTA de fin de page, offres stratégiques).
  premium: cn(
    "bg-gradient-brand text-white shadow-glow-gold hover:brightness-110 hover:shadow-[0_0_32px_rgba(252,199,33,0.45),0_10px_26px_-10px_rgba(17,93,178,0.3)]",
    shine
  ),
};

const sizeClasses = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

// `group` : permet à une icône/flèche passée en enfant (ex. `group-hover:
// translate-x-1`) de s'animer avec le bouton, si un appelant en ajoute une.
// `relative overflow-hidden` : conteneur du balayage lumineux (shine) et
// des coins arrondis, sans effet visuel pour les variantes qui ne l'utilisent
// pas. Easing "premium" (léger dépassement maîtrisé) plutôt qu'un ease-out
// plat, cohérent avec un rendu plus technologique.
const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-200 ease-[cubic-bezier(0.34,1.35,0.64,1)] hover:-translate-y-0.5 motion-reduce:transition-colors motion-reduce:hover:translate-y-0 active:translate-y-0 active:scale-[0.97] active:duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-krisalys-blue";

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  type = "button",
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </Link>
  );
}
