import { defineField, defineType } from "sanity";

export const guidePlaceTeaser = defineType({
  name: "guidePlaceTeaser",
  title: "Place teaser",
  type: "object",
  description:
    "A region/city highlight with image, copy, and a Read More link — like the old state destination pages.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required(),
      description: 'e.g. "Visit Sydney - NSW\'s capital"',
    }),
    defineField({
      name: "image",
      title: "Upload image",
      type: "image",
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
      name: "externalUrl",
      title: "Or image URL",
      type: "url",
      description:
        "Use when you have not uploaded an image yet. Uploaded image takes priority.",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "gettingThere",
      title: "Getting there",
      type: "string",
      description: 'Optional callout, e.g. "The Blue Mountains is a 2-hour drive west of Sydney."',
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 8,
      validation: (r) => r.required(),
      description:
        "One or more paragraphs. Separate paragraphs with a blank line — they render inside the place card like the old site.",
    }),
    defineField({
      name: "citySlug",
      title: "City slug",
      type: "string",
      description:
        "URL segment for the linked city page, e.g. sydney. Leave empty to hide the Read More link.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Link label",
      type: "string",
      initialValue: "Read More",
    }),
  ],
  preview: {
    select: { title: "heading", media: "image", citySlug: "citySlug" },
    prepare({ title, media, citySlug }) {
      return {
        title: title ?? "Place teaser",
        subtitle: citySlug ? `→ ${citySlug}` : "No link",
        media,
      };
    },
  },
});
