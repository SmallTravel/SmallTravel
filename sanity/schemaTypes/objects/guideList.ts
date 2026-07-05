import { defineField, defineType } from "sanity";

export const guideList = defineType({
  name: "guideList",
  title: "Bullet list",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "guideListItem" }],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }) {
      const count = items?.length ?? 0;
      const first = items?.[0]?.text?.slice(0, 48);
      return {
        title: `Bullet list (${count} item${count === 1 ? "" : "s"})`,
        subtitle: first,
      };
    },
  },
});
