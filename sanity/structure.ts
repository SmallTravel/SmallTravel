import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .child(
          S.document().schemaType("homepage").documentId("homepage")
        ),
      S.listItem()
        .title("Tours page")
        .child(
          S.document().schemaType("toursPage").documentId("toursPage")
        ),
      S.divider(),
      S.listItem()
        .title("Tours")
        .child(
          S.documentTypeList("tour")
            .title("Tours")
            .defaultOrdering([
              { field: "featured", direction: "desc" },
              { field: "title", direction: "asc" },
            ])
        ),
    ]);
