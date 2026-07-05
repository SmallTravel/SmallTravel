import type { CityGuide, ContentBlock } from "./destinations";

const SYDNEY_SECTIONS: Record<string, CityGuide> = {
  "activities-and-attractions": {
    title: "Great things to do in Sydney",
    metaTitle: "Discover Unforgettable Sydney Activities | Australia Trip Planner",
    metaDescription:
      "Harbour cruises, BridgeClimb, Taronga Zoo, Darling Harbour attractions and sightseeing tours — plan the best things to do in Sydney.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8ebb8?auto=format&fit=crop&w=1200&q=80",
      alt: "Sailing boat passing the Sydney Opera House and Harbour Bridge",
      caption: "Go sailing around Sydney Harbour.",
    },
    intro:
      "Sydney Harbour is one of the most beautiful places to visit in Australia. The harbour is a magical playground for children of all ages, whether you are 5, 45 or 85 years old. You can play by the water, on the water or in the water — and what a view!",
    blocks: [
      {
        type: "list",
        items: [
          {
            text: "Add a Sydney Harbour Bridge Climb to your bucket list. You climb to the very top of the bridge for the best views ever. Scaling the world-famous 'Coat-hanger' is one of the coolest things to do in Sydney, and it's completely safe — you're attached to a safety harness before setting off on your adventure.",
          },
          {
            text: "Do the free walk across Sydney Harbour Bridge to Milsons Point. There's a pedestrian walkway that takes about 20 minutes. When you get to the other side, you'll find cool pubs, cafes, Luna Park and lots of parks and green space by the harbour.",
          },
          {
            text: "Get on a boat and cruise around Sydney Harbour. Between April and November you might even spot whales heading north to warmer waters. Ways to enjoy the harbour include:",
            subItems: [
              "Book a cruise with commentary past iconic landmarks and waterfront mansions. Sunset and dinner cruises show Sydney in a whole new light.",
              "Take a sailing adventure — book a tour, charter a catamaran, or learn to sail on one of the world's great harbours.",
              "Do a hop-on-hop-off cruise and visit Fort Denison, Shark, Clark, Goat and Cockatoo Islands — each with a unique slice of Sydney history.",
            ],
          },
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
        alt: "Tall ship sailing on Sydney Harbour",
        caption: "Go sailing on a tall ship on Sydney Harbour.",
      },
      {
        type: "list",
        items: [
          "Catch a Sydney ferry to Manly, Taronga Zoo, or up the Parramatta River. Ferries depart from Circular Quay — Sydneysiders love them for commuting, and visitors love them for the views.",
          "Take an adrenaline-filled jet boat ride across the harbour — crazy twists, turns and fishtails as you zoom past the Opera House and Bridge.",
          "Go kayaking under the Harbour Bridge. Guided kayak tours are a peaceful way to glide around the foreshore.",
          {
            text: "Head to Taronga Zoo — more than 2,600 animals including koalas, kangaroos, lions and giraffes. Ride the free Sky Safari cable car for harbour views, or book a zoo-snooze and camp overnight near the lion enclosure.",
          },
          "Visit Luna Park — old-style fun with a big smiling face at the entrance. Free entry; pay per ride.",
          "Explore Cockatoo Island, Sydney's largest harbour island. Once a convict jail and shipyard, today you can picnic, swim, camp overnight, or join a convict or ghost tour.",
          {
            text: "Darling Harbour and Cockle Bay are among Sydney's top playgrounds, with attractions including:",
            subItems: [
              "SEA LIFE Sydney Aquarium — one of the world's largest collections of Australian aquatic life.",
              "WILD LIFE Sydney — native animals right beside the aquarium.",
              "Madame Tussauds Sydney with more than 70 wax figures.",
              "IMAX theatre, tenpin bowling, and the Lindt café for hot chocolate and treats.",
            ],
          },
        ],
      },
      {
        type: "tip",
        text: "If you plan on visiting several Darling Harbour attractions, buy a Sydney Attraction Pass and save money.",
      },
      {
        type: "heading",
        text: "Sydney sightseeing tours",
        level: 2,
      },
      {
        type: "paragraph",
        text: "I always recommend doing a sightseeing tour so you can really get to know the city you're in. There's all kinds of ways to explore Sydney — buses, bikes, motorcycles and walking tours. Walking is the ideal way to see what's going on; just make sure you're wearing comfortable shoes.",
      },
      {
        type: "list",
        items: [
          "Historic Rocks walking tours and night-time ghost tours uncover Sydney's convict past.",
          "Harbour and Royal Botanic Gardens walks ending at the Opera House, including behind-the-scenes tours.",
          "Hidden-gems walks with stops for coffee, beer or wine along the way.",
          "Motorbike, trike, foodie, photography and shopping tours for something different.",
          "Free self-guided walking tours covering Aboriginal history, Kings Cross, the Rocks and celebrity stories — each takes 1 to 2 hours.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1514391191-47b7252e8c3b?auto=format&fit=crop&w=1200&q=80",
        alt: "People cycling through the Royal Botanic Gardens",
        caption: "Go bike riding around the city and the Botanic Gardens.",
      },
      {
        type: "paragraph",
        text: "Bike tours let you cycle over the Harbour Bridge, along the foreshore and past the Opera House — use pedal power or hire an e-bike. Bus, trike and limousine tours offer comfort with hop-on-hop-off flexibility. While you're walking about town, check out buskers at Circular Quay, grab a cappuccino at a harbour café, and explore laneways and markets dotted throughout the city.",
      },
    ],
  },

  "beaches-and-water-activities": {
    title: "Sydney beaches & water activities",
    metaTitle: "Sydney Beaches & Water Activities | Australia Trip Planner",
    metaDescription:
      "Bondi, Manly, Coogee and beyond — surfing, swimming, coastal walks and harbour water sports in Sydney.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      alt: "Bondi Beach on a sunny day",
      caption: "Bondi Beach — Sydney's most famous strip of sand.",
    },
    intro:
      "Sydney is a city built around water — golden surf beaches on the east coast, calm harbour coves in the north, and ocean pools carved into sandstone cliffs. Whether you want to learn to surf, snorkel a marine reserve, or simply swim between the flags, there's a beach for every mood.",
    blocks: [
      {
        type: "heading",
        text: "Iconic surf beaches",
        level: 2,
      },
      {
        type: "list",
        items: [
          {
            text: "Bondi Beach is the classic — busy, beautiful and backed by cafes and the Bondi to Bronte coastal walk. Swim between the red-and-yellow flags and watch the locals at Icebergs pool.",
          },
          "Manly Beach sits at the end of a scenic ferry ride from Circular Quay. The Corso links the harbour to the ocean; rent a board or join a surf lesson on the north side.",
          "Coogee is family-friendly with calm water and the Coogee Pavilion for lunch. Link it with the Bondi to Coogee walk for cliff-top views.",
          "Bronte and Tamarama sit between Bondi and Coogee — quieter coves with rock pools and picnic lawns.",
        ],
      },
      {
        type: "heading",
        text: "Coastal walks & ocean pools",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The Bondi to Coogee coastal trail is Sydney's best-known walk — 6 km of clifftop paths, beaches and rock platforms. Allow 2–3 hours with photo stops. For a shorter option, try the Spit to Manly walk through bushland with harbour lookouts.",
      },
      {
        type: "list",
        items: [
          "Icebergs at Bondi — swim in the famous ocean pool overlooking the surf.",
          "Mahon Pool, Maroubra — a natural rock pool popular with locals.",
          "Balmoral Beach — netted enclosure, calm water and fish-and-chips on the esplanade.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
        alt: "Coastal cliff walk above the ocean",
        caption: "The Bondi to Coogee walk is one of Sydney's great free experiences.",
      },
      {
        type: "heading",
        text: "Harbour & water sports",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Stand-up paddleboarding and kayaking in Rose Bay, Double Bay and Middle Harbour.",
          "Snorkelling at Camp Cove and Shelly Beach near Manly — look for blue gropers and stingrays.",
          "Learn to surf with accredited schools at Bondi, Manly or Maroubra — boards and wetsuits supplied.",
          "Harbour swimming at Nielsen Park and Murray Rose Pool (formerly Redleaf) in Double Bay.",
        ],
      },
      {
        type: "tip",
        text: "Always swim between the flags at patrolled beaches. Rip currents are common — if unsure, ask a surf lifesaver.",
      },
    ],
  },

  "parks-and-gardens": {
    title: "Sydney's parks & gardens",
    metaTitle: "Sydney Parks & Gardens | Australia Trip Planner",
    metaDescription:
      "Royal Botanic Garden, Centennial Park, Barangaroo and harbour foreshore parks — green spaces in Sydney.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
      alt: "Lush gardens with harbour views",
      caption: "The Royal Botanic Garden overlooks Sydney Harbour.",
    },
    intro:
      "Despite its skyscrapers, Sydney is remarkably green. Subtropical gardens spill down to the harbour, vast urban parks offer cycling and picnics, and bushland reserves sit minutes from the CBD. Pack a rug and make the most of the outdoors.",
    blocks: [
      {
        type: "heading",
        text: "Harbour-side green spaces",
        level: 2,
      },
      {
        type: "list",
        items: [
          {
            text: "Royal Botanic Garden — 30 hectares of themed gardens from the Opera House to Mrs Macquarie's Chair. Free entry; join a guided Aboriginal heritage tour or the Calyx floral display.",
          },
          "Barangaroo Reserve — a native bushland headland with walking paths, harbour views and Aboriginal cultural programs. Perfect for sunset.",
          "Observatory Hill Park in The Rocks — one of the best free harbour lookouts, popular for picnics.",
          "Wendy Whiteley's Secret Garden in Lavender Bay — a whimsical, volunteer-maintained garden tucked below residential terraces.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1524820197278-540916411e20?auto=format&fit=crop&w=1200&q=80",
        alt: "Tree-lined path through a city park",
        caption: "Centennial Park is a favourite for cycling and picnics.",
      },
      {
        type: "heading",
        text: "Large urban parks",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Centennial Park — 189 hectares of ponds, horse riding, cycling loops and picnic lawns in the eastern suburbs.",
          "Sydney Park in St Peters — wetlands, skate park and a hill with city skyline views.",
          "Lane Cove National Park — bushwalks, kayaking and barbecues just 20 minutes from the CBD.",
          "Western Sydney Parklands — cycling trails, playgrounds and stargazing away from the city lights.",
        ],
      },
      {
        type: "heading",
        text: "Day trips to nature",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Ku-ring-gai Chase National Park north of the city has Aboriginal rock engravings, West Head lookouts and Bobbin Head picnics. The Blue Mountains — a UNESCO World Heritage area — is 90 minutes west with rainforest walks, the Three Sisters and Scenic World.",
      },
      {
        type: "tip",
        text: "Many parks host free events in summer — outdoor cinema, yoga and live music. Check local council websites before you visit.",
      },
    ],
  },

  "museums-and-galleries": {
    title: "Sydney museums & galleries",
    metaTitle: "Sydney Museums & Galleries | Australia Trip Planner",
    metaDescription:
      "Art Gallery of NSW, Australian Museum, MCA, Hyde Park Barracks and more — culture and history in Sydney.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1564399574903-251a6cea8f84?auto=format&fit=crop&w=1200&q=80",
      alt: "Art gallery interior with visitors",
      caption: "The Art Gallery of NSW hosts Australian and international collections.",
    },
    intro:
      "Sydney's museums and galleries span 60,000 years of Aboriginal culture, colonial convict history, natural science and cutting-edge contemporary art. Many major institutions sit within walking distance around the CBD and Darling Harbour.",
    blocks: [
      {
        type: "heading",
        text: "Must-see museums",
        level: 2,
      },
      {
        type: "list",
        items: [
          {
            text: "Australian Museum — Australia's oldest museum, with dinosaur fossils, Indigenous cultural collections and the Westpac Long Gallery.",
          },
          "Hyde Park Barracks — a UNESCO World Heritage convict site telling the story of transportation and early Sydney.",
          "Powerhouse Museum (Ultimo) — science, technology, design and the Wiggles exhibition for younger visitors.",
          "Australian National Maritime Museum at Darling Harbour — submarines, tall ships and Indigenous canoe traditions.",
        ],
      },
      {
        type: "heading",
        text: "Art galleries",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Art Gallery of New South Wales — free general entry, with Australian, Asian and European art. The new SANAA-designed building expands the campus.",
          "Museum of Contemporary Art (MCA) at Circular Quay — Australian and international contemporary work with a rooftop café and harbour views.",
          "White Rabbit Gallery in Chippendale — four floors of contemporary Chinese art; entry is free.",
          "Brett Whiteley Studio in Surry Hills — the artist's workspace preserved as a small, intimate gallery.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1518998053901-5348d4271a04?auto=format&fit=crop&w=1200&q=80",
        alt: "Museum exhibition hall",
        caption: "Plan a day around Darling Harbour's museum precinct.",
      },
      {
        type: "heading",
        text: "Tips for visiting",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Many galleries offer free entry to permanent collections; special exhibitions may require tickets.",
          "Visit on a weekday morning to avoid school groups and cruise-ship crowds.",
          "Combine the Art Gallery of NSW with a walk through the Botanic Garden — they're adjacent.",
        ],
      },
      {
        type: "tip",
        text: "Look for 'late night' openings — the MCA and AGNSW often stay open until 9 pm on Wednesdays with talks and live music.",
      },
    ],
  },

  "shopping-and-markets": {
    title: "Sydney's shopping & markets",
    metaTitle: "Sydney Shopping & Markets | Australia Trip Planner",
    metaDescription:
      "Queen Victoria Building, Paddington Markets, Rocks markets and designer boutiques — where to shop in Sydney.",
    heroImage: {
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      alt: "Shopping arcade with ornate architecture",
      caption: "The Queen Victoria Building is a Sydney shopping icon.",
    },
    intro:
      "From heritage arcades and weekend markets to beachside boutiques and designer strips, Sydney rewards shoppers who wander. Markets are best on weekends; major malls and QVB trade seven days a week.",
    blocks: [
      {
        type: "heading",
        text: "Markets worth the alarm clock",
        level: 2,
      },
      {
        type: "list",
        items: [
          {
            text: "The Rocks Markets (Fri–Sun) — artisan food, jewellery, homewares and street performers under the Harbour Bridge.",
          },
          "Paddington Markets (Saturday) — fashion, art and vintage finds in the eastern suburbs.",
          "Glebe Markets (Saturday) — bohemian stalls, vintage clothing and global street food.",
          "Bondi Markets (Sunday) — fashion, surf gear and health foods behind Bondi Beach.",
          "Carriageworks Farmers Market (Saturday) — premium produce, bread and coffee in a converted rail workshop.",
        ],
      },
      {
        type: "heading",
        text: "Iconic shopping precincts",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Queen Victoria Building (QVB) — Romanesque architecture, high-end fashion and the famous clock with moving figures.",
          "The Strand Arcade — Victorian-era boutique shopping linking Town Hall and Pitt Street Mall.",
          "Pitt Street Mall and Westfield Sydney — major brands and department stores in the CBD heart.",
          "Oxford Street, Paddington — independent designers, homewares and bookshops along a terrace-house strip.",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1488459716781-31db71592c9e?auto=format&fit=crop&w=1200&q=80",
        alt: "Outdoor market stalls with shoppers",
        caption: "Weekend markets are a Sydney institution.",
      },
      {
        type: "heading",
        text: "Aboriginal art & souvenirs",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Buy Indigenous art from reputable galleries — Cooee Art, Kate Owen Gallery and Agathon Gallery in The Rocks. Look for authenticity certificates and avoid cheap mass-produced boomerangs sold to tourists. The Art Gallery of NSW shop stocks quality books and gifts.",
      },
      {
        type: "tip",
        text: "Tourists can claim a GST refund on purchases over $300 from participating stores — ask for a Tax Invoice and keep your receipts for departure.",
      },
    ],
  },
};

