import { defineField, defineType } from "sanity";

export const guideImage = defineType({
  name: "guideImage",
  title: "Image",
  type: "object",
  fields: [
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
          validation: (r) => r.required(),
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
  ],
  preview: {
    select: { caption: "caption", media: "image" },
    prepare({ caption, media }) {
      return {
        title: "Image",
        subtitle: caption ?? "No caption",
        media,
      };
    },
  },
});
