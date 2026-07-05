"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import type { CityNavData } from "@/lib/destinations-nav";
import type { State } from "@/lib/destinations";
import NavAuth from "./NavAuth";
import NavDestinations from "./NavDestinations";

const LINKS = [
  { label: "Browse tours", href: "/tours" },
  { label: "For operators", href: "/#operators" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function NavClient({
  destinationNav,
  states,
}: {
  destinationNav: CityNavData[];
  states: State[];
}) {
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-ink-100">
      <div className="container-narrow flex items-center h-16 px-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <MapPin className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <span className="font-semibold tracking-tight text-ink-900">Australia Trip Planner</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <NavDestinations destinationNav={destinationNav} states={states} />
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-ink-700 hover:text-ink-900 hover:bg-ink-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden md:flex">
          <NavAuth />
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
          <NavDestinations
            mobile
            destinationNav={destinationNav}
            states={states}
            onNavigate={() => setMobile(false)}
          />
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobile(false)}
              className="block px-2 py-2 text-ink-700 rounded-lg hover:bg-ink-50"
            >
              {link.label}
            </Link>
          ))}
          <NavAuth mobile />
        </div>
      )}
    </header>
  );
}
