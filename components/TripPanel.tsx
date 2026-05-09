"use client";

import { Plane, Hotel, Calendar, Sparkles, MapPin } from "lucide-react";

export type Itinerary = {
  tripTitle: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  flight?: {
    airline: string;
    from: string;
    to: string;
    date: string;
    priceUSD: number;
  };
  hotel?: {
    name: string;
    neighborhood?: string;
    pricePerNightUSD: number;
    rating?: number;
  };
  days: { date: string; title: string; items: string[] }[];
  estimatedTotalUSD?: number;
};

export function TripPanel({ itinerary }: { itinerary: Itinerary | null }) {
  if (!itinerary) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8 text-ink-500">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 mb-4">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-ink-800">
          Your Australia itinerary will appear here
        </h3>
        <p className="text-sm mt-1 max-w-xs">
          Tell us the trip you're dreaming about — we'll plan flights, stays
          and experiences across Australia, day by day.
        </p>
        <ul className="mt-6 space-y-1.5 text-xs text-ink-500">
          <li>Try: "10 days Sydney to Cairns, mid-budget"</li>
          <li>Try: "Family trip to the Reef in July"</li>
          <li>Try: "Outback loop: Uluru + Kakadu, 7 days"</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-6 py-6 animate-fade-in">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 text-white p-5 shadow-lg shadow-indigo-500/20">
        <div className="text-xs uppercase tracking-wider opacity-80">
          Trip plan
        </div>
        <h2 className="text-2xl font-semibold mt-1">{itinerary.tripTitle}</h2>
        <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
          <MapPin className="w-4 h-4" /> {itinerary.destination}
        </div>
        <div className="flex items-center gap-2 text-sm opacity-90 mt-0.5">
          <Calendar className="w-4 h-4" /> {itinerary.startDate} →{" "}
          {itinerary.endDate} · {itinerary.travelers}{" "}
          {itinerary.travelers === 1 ? "traveler" : "travelers"}
        </div>
        {typeof itinerary.estimatedTotalUSD === "number" && (
          <div className="mt-3 text-sm">
            <span className="opacity-75">Estimated total · </span>
            <span className="font-semibold">
              ${itinerary.estimatedTotalUSD.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {(itinerary.flight || itinerary.hotel) && (
        <div className="grid grid-cols-1 gap-3 mt-4">
          {itinerary.flight && (
            <div className="rounded-xl border border-ink-200 bg-white p-4">
              <div className="flex items-center gap-2 text-ink-500 text-xs">
                <Plane className="w-4 h-4" /> Flight
              </div>
              <div className="font-medium mt-1">
                {itinerary.flight.airline} · {itinerary.flight.from} →{" "}
                {itinerary.flight.to}
              </div>
              <div className="text-sm text-ink-600">
                {itinerary.flight.date} · ${itinerary.flight.priceUSD}
              </div>
            </div>
          )}
          {itinerary.hotel && (
            <div className="rounded-xl border border-ink-200 bg-white p-4">
              <div className="flex items-center gap-2 text-ink-500 text-xs">
                <Hotel className="w-4 h-4" /> Hotel
              </div>
              <div className="font-medium mt-1">{itinerary.hotel.name}</div>
              <div className="text-sm text-ink-600">
                {itinerary.hotel.neighborhood
                  ? `${itinerary.hotel.neighborhood} · `
                  : ""}
                ${itinerary.hotel.pricePerNightUSD}/night
                {typeof itinerary.hotel.rating === "number"
                  ? ` · ${itinerary.hotel.rating.toFixed(1)}★`
                  : ""}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-5">
        <div className="text-xs uppercase tracking-wider text-ink-500 mb-2">
          Day-by-day
        </div>
        <ol className="space-y-3">
          {itinerary.days.map((d, i) => (
            <li
              key={i}
              className="rounded-xl border border-ink-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  Day {i + 1} · {d.title}
                </div>
                <div className="text-xs text-ink-500">{d.date}</div>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                {d.items.map((it, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
