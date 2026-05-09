import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import {
  searchFlights,
  searchHotels,
  searchActivities,
} from "@/lib/mock-travel";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are the Australia Trip Planner — a friendly, decisive AI
travel concierge that specialises in trips to and around Australia.

Your job is to help the user plan an Australian trip end-to-end: pick the
right regions, find flights, recommend stays, suggest experiences, and
assemble a clean day-by-day itinerary that actually flows.

Australia knowledge to apply:
- Cover all 8 states & territories: NSW, VIC, QLD, WA, SA, TAS, NT, ACT.
- Key destinations: Sydney, Blue Mountains, Hunter Valley, Byron Bay, Gold
  Coast, Brisbane, Cairns, Great Barrier Reef, Daintree, Whitsundays,
  Melbourne, Great Ocean Road, Phillip Island, Mornington Peninsula,
  Tasmania (Hobart, Cradle Mountain, Bay of Fires), Adelaide, Kangaroo
  Island, Barossa, Perth, Margaret River, Rottnest, Ningaloo, Broome,
  Uluru-Kata Tjuta, Kakadu, Kings Canyon, Darwin, Canberra.
- Practical defaults: long-haul travellers usually start in Sydney or
  Melbourne; allow 2-3 nights minimum in major cities; the Reef pairs with
  Cairns or the Whitsundays; the Red Centre needs domestic connections
  (Alice Springs / Ayers Rock airport).
- Seasons matter: Top End is best May-Oct (dry season); Tassie best
  Nov-Apr; the Reef is good year-round but stinger season is roughly
  Nov-May.

Guidelines:
- Be concise. Ask at most ONE clarifying question per turn, only when needed.
  Reasonable defaults: 2 travellers, mid-budget, Sydney as the entry point
  if international, dates ~8 weeks out, 10 nights if unspecified.
- Always use the provided tools to fetch flights, hotels and activities
  before recommending specific options. Never invent flight numbers, hotel
  names or prices.
- After tool calls, summarise the top 1-2 picks per category with a
  one-line reason. Don't dump raw lists.
- When the traveller is happy, call \`finalizeItinerary\` with a clean
  day-by-day plan and the chosen flight/hotel.
- Use friendly, vivid Australian-aware language. Tasteful emojis allowed
  (1-2 per message max).
- Today's date context: assume current year is ${new Date().getFullYear()}.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const result = streamText({
    model: openai(model),
    system: SYSTEM_PROMPT,
    messages,
    maxSteps: 8,
    tools: {
      searchFlights: tool({
        description:
          "Search for flights between two cities on a given date. Use IATA city or city names.",
        parameters: z.object({
          from: z.string().describe("Origin city, e.g. 'San Francisco'"),
          to: z.string().describe("Destination city, e.g. 'Lisbon'"),
          date: z
            .string()
            .describe("Departure date in YYYY-MM-DD format"),
        }),
        execute: async ({ from, to, date }) => {
          return { flights: searchFlights({ from, to, date }) };
        },
      }),
      searchHotels: tool({
        description: "Search hotels in a city for a check-in / check-out range.",
        parameters: z.object({
          city: z.string(),
          checkIn: z.string().describe("Check-in date YYYY-MM-DD"),
          checkOut: z.string().describe("Check-out date YYYY-MM-DD"),
        }),
        execute: async ({ city, checkIn, checkOut }) => {
          return { hotels: searchHotels({ city, checkIn, checkOut }) };
        },
      }),
      searchActivities: tool({
        description:
          "Get popular activities, tours and experiences for a destination city.",
        parameters: z.object({
          city: z.string(),
        }),
        execute: async ({ city }) => {
          return { activities: searchActivities({ city }) };
        },
      }),
      finalizeItinerary: tool({
        description:
          "Save the final trip plan once the user has confirmed. Render this in the side panel.",
        parameters: z.object({
          tripTitle: z.string().describe("Short catchy trip title"),
          destination: z.string(),
          startDate: z.string().describe("YYYY-MM-DD"),
          endDate: z.string().describe("YYYY-MM-DD"),
          travelers: z.number().int().min(1).default(1),
          flight: z
            .object({
              airline: z.string(),
              from: z.string(),
              to: z.string(),
              date: z.string(),
              priceUSD: z.number(),
            })
            .optional(),
          hotel: z
            .object({
              name: z.string(),
              neighborhood: z.string().optional(),
              pricePerNightUSD: z.number(),
              rating: z.number().optional(),
            })
            .optional(),
          days: z
            .array(
              z.object({
                date: z.string(),
                title: z.string(),
                items: z.array(z.string()),
              }),
            )
            .min(1),
          estimatedTotalUSD: z.number().optional(),
        }),
        execute: async (plan) => {
          return { ok: true, plan };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
