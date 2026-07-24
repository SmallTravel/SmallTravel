import { isSanityConfigured } from "@/lib/config";
import type { StateGuide } from "@/lib/destinations";
import { normalizeGuideBlocks } from "@/lib/destinations-nav";
import { getSanityClient } from "@/lib/sanity/client";
import {
  mapSanityStateGuide,
  type SanityStateGuideDoc,
} from "@/lib/sanity/map-state-guide";
import { stateGuideQuery } from "@/lib/sanity/queries";

export async function getStateGuideContent(
  stateSlug: string,
  _stateMeta?: { name: string; description: string; imageUrl: string }
): Promise<StateGuide> {
  if (!isSanityConfigured()) {
    throw new Error("Sanity CMS is required for state guides");
  }

  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } };

  const doc = await getSanityClient().fetch<SanityStateGuideDoc | null>(
    stateGuideQuery,
    { stateSlug },
    fetchOptions
  );

  const guide = doc ? mapSanityStateGuide(doc) : null;
  if (!guide) {
    throw new Error(`State guide not found in CMS: ${stateSlug}`);
  }

  return { ...guide, blocks: normalizeGuideBlocks(guide.blocks) };
}
