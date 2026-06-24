import { defineField, defineType } from "sanity";

export const toursPage = defineType({
  name: "toursPage",
  title: "Tours page",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "header", title: "Page header", default: true },
  ],
  fields: [
    defineField({
      name: "metaTitle",
      title: "Page title (browser tab)",
      type: "string",
      group: "seo",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      group: "header",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "header",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Tours page" };
    },
  },
});
