"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function FadeIn({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  // Framer Motion anime transform/opacity via JS (requestAnimationFrame),
  // pas via des propriétés CSS transition/animation : la règle globale
  // prefers-reduced-motion d'app/globals.css (qui force les durées CSS à
  // ~0) n'a donc aucun effet ici. useReducedMotion() est le garde-fou
  // dédié recommandé par Framer Motion pour ce cas précis.
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
