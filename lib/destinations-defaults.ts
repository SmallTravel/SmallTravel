import type { State } from "./destinations";

/** Fallback when Sanity is unavailable or not yet seeded. */
export const FALLBACK_DESTINATIONS: State[] = [
  {
    name: "New South Wales",
    slug: "new-south-wales",
    description:
      "From Sydney's harbour icons to the Blue Mountains, Hunter Valley wine country and the beaches of Byron Bay — NSW has Australia's most diverse landscapes on one road trip.",
    imageUrl:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8ebb8?auto=format&fit=crop&w=1200&q=80",
    cities: [
      {
        name: "Sydney",
        slug: "sydney",
        description:
          "Australia's harbour city — climb the Bridge, walk the Opera House forecourt, surf at Bondi and explore world-class museums, markets and dining.",
        imageUrl:
          "https://images.unsplash.com/photo-1506973035872-a4ec16b8ebb8?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Blue Mountains",
        slug: "blue-mountains",
        description:
          "Ancient sandstone escarpments, eucalyptus forests and the iconic Three Sisters — a UNESCO World Heritage area just 90 minutes from Sydney.",
        imageUrl:
          "https://images.unsplash.com/photo-1524820197278-540916411e20?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Hunter Valley",
        slug: "hunter-valley",
        description:
          "Australia's oldest wine region — cellar doors, gourmet food trails and hot-air balloon rides over rolling vineyards.",
        imageUrl:
          "https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Illawarra, Wollongong & Kiama",
        slug: "illawarra-wollongong-kiama",
        description:
          "Coastal cliffs, the Sea Cliff Bridge, blowholes at Kiama and surf beaches south of Sydney.",
        imageUrl:
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "South Coast & Shoalhaven",
        slug: "south-coast-shoalhaven",
        description:
          "Pristine beaches, whale watching at Jervis Bay and charming coastal towns between Sydney and the Victorian border.",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Coffs Harbour & NSW mid north coast",
        slug: "coffs-harbour",
        description:
          "The Big Banana, marine parks, hinterland waterfalls and family-friendly beaches on the mid north coast.",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Tweed, Byron & NSW Far North Coast",
        slug: "byron-bay",
        description:
          "Laid-back surf culture, rainforest hinterland, farmers markets and the lighthouse at Australia's easternmost point.",
        imageUrl:
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Regional & outback NSW",
        slug: "regional-outback-nsw",
        description:
          "Broken Hill's art scene, Mungo National Park, the Snowy Mountains and the wide-open outback beyond the Great Dividing Range.",
        imageUrl:
          "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    name: "Victoria",
    slug: "victoria",
    description:
      "Melbourne's laneway culture, the Great Ocean Road's Twelve Apostles and Phillip Island's penguins — Victoria packs a lot into a compact state.",
    imageUrl:
      "https://images.unsplash.com/photo-1558642452-9d2a7aff7a2b?auto=format&fit=crop&w=1200&q=80",
    cities: [
      {
        name: "Melbourne",
        slug: "melbourne",
        description:
          "Coffee capital of Australia — laneways, street art, sport and a thriving food scene in the world's most liveable city.",
        imageUrl:
          "https://images.unsplash.com/photo-1514391191-47b7252e8c3b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Great Ocean Road",
        slug: "great-ocean-road",
        description:
          "One of the world's great coastal drives — surf beaches, rainforest walks and the limestone stacks of the Twelve Apostles.",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    name: "Queensland",
    slug: "queensland",
    description:
      "Tropical north, the Great Barrier Reef, Gold Coast theme parks and the Sunshine Coast — Queensland is built for holidays.",
    imageUrl:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
    cities: [
      {
        name: "Gold Coast",
        slug: "gold-coast",
        description:
          "Surf, sand and theme parks — from Surfers Paradise to the hinterland's rainforests and waterfalls.",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Brisbane",
        slug: "brisbane",
        description:
          "Subtropical river city with South Bank parklands, the Gallery of Modern Art and easy access to Moreton Bay.",
        imageUrl:
          "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Sunshine Coast",
        slug: "sunshine-coast",
        description:
          "Noosa Heads, Mooloolaba and the Glass House Mountains — relaxed coastal living north of Brisbane.",
        imageUrl:
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Cairns & Port Douglas",
        slug: "cairns-port-douglas",
        description:
          "Gateway to the Great Barrier Reef and Daintree Rainforest — tropical north at its best.",
        imageUrl:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Great Barrier Reef & Whitsundays",
        slug: "great-barrier-reef-whitsundays",
        description:
          "Snorkel coral gardens, sail Whitehaven Beach and island-hop through the Whitsunday archipelago.",
        imageUrl:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    name: "South Australia",
    slug: "south-australia",
    description:
      "World-class wine in the Barossa and Adelaide Hills, wildlife on Kangaroo Island and a compact, elegant capital in Adelaide.",
    imageUrl:
      "https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80",
    cities: [
      {
        name: "Adelaide",
        slug: "adelaide",
        description:
          "Festival city surrounded by parklands — Central Market, beach suburbs and gateway to wine country.",
        imageUrl:
          "https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Adelaide Hills",
        slug: "adelaide-hills",
        description:
          "Cool-climate wineries, Hahndorf's German heritage and scenic drives through rolling hills.",
        imageUrl:
          "https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "Barossa Valley",
        slug: "barossa-valley",
        description:
          "Shiraz country — historic cellar doors, farm gates and some of Australia's finest restaurants.",
        imageUrl:
          "https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    name: "Western Australia",
    slug: "western-australia",
    description:
      "Vast and wild — Perth's beaches, Margaret River wine, Ningaloo Reef and the remote Kimberley.",
    imageUrl:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
    cities: [
      {
        name: "Perth",
        slug: "perth",
        description:
          "Sunniest capital in Australia — Kings Park views, Fremantle markets and Rottnest Island day trips.",
        imageUrl:
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    name: "Northern Territory",
    slug: "northern-territory",
    description:
      "Red earth, ancient culture and the heart of Australia — Uluru, Kakadu and the Top End's tropical wetlands.",
    imageUrl:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
    cities: [],
  },
  {
    name: "Tasmania",
    slug: "tasmania",
    description:
      "Wilderness, whisky and world-class produce — Tasmania is Australia's island escape.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    cities: [
      {
        name: "Hobart",
        slug: "hobart",
        description:
          "Salamanca Market, MONA and Mount Wellington — a compact harbour city with serious food credentials.",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];
