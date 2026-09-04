"use client";

import { useState } from "react";
import { cities } from "@/data/cities";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/lib/i18n/LocaleContext";

// Illustration stylisée (non géographiquement précise) des villes
// couvertes par KRISALYS. Douala est active ; les autres villes sont
// affichées "à venir" et deviendront actives simplement en changeant
// leur `status` dans data/cities.ts — sans toucher à ce composant.
// Noms de villes (city.name) volontairement non traduits : noms propres.
export default function CameroonMap() {
  const dictionary = useDictionary();
  const [active, setActive] = useState(cities.find((c) => c.isHeadquarters)?.slug ?? cities[0].slug);
  const activeCity = cities.find((c) => c.slug === active) ?? cities[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-krisalys-anthracite lg:col-span-3">
        <div className="absolute inset-0 bg-gradient-brand-radial" />
        <div className="absolute inset-6 rounded-xl border border-dashed border-white/10" />
        {cities.map((city) => (
          <button
            key={city.slug}
            onClick={() => setActive(city.slug)}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${city.coordinates.x}%`, top: `${city.coordinates.y}%` }}
            aria-label={city.name}
          >
            <MapPin
              className={cn(
                "h-7 w-7 drop-shadow-lg transition-transform",
                city.slug === active ? "scale-125 text-krisalys-blue-deep" : "text-krisalys-blue/70",
                city.status === "upcoming" && "opacity-50"
              )}
              fill={city.slug === active ? "currentColor" : "none"}
            />
          </button>
        ))}
        <p className="absolute bottom-4 left-4 text-xs text-krisalys-gray-dark">
          {dictionary.common.mapDisclaimer}
        </p>
      </div>

      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-white/10 bg-krisalys-anthracite p-6">
          <h3 className="text-lg font-semibold text-white">{activeCity.name}</h3>
          <p className="mt-2 text-sm text-krisalys-gray-light">
            {activeCity.isHeadquarters
              ? dictionary.common.mapHeadquartersDescription
              : dictionary.common.mapUpcomingDescription}
          </p>
          <span
            className={cn(
              "mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold",
              activeCity.status === "active"
                ? "bg-krisalys-blue/20 text-krisalys-blue"
                : "bg-white/10 text-krisalys-gray-light"
            )}
          >
            {activeCity.status === "active" ? dictionary.common.statusActive : dictionary.common.statusUpcoming}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {cities.map((city) => (
            <li key={city.slug}>
              <button
                onClick={() => setActive(city.slug)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors",
                  city.slug === active ? "bg-white/10 text-white" : "text-krisalys-gray-light hover:bg-white/5"
                )}
              >
                <span>{city.name}</span>
                <span className="text-xs text-krisalys-gray-dark">
                  {city.status === "active" ? dictionary.common.statusActive : dictionary.common.statusUpcoming}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
