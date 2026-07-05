import Link from "next/link";
import type { City, State } from "@/lib/destinations";
import { getCityPath } from "@/lib/destinations";

export default function CityCard({ state, city }: { state: State; city: City }) {
  return (
    <Link
      href={getCityPath(state, city)}
      className="group flex flex-col rounded-2xl border border-ink-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-200 transition"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={city.imageUrl}
          alt={city.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-ink-900 group-hover:text-brand-700 transition">
          {city.name}
        </h3>
        <p className="mt-2 text-sm text-ink-500 line-clamp-2">{city.description}</p>
      </div>
    </Link>
  );
}
