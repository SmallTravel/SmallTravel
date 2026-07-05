import { isSanityConfigured } from "@/lib/config";
import type { CityGuide } from "@/lib/destinations";
import { normalizeGuideBlocks } from "@/lib/destinations-nav";
import {
  buildDefaultCityGuide,
  getStaticCityGuide,
} from "@/lib/destination-guides";
import { getSanityClient } from "@/lib/sanity/client";
import {
  mapSanityCityGuide,
  type SanityCityGuideDoc,
} from "@/lib/sanity/map-city-guide";
import { cityGuideQuery } from "@/lib/sanity/queries";

export async function getCityGuideContent(
  stateSlug: string,
  citySlug: string,
  cityMeta: { name: string; description: string; imageUrl: string }
): Promise<CityGuide> {
  const fallback =
    getStaticCityGuide(stateSlug, citySlug) ??
    buildDefaultCityGuide(cityMeta.name, cityMeta.description, cityMeta.imageUrl);

  if (!isSanityConfigured()) {
    return { ...fallback, blocks: normalizeGuideBlocks(fallback.blocks) };
  }

  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } };

  try {
    const doc = await getSanityClient().fetch<SanityCityGuideDoc | null>(
      cityGuideQuery,
      { stateSlug, citySlug },
      fetchOptions
    );

    if (!doc?.pageTitle) return fallback;

    const guide = mapSanityCityGuide(doc, fallback) ?? fallback;
    return { ...guide, blocks: normalizeGuideBlocks(guide.blocks) };
  } catch {
    return { ...fallback, blocks: normalizeGuideBlocks(fallback.blocks) };
  }
}
