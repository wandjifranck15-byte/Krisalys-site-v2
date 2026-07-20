"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut de page"
      className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-krisalys-charcoal text-white shadow-lg transition-transform hover:scale-105"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
