import type { ContentBlock, StateGuide } from "./destinations";
import otherStateGuides from "./state-guides-data";

const NSW_BLOCKS: ContentBlock[] = [
  {
    type: "paragraph",
    text: "If you love the urban-buzz, Sydney is a city to be reckoned with. Sydney is one of the world's most beautiful cities with its iconic harbour, world-famous Opera House and Harbour Bridge. Culture-seekers are spoilt for choice with theatres, operas, concerts, galleries and museums. Add the smorgasbord of ‘hatted’ restaurants, phenomenal shopping and an incredible line-up of major events, and you’ve hit the jackpot on things to do in Sydney.",
  },
  {
    type: "heading",
    text: "Getting around NSW - directions & distance",
    level: 2,
    id: "getting-around",
  },
  {
    type: "list",
    items: [
      "NSW is on Australia’s east coast, and stretches 1,500 km from the Gold Coast in QLD to Victoria. Fly, drive or catch a bus to virtually anywhere in NSW.",
      "NSW is popular for road-trips and there’s plenty of cool places to stop in at. As a guide, it’s a nine-hour drive from the Gold Coast to Sydney, or from Sydney to Melbourne.",
      "Sydney is one of the main airport hubs for domestic and international flights so you can catch a plane from almost anywhere in the world. Flights to Sydney are quite reasonable, particularly if you plan and book ahead. NSW also has lots of smaller regional airports to get you off the beaten track.",
    ],
  },
  {
    type: "placeTeaser",
    heading: "Visit Sydney - NSW's capital",
    citySlug: "sydney",
    image: {
      src: "https://australiatripplanner.com.au/uploads/NSW_Sydney%20Opera%20House%20from%20The%20Rocks_FINAL_Tourism%20Australia-1619147758-1630736009.jpg",
      alt: "Four friends relaxing at Circular Quay with the Sydney Opera House",
      caption:
        "Get amazing views of Sydney Opera House from The Rocks. Photo: Tourism Australia",
    },
    paragraphs: [
      "Sydney is NSW’s capital and is one of the most beautiful cities on earth. It’s impossible not to be mesmerised by the gorgeous harbour bustling with ferries, cruise ships and sailing boats. Sydney has it all with great beaches, parks, bars, restaurants, events and nightlife. It’s also Australia’s oldest city and was built by English convicts that were shipped to Australia more than 200 years ago. As you wander around Sydney (particularly the Rocks area), you’ll see the blood, sweat and tears that went into building this city.",
    ],
  },
  {
    type: "placeTeaser",
    heading: "Visit the Blue Mountains",
    citySlug: "blue-mountains",
    gettingThere: "The Blue Mountains is a 2-hour drive west of Sydney.",
    image: {
      src: "https://australiatripplanner.com.au/uploads/Blue%20Mountains_Jenolan%20Caves_person%20in%20cave-1612226089_FINAL-1629167372.jpeg",
      alt: "A man touring the world heritage Jenolan Caves in the Blue Mountains",
      caption:
        "Explore the world heritage Jenolan Caves. Photo: Tourism Australia",
    },
    paragraphs: [
      "The Blue Mountains a popular weekend getaway for Sydney-siders, and is the perfect place to reconnect with nature. In addition to the wonderland of mountains and bushwalking, there's also quaint villages; friendly locals; art galleries, parks and gardens. You can do a day trip to the Blue Mountains but there’s so much to explore, you’ll probably want to stay overnight.",
    ],
  },
  {
    type: "placeTeaser",
    heading: "Hunter Valley & Port Stephens",
    citySlug: "hunter-valley",
    gettingThere:
      "The Hunter Valley, Newcastle & Port Stephens is 2-hour drive north of Sydney.",
    image: {
      src: "https://australiatripplanner.com.au/uploads/NSW_North%20Coast_Port%20Stephens_Tourism%20Australia-1619155257.jpeg",
      alt: "A sailing boat at Port Stephens, near the Hunter Valley",
      caption:
        "Go sailing at Port Stephens, near the Hunter Valley. Photo: Tourism Australia",
    },
    paragraphs: [
      "The Hunter Valley is the perfect place to tantalise your tastebuds with gourmet food and wine. Nearby are the incredible beaches at Newcastle and Port Stephens (2.5 hours from Sydney). Port Stephens is also a popular spot for a dolphin and whale watching cruise.",
      "The best way to explore the Hunter Valley is with your own car, but there's you can also book one of the many tours to the Hunter.",
    ],
  },
  {
    type: "placeTeaser",
    heading: "Wollongong & the Illawarra",
    citySlug: "illawarra-wollongong-kiama",
    gettingThere:
      "Wollongong and the Illawarra are a 1-2 hour drive south from Sydney.",
    image: {
      src: "https://australiatripplanner.com.au/uploads/NSW_South%20Coast_Pebbly%20Beach_Myka%20Photography-1619154021.jpeg",
      alt: "Children running and playing on a NSW South Coast beach",
      caption:
        "Run wild on the gorgeous beaches on the NSW South Coast. Photo: Myka Photography",
    },
    paragraphs: [
      "Choose from 17 beaches in Wollongong, Shellharbour and Kiama. When you're not at the beaches, there's national parks filled with hiking tracks and mountain bike trails, or hang-gliding off the beautiful cliffs at Stanwell Tops in Wollongong. Not far is the quaint Southern Highlands. When you're in Kiama, visit the world-famous Kiama Blowhole, farmers markets, and the Jamberoo Action Park (which is the Illawarra’s theme park).",
    ],
  },
  {
    type: "placeTeaser",
    heading: "Outback NSW",
    citySlug: "regional-outback-nsw",
    image: {
      src: "https://australiatripplanner.com.au/uploads/NSW_Parkes%20Elvis%20Festival_Tourism%20Australia-1619149166.jpeg",
      alt: "An Elvis lookalike at the annual Parkes Elvis Festival",
      caption:
        "Don't miss the annual Parkes Elvis Festival in Parkes. Photo: Tourism Australia",
    },
    paragraphs: [
      "Head West and explore Outback NSW.",
      "There’s a lot to love about outback NSW, which is blessed with gorgeous towns, farms and things to do. Get back to the simple life and meet ‘salt-of-the-earth’ locals who are ready to roll out the 'welcome mat' for you. Keep an eye out for the incredible line-up of outback festivals and events, which are quirky and probably the best fun you’ll ever have.",
      "Many outback towns are suffering one of the worst droughts in Australian history so adding them to your itinerary is an incredible way to show your support for the locals. In return, you’ll meet great people, have amazing experiences and enjoy hospitality like never before. Heads up, the outback is dry, dusty and hot, so ideally plan your visit between March and October.",
    ],
  },
  {
    type: "placeTeaser",
    heading: "Southern NSW",
    citySlug: "south-coast-shoalhaven",
    image: {
      src: "https://australiatripplanner.com.au/uploads/NSW_South%20Coast_Shoalhaven_Seven%20Mile%20Beach_Destination%20NSW-1619154743.jpeg",
      alt: "People horseback riding on a beach in Southern NSW",
      caption: "Go horseback riding on the beach. Photo: Destination NSW",
    },
    paragraphs: [
      "Southern NSW stretches from Wollongong to Eden and the snowy mountains. Southern NSW happens to be one of Australia’s favourite holiday destinations and has beaches, mountains and loads of country hospitality.",
      "The Shoalhaven takes over where the Illawarra left off. There's beaches, national parks and mountains, fabulous food and friendly locals. Combine all of this and it makes for a pretty perfect holiday. If you fancy hanging out in country towns, don’t go past Kangaroo Valley, Berry and Milton.",
      "When it comes to beaches, there’s over 100 beaches in the Shoalhaven region to choose from. My advice is to experience as many as you can.",
    ],
  },
  {
    type: "placeTeaser",
    heading: "Mid North Coast NSW",
    citySlug: "coffs-harbour",
    image: {
      src: "https://australiatripplanner.com.au/uploads/NSW_Coffs%20Harbour_Big%20Banana_Virgin%20Australia-1619148773.jpeg",
      alt: "The iconic Big Banana at Coffs Harbour",
      caption:
        "Visit the iconic Big Banana at Coffs Harbour. Photo: Virgin Australia",
    },
    paragraphs: [
      "Head north of Sydney and experience the NSW mid-north coast. There are endless beaches, creeks, rainforests, and mountain ranges which makes this the perfect holiday getaway.",
      "Port Macquarie is 4 hours drive north of Sydney, and Coffs Harbour is 6 hours from Sydney.",
      "Port Macquarie is 17 beaches for you to swim, surf and play at. Further north is Coffs Harbour where there's another 16 beautiful beaches to explore.",
      "For something a little different, join a camel safari along Lighthouse beach at Port Macquarie, or take the 9 km coastal walk that leads to Tacking Point Lighthouse. Be sure to visit the Koala hospital where you can meet and help care for these beautiful but endangered animals.",
    ],
  },
  {
    type: "placeTeaser",
    heading: "Far North Coast NSW",
    citySlug: "byron-bay",
    image: {
      src: "https://australiatripplanner.com.au/uploads/NSW_Byron%20Bay_woman%20relaxing-1619148445.jpeg",
      alt: "A woman relaxing at a Byron Bay resort",
      caption: "Relax & unwind at Byron Bay. Photo: Tourism Australia",
    },
    paragraphs: [
      "Byron Bay and the Tweed Coast are 8-9 hour drive from Sydney.",
      "Byron Bay is home to many international celebrities including Chris Hemsworth (aka Thor), Matt Damon, international songstress Olivia Newton-John, super-couple Nicole Kidman and Keith Urban.",
      "A little further north is the Tweed Coast (which is unofficially part of the Gold Coast). There’s a whole load of coastal towns between Byron and Tweed that are a combination of charming, alternative, funky and downright delicious. (Yes, this area is renowned for its great soil and sustainable farming, which means you get to enjoy the best food and drink.)",
      "When you come to this area, it’s all about enjoying life. There’s beaches, mountains, rainforests and farms to explore, so let’s get cracking on what you need to add to your itinerary.",
    ],
  },
];

