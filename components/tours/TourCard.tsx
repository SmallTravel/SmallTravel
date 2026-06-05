import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import type { Tour } from "@/lib/types";
import { formatPrice } from "@/lib/config";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col rounded-2xl border border-ink-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-200 transition"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tour.image_url}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {tour.featured && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/95 text-brand-700 border border-brand-100">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1 text-xs text-ink-500 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          {tour.destination}, {tour.state}
        </div>

        <h3 className="font-semibold text-ink-900 leading-snug group-hover:text-brand-700 transition">
          {tour.title}
        </h3>

        <p className="mt-2 text-sm text-ink-500 line-clamp-2 flex-1">
          {tour.description}
        </p>

        <div className="mt-3 text-xs text-ink-500">
          by <span className="font-medium text-ink-700">{tour.operator_name}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-ink-900">
              {formatPrice(tour.price_aud)}
            </div>
            <div className="flex items-center gap-1 text-xs text-ink-500">
              <Clock className="w-3 h-3" />
              {tour.duration}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-ink-600">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {tour.rating}
            <span className="text-ink-400">({tour.review_count})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
