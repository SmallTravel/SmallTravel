"use client";

import { Plane, Hotel, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import type { Flight, Hotel as HotelT, Activity } from "@/lib/mock-travel";

type Status = "running" | "done";

function Shell({
  icon,
  title,
  status,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  status: Status;
  children?: React.ReactNode;
}) {
  return (
    <div className="my-2 rounded-2xl border border-ink-200 bg-white/70 backdrop-blur shadow-sm overflow-hidden animate-slide-up">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink-100 bg-ink-50/60">
        <div className="text-indigo-600">{icon}</div>
        <div className="text-sm font-medium text-ink-800">{title}</div>
        <div className="ml-auto">
          {status === "running" ? (
            <Loader2 className="w-4 h-4 text-ink-400 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          )}
        </div>
      </div>
      {children ? <div className="px-4 py-3">{children}</div> : null}
    </div>
  );
}

export function FlightToolCard({
  args,
  result,
  status,
}: {
  args: { from?: string; to?: string; date?: string };
  result?: { flights: Flight[] };
  status: Status;
}) {
  return (
    <Shell
      icon={<Plane className="w-4 h-4" />}
      title={
        args.from && args.to
          ? `Flights · ${args.from} → ${args.to}${args.date ? ` · ${args.date}` : ""}`
          : "Searching flights…"
      }
      status={status}
    >
      {result?.flights && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {result.flights.slice(0, 4).map((f) => (
            <li
              key={f.id}
              className="rounded-xl border border-ink-100 px-3 py-2 text-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{f.airline}</span>
                <span className="font-semibold text-ink-900">
                  ${f.priceUSD}
                </span>
              </div>
              <div className="text-ink-600 text-xs mt-0.5">
                {f.departTime} → {f.arriveTime} · {f.durationHours}h ·{" "}
                {f.stops === 0 ? "Nonstop" : `${f.stops} stop`}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

export function HotelToolCard({
  args,
  result,
  status,
}: {
  args: { city?: string; checkIn?: string; checkOut?: string };
  result?: { hotels: HotelT[] };
  status: Status;
}) {
  return (
    <Shell
      icon={<Hotel className="w-4 h-4" />}
      title={
        args.city
          ? `Hotels · ${args.city}${
              args.checkIn ? ` · ${args.checkIn} → ${args.checkOut}` : ""
            }`
          : "Searching hotels…"
      }
      status={status}
    >
      {result?.hotels && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {result.hotels.slice(0, 4).map((h) => (
            <li
              key={h.id}
              className="rounded-xl border border-ink-100 px-3 py-2 text-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{h.name}</span>
                <span className="font-semibold text-ink-900">
                  ${h.pricePerNightUSD}/night
                </span>
              </div>
              <div className="text-ink-600 text-xs mt-0.5">
                {h.neighborhood} · {h.rating.toFixed(1)}★ ·{" "}
                {h.amenities.slice(0, 2).join(", ")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

export function ActivityToolCard({
  args,
  result,
  status,
}: {
  args: { city?: string };
  result?: { activities: Activity[] };
  status: Status;
}) {
  return (
    <Shell
      icon={<MapPin className="w-4 h-4" />}
      title={args.city ? `Things to do · ${args.city}` : "Finding activities…"}
      status={status}
    >
      {result?.activities && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {result.activities.slice(0, 6).map((a) => (
            <li
              key={a.id}
              className="rounded-xl border border-ink-100 px-3 py-2 text-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{a.title}</span>
                <span className="font-semibold text-ink-900">${a.priceUSD}</span>
              </div>
              <div className="text-ink-600 text-xs mt-0.5">
                {a.category} · ~{a.durationHours}h
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

export function FinalizeToolCard({ status }: { status: Status }) {
  return (
    <Shell
      icon={<CheckCircle2 className="w-4 h-4" />}
      title="Saving your itinerary"
      status={status}
    />
  );
}