export const NSW_STATE_GUIDE: StateGuide = {
  title: "Visit New South Wales",
  metaTitle: "Things to do in New South Wales | Australia Trip Planner",
  metaDescription:
    "Plan a NSW holiday — Sydney Harbour, Blue Mountains, Hunter Valley, Illawarra, South Coast, mid and far north coast, and outback NSW.",
  heroImage: {
    src: "https://australiatripplanner.com.au/uploads/NSW_Sydney%20Opera%20House%20from%20The%20Rocks_FINAL_Tourism%20Australia-1619147758-1630736009.jpg",
    alt: "Boats and ferries on Sydney Harbour with the Sydney Opera House",
    caption:
      "NSW is full of surprises & adventures. Be sure to enjoy all the action on Sydney harbour",
  },
  intro:
    "New South Wales (NSW) is ‘holiday heaven’ with a never-ending list of things to see and do. As Australia’s oldest state, there's a lot of history and culture, from 60,000 years of Aboriginal people living, hunting and fishing on NSW soil; to the brutal convict past where people were shipped to Australia from England for as little as stealing a loaf of bread. Get a glimpse at the harsh life endured by convicts (also known as POMs – 'Prisoner of Motherland'). There's also world-class beaches; rainforests, mountains and national parks; wineries; and plenty of charming villages to see and explore in NSW.",
  blocks: NSW_BLOCKS,
  showPlacesGrid: false,
};

const STATE_GUIDES: Record<string, StateGuide> = {
  "new-south-wales": NSW_STATE_GUIDE,
  ...otherStateGuides,
};

export function getStaticStateGuide(stateSlug: string): StateGuide | undefined {
  return STATE_GUIDES[stateSlug];
}

export function buildDefaultStateGuide(
  name: string,
  description: string,
  imageUrl: string
): StateGuide {
  return {
    title: `Visit ${name}`,
    metaTitle: `${name} | Destinations | Australia Trip Planner`,
    metaDescription: description,
    heroImage: {
      src: imageUrl,
      alt: name,
    },
    intro: description,
    blocks: [],
    showPlacesGrid: true,
  };
}
