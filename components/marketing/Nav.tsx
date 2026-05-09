"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X, MapPin } from "lucide-react";

const NAV = [
  {
    label: "Destinations",
    items: [
      "Sydney & New South Wales",
      "Great Barrier Reef & QLD",
      "Uluru & the Red Centre",
      "Melbourne & Victoria",
      "Tasmania",
      "Western Australia",
    ],
  },
  {
    label: "Experiences",
    items: [
      "Reef snorkelling & diving",
      "Outback safaris",
      "Wine & food trails",
      "Coastal road trips",
      "Indigenous cultural tours",
      "Wildlife encounters",
    ],
  },
  {
    label: "Itineraries",
    items: [
      "7 days · East Coast classic",
      "10 days · Sydney to Cairns",
      "14 days · Grand tour",
      "Family-friendly Australia",
      "Honeymoon in Tasmania",
      "Solo backpacker route",
    ],
  },
];

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-ink-100">
      <div className="container-narrow flex items-center h-16 px-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
            <MapPin className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <span className="font-semibold tracking-tight text-ink-900">
            Australia Trip Planner
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {NAV.map((g) => (
            <div
              key={g.label}
              className="relative"
              onMouseEnter={() => setOpen(g.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <button className="px-3 py-2 rounded-lg text-ink-700 hover:text-ink-900 hover:bg-ink-50 inline-flex items-center gap-1">
                {g.label}
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              {open === g.label && (
                <div className="absolute left-0 top-full pt-2 w-60">
                  <div className="rounded-xl border border-ink-100 bg-white shadow-xl p-2">
                    {g.items.map((it) => (
                      <a
                        key={it}
                        href="#"
                        className="block rounded-lg px-3 py-2 text-ink-700 hover:bg-brand-50 hover:text-brand-700 text-sm"
                      >
                        {it}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a href="#pricing" className="px-3 py-2 rounded-lg text-ink-700 hover:text-ink-900 hover:bg-ink-50">
            Pricing
          </a>
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-3">
          <a href="#" className="btn-ghost">Log in</a>
        </div>

        <button
          onClick={() => setMobile(!mobile)}
          className="ml-auto md:hidden p-2 rounded-lg hover:bg-ink-100"
          aria-label="Open menu"
        >
          {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobile && (
        <div className="md:hidden border-t border-ink-100 bg-white px-6 py-4 space-y-1">
          {NAV.map((g) => (
            <div key={g.label} className="py-1">
              <div className="text-xs uppercase tracking-wider text-ink-500 px-2 mt-2 mb-1">
                {g.label}
              </div>
              {g.items.map((it) => (
                <a key={it} href="#" className="block px-2 py-2 text-ink-700 rounded-lg hover:bg-ink-50">
                  {it}
                </a>
              ))}
            </div>
          ))}
          <div className="pt-3 flex gap-2">
            <a href="#" className="btn-secondary flex-1 !py-2">Log in</a>
          </div>
        </div>
      )}
    </header>
  );
}
