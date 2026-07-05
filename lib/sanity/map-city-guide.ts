import type { ContentBlock, CityGuide } from "@/lib/destinations";
import { slugifyAnchor } from "@/lib/destinations-nav";
import { sanityImageUrl } from "@/lib/sanity/image-url";

export type SanityGuideBlock = {
  _type: string;
  _key?: string;
  text?: string;
  level?: "h2" | "h3";
  anchorId?: { current?: string };
  caption?: string;
  externalUrl?: string;
  image?: { asset?: { url?: string }; alt?: string };
  items?: { text?: string; subItems?: string[] }[];
};

export type SanityCityGuideDoc = {
  pageTitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  heroCaption?: string;
  heroImageUrl?: string;
  heroImage?: { asset?: { url?: string }; alt?: string };
  content?: SanityGuideBlock[];
};

function resolveImage(
  uploaded?: { asset?: { url?: string }; alt?: string },
  externalUrl?: string,
  fallbackAlt = ""
): { src: string; alt: string } {
  const uploadedUrl = uploaded?.asset?.url
    ? sanityImageUrl(uploaded)
    : "";
  const src = uploadedUrl || externalUrl || "";
  return {
    src,
    alt: uploaded?.alt || fallbackAlt,
  };
}

export function mapSanityBlock(block: SanityGuideBlock): ContentBlock | null {
  switch (block._type) {
    case "guideParagraph":
      return block.text ? { type: "paragraph", text: block.text } : null;
    case "guideHeading":
      return block.text
        ? {
            type: "heading",
            text: block.text,
            level: block.level === "h3" ? 3 : 2,
            id:
              block.anchorId?.current ||
              (block.level === "h3" ? undefined : slugifyAnchor(block.text)),
          }
        : null;
    case "guideImage": {
      const { src, alt } = resolveImage(block.image, block.externalUrl);
      if (!src) return null;
      return {
        type: "image",
        src,
        alt,
        caption: block.caption,
      };
    }
    case "guideTip":
      return block.text ? { type: "tip", text: block.text } : null;
    case "guideList":
      if (!block.items?.length) return null;
      return {
        type: "list",
        items: block.items
          .filter((item) => item.text)
          .map((item) =>
            item.subItems?.length
              ? { text: item.text!, subItems: item.subItems }
              : item.text!
          ),
      };
    default:
      return null;
  }
}

export function mapSanityCityGuide(
  doc: SanityCityGuideDoc,
  fallback?: Partial<CityGuide>
): CityGuide | null {
  if (!doc.pageTitle) return null;

  const hero = resolveImage(
    doc.heroImage,
    doc.heroImageUrl,
    fallback?.heroImage?.alt
  );

  const blocks =
    doc.content
      ?.map(mapSanityBlock)
      .filter((block): block is ContentBlock => block !== null) ?? [];

  return {
    title: doc.pageTitle,
    metaTitle:
      doc.metaTitle ??
      fallback?.metaTitle ??
      `${doc.pageTitle} | Australia Trip Planner`,
    metaDescription:
      doc.metaDescription ?? fallback?.metaDescription ?? doc.intro ?? "",
    heroImage: {
      src: hero.src || fallback?.heroImage?.src || "",
      alt: hero.alt || fallback?.heroImage?.alt || "",
      caption: doc.heroCaption ?? fallback?.heroImage?.caption,
    },
    intro: doc.intro ?? fallback?.intro ?? "",
    blocks:
      doc.content != null ? blocks : (fallback?.blocks ?? []),
  };
}

export function cityGuideToSanityContent(
  blocks: ContentBlock[]
): SanityGuideBlock[] {
  return blocks.map((block, index) => {
    const key = `block-${index}`;

    switch (block.type) {
      case "paragraph":
        return { _type: "guideParagraph", _key: key, text: block.text };
      case "heading":
        return {
          _type: "guideHeading",
          _key: key,
          text: block.text,
          level: block.level === 3 ? "h3" : "h2",
          ...(block.id
            ? { anchorId: { _type: "slug", current: block.id } }
            : {}),
        };
      case "image":
        return {
          _type: "guideImage",
          _key: key,
          externalUrl: block.src,
          caption: block.caption,
        };
      case "tip":
        return { _type: "guideTip", _key: key, text: block.text };
      case "list":
        return {
          _type: "guideList",
          _key: key,
          items: block.items.map((item, itemIndex) => {
            if (typeof item === "string") {
              return { _type: "guideListItem", _key: `${key}-${itemIndex}`, text: item };
            }
            return {
              _type: "guideListItem",
              _key: `${key}-${itemIndex}`,
              text: item.text,
              subItems: item.subItems,
            };
          }),
        };
      default:
        return { _type: "guideParagraph", _key: key, text: "" };
    }
  });
}
