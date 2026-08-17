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

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-krisalys-orange text-krisalys-black hover:bg-krisalys-orange-dark shadow-glow-orange",
  secondary:
    "border border-krisalys-blue text-white hover:bg-krisalys-blue/10",
  ghost: "text-white hover:text-krisalys-blue",
  // Variant premium (Partie 7 du Master Prompt KOS) : dégradé de marque réel + halo doré, réservé aux
  // appels à l'action à plus forte valeur perçue (ex. CTA de fin de page, offres stratégiques).
  premium:
    "bg-gradient-brand text-white shadow-glow-gold hover:brightness-110",
};

const sizeClasses = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-krisalys-blue";

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
