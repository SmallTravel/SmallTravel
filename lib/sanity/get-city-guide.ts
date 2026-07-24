import { isSanityConfigured } from "@/lib/config";
import type { CityGuide } from "@/lib/destinations";
import { normalizeGuideBlocks } from "@/lib/destinations-nav";
import { getSanityClient } from "@/lib/sanity/client";
import {
  mapSanityCityGuide,
  type SanityCityGuideDoc,
} from "@/lib/sanity/map-city-guide";
import { cityGuideQuery } from "@/lib/sanity/queries";

export async function getCityGuideContent(
  stateSlug: string,
  citySlug: string,
  _cityMeta?: { name: string; description: string; imageUrl: string }
): Promise<CityGuide> {
  if (!isSanityConfigured()) {
    throw new Error("Sanity CMS is required for city guides");
  }

  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } };

  const doc = await getSanityClient().fetch<SanityCityGuideDoc | null>(
    cityGuideQuery,
    { stateSlug, citySlug },
    fetchOptions
  );

  const guide = doc ? mapSanityCityGuide(doc) : null;
  if (!guide) {
    throw new Error(
      `City guide not found in CMS: ${stateSlug}/${citySlug}`
    );
  }

  return { ...guide, blocks: normalizeGuideBlocks(guide.blocks) };
}
