export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3; id?: string }
  | {
      type: "list";
      items: (string | { text: string; subItems?: string[] })[];
    }
  | { type: "tip"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "placeTeaser";
      heading: string;
      /** One or more body paragraphs (v1 place cards use multiple). */
      paragraphs: string[];
      gettingThere?: string;
      image: { src: string; alt: string; caption?: string };
      citySlug?: string;
      href?: string;
      ctaLabel?: string;
    };

export type CityGuide = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: { src: string; alt: string; caption?: string };
  intro: string;
  blocks: ContentBlock[];
};

export type StateGuide = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: { src: string; alt: string; caption?: string };
  intro: string;
  blocks: ContentBlock[];
  showPlacesGrid: boolean;
};

export type City = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
};

export type State = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  cities: City[];
};

export function getStatePath(state: State): string {
  return `/destinations/${state.slug}`;
}

export function getCityPath(state: State, city: City): string {
  return `/destinations/${state.slug}/${city.slug}`;
}

export {
  getAllStates,
  getCityBySlug,
  getDestinations,
  getStateBySlug,
} from "@/lib/sanity/get-destinations";
