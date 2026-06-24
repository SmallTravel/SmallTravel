import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function tourImageUrl(source: SanityImageSource | null | undefined): string {
  if (!source) return "";
  return builder.image(source).width(1200).quality(80).auto("format").url();
}
