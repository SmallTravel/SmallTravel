import { defineField, defineType } from "sanity";

export const benefit = defineType({
  name: "benefit",
  title: "Benefit",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});
