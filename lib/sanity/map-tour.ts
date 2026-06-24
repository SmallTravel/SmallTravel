import type { Tour } from "@/lib/types";
import { tourImageUrl } from "@/lib/sanity/image-url";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

export type SanityTourDoc = {
  _id: string;
  slug: { current: string } | string;
  title: string;
  operatorName: string;
  operatorLocation?: string;
  description: string;
  longDescription?: string;
  destination: string;
  state: string;
  duration?: string;
  priceAud: number;
  commissionRate?: number;
  maxGuests?: number;
  image?: SanityImage | null;
  /** @deprecated legacy URL field — removed from schema, may exist on old documents */
  imageUrl?: string;
  highlights?: string[];
  includes?: string[];
  meetingPoint?: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
};

function slugValue(slug: SanityTourDoc["slug"]): string {
  return typeof slug === "string" ? slug : slug.current;
}

function resolveImageUrl(doc: SanityTourDoc): string {
  if (doc.image?.asset) {
    const built = tourImageUrl(doc.image);
    if (built) return built;
  }
  return doc.imageUrl ?? "";
}

export function mapSanityTour(doc: SanityTourDoc): Tour {
  return {
    id: doc._id,
    slug: slugValue(doc.slug),
    title: doc.title,
    operator_name: doc.operatorName,
    operator_location: doc.operatorLocation ?? "",
    description: doc.description,
    long_description: doc.longDescription ?? doc.description,
    destination: doc.destination,
    state: doc.state,
    duration: doc.duration ?? "",
    price_aud: doc.priceAud,
    commission_rate: doc.commissionRate ?? 0.15,
    max_guests: doc.maxGuests ?? 20,
    image_url: resolveImageUrl(doc),
    highlights: doc.highlights ?? [],
    includes: doc.includes ?? [],
    meeting_point: doc.meetingPoint ?? "",
    rating: doc.rating ?? 4.5,
    review_count: doc.reviewCount ?? 0,
    featured: doc.featured ?? false,
  };
}
