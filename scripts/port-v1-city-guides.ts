/**
 * Port v1 city destination pages into Sanity cityGuide documents.
 * Run: npx tsx scripts/port-v1-city-guides.ts
 * Then: npx sanity dataset import scripts/tmp/city-guides-ported.ndjson --dataset production --replace
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "tmp");

type CityTarget = {
  stateSlug: string;
  citySlug: string;
  cityName: string;
  v1Slug: string;
  shortDescription: string;
  cardImageUrl: string;
};

const CITIES: CityTarget[] = [
  {
    stateSlug: "new-south-wales",
    citySlug: "sydney",
    cityName: "Sydney",
    v1Slug: "sydney",
    shortDescription:
      "Australia's harbour city — climb the Bridge, walk the Opera House forecourt, surf at Bondi and explore world-class museums, markets and dining.",
    cardImageUrl:
      "https://australiatripplanner.com.au/uploads/NSW_Sydney%20Opera%20House%20from%20The%20Rocks_FINAL_Tourism%20Australia-1619147758-1630736009.jpg",
  },
  {
    stateSlug: "new-south-wales",
    citySlug: "blue-mountains",
    cityName: "Blue Mountains",
    v1Slug: "blue-mountains",
    shortDescription:
      "Ancient sandstone escarpments, eucalyptus forests and the iconic Three Sisters — a UNESCO World Heritage area just 90 minutes from Sydney.",
    cardImageUrl:
      "https://australiatripplanner.com.au/uploads/Blue%20Mountains_Jenolan%20Caves_person%20in%20cave-1612226089_FINAL-1629167372.jpeg",
  },
  {
    stateSlug: "new-south-wales",
    citySlug: "hunter-valley",
    cityName: "Hunter Valley",
    v1Slug: "hunter-valley",
    shortDescription:
      "Australia's oldest wine region — cellar doors, gourmet food trails and hot-air balloon rides over rolling vineyards.",
    cardImageUrl:
      "https://australiatripplanner.com.au/uploads/NSW_North%20Coast_Port%20Stephens_Tourism%20Australia-1619155257.jpeg",
  },
  {
    stateSlug: "new-south-wales",
    citySlug: "illawarra-wollongong-kiama",
    cityName: "Illawarra, Wollongong & Kiama",
    v1Slug: "illawarra-wollongong-and-kiama",
    shortDescription:
      "Coastal cliffs, the Sea Cliff Bridge, blowholes at Kiama and surf beaches south of Sydney.",
    cardImageUrl:
      "https://australiatripplanner.com.au/uploads/NSW_South%20Coast_Pebbly%20Beach_Myka%20Photography-1619154021.jpeg",
  },
  {
    stateSlug: "new-south-wales",
    citySlug: "south-coast-shoalhaven",
    cityName: "South Coast & Shoalhaven",
    v1Slug: "south-coast-and-shoalhaven",
    shortDescription:
      "Pristine beaches, whale watching at Jervis Bay and charming coastal towns between Sydney and the Victorian border.",
    cardImageUrl:
      "https://australiatripplanner.com.au/uploads/NSW_South%20Coast_Shoalhaven_Seven%20Mile%20Beach_Destination%20NSW-1619154743.jpeg",
  },
  {
    stateSlug: "new-south-wales",
    citySlug: "coffs-harbour",
    cityName: "Coffs Harbour & NSW mid north coast",
    v1Slug: "coffs-harbour-and-nsw-mid-north-coast",
    shortDescription:
      "The Big Banana, marine parks, hinterland waterfalls and family-friendly beaches on the mid north coast.",
    cardImageUrl:
      "https://australiatripplanner.com.au/uploads/NSW_Coffs%20Harbour_Big%20Banana_Virgin%20Australia-1619148773.jpeg",
  },
  {
    stateSlug: "new-south-wales",
    citySlug: "byron-bay",
    cityName: "Tweed, Byron & NSW Far North Coast",
    v1Slug: "tweed-byron-and-nsw-far-north-coast",
    shortDescription:
      "Laid-back surf culture, rainforest hinterland, farmers markets and the lighthouse at Australia's easternmost point.",
    cardImageUrl:
      "https://australiatripplanner.com.au/uploads/NSW_Byron%20Bay_woman%20relaxing-1619148445.jpeg",
  },
  {
    stateSlug: "new-south-wales",
    citySlug: "regional-outback-nsw",
    cityName: "Regional & outback NSW",
    v1Slug: "regional-and-outback-nsw",
    shortDescription:
      "Broken Hill's art scene, Mungo National Park, the Snowy Mountains and the wide-open outback beyond the Great Dividing Range.",
    cardImageUrl:
      "https://australiatripplanner.com.au/uploads/NSW_Parkes%20Elvis%20Festival_Tourism%20Australia-1619149166.jpeg",
  },
  {
    stateSlug: "victoria",
    citySlug: "melbourne",
    cityName: "Melbourne",
    v1Slug: "melbourne",
    shortDescription:
      "Coffee capital of Australia — laneways, street art, sport and a thriving food scene in the world's most liveable city.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1514391191-47b7252e8c3b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "victoria",
    citySlug: "great-ocean-road",
    cityName: "Great Ocean Road",
    v1Slug: "great-ocean-road",
    shortDescription:
      "One of the world's great coastal drives — surf beaches, rainforest walks and the limestone stacks of the Twelve Apostles.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "queensland",
    citySlug: "gold-coast",
    cityName: "Gold Coast",
    v1Slug: "gold-coast",
    shortDescription:
      "Surf, sand and theme parks — from Surfers Paradise to the hinterland's rainforests and waterfalls.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "queensland",
    citySlug: "brisbane",
    cityName: "Brisbane",
    v1Slug: "brisbane",
    shortDescription:
      "Subtropical river city with South Bank parklands, the Gallery of Modern Art and easy access to Moreton Bay.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "queensland",
    citySlug: "sunshine-coast",
    cityName: "Sunshine Coast",
    v1Slug: "sunshine-coast",
    shortDescription:
      "Noosa Heads, Mooloolaba and the Glass House Mountains — relaxed coastal living north of Brisbane.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "queensland",
    citySlug: "cairns-port-douglas",
    cityName: "Cairns & Port Douglas",
    v1Slug: "cairns-and-port-douglas",
    shortDescription:
      "Gateway to the Great Barrier Reef and Daintree Rainforest — tropical north at its best.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "queensland",
    citySlug: "great-barrier-reef-whitsundays",
    cityName: "Great Barrier Reef & Whitsundays",
    v1Slug: "great-barrier-reef-and-whitsundays",
    shortDescription:
      "Snorkel coral gardens, sail Whitehaven Beach and island-hop through the Whitsunday archipelago.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "south-australia",
    citySlug: "adelaide",
    cityName: "Adelaide",
    v1Slug: "adelaide",
    shortDescription:
      "Festival city surrounded by parklands — Central Market, beach suburbs and gateway to wine country.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "south-australia",
    citySlug: "adelaide-hills",
    cityName: "Adelaide Hills",
    v1Slug: "adelaide-hills",
    shortDescription:
      "Cool-climate wineries, Hahndorf's German heritage and scenic drives through rolling hills.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "south-australia",
    citySlug: "barossa-valley",
    cityName: "Barossa Valley",
    v1Slug: "barossa-valley",
    shortDescription:
      "Shiraz country — historic cellar doors, farm gates and some of Australia's finest restaurants.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "western-australia",
    citySlug: "perth",
    cityName: "Perth",
    v1Slug: "perth",
    shortDescription:
      "Sunniest capital in Australia — Kings Park views, Fremantle markets and Rottnest Island day trips.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    stateSlug: "tasmania",
    citySlug: "hobart",
    cityName: "Hobart",
    v1Slug: "hobart",
    shortDescription:
      "Salamanca Market, MONA and Mount Wellington — a compact harbour city with serious food credentials.",
    cardImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  },
];

function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "...")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(html: string): string {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isJunk(text: string): boolean {
  return /stop dreaming|choose your inspiration|subscribe|newsletter|leisure traveler|lorem ipsum|^australia$|great travel news|enter your email|create your itinerary|sign in|register|follow us|copyright/i.test(
    text
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

type SanityBlock = Record<string, unknown>;

function key(prefix: string, i: number): string {
  return `${prefix}-${i}`;
}

function extractBlocks(html: string): {
  pageTitle: string;
  intro: string;
  heroImageUrl: string;
  heroCaption?: string;
  content: SanityBlock[];
} {
  const titleMatch =
    html.match(/<h1[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>[\s\S]*?<\/h1>/i) ||
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const pageTitle = titleMatch
    ? stripTags(titleMatch[1])
    : "Destination guide";

  // Prefer left destination panel content
  let body =
    html.match(
      /destination-left-site[\s\S]*?(?=<div class="destination-right-site"|Choose your inspiration|Choose Your Destination|$)/i
    )?.[0] || html;

  // Drop footer-ish tails
  body = body.replace(/Choose your inspiration[\s\S]*$/i, "");
  body = body.replace(/Subscribe[\s\S]*To Our Newsletter[\s\S]*$/i, "");

  let heroImageUrl = "";
  let heroCaption: string | undefined;
  const firstImg = body.match(
    /<div class="destiImgFull">\s*<img[^>]+src="([^"]+)"[^>]*(?:alt="([^"]*)")?/i
  );
  if (firstImg) {
    heroImageUrl = firstImg[1].replace(/&amp;/g, "&");
  }
  const firstEm = body.match(/<em>([\s\S]*?)<\/em>/i);
  if (firstEm) heroCaption = stripTags(firstEm[1]).replace(/\n/g, " ");

  const content: SanityBlock[] = [];
  let intro = "";
  let blockIndex = 0;
  let sawFirstImage = false;
  let pendingCaption: string | undefined;

  // Tokenize major chunks: headings, images, lists, paragraphs
  const tokenRe =
    /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>|<div class="destiImgFull">\s*<img([^>]+)>|<(ul|ol)[^>]*>([\s\S]*?)<\/\4>|<p[^>]*>([\s\S]*?)<\/p>/gi;

  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(body))) {
    if (m[1]) {
      // heading
      const levelTag = m[1].toLowerCase();
      const text = stripTags(m[2]);
      if (!text || isJunk(text) || /^visit /i.test(text) && levelTag === "h1") continue;
      if (levelTag === "h1") continue;
      const level = levelTag === "h3" || levelTag === "h4" || levelTag === "h5" || levelTag === "h6" ? "h3" : "h2";
      content.push({
        _type: "guideHeading",
        _key: key("h", blockIndex++),
        text,
        level,
        anchorId: { _type: "slug", current: slugify(text) },
      });
      continue;
    }

    if (m[3]) {
      const attrs = m[3];
      const src = (attrs.match(/src="([^"]+)"/i)?.[1] || "").replace(/&amp;/g, "&");
      const alt = stripTags(attrs.match(/alt="([^"]*)"/i)?.[1] || "");
      if (!src) continue;
      if (!sawFirstImage) {
        sawFirstImage = true;
        if (!heroImageUrl) heroImageUrl = src;
        continue; // hero already captured
      }
      content.push({
        _type: "guideImage",
        _key: key("img", blockIndex++),
        externalUrl: src,
        caption: pendingCaption,
        image: undefined,
      });
      // Store alt via a fake field on next pass - schema uses image.alt; for URL-only we only have caption
      if (alt && !pendingCaption) {
        (content[content.length - 1] as { caption?: string }).caption =
          pendingCaption;
      }
      pendingCaption = undefined;
      continue;
    }

    if (m[4] && m[5]) {
      const items = [...m[5].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((li, itemIndex) => {
          const text = stripTags(li[1]);
          if (!text || isJunk(text)) return null;
          return {
            _type: "guideListItem",
            _key: key(`li-${blockIndex}`, itemIndex),
            text,
          };
        })
        .filter(Boolean);
      if (items.length) {
        content.push({
          _type: "guideList",
          _key: key("list", blockIndex++),
          items,
        });
      }
      continue;
    }

    if (m[6]) {
      const text = stripTags(m[6]);
      if (!text || isJunk(text) || /^read more$/i.test(text)) continue;
      if (/Photo:/i.test(text) && text.length < 200) {
        // caption for previous or next image
        const last = content[content.length - 1];
        if (last?._type === "guideImage" && !(last as { caption?: string }).caption) {
          (last as { caption?: string }).caption = text.replace(/\n/g, " ");
        } else if (!heroCaption && !sawFirstImage) {
          heroCaption = text.replace(/\n/g, " ");
        } else {
          pendingCaption = text.replace(/\n/g, " ");
        }
        continue;
      }
      if (!intro && text.length > 40) {
        intro = text;
        continue;
      }
      content.push({
        _type: "guideParagraph",
        _key: key("p", blockIndex++),
        text,
      });
    }
  }

  // Filter empty / junk
  const cleaned = content.filter((b) => {
    if (b._type === "guideParagraph") return !isJunk(String(b.text || ""));
    if (b._type === "guideHeading") return !isJunk(String(b.text || ""));
    if (b._type === "guideImage") return Boolean(b.externalUrl);
    return true;
  });

  return {
    pageTitle,
    intro: intro || "",
    heroImageUrl,
    heroCaption,
    content: cleaned,
  };
}

async function buildDoc(city: CityTarget) {
  const url = `https://australiatripplanner.com.au/destination/${city.v1Slug}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const html = await res.text();
  if (
    /Leisure\s+Traveler/i.test(html) &&
    !/<div class="destination-left-site"/i.test(html)
  ) {
    throw new Error(`Got homepage for ${city.v1Slug}`);
  }

  const extracted = extractBlocks(html);
  return {
    _type: "cityGuide",
    _id: `cityGuide-${city.stateSlug}-${city.citySlug}`,
    title: `${city.cityName}`,
    cityName: city.cityName,
    stateSlug: city.stateSlug,
    citySlug: city.citySlug,
    shortDescription: city.shortDescription,
    cardImageUrl: city.cardImageUrl || extracted.heroImageUrl,
    metaTitle: `${extracted.pageTitle} | Australia Trip Planner`,
    metaDescription: extracted.intro || city.shortDescription,
    pageTitle: extracted.pageTitle,
    heroImageUrl: extracted.heroImageUrl || city.cardImageUrl,
    heroCaption: extracted.heroCaption,
    intro: extracted.intro || city.shortDescription,
    content:
      extracted.content.length > 0
        ? extracted.content
        : [
            {
              _type: "guideParagraph",
              _key: "fallback",
              text: city.shortDescription,
            },
          ],
  };
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const lines: string[] = [];

  for (const city of CITIES) {
    try {
      const doc = await buildDoc(city);
      lines.push(JSON.stringify(doc));
      console.log(
        "OK",
        city.citySlug,
        "blocks",
        Array.isArray(doc.content) ? doc.content.length : 0,
        "title",
        doc.pageTitle
      );
    } catch (e) {
      console.error("FAIL", city.citySlug, (e as Error).message);
    }
  }

  const outPath = path.join(outDir, "city-guides-ported.ndjson");
  fs.writeFileSync(outPath, `${lines.join("\n")}\n`);
  console.log(`Wrote ${lines.length} docs → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
