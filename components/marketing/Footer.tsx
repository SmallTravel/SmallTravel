import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="container-narrow px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-brand-600 flex items-center justify-center text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white">Australia Trip Planner</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed max-w-md">
              Australia&apos;s fair marketplace for local tour operators. Book authentic
              experiences direct — operators pay just 15% on confirmed bookings, not 30%.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Travellers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tours" className="hover:text-white transition">Browse tours</Link></li>
              <li><Link href="/bookings" className="hover:text-white transition">My bookings</Link></li>
              <li><Link href="/signup" className="hover:text-white transition">Create account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/destinations/new-south-wales/sydney" className="hover:text-white transition">Sydney</Link></li>
              <li><Link href="/destinations/new-south-wales" className="hover:text-white transition">New South Wales</Link></li>
              <li><Link href="/destinations/queensland" className="hover:text-white transition">Queensland</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition">All destinations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Operators</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#operators" className="hover:text-white transition">List your tour</a></li>
              <li><a href="/#operators" className="hover:text-white transition">Commission model</a></li>
              <li><a href="#" className="hover:text-white transition">Partner enquiry</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ink-700 flex flex-col sm:flex-row gap-4 justify-between text-xs text-ink-500">
          <p>© {new Date().getFullYear()} Australia Trip Planner. Australian tour marketplace.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-ink-300">Privacy</a>
            <a href="#" className="hover:text-ink-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
