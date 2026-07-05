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
        .title("Destinations")
        .child(
          S.list()
            .title("Destinations")
            .items([
              S.listItem()
                .title("States")
                .child(
                  S.documentTypeList("stateGuide")
                    .title("States")
                    .defaultOrdering([{ field: "name", direction: "asc" }])
                ),
              S.listItem()
                .title("Cities")
                .child(
                  S.documentTypeList("cityGuide")
                    .title("Cities")
                    .defaultOrdering([
                      { field: "stateSlug", direction: "asc" },
                      { field: "cityName", direction: "asc" },
                    ])
                ),
            ])
        ),
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
