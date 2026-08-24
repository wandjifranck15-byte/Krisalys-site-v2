"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { configuratorSchema, ConfiguratorFormValues } from "@/lib/validations/contact";
import { ConfiguratorResult } from "@/types";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AlertTriangle, Sparkles } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-subtle bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-krisalys-blue-deep focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-ink-muted";

// Logique d'estimation simple, fondée sur des règles explicites — pas
// d'IA ni de calcul de prix. Le but est d'orienter le visiteur, jamais
// de remplacer l'étude personnalisée qui suit obligatoirement.
function computeRecommendation(values: ConfiguratorFormValues): ConfiguratorResult {
  const { placement, widthMeters, objective } = values;

  let recommendedSolution = "Affichage dynamique";
  let reasoning =
    "Une solution d'affichage dynamique permet de couvrir la majorité des besoins de communication courants.";

  if (placement === "exterieur" && widthMeters >= 8) {
    recommendedSolution = "Écran LED extérieur grand format";
    reasoning =
      "Une façade extérieure de cette largeur bénéficie généralement d'un écran LED extérieur dimensionné pour une bonne lisibilité à distance.";
  } else if (placement === "exterieur") {
    recommendedSolution = "Écran LED extérieur ou façade numérique";
    reasoning =
      "Pour une façade extérieure de taille plus mesurée, un écran LED extérieur ou une façade numérique ciblée sont les pistes les plus pertinentes.";
  } else if (placement === "interieur" && /vitrine|vitrée|verre/i.test(objective)) {
    recommendedSolution = "Écran LED transparent";
    reasoning =
      "Un objectif de mise en valeur d'une surface vitrée oriente naturellement vers un écran LED transparent.";
  } else if (placement === "interieur") {
    recommendedSolution = "Écran LED intérieur";
    reasoning = "Pour un espace intérieur, un écran LED intérieur haute définition est en général le point de départ le plus adapté.";
  }

  return {
    recommendedSolution,
    reasoning,
    disclaimer:
      "Cette estimation est indicative et automatisée : elle ne constitue en aucun cas un devis. Seule une étude personnalisée de votre bâtiment permet de confirmer la solution la plus adaptée.",
  };
}

export default function Configurator() {
  const [result, setResult] = useState<ConfiguratorResult | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfiguratorFormValues>({
    resolver: zodResolver(configuratorSchema),
    defaultValues: { placement: "exterieur" },
  });

  const onSubmit = (values: ConfiguratorFormValues) => {
    setResult(computeRecommendation(values));
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="buildingType">Type de bâtiment</label>
            <input id="buildingType" placeholder="Hôtel, banque, showroom..." className={inputClass} {...register("buildingType")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="city">Ville</label>
            <input id="city" placeholder="Douala, Yaoundé..." className={inputClass} {...register("city")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="widthMeters">Largeur de façade (m)</label>
            <input id="widthMeters" type="number" step="0.1" className={inputClass} {...register("widthMeters", { valueAsNumber: true })} />
            {errors.widthMeters && <p className="mt-1 text-xs text-krisalys-orange">Merci de renseigner une largeur valide.</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="heightMeters">Hauteur (m)</label>
            <input id="heightMeters" type="number" step="0.1" className={inputClass} {...register("heightMeters", { valueAsNumber: true })} />
            {errors.heightMeters && <p className="mt-1 text-xs text-krisalys-orange">Merci de renseigner une hauteur valide.</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Emplacement</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input type="radio" value="exterieur" {...register("placement")} /> Extérieur
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input type="radio" value="interieur" {...register("placement")} /> Intérieur
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="objective">Objectif principal</label>
          <input
            id="objective"
            placeholder="Ex : mettre en valeur ma vitrine, attirer plus de clients..."
            className={inputClass}
            {...register("objective")}
          />
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Voir une première estimation
        </Button>
      </form>

      <div className="flex flex-col justify-center rounded-2xl border border-subtle bg-surface p-8 shadow-sm">
        {!result ? (
          <p className="text-sm text-ink-muted">
            Renseignez les informations de votre projet pour recevoir une première orientation.
          </p>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-krisalys-blue-deep">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-widest">Estimation indicative</span>
            </div>
            <h3 className="text-xl font-bold text-ink">{result.recommendedSolution}</h3>
            <p className="text-sm text-ink-muted">{result.reasoning}</p>
            <div className="flex items-start gap-2 rounded-lg border border-krisalys-orange/30 bg-krisalys-orange/10 p-3 text-xs text-krisalys-orange-dark">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{result.disclaimer}</span>
            </div>
            <ButtonLink href="/contact" size="md">
              Demander une étude personnalisée
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
