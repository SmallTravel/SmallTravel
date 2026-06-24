import { writeFileSync } from "fs";
import { MOCK_TOURS } from "../lib/tours-mock.ts";

const lines = MOCK_TOURS.map((t) =>
  JSON.stringify({
    _type: "tour",
    _id: t.id,
    title: t.title,
    slug: { _type: "slug", current: t.slug },
    featured: t.featured,
    description: t.description,
    longDescription: t.long_description,
    destination: t.destination,
    state: t.state,
    duration: t.duration,
    priceAud: t.price_aud,
    commissionRate: t.commission_rate,
    maxGuests: t.max_guests,
    highlights: t.highlights,
    includes: t.includes,
    meetingPoint: t.meeting_point,
    rating: t.rating,
    reviewCount: t.review_count,
    operatorName: t.operator_name,
    operatorLocation: t.operator_location,
  })
);

writeFileSync("sanity/seed/tours.ndjson", `${lines.join("\n")}\n`);
console.log(`Wrote ${lines.length} tours to sanity/seed/tours.ndjson`);