function sectionBlocks(
  slug: string,
  title: string,
  section: CityGuide
): ContentBlock[] {
  return [
    { type: "heading", text: title, level: 2, id: slug },
    { type: "paragraph", text: section.intro },
    ...section.blocks,
  ];
}

const SYDNEY_CITY_GUIDE: CityGuide = {
  ...SYDNEY_SECTIONS["activities-and-attractions"],
  blocks: [
    ...SYDNEY_SECTIONS["activities-and-attractions"].blocks,
    ...sectionBlocks(
      "beaches-and-water-activities",
      "Sydney beaches & water activities",
      SYDNEY_SECTIONS["beaches-and-water-activities"]
    ),
    ...sectionBlocks(
      "parks-and-gardens",
      "Sydney's parks & gardens",
      SYDNEY_SECTIONS["parks-and-gardens"]
    ),
    ...sectionBlocks(
      "museums-and-galleries",
      "Sydney museums & galleries",
      SYDNEY_SECTIONS["museums-and-galleries"]
    ),
    ...sectionBlocks(
      "shopping-and-markets",
      "Sydney's shopping & markets",
      SYDNEY_SECTIONS["shopping-and-markets"]
    ),
  ],
};

const CITY_GUIDES: Record<string, CityGuide> = {
  "new-south-wales/sydney": SYDNEY_CITY_GUIDE,
};

export function getStaticCityGuide(
  stateSlug: string,
  citySlug: string
): CityGuide | undefined {
  return CITY_GUIDES[`${stateSlug}/${citySlug}`];
}

export function buildDefaultCityGuide(
  cityName: string,
  description: string,
  imageUrl: string
): CityGuide {
  return {
    title: `Great things to do in ${cityName}`,
    metaTitle: `${cityName} Travel Guide | Australia Trip Planner`,
    metaDescription: description,
    heroImage: {
      src: imageUrl,
      alt: `${cityName} destination`,
    },
    intro: description,
    blocks: [
      {
        type: "paragraph",
        text: `Whether you're a first-time visitor or a returning traveller, ${cityName} has plenty to offer. Browse our tours below or explore other destination guides to plan your perfect trip.`,
      },
    ],
  };
}
