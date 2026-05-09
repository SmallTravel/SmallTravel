// Mock travel "providers". Deterministic-ish results so the demo feels real
// without a database or external API.

const AIRLINES = [
  "SkyJet",
  "Aerolinea",
  "BlueWing",
  "Polaris Air",
  "Nimbus",
  "Atlas Express",
];

const HOTEL_BRANDS = [
  "The Lumen",
  "Casa Verde",
  "Hotel Aurora",
  "The Wayfarer",
  "Maison Bleu",
  "Riverstone Inn",
];

const ACTIVITY_TEMPLATES = (city: string) => [
  { title: `Old Town walking tour in ${city}`, category: "Culture", durationHours: 3 },
  { title: `Sunset food crawl: ${city}'s best bites`, category: "Food", durationHours: 3 },
  { title: `${city} highlights e-bike tour`, category: "Outdoor", durationHours: 4 },
  { title: `Museum & galleries pass — ${city}`, category: "Culture", durationHours: 6 },
  { title: `Day trip from ${city}: nature & viewpoints`, category: "Outdoor", durationHours: 8 },
  { title: `Cooking class: local cuisine of ${city}`, category: "Food", durationHours: 3 },
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: string, idx: number): T {
  return arr[(hash(seed) + idx) % arr.length];
}

function priceFor(seed: string, base: number, spread: number): number {
  return base + (hash(seed) % spread);
}

export type Flight = {
  id: string;
  airline: string;
  from: string;
  to: string;
  date: string;
  departTime: string;
  arriveTime: string;
  durationHours: number;
  stops: number;
  priceUSD: number;
};

export function searchFlights(args: {
  from: string;
  to: string;
  date: string;
}): Flight[] {
  const seed = `${args.from}|${args.to}|${args.date}`;
  const times = ["06:30", "09:15", "13:40", "18:05", "21:50"];
  return Array.from({ length: 4 }).map((_, i) => {
    const dep = times[(hash(seed) + i) % times.length];
    const dur = 2 + ((hash(seed + i) % 9) + 1);
    const arrH = (parseInt(dep.slice(0, 2)) + dur) % 24;
    const arr = `${arrH.toString().padStart(2, "0")}:${dep.slice(3)}`;
    return {
      id: `FL-${hash(seed + i).toString(36).slice(0, 6).toUpperCase()}`,
      airline: pick(AIRLINES, seed, i),
      from: args.from,
      to: args.to,
      date: args.date,
      departTime: dep,
      arriveTime: arr,
      durationHours: dur,
      stops: i % 3 === 0 ? 0 : 1,
      priceUSD: priceFor(seed + i, 180, 620),
    };
  });
}

export type Hotel = {
  id: string;
  name: string;
  city: string;
  checkIn: string;
  checkOut: string;
  pricePerNightUSD: number;
  rating: number;
  neighborhood: string;
  amenities: string[];
};

const NEIGHBORHOODS = [
  "Old Town",
  "Riverside",
  "Arts District",
  "Harbor",
  "Garden Quarter",
  "Downtown",
];

const AMENITIES = [
  ["Free Wi-Fi", "Breakfast", "Rooftop bar"],
  ["Pool", "Spa", "Gym"],
  ["Pet friendly", "Free Wi-Fi", "Bar"],
  ["Family rooms", "Free parking", "Breakfast"],
  ["Boutique", "Concierge", "Free Wi-Fi"],
];

export function searchHotels(args: {
  city: string;
  checkIn: string;
  checkOut: string;
}): Hotel[] {
  const seed = `${args.city}|${args.checkIn}|${args.checkOut}`;
  return Array.from({ length: 4 }).map((_, i) => ({
    id: `HT-${hash(seed + i).toString(36).slice(0, 6).toUpperCase()}`,
    name: `${pick(HOTEL_BRANDS, seed, i)} ${args.city}`,
    city: args.city,
    checkIn: args.checkIn,
    checkOut: args.checkOut,
    pricePerNightUSD: priceFor(seed + i, 95, 320),
    rating: 3.6 + ((hash(seed + i) % 15) / 10),
    neighborhood: pick(NEIGHBORHOODS, seed, i),
    amenities: AMENITIES[(hash(seed + i)) % AMENITIES.length],
  }));
}

export type Activity = {
  id: string;
  title: string;
  city: string;
  category: string;
  durationHours: number;
  priceUSD: number;
};

export function searchActivities(args: { city: string }): Activity[] {
  const seed = `act|${args.city}`;
  const templates = ACTIVITY_TEMPLATES(args.city);
  return templates.map((t, i) => ({
    id: `AC-${hash(seed + i).toString(36).slice(0, 6).toUpperCase()}`,
    title: t.title,
    city: args.city,
    category: t.category,
    durationHours: t.durationHours,
    priceUSD: priceFor(seed + i, 25, 140),
  }));
}
