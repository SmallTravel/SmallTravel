import { defineField, defineType } from "sanity";

export const guideListItem = defineType({
  name: "guideListItem",
  title: "List item",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subItems",
      title: "Sub-items",
      type: "array",
      of: [{ type: "string" }],
      description: "Optional nested bullet points under this item.",
    }),
  ],
  preview: {
    select: { text: "text" },
    prepare({ text }) {
      return {
        title: text?.slice(0, 72) ?? "List item",
      };
    },
  },
});
