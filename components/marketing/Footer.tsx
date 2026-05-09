import { MapPin, Twitter, Linkedin, Youtube, Instagram, Facebook } from "lucide-react";

const COLS: { title: string; links: string[] }[] = [
  {
    title: "Destinations",
    links: [
      "Sydney & NSW",
      "Great Barrier Reef",
      "Uluru & the Red Centre",
      "Melbourne & VIC",
      "Tasmania",
      "Western Australia",
    ],
  },
  {
    title: "Experiences",
    links: [
      "Reef snorkelling",
      "Outback safaris",
      "Wine & food trails",
      "Coastal road trips",
      "Indigenous tours",
      "Wildlife encounters",
    ],
  },
  {
    title: "Plan",
    links: [
      "AI trip planner",
      "Sample itineraries",
      "Travel tips",
      "When to visit",
      "Budget calculator",
      "Travel insurance",
    ],
  },
  {
    title: "Company",
    links: ["About us", "Travel writers", "Press", "Partners", "Careers", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300 mt-0">
      <div className="container-narrow px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white">
                <MapPin className="w-4 h-4" strokeWidth={2.4} />
              </div>
              <span className="font-semibold tracking-tight text-white">
                Australia Trip Planner
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-400 max-w-xs">
              AI-powered trip planning for Australia. Build a personalised
              itinerary across every state and territory, then book it all in
              one place.
            </p>
            <form className="mt-6 flex max-w-sm">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded-l-full bg-ink-800 border border-ink-700 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:outline-none focus:border-brand-400"
              />
              <button
                type="button"
                className="rounded-r-full bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-sm font-medium text-white"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-ink-500">
              Monthly product updates and operator playbooks. No spam.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-white text-sm font-semibold mb-3">{c.title}</h4>
              <ul className="space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-ink-400 hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-ink-800 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="text-xs text-ink-500">
            © {new Date().getFullYear()} Australia Trip Planner (POC demo).
            Not a real company.
          </div>
          <div className="md:ml-auto flex items-center gap-3 text-ink-400">
            <a href="#" aria-label="Twitter"><Twitter className="w-4 h-4 hover:text-white" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="w-4 h-4 hover:text-white" /></a>
            <a href="#" aria-label="YouTube"><Youtube className="w-4 h-4 hover:text-white" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="w-4 h-4 hover:text-white" /></a>
            <a href="#" aria-label="Facebook"><Facebook className="w-4 h-4 hover:text-white" /></a>
          </div>
          <div className="text-xs text-ink-500 flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
