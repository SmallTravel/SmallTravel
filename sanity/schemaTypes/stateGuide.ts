import { defineField, defineType } from "sanity";

export const stateGuide = defineType({
  name: "stateGuide",
  title: "State",
  type: "document",
  groups: [
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
    { name: "content", title: "Page content", default: true },
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
      group: "content",
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
      title: "Description",
      type: "text",
      rows: 4,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Hero image",
      type: "image",
      group: "content",
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
      title: "Hero image URL (fallback)",
      type: "url",
      group: "content",
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
  ],
  preview: {
    select: { title: "name", slug: "slug", media: "image" },
    prepare({ title, slug, media }) {
      return {
        title: title ?? "State",
        subtitle: slug,
        media,
      };
    },
  },
});
