import { isSanityConfigured } from "@/lib/config";
import type { StateGuide } from "@/lib/destinations";
import { normalizeGuideBlocks } from "@/lib/destinations-nav";
import {
  buildDefaultStateGuide,
  getStaticStateGuide,
} from "@/lib/state-guides";
import { getSanityClient } from "@/lib/sanity/client";
import {
  mapSanityStateGuide,
  type SanityStateGuideDoc,
} from "@/lib/sanity/map-state-guide";
import { stateGuideQuery } from "@/lib/sanity/queries";

export async function getStateGuideContent(
  stateSlug: string,
  stateMeta: { name: string; description: string; imageUrl: string }
): Promise<StateGuide> {
  const fallback =
    getStaticStateGuide(stateSlug) ??
    buildDefaultStateGuide(
      stateMeta.name,
      stateMeta.description,
      stateMeta.imageUrl
    );

  if (!isSanityConfigured()) {
    return { ...fallback, blocks: normalizeGuideBlocks(fallback.blocks) };
  }

  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } };

  try {
    const doc = await getSanityClient().fetch<SanityStateGuideDoc | null>(
      stateGuideQuery,
      { stateSlug },
      fetchOptions
    );

    if (!doc?.pageTitle) return fallback;

    const guide = mapSanityStateGuide(doc, fallback) ?? fallback;
    if (!guide.blocks.length && fallback.blocks.length) {
      guide.blocks = fallback.blocks;
    }
    if (!guide.intro && fallback.intro) {
      guide.intro = fallback.intro;
    }
    return { ...guide, blocks: normalizeGuideBlocks(guide.blocks) };
  } catch {
    return { ...fallback, blocks: normalizeGuideBlocks(fallback.blocks) };
  }
}
