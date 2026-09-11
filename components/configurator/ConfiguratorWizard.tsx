"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useDictionary, useLocale } from "@/lib/i18n/LocaleContext";
import { recommend } from "@/lib/configurator/recommend";
import { computePricing } from "@/lib/configurator/pricing";
import { generateProjectId } from "@/lib/configurator/projectId";
import { products } from "@/data/products";
import { pricingConfig } from "@/data/pricing-config";
import { configuratorWizardSchema } from "@/lib/validations/configurator";
import type {
  ClientDeclaredData,
  Environment,
  ProjectContext,
  ViewingDistance,
  AmbientLight,
  TransparencyPreference,
  TechnologyPreference,
} from "@/lib/configurator/types";
import { CONFIGURATOR_VERSION } from "@/lib/configurator/types";

const inputClass =
  "w-full rounded-lg border border-subtle bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-krisalys-blue-deep focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-ink-muted";
const helpClass = "mt-1 text-xs text-ink-muted";

type WizardState = {
  buildingType: string;
  usage: string;
  projectContext: ProjectContext;
  widthMeters: string;
  heightMeters: string;
  useSurfaceOverride: boolean;
  glazedSurfaceM2: string;
  city: string;
  environment: Environment;
  viewingDistance: ViewingDistance;
  ambientLight: AmbientLight;
  transparencyPreference: TransparencyPreference;
  contentType: string;
  objective: string;
  technologyPreference: TechnologyPreference;
  constraints: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const initialState: WizardState = {
  buildingType: "",
  usage: "",
  projectContext: null,
  widthMeters: "",
  heightMeters: "",
  useSurfaceOverride: false,
  glazedSurfaceM2: "",
  city: "",
  environment: "exterieur",
  viewingDistance: null,
  ambientLight: null,
  transparencyPreference: null,
  contentType: "",
  objective: "",
  technologyPreference: "no-preference",
  constraints: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

const STEP_KEYS = ["building", "dimensions", "environment", "preferences", "technology", "contact"] as const;

export default function ConfiguratorWizard() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const w = dictionary.configuratorWizard;
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<WizardState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const currentKey = STEP_KEYS[stepIndex];

  const canGoNext = useMemo(() => {
    switch (currentKey) {
      case "building":
        return state.buildingType.trim().length > 0 && state.usage.trim().length > 0;
      case "dimensions":
        return (
          Number(state.widthMeters) > 0 &&
          Number(state.heightMeters) > 0 &&
          state.city.trim().length > 0 &&
          (!state.useSurfaceOverride || Number(state.glazedSurfaceM2) > 0)
        );
      case "environment":
        return true; // tous les champs de cette étape sont optionnels par nature (données parfois inconnues)
      case "preferences":
        return state.objective.trim().length > 0;
      case "technology":
        return true;
      default:
        return true;
    }
  }, [currentKey, state]);

  const update = <K extends keyof WizardState>(key: K, value: WizardState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEP_KEYS.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const surfaceM2 = state.useSurfaceOverride
    ? Number(state.glazedSurfaceM2) || 0
    : (Number(state.widthMeters) || 0) * (Number(state.heightMeters) || 0);

  const onSubmit = async () => {
    const clientDeclaredData: ClientDeclaredData = {
      buildingType: state.buildingType,
      usage: state.usage,
      projectContext: state.projectContext,
      widthMeters: Number(state.widthMeters) || 0,
      heightMeters: Number(state.heightMeters) || 0,
      glazedSurfaceM2: state.useSurfaceOverride ? Number(state.glazedSurfaceM2) || null : null,
      viewingDistance: state.viewingDistance,
      ambientLight: state.ambientLight,
      environment: state.environment,
      transparencyPreference: state.transparencyPreference,
      contentType: state.contentType || null,
      objective: state.objective,
      technologyPreference: state.technologyPreference,
      constraints: state.constraints || null,
      city: state.city,
      name: state.name,
      email: state.email,
      phone: state.phone,
      company: state.company || null,
      photoUrl: null,
    };

    const parsed = configuratorWizardSchema.safeParse(clientDeclaredData);
    if (!parsed.success) {
      setServerError(w.steps.contact.errorServer);
      return;
    }

    setSubmitting(true);
    setServerError(null);

    const engineDerivedData = recommend(clientDeclaredData, products);
    const recommendedProduct = engineDerivedData.recommendedTechnology
      ? products.find(
          (p) => p.technology === engineDerivedData.recommendedTechnology && p.pitch === engineDerivedData.recommendedPitch
        ) ?? null
      : null;
    const pricingData = computePricing(surfaceM2, recommendedProduct, pricingConfig);

    const submission = {
      projectId: generateProjectId(),
      createdAt: new Date().toISOString(),
      configuratorVersion: CONFIGURATOR_VERSION,
      supplier: recommendedProduct?.supplier ?? null,
      clientDeclaredData,
      engineDerivedData,
      pricingData,
    };

    try {
      const res = await fetch("/api/configurateur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      if (!res.ok) throw new Error("request-failed");
      setSubmitted(true);
      setResult({ engineDerivedData, pricingData });
    } catch {
      setServerError(w.steps.contact.errorServer);
    } finally {
      setSubmitting(false);
    }
  };

  const [result, setResult] = useState<{
    engineDerivedData: ReturnType<typeof recommend>;
    pricingData: ReturnType<typeof computePricing>;
  } | null>(null);

  if (submitted && result) {
    return <ResultPanel engineDerivedData={result.engineDerivedData} pricingData={result.pricingData} locale={locale} />;
  }

  return (
    <div className="rounded-2xl border border-subtle bg-surface p-6 shadow-sm sm:p-8">
      {/* Barre de progression */}
      <div className="mb-6">
        <p className="text-xs font-medium text-ink-muted">
          {w.stepOf.replace("{current}", String(stepIndex + 1)).replace("{total}", String(STEP_KEYS.length))}
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-krisalys-gray-light">
          <div
            className="h-full rounded-full bg-krisalys-blue-deep transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEP_KEYS.length) * 100}%` }}
          />
        </div>
      </div>

      {currentKey === "building" && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-ink">{w.steps.building.title}</h3>
          <div>
            <label className={labelClass}>{w.steps.building.buildingType}</label>
            <input className={inputClass} placeholder={w.steps.building.buildingTypePlaceholder} value={state.buildingType} onChange={(e) => update("buildingType", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>{w.steps.building.usage}</label>
            <input className={inputClass} placeholder={w.steps.building.usagePlaceholder} value={state.usage} onChange={(e) => update("usage", e.target.value)} />
            <p className={helpClass}>{w.steps.building.usageHelp}</p>
          </div>
          <div>
            <label className={labelClass}>{w.steps.building.projectContext}</label>
            <p className={helpClass}>{w.steps.building.projectContextHelp}</p>
            <div className="mt-2 space-y-2">
              {(
                [
                  ["existing-glazing", w.steps.building.existingGlazing],
                  ["new-or-renovation", w.steps.building.newOrRenovation],
                  [null, w.steps.building.unknownContext],
                ] as const
              ).map(([value, label]) => (
                <label key={label} className="flex items-center gap-2 text-sm text-ink-muted">
                  <input
                    type="radio"
                    checked={state.projectContext === value}
                    onChange={() => update("projectContext", value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentKey === "dimensions" && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-ink">{w.steps.dimensions.title}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{w.steps.dimensions.width}</label>
              <input type="number" step="0.1" className={inputClass} value={state.widthMeters} onChange={(e) => update("widthMeters", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{w.steps.dimensions.height}</label>
              <input type="number" step="0.1" className={inputClass} value={state.heightMeters} onChange={(e) => update("heightMeters", e.target.value)} />
            </div>
          </div>
          <p className={helpClass}>{w.steps.dimensions.widthHelp} {surfaceM2 > 0 && `(${surfaceM2.toFixed(1)} m²)`}</p>
          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input type="checkbox" checked={state.useSurfaceOverride} onChange={(e) => update("useSurfaceOverride", e.target.checked)} />
            {w.steps.dimensions.surfaceOverrideToggle}
          </label>
          {state.useSurfaceOverride && (
            <div>
              <label className={labelClass}>{w.steps.dimensions.surfaceOverrideLabel}</label>
              <input type="number" step="0.1" className={inputClass} value={state.glazedSurfaceM2} onChange={(e) => update("glazedSurfaceM2", e.target.value)} />
              <p className={helpClass}>{w.steps.dimensions.surfaceOverrideHelp}</p>
            </div>
          )}
          <div>
            <label className={labelClass}>{w.steps.dimensions.city}</label>
            <input className={inputClass} placeholder={w.steps.dimensions.cityPlaceholder} value={state.city} onChange={(e) => update("city", e.target.value)} />
          </div>
        </div>
      )}

      {currentKey === "environment" && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-ink">{w.steps.environment.title}</h3>
          <div>
            <label className={labelClass}>{w.steps.environment.environment}</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-ink-muted">
                <input type="radio" checked={state.environment === "interieur"} onChange={() => update("environment", "interieur")} /> {w.steps.environment.interior}
              </label>
              <label className="flex items-center gap-2 text-sm text-ink-muted">
                <input type="radio" checked={state.environment === "exterieur"} onChange={() => update("environment", "exterieur")} /> {w.steps.environment.exterior}
              </label>
            </div>
          </div>
          <div>
            <label className={labelClass}>{w.steps.environment.viewingDistance}</label>
            <p className={helpClass}>{w.steps.environment.viewingDistanceHelp}</p>
            <select className={inputClass} value={state.viewingDistance ?? ""} onChange={(e) => update("viewingDistance", (e.target.value || null) as ViewingDistance)}>
              <option value="">{w.steps.environment.unknown}</option>
              <option value="close">{w.steps.environment.close}</option>
              <option value="medium">{w.steps.environment.medium}</option>
              <option value="far">{w.steps.environment.far}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{w.steps.environment.ambientLight}</label>
            <p className={helpClass}>{w.steps.environment.ambientLightHelp}</p>
            <select className={inputClass} value={state.ambientLight ?? ""} onChange={(e) => update("ambientLight", (e.target.value || null) as AmbientLight)}>
              <option value="">{w.steps.environment.unknown}</option>
              <option value="low">{w.steps.environment.low}</option>
              <option value="medium">{w.steps.environment.medium}</option>
              <option value="high">{w.steps.environment.high}</option>
            </select>
          </div>
        </div>
      )}

      {currentKey === "preferences" && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-ink">{w.steps.preferences.title}</h3>
          <div>
            <label className={labelClass}>{w.steps.preferences.transparency}</label>
            <p className={helpClass}>{w.steps.preferences.transparencyHelp}</p>
            <select className={inputClass} value={state.transparencyPreference ?? ""} onChange={(e) => update("transparencyPreference", (e.target.value || null) as TransparencyPreference)}>
              <option value="">{w.steps.environment.unknown}</option>
              <option value="low">{w.steps.environment.low}</option>
              <option value="medium">{w.steps.environment.medium}</option>
              <option value="high">{w.steps.environment.high}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{w.steps.preferences.contentType}</label>
            <input className={inputClass} placeholder={w.steps.preferences.contentTypePlaceholder} value={state.contentType} onChange={(e) => update("contentType", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>{w.steps.preferences.objective}</label>
            <p className={helpClass}>{w.steps.preferences.objectiveHelp}</p>
            <input className={inputClass} placeholder={w.steps.preferences.objectivePlaceholder} value={state.objective} onChange={(e) => update("objective", e.target.value)} />
          </div>
        </div>
      )}

      {currentKey === "technology" && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-ink">{w.steps.technology.title}</h3>
          <div>
            <label className={labelClass}>{w.steps.technology.preference}</label>
            <p className={helpClass}>{w.steps.technology.preferenceHelp}</p>
            <div className="mt-2 space-y-2">
              {(
                [
                  ["film", w.steps.technology.preferFilm],
                  ["ecran", w.steps.technology.preferEcran],
                  ["no-preference", w.steps.technology.noPreference],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="flex items-center gap-2 text-sm text-ink-muted">
                  <input type="radio" checked={state.technologyPreference === value} onChange={() => update("technologyPreference", value)} />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>{w.steps.technology.constraints}</label>
            <textarea className={inputClass} rows={3} placeholder={w.steps.technology.constraintsPlaceholder} value={state.constraints} onChange={(e) => update("constraints", e.target.value)} />
          </div>
        </div>
      )}

      {currentKey === "contact" && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-ink">{w.steps.contact.title}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{w.steps.contact.name}</label>
              <input className={inputClass} value={state.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{w.steps.contact.company}</label>
              <input className={inputClass} value={state.company} onChange={(e) => update("company", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{w.steps.contact.email}</label>
              <input type="email" className={inputClass} value={state.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{w.steps.contact.phone}</label>
              <input className={inputClass} value={state.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{w.steps.contact.photoLabel}</label>
            <p className={helpClass}>{w.steps.contact.photoHelp}</p>
          </div>
          {serverError && <p className="text-sm text-krisalys-blue-deep">{serverError}</p>}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted disabled:opacity-0"
        >
          <ChevronLeft className="h-4 w-4" /> {w.back}
        </button>

        {currentKey !== "contact" ? (
          <Button type="button" onClick={goNext} disabled={!canGoNext} className="inline-flex items-center gap-1">
            {w.next} <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={submitting || state.name.trim().length < 2 || !state.email.includes("@") || state.phone.trim().length < 6}
          >
            {submitting ? w.steps.contact.submitting : w.steps.contact.submit}
          </Button>
        )}
      </div>
    </div>
  );
}

function ResultPanel({
  engineDerivedData,
  pricingData,
  locale,
}: {
  engineDerivedData: ReturnType<typeof recommend>;
  pricingData: ReturnType<typeof computePricing>;
  locale: string;
}) {
  const dictionary = useDictionary();
  const r = dictionary.configuratorWizard.result;
  const reasoning = dictionary.configuratorWizard.reasoning as Record<string, string>;
  const warnings = dictionary.configuratorWizard.warnings as Record<string, string>;

  const techName = (tech: string | null) => {
    if (tech === "film-led-transparent") return dictionary.nav.labels["/film-led-transparent"];
    if (tech === "ecran-led-transparent") return dictionary.nav.labels["/ecrans-led-transparents"];
    return null;
  };

  const isStudyRequired = engineDerivedData.state === "technicalStudyRequired";

  // Une seule technologie est disponible au catalogue (fait de catalogue,
  // voir lib/configurator/filter.ts) mais une recommandation a tout de
  // même été déterminée : c'est la technologie disponible qui est
  // proposée, même si le contexte du projet penchait plutôt vers l'autre
  // (voir lib/configurator/scoreTechnology.ts). Dans ce cas précis, le
  // panneau présente une "solution proposée" plutôt qu'une simple
  // étiquette technologie/pitch — comportement commercial validé.
  const isSingleTechAvailable =
    !isStudyRequired &&
    engineDerivedData.recommendedTechnology !== null &&
    engineDerivedData.technologiesEligible.length === 1;

  const recommendedTechName = techName(engineDerivedData.recommendedTechnology) ?? "";

  // Avertissements de fait de catalogue (technologie absente) : jamais
  // montrés au client — l'étude technique est présentée comme une
  // validation de la configuration, jamais comme une absence de produit
  // (comportement commercial validé). Conservés dans
  // engineDerivedData.warnings pour l'équipe commerciale (transmis à
  // HubSpot via /api/configurateur).
  const clientWarnings = engineDerivedData.warnings.filter(
    (key) => key !== "filmNotInCatalog" && key !== "ecranNotInCatalog"
  );

  return (
    <div className="rounded-2xl border border-subtle bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-2 text-krisalys-blue-deep">
        {isStudyRequired ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
        <span className="text-xs font-semibold uppercase tracking-widest">{r.estimationBadge}</span>
      </div>

      {isStudyRequired ? (
        <>
          <h3 className="mt-4 text-xl font-bold text-ink">{r.studyRequiredTitle}</h3>
          <p className="mt-2 text-sm text-ink-muted">{r.studyRequiredBody}</p>
        </>
      ) : (
        <>
          {isSingleTechAvailable ? (
            <>
              <h3 className="mt-4 text-xl font-bold text-ink">
                {r.singleSolutionTitle.replace("{technology}", recommendedTechName)}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                {r.singleSolutionIntro.replace("{technology}", recommendedTechName)}
              </p>
            </>
          ) : (
            <>
              {engineDerivedData.state === "twoRelevantSolutions" && (
                <h3 className="mt-4 text-lg font-semibold text-ink">{r.twoSolutionsTitle}</h3>
              )}
              <h3 className="mt-4 text-xl font-bold text-ink">
                {r.technologyLabel}: {recommendedTechName}
              </h3>
            </>
          )}
          {engineDerivedData.alternativeTechnology && (
            <p className="mt-1 text-sm text-ink-muted">
              {r.alternativeLabel}: {techName(engineDerivedData.alternativeTechnology)}
            </p>
          )}
          <p className="mt-3 text-sm text-ink-muted">
            {r.pitchLabel}:{" "}
            {engineDerivedData.recommendedPitch !== null
              ? `P${engineDerivedData.recommendedPitch}`
              : engineDerivedData.alternativePitches && engineDerivedData.alternativePitches.length > 0
                ? r.pitchMultiple
                : r.pitchUnknown}
          </p>
        </>
      )}

      {engineDerivedData.reasoning.length > 0 && (
        <ul className="mt-4 space-y-1">
          {engineDerivedData.reasoning.map((key) => (
            <li key={key} className="text-sm text-ink-muted">• {reasoning[key] ?? key}</li>
          ))}
        </ul>
      )}

      {clientWarnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {clientWarnings.map((key) => (
            <div key={key} className="flex items-start gap-2 rounded-lg border border-krisalys-orange/30 bg-krisalys-orange/10 p-3 text-xs text-krisalys-orange-dark">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{warnings[key] ?? key}</span>
            </div>
          ))}
        </div>
      )}

      {isSingleTechAvailable && (
        <p className="mt-4 text-sm text-ink-muted">{r.singleSolutionValidation}</p>
      )}

      {!isStudyRequired && (
        <div className="mt-4 rounded-lg border border-subtle bg-canvas p-4">
          <p className="text-sm font-medium text-ink">
            {r.priceEstimateLabel}: {pricingData.totalEstimate !== null ? `${pricingData.totalEstimate.toLocaleString(locale === "en" ? "en-US" : "fr-FR")} FCFA` : r.priceUnavailable}
          </p>
          {pricingData.priceStatus === "placeholder" && (
            <p className="mt-1 text-xs text-krisalys-orange-dark">{r.priceholderNotice}</p>
          )}
        </div>
      )}

      <ButtonLink href="/contact" size="lg" className="mt-6">
        {isStudyRequired ? r.ctaStudy : r.ctaSimulation}
      </ButtonLink>
    </div>
  );
}
