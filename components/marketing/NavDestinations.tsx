"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CityNavData } from "@/lib/destinations-nav";
import type { State } from "@/lib/destinations";
import { getStatePath } from "@/lib/destinations";

export default function NavDestinations({
  mobile,
  destinationNav,
  states,
  onNavigate,
}: {
  mobile?: boolean;
  destinationNav: CityNavData[];
  states: State[];
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeState, setActiveState] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  function cityNav(stateSlug: string, citySlug: string) {
    return destinationNav.find(
      (item) => item.stateSlug === stateSlug && item.citySlug === citySlug
    );
  }

  if (mobile) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-2 py-2 text-ink-700 rounded-lg hover:bg-ink-50"
        >
          Destinations
          <ChevronDown
            className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="pl-3 space-y-3 pb-2">
            {states.map((state) => (
              <div key={state.slug}>
                <Link
                  href={getStatePath(state)}
                  onClick={onNavigate}
                  className="block px-2 py-1.5 text-sm font-medium text-ink-800 hover:text-brand-700"
                >
                  {state.name}
                </Link>
                {state.cities.length > 0 && (
                  <div className="pl-3 space-y-2">
                    {state.cities.map((city) => {
                      const nav = cityNav(state.slug, city.slug);
                      return (
                        <div key={city.slug}>
                          <Link
                            href={nav?.cityHref ?? `/destinations/${state.slug}/${city.slug}`}
                            onClick={onNavigate}
                            className="block px-2 py-1 text-sm text-ink-600 hover:text-brand-700"
                          >
                            {city.name}
                          </Link>
                          {nav?.sections.map((section) => (
                            <Link
                              key={section.href}
                              href={section.href}
                              onClick={onNavigate}
                              className="block pl-3 pr-2 py-0.5 text-xs text-ink-500 hover:text-brand-700"
                            >
                              {section.label}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const currentState =
    states.find((s) => s.slug === activeState) ?? states[0];
  const currentCity =
    currentState?.cities.find((c) => c.slug === activeCity) ??
    currentState?.cities[0];
  const currentCityNav = currentCity
    ? cityNav(currentState.slug, currentCity.slug)
    : undefined;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setActiveState(null);
        setActiveCity(null);
      }}
    >
      <button
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-ink-700 hover:text-ink-900 hover:bg-ink-50"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Destinations
        <ChevronDown
          className={`w-3.5 h-3.5 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && currentState && (
        <div className="absolute left-0 top-full pt-1 z-50">
          <div
            className="flex rounded-xl border border-ink-200 bg-white shadow-xl overflow-hidden max-h-[70vh]"
            onMouseLeave={() => setActiveCity(null)}
          >
            <div className="w-48 border-r border-ink-100 py-2 overflow-y-auto">
              {states.map((state) => (
                <Link
                  key={state.slug}
                  href={getStatePath(state)}
                  onMouseEnter={() => {
                    setActiveState(state.slug);
                    setActiveCity(null);
                  }}
                  className={`block px-4 py-2 text-sm transition ${
                    activeState === state.slug
                      ? "bg-brand-50 text-brand-800 font-medium"
                      : "text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  {state.name}
                </Link>
              ))}
            </div>

            <div className="w-44 border-r border-ink-100 py-2 overflow-y-auto">
              {currentState.cities.length === 0 ? (
                <div className="px-4 py-3">
                  <Link
                    href={getStatePath(currentState)}
                    className="text-sm font-medium text-brand-700 hover:underline"
                  >
                    Explore {currentState.name}
                  </Link>
                </div>
              ) : (
                currentState.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={
                      cityNav(currentState.slug, city.slug)?.cityHref ??
                      `/destinations/${currentState.slug}/${city.slug}`
                    }
                    onMouseEnter={() => {
                      setActiveState(currentState.slug);
                      setActiveCity(city.slug);
                    }}
                    className={`block px-4 py-2 text-sm transition ${
                      activeCity === city.slug
                        ? "bg-brand-50 text-brand-800 font-medium"
                        : "text-ink-600 hover:bg-ink-50"
                    }`}
                  >
                    {city.name}
                  </Link>
                ))
              )}
            </div>

            <div className="w-64 py-2 overflow-y-auto">
              {currentCityNav?.sections.length ? (
                currentCityNav.sections.map((section) => (
                  <Link
                    key={section.href}
                    href={section.href}
                    className="block px-4 py-2 text-sm text-ink-600 hover:bg-ink-50 hover:text-brand-700 leading-snug"
                  >
                    {section.label}
                  </Link>
                ))
              ) : currentCity ? (
                <div className="px-4 py-3">
                  <Link
                    href={
                      currentCityNav?.cityHref ??
                      `/destinations/${currentState.slug}/${currentCity.slug}`
                    }
                    className="text-sm font-medium text-brand-700 hover:underline"
                  >
                    Explore {currentCity.name}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
