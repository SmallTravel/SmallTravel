import { defineField, defineType } from "sanity";

export const guideParagraph = defineType({
  name: "guideParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { text: "text" },
    prepare({ text }) {
      return {
        title: "Paragraph",
        subtitle: text?.slice(0, 80) ?? "",
      };
    },
  },
});
