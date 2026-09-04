"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { configuratorSchema, ConfiguratorFormValues } from "@/lib/validations/contact";
import { ConfiguratorResult, Dictionary } from "@/types";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AlertTriangle, Sparkles } from "lucide-react";
import { useDictionary } from "@/lib/i18n/LocaleContext";

const inputClass =
  "w-full rounded-lg border border-subtle bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-krisalys-blue-deep focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-ink-muted";

// Logique d'estimation simple, fondée sur des règles explicites — pas
// d'IA ni de calcul de prix. Le but est d'orienter le visiteur, jamais
// de remplacer l'étude personnalisée qui suit obligatoirement.
// Les libellés proviennent du dictionnaire actif (FR/EN) ; le test sur
// l'objectif reconnaît les mots-clés vitrage dans les deux langues.
function computeRecommendation(values: ConfiguratorFormValues, dictionary: Dictionary): ConfiguratorResult {
  const { placement, widthMeters, objective } = values;
  const r = dictionary.configurator.results;

  let recommendedSolution = r.dynamicName;
  let reasoning = r.dynamicReasoning;

  if (placement === "exterieur" && widthMeters >= 8) {
    recommendedSolution = r.exteriorLargeName;
    reasoning = r.exteriorLargeReasoning;
  } else if (placement === "exterieur") {
    recommendedSolution = r.exteriorSmallName;
    reasoning = r.exteriorSmallReasoning;
  } else if (placement === "interieur" && /vitrine|vitrée|verre|storefront|glass|window/i.test(objective)) {
    recommendedSolution = r.interiorGlassName;
    reasoning = r.interiorGlassReasoning;
  } else if (placement === "interieur") {
    recommendedSolution = r.interiorName;
    reasoning = r.interiorReasoning;
  }

  return { recommendedSolution, reasoning, disclaimer: r.disclaimer };
}

export default function Configurator() {
  const dictionary = useDictionary();
  const c = dictionary.configurator;
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
    setResult(computeRecommendation(values, dictionary));
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="buildingType">{c.buildingType}</label>
            <input id="buildingType" placeholder={c.buildingTypePlaceholder} className={inputClass} {...register("buildingType")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="city">{c.city}</label>
            <input id="city" placeholder={c.cityPlaceholder} className={inputClass} {...register("city")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="widthMeters">{c.width}</label>
            <input id="widthMeters" type="number" step="0.1" className={inputClass} {...register("widthMeters", { valueAsNumber: true })} />
            {errors.widthMeters && <p className="mt-1 text-xs text-krisalys-orange">{c.widthError}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="heightMeters">{c.height}</label>
            <input id="heightMeters" type="number" step="0.1" className={inputClass} {...register("heightMeters", { valueAsNumber: true })} />
            {errors.heightMeters && <p className="mt-1 text-xs text-krisalys-orange">{c.heightError}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>{c.placement}</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input type="radio" value="exterieur" {...register("placement")} /> {c.exterior}
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input type="radio" value="interieur" {...register("placement")} /> {c.interior}
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="objective">{c.objective}</label>
          <input
            id="objective"
            placeholder={c.objectivePlaceholder}
            className={inputClass}
            {...register("objective")}
          />
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {c.submit}
        </Button>
      </form>

      <div className="flex flex-col justify-center rounded-2xl border border-subtle bg-surface p-8 shadow-sm">
        {!result ? (
          <p className="text-sm text-ink-muted">{c.resultPrompt}</p>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-krisalys-blue-deep">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-widest">{c.estimationBadge}</span>
            </div>
            <h3 className="text-xl font-bold text-ink">{result.recommendedSolution}</h3>
            <p className="text-sm text-ink-muted">{result.reasoning}</p>
            <div className="flex items-start gap-2 rounded-lg border border-krisalys-orange/30 bg-krisalys-orange/10 p-3 text-xs text-krisalys-orange-dark">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{result.disclaimer}</span>
            </div>
            <ButtonLink href="/contact" size="md">
              {c.cta}
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
