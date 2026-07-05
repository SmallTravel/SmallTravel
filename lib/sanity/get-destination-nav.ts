import type { CityNavData } from "@/lib/destinations-nav";
import {
  extractNavSections,
  getCityPath as cityPath,
} from "@/lib/destinations-nav";
import { getStaticCityGuide } from "@/lib/destination-guides";
import { isSanityConfigured } from "@/lib/config";
import { getDestinations } from "@/lib/sanity/get-destinations";
import { getSanityClient } from "@/lib/sanity/client";
import {
  mapSanityBlock,
  type SanityGuideBlock,
} from "@/lib/sanity/map-city-guide";

const destinationNavQuery = `
  *[_type == "cityGuide"] | order(stateSlug asc, cityName asc) {
    cityName,
    stateSlug,
    citySlug,
    content[]{
      _type,
      text,
      level,
      anchorId
    }
  }
`;

type SanityNavDoc = {
  cityName?: string;
  stateSlug: string;
  citySlug: string;
  content?: SanityGuideBlock[];
};

function sectionsFromSanityContent(
  stateSlug: string,
  citySlug: string,
  content?: SanityGuideBlock[]
): CityNavData["sections"] {
  if (!content?.length) return [];

  const blocks = content
    .map(mapSanityBlock)
    .filter((block): block is NonNullable<typeof block> => block !== null);

  return extractNavSections(stateSlug, citySlug, blocks);
}

function sectionsFromStatic(
  stateSlug: string,
  citySlug: string
): CityNavData["sections"] {
  const guide = getStaticCityGuide(stateSlug, citySlug);
  if (!guide) return [];
  return extractNavSections(stateSlug, citySlug, guide.blocks);
}

function buildCityNavData(
  stateSlug: string,
  citySlug: string,
  cityName: string,
  sections: CityNavData["sections"]
): CityNavData {
  return {
    stateSlug,
    citySlug,
    cityName,
    cityHref: cityPath(stateSlug, citySlug),
    sections,
  };
}

export async function getDestinationNavData(): Promise<CityNavData[]> {
  const states = await getDestinations();
  const navByKey = new Map<string, CityNavData>();

  if (isSanityConfigured()) {
    try {
      const fetchOptions =
        process.env.NODE_ENV === "development"
          ? { cache: "no-store" as const }
          : { next: { revalidate: 60 } };

      const docs = await getSanityClient().fetch<SanityNavDoc[]>(
        destinationNavQuery,
        {},
        fetchOptions
      );

      for (const doc of docs) {
        const key = `${doc.stateSlug}/${doc.citySlug}`;
        const cityName =
          doc.cityName ??
          states
            .find((s) => s.slug === doc.stateSlug)
            ?.cities.find((c) => c.slug === doc.citySlug)?.name ??
          doc.citySlug;

        navByKey.set(
          key,
          buildCityNavData(
            doc.stateSlug,
            doc.citySlug,
            cityName,
            sectionsFromSanityContent(doc.stateSlug, doc.citySlug, doc.content)
          )
        );
      }
    } catch {
      // fall through
    }
  }

  for (const state of states) {
    for (const city of state.cities) {
      const key = `${state.slug}/${city.slug}`;
      if (navByKey.has(key)) continue;

      const sections = sectionsFromStatic(state.slug, city.slug);
      navByKey.set(
        key,
        buildCityNavData(state.slug, city.slug, city.name, sections)
      );
    }
  }

  return Array.from(navByKey.values());
}

export function getCityNavData(
  navData: CityNavData[],
  stateSlug: string,
  citySlug: string
): CityNavData | undefined {
  return navData.find(
    (item) => item.stateSlug === stateSlug && item.citySlug === citySlug
  );
}
