import { isSanityConfigured } from "@/lib/config";
import type { Tour } from "@/lib/types";
import { getSanityClient } from "@/lib/sanity/client";
import { mapSanityTour, type SanityTourDoc } from "@/lib/sanity/map-tour";
import { toursQuery } from "@/lib/sanity/queries";

export async function getSanityTours(): Promise<Tour[]> {
  if (!isSanityConfigured()) return [];

  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } };

  try {
    const docs = await getSanityClient().fetch<SanityTourDoc[]>(
      toursQuery,
      {},
      fetchOptions
    );
    return (docs ?? []).map(mapSanityTour);
  } catch {
    return [];
  }
}
