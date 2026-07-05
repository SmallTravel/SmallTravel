import type { ContentBlock } from "./destinations";

export type CityNavSection = {
  label: string;
  href: string;
};

export function slugifyAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeGuideBlocks(blocks: ContentBlock[]): ContentBlock[] {
  return blocks.map((block) => {
    if (block.type === "heading" && (block.level ?? 2) === 2) {
      return {
        ...block,
        id: block.id || slugifyAnchor(block.text),
      };
    }
    return block;
  });
}

export function extractNavSections(
  stateSlug: string,
  citySlug: string,
  blocks: ContentBlock[]
): CityNavSection[] {
  return normalizeGuideBlocks(blocks)
    .filter(
      (block): block is ContentBlock & { type: "heading"; text: string; id: string } =>
        block.type === "heading" &&
        (block.level ?? 2) === 2 &&
        Boolean(block.id)
    )
    .map((block) => ({
      label: block.text,
      href: `/destinations/${stateSlug}/${citySlug}#${block.id}`,
    }));
}

export type CityNavData = {
  stateSlug: string;
  citySlug: string;
  cityName: string;
  cityHref: string;
  sections: CityNavSection[];
};

export function getCityPath(stateSlug: string, citySlug: string): string {
  return `/destinations/${stateSlug}/${citySlug}`;
}
