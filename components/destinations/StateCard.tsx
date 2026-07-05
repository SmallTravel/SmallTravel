import Link from "next/link";
import type { State } from "@/lib/destinations";
import { getStatePath } from "@/lib/destinations";

export default function StateCard({ state }: { state: State }) {
  return (
    <Link
      href={getStatePath(state)}
      className="group flex flex-col rounded-2xl border border-ink-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-200 transition"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={state.imageUrl}
          alt={state.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-ink-900 group-hover:text-brand-700 transition">
          {state.name}
        </h3>
        <p className="mt-2 text-sm text-ink-500 line-clamp-2">{state.description}</p>
        {state.cities.length > 0 && (
          <p className="mt-3 text-xs text-ink-400">
            {state.cities.length} {state.cities.length === 1 ? "destination" : "destinations"}
          </p>
        )}
      </div>
    </Link>
  );
}
