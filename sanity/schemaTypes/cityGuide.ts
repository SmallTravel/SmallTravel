import { defineField, defineType } from "sanity";

export const cityGuide = defineType({
  name: "cityGuide",
  title: "City",
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
      description: 'Studio label only, e.g. "Sydney, NSW".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cityName",
      title: "City name",
      type: "string",
      group: "settings",
      description: "Display name shown in navigation and city cards.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      group: "settings",
      description: "Shown on state pages and city cards. Falls back to intro if empty.",
    }),
    defineField({
      name: "cardImageUrl",
      title: "Card image URL",
      type: "url",
      group: "settings",
      description: "Image for city cards on state pages. Falls back to hero image.",
    }),
    defineField({
      name: "stateSlug",
      title: "State slug",
      type: "string",
      group: "settings",
      description: "URL segment, e.g. new-south-wales",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "citySlug",
      title: "City slug",
      type: "string",
      group: "settings",
      description: "URL segment, e.g. sydney",
      validation: (r) => r.required(),
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
      description: 'e.g. "Great things to do in Sydney"',
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
    }),
    defineField({
      name: "content",
      title: "Content blocks",
      type: "array",
      group: "content",
      description:
        "Add, remove, or reorder sections. Each block is one piece of content — a paragraph, heading, image, list, or tip.",
      of: [
        { type: "guideParagraph" },
        { type: "guideHeading" },
        { type: "guideImage" },
        { type: "guideTip" },
        { type: "guideList" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "cityName",
      stateSlug: "stateSlug",
      citySlug: "citySlug",
      media: "heroImage",
    },
    prepare({ title, stateSlug, citySlug, media }) {
      return {
        title: title ?? "City",
        subtitle: stateSlug && citySlug ? `${stateSlug} / ${citySlug}` : "",
        media,
      };
    },
  },
});
