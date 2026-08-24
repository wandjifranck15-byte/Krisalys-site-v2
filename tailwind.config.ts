import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tokens sémantiques dépendants du thème (voir app/globals.css pour les
        // valeurs réelles par thème). Toujours préférer ces tokens à une couleur
        // littérale krisalys-* pour tout élément qui doit s'adapter au mode
        // jour/nuit choisi par l'utilisateur.
        canvas: "var(--knb-bg)",
        surface: "var(--knb-surface)",
        "surface-soft": "var(--knb-surface-soft)",
        ink: "var(--knb-ink)",
        "ink-muted": "var(--knb-ink-muted)",
        subtle: "var(--knb-border)",
        accent: "var(--knb-accent)",
        "accent-hover": "var(--knb-accent-hover)",
        krisalys: {
          black: "#0A0A0A",
          charcoal: "#151516",
          anthracite: "#1A1A1E",
          // Bleu d'interface conservé tel quel : déjà proche de la teinte de marque et son contraste
          // (6.12:1 sur fond noir) est validé pour du texte. Ne pas remplacer par le bleu de logo brut
          // (#115DB2, contraste 3.05:1 seulement) pour éviter une régression d'accessibilité sur tout
          // le texte/liens existants qui utilisent ce token.
          blue: "#2E8FFF",
          "blue-dark": "#1E6FD9",
          // Nouveau : bleu réel extrait du logo officiel (échantillonnage pixel, 19/07/2026).
          // Réservé aux grandes surfaces (dégradés, halos, fonds de bouton avec texte blanc dessus —
          // contraste 6.5:1 validé), jamais pour du texte fin sur fond noir.
          "blue-deep": "#115DB2",
          // Orange mis à jour avec la teinte réelle du logo officiel (contraste 6.33:1 sur fond noir
          // et 6.33:1 avec texte noir dessus — vérifié, aucune régression).
          orange: "#E47214",
          // Orange foncé recalculé (assombrissement de 15% de la teinte réelle) pour préserver un
          // contraste suffisant (4.67:1) avec le texte noir des boutons au survol.
          "orange-dark": "#C16011",
          // Nouveau : accent doré du logo (reflets), très fort contraste (12.57:1) — utilisable en
          // texte, bordures premium, glow.
          gold: "#FCC721",
          white: "#FFFFFF",
          gray: {
            light: "#E8E8E8",
            DEFAULT: "#8A8A8A",
            dark: "#5A5A5A",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(90deg, #115DB2 0%, #E47214 100%)",
        "gradient-brand-radial":
          "radial-gradient(circle at top left, rgba(17,93,178,0.18), transparent 60%), radial-gradient(circle at bottom right, rgba(228,114,20,0.14), transparent 60%)",
        // Nouveau : halo doré subtil pour l'animation du logo (Partie 7 du Master Prompt KOS).
        "gradient-logo-glow":
          "radial-gradient(circle, rgba(17,93,178,0.35) 0%, rgba(228,114,20,0.25) 55%, transparent 75%)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(17,93,178,0.28)",
        "glow-orange": "0 0 30px rgba(228,114,20,0.28)",
        "glow-gold": "0 0 24px rgba(252,199,33,0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        // Animation d'apparition du logo (~500ms), validée dans 01-Branding.md du KOS : montée en
        // luminosité progressive façon démarrage d'écran LED, subtile, jamais tape-à-l'œil.
        "logo-reveal": "logoReveal 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        // Animation dédiée au halo (distincte de logo-reveal) : conserve le flou (blur-md) pendant
        // toute la durée pour éviter qu'un keyframe sur `filter` n'écrase le blur statique.
        "logo-halo": "logoHalo 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        logoReveal: {
          "0%": { opacity: "0", filter: "brightness(0.4)", transform: "scale(0.94)" },
          "60%": { opacity: "1", filter: "brightness(1.15)", transform: "scale(1.01)" },
          "100%": { opacity: "1", filter: "brightness(1)", transform: "scale(1)" },
        },
        logoHalo: {
          "0%": { opacity: "0", filter: "blur(12px) brightness(0.4)" },
          "60%": { opacity: "0.8", filter: "blur(12px) brightness(1.15)" },
          "100%": { opacity: "0.6", filter: "blur(12px) brightness(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
