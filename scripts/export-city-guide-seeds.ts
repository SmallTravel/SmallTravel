/**
 * Exports state and city documents as NDJSON for `sanity dataset import`.
 * Run: npm run sanity:export-city-guides
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FALLBACK_DESTINATIONS } from "../lib/destinations-defaults";
import { getStaticCityGuide } from "../lib/destination-guides";
import { cityGuideToSanityContent } from "../lib/sanity/map-city-guide";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../sanity/seed");

const stateLines: string[] = [];
const cityLines: string[] = [];

for (const state of FALLBACK_DESTINATIONS) {
  stateLines.push(
    JSON.stringify({
      _type: "stateGuide",
      _id: `stateGuide-${state.slug}`,
      title: state.name,
      name: state.name,
      slug: state.slug,
      description: state.description,
      imageUrl: state.imageUrl,
      metaTitle: `${state.name} | Destinations | Australia Trip Planner`,
      metaDescription: state.description,
    })
  );

  for (const city of state.cities) {
    const guide = getStaticCityGuide(state.slug, city.slug);

    cityLines.push(
      JSON.stringify({
        _type: "cityGuide",
        _id: `cityGuide-${state.slug}-${city.slug}`,
        title: `${city.name}, ${state.name}`,
        cityName: city.name,
        stateSlug: state.slug,
        citySlug: city.slug,
        shortDescription: city.description,
        cardImageUrl: city.imageUrl,
        metaTitle:
          guide?.metaTitle ??
          `${city.name}, ${state.name} | Australia Trip Planner`,
        metaDescription: guide?.metaDescription ?? city.description,
        pageTitle: guide?.title ?? `Great things to do in ${city.name}`,
        heroImageUrl: guide?.heroImage.src ?? city.imageUrl,
        heroCaption: guide?.heroImage.caption,
        intro: guide?.intro ?? city.description,
        content: guide
          ? cityGuideToSanityContent(guide.blocks)
          : [
              {
                _type: "guideParagraph",
                _key: "intro",
                text: city.description,
              },
            ],
      })
    );
  }
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "state-guides.ndjson"),
  `${stateLines.join("\n")}\n`
);
fs.writeFileSync(
  path.join(outDir, "city-guides.ndjson"),
  `${cityLines.join("\n")}\n`
);

console.log(
  `Wrote ${stateLines.length} state(s) and ${cityLines.length} city guide(s)`
);
