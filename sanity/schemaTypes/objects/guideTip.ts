import { defineField, defineType } from "sanity";

export const guideTip = defineType({
  name: "guideTip",
  title: "Tip callout",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Tip text",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { text: "text" },
    prepare({ text }) {
      return {
        title: "Tip",
        subtitle: text?.slice(0, 80) ?? "",
      };
    },
  },
});
