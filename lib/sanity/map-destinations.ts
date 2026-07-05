import { sanityImageUrl } from "@/lib/sanity/image-url";
import type { City, State } from "@/lib/destinations";

export type SanityStateDoc = {
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  image?: { asset?: { url?: string }; alt?: string };
  metaTitle?: string;
  metaDescription?: string;
};

export type SanityCityMetaDoc = {
  cityName?: string;
  stateSlug?: string;
  citySlug?: string;
  shortDescription?: string;
  cardImageUrl?: string;
  heroImageUrl?: string;
  intro?: string;
  heroImage?: { asset?: { url?: string } };
};

export function resolveImageUrl(
  uploaded?: { asset?: { url?: string } },
  fallbackUrl?: string
): string {
  const uploadedUrl = uploaded ? sanityImageUrl(uploaded) : "";
  return uploadedUrl || fallbackUrl || "";
}

export function mapSanityCityToCity(doc: SanityCityMetaDoc): City | null {
  if (!doc.cityName || !doc.citySlug || !doc.stateSlug) return null;

  const imageUrl =
    doc.cardImageUrl ||
    doc.heroImageUrl ||
    resolveImageUrl(doc.heroImage) ||
    "";

  return {
    name: doc.cityName,
    slug: doc.citySlug,
    description: doc.shortDescription || doc.intro || "",
    imageUrl,
  };
}

export function mapSanityStateDoc(
  doc: SanityStateDoc,
  cities: City[]
): State | null {
  if (!doc.name || !doc.slug || !doc.description) return null;

  return {
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    imageUrl: resolveImageUrl(doc.image, doc.imageUrl),
    cities,
  };
}
