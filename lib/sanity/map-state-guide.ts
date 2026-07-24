import type { StateGuide } from "@/lib/destinations";
import {
  mapSanityBlock,
  type SanityGuideBlock,
} from "@/lib/sanity/map-city-guide";
import { resolveImageUrl } from "@/lib/sanity/map-destinations";
import { sanityImageUrl } from "@/lib/sanity/image-url";

export type SanityStateGuideDoc = {
  pageTitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  heroCaption?: string;
  heroImageUrl?: string;
  heroImage?: { asset?: { url?: string }; alt?: string };
  imageUrl?: string;
  image?: { asset?: { url?: string }; alt?: string };
  showPlacesGrid?: boolean;
  content?: SanityGuideBlock[];
};

function resolveHero(
  doc: SanityStateGuideDoc,
  fallback?: Partial<StateGuide>
): { src: string; alt: string; caption?: string } {
  const uploadedUrl = doc.heroImage?.asset?.url
    ? sanityImageUrl(doc.heroImage)
    : "";
  const listingFallback = resolveImageUrl(doc.image, doc.imageUrl);
  const src =
    uploadedUrl ||
    doc.heroImageUrl ||
    listingFallback ||
    fallback?.heroImage?.src ||
    "";

  return {
    src,
    alt: doc.heroImage?.alt || fallback?.heroImage?.alt || "",
    caption: doc.heroCaption ?? fallback?.heroImage?.caption,
  };
}

export function mapSanityStateGuide(
  doc: SanityStateGuideDoc,
  fallback?: Partial<StateGuide>
): StateGuide | null {
  if (!doc.pageTitle) return null;

  const blocks =
    doc.content
      ?.map(mapSanityBlock)
      .filter((block): block is NonNullable<typeof block> => block !== null) ??
    [];

  return {
    title: doc.pageTitle,
    metaTitle:
      doc.metaTitle ??
      fallback?.metaTitle ??
      `${doc.pageTitle} | Australia Trip Planner`,
    metaDescription:
      doc.metaDescription ?? fallback?.metaDescription ?? doc.intro ?? "",
    heroImage: resolveHero(doc, fallback),
    intro: doc.intro ?? fallback?.intro ?? "",
    blocks: doc.content != null ? blocks : (fallback?.blocks ?? []),
    showPlacesGrid: doc.showPlacesGrid ?? fallback?.showPlacesGrid ?? true,
  };
}
