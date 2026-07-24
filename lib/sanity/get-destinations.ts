import { isSanityConfigured } from "@/lib/config";
import type { City, State } from "@/lib/destinations";
import { getSanityClient } from "@/lib/sanity/client";
import {
  mapSanityCityToCity,
  mapSanityStateDoc,
  type SanityCityMetaDoc,
  type SanityStateDoc,
} from "@/lib/sanity/map-destinations";
import { destinationsQuery } from "@/lib/sanity/queries";

type DestinationsPayload = {
  states: SanityStateDoc[];
  cities: SanityCityMetaDoc[];
};

function buildStatesFromSanity(payload: DestinationsPayload): State[] {
  const citiesByState = new Map<string, City[]>();

  for (const cityDoc of payload.cities) {
    const city = mapSanityCityToCity(cityDoc);
    if (!city || !cityDoc.stateSlug) continue;
    const list = citiesByState.get(cityDoc.stateSlug) ?? [];
    list.push(city);
    citiesByState.set(cityDoc.stateSlug, list);
  }

  return payload.states
    .map((stateDoc) => {
      const cities = citiesByState.get(stateDoc.slug ?? "") ?? [];
      return mapSanityStateDoc(stateDoc, cities);
    })
    .filter((state): state is State => state !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getDestinations(): Promise<State[]> {
  if (!isSanityConfigured()) {
    throw new Error("Sanity CMS is required for destinations");
  }

  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } };

  const payload = await getSanityClient().fetch<DestinationsPayload>(
    destinationsQuery,
    {},
    fetchOptions
  );

  if (!payload?.states?.length) {
    throw new Error("No state guides found in CMS");
  }

  return buildStatesFromSanity(payload);
}

export async function getStateBySlug(slug: string): Promise<State | undefined> {
  const states = await getDestinations();
  return states.find((s) => s.slug === slug);
}

export async function getCityBySlug(
  stateSlug: string,
  citySlug: string
): Promise<{ state: State; city: City } | undefined> {
  const state = await getStateBySlug(stateSlug);
  if (!state) return undefined;
  const city = state.cities.find((c) => c.slug === citySlug);
  if (!city) return undefined;
  return { state, city };
}

export async function getAllStates(): Promise<State[]> {
  return getDestinations();
}
