import { defineField, defineType } from "sanity";

export const guideHeading = defineType({
  name: "guideHeading",
  title: "Section heading",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Heading text",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Large (H2)", value: "h2" },
          { title: "Medium (H3)", value: "h3" },
        ],
        layout: "radio",
      },
      initialValue: "h2",
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "slug",
      description:
        "Optional link target for site navigation. Auto-generated from the heading if left empty.",
      options: { source: "text", maxLength: 64 },
    }),
  ],
  preview: {
    select: { text: "text", level: "level" },
    prepare({ text, level }) {
      return {
        title: `${level === "h3" ? "H3" : "H2"}: ${text ?? "Heading"}`,
      };
    },
  },
});
