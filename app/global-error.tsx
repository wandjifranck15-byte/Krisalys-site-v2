"use client";

import { useEffect } from "react";

// Filet de dernier recours pour une erreur non interceptée dans le layout
// racine lui-même (Providers, Navbar, Footer) — voir app/error.tsx pour les
// erreurs sous les pages. Next.js exige que ce fichier redéfinisse <html>
// et <body> : il remplace tout le layout racine, donc pas d'accès garanti
// à LocaleProvider/useDictionary ici — texte minimal, statique, bilingue.
// L'erreur réelle part en console, jamais masquée.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f7f7f8", color: "#111" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1d4ed8" }}>
              KRISALYS
            </p>
            <h1 style={{ marginTop: "0.75rem", fontSize: "1.5rem", fontWeight: 700 }}>
              Une erreur est survenue. / Something went wrong.
            </h1>
            <p style={{ marginTop: "0.75rem", color: "#555" }}>
              Merci de réessayer, ou de nous contacter directement.
              <br />
              Please try again, or contact us directly.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                marginTop: "2rem",
                borderRadius: "9999px",
                border: "none",
                background: "#1d4ed8",
                color: "#fff",
                padding: "0.65rem 1.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Réessayer / Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
