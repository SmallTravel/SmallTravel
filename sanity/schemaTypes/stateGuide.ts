import { defineField, defineType } from "sanity";

export const stateGuide = defineType({
  name: "stateGuide",
  title: "State",
  type: "document",
  groups: [
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
    { name: "header", title: "Page header", default: true },
    { name: "content", title: "Page content" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal label",
      type: "string",
      group: "settings",
      description: "Studio label only, e.g. New South Wales.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "State name",
      type: "string",
      group: "settings",
      description: "Short name used in nav, breadcrumbs, and cards.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "string",
      group: "settings",
      description: "e.g. new-south-wales",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "settings",
      description:
        "Used on destination listing cards and as a meta/description fallback.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Card / listing image",
      type: "image",
      group: "settings",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "imageUrl",
      title: "Card image URL (fallback)",
      type: "url",
      group: "settings",
    }),
    defineField({
      name: "showPlacesGrid",
      title: "Show Places to visit cards",
      type: "boolean",
      group: "settings",
      description:
        "When on, lists city cards below the guide (from City documents for this state). Turn off if place teasers in the body are enough.",
      initialValue: true,
    }),
    defineField({
      name: "metaTitle",
      title: "Page title (browser tab)",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "pageTitle",
      title: "Headline (H1)",
      type: "string",
      group: "header",
      description: 'e.g. "Visit New South Wales"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "header",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "heroImageUrl",
      title: "Hero image URL (fallback)",
      type: "url",
      group: "header",
      description: "Used until you upload a hero image above.",
    }),
    defineField({
      name: "heroCaption",
      title: "Hero caption",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 4,
      group: "header",
      description:
        "Lead paragraph under the hero. Add more paragraphs and sections in Page content.",
    }),
    defineField({
      name: "content",
      title: "Content blocks",
      type: "array",
      group: "content",
      description:
        "Expand the guide with paragraphs, headings, lists, tips, images, or place teasers (region cards with Read More). Reorder freely.",
      of: [
        { type: "guideParagraph" },
        { type: "guideHeading" },
        { type: "guideImage" },
        { type: "guideTip" },
        { type: "guideList" },
        { type: "guidePlaceTeaser" },
      ],
    }),
  ],
  preview: {
    select: { title: "name", slug: "slug", media: "heroImage" },
    prepare({ title, slug, media }) {
      return {
        title: title ?? "State",
        subtitle: slug,
        media,
      };
    },
  },
});
