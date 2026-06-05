"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users } from "lucide-react";
import type { Tour } from "@/lib/types";
import { formatPrice } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";

export default function BookingForm({
  tour,
  userEmail,
  userName,
}: {
  tour: Tour;
  userEmail?: string | null;
  userName?: string | null;
}) {
  const router = useRouter();
  const [bookingDate, setBookingDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = tour.price_aud * guests;
  const commission = total * tour.commission_rate;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  const minDateStr = minDate.toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/login?next=/tours/${tour.slug}`);
      return;
    }

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tour_id: tour.id,
        booking_date: bookingDate,
        guests,
        notes: notes || null,
        traveller_name: userName || user.user_metadata?.full_name || null,
        traveller_email: userEmail || user.email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Booking failed");
      setLoading(false);
      return;
    }

    router.push("/bookings?booked=1");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink-200 bg-white p-6 shadow-lg shadow-ink-900/5"
    >
      <h3 className="text-lg font-semibold text-ink-900">Book this tour</h3>
      <p className="mt-1 text-sm text-ink-500">
        Direct booking with {tour.operator_name}. No payment taken here — confirmation sent by email.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="date" className="flex items-center gap-1.5 text-sm font-medium text-ink-700 mb-1">
            <CalendarDays className="w-4 h-4" />
            Tour date
          </label>
          <input
            id="date"
            type="date"
            required
            min={minDateStr}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
          />
        </div>

        <div>
          <label htmlFor="guests" className="flex items-center gap-1.5 text-sm font-medium text-ink-700 mb-1">
            <Users className="w-4 h-4" />
            Guests
          </label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
          >
            {Array.from({ length: Math.min(tour.max_guests, 10) }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-ink-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Dietary requirements, pickup questions…"
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none"
          />
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-ink-100 space-y-2 text-sm">
        <div className="flex justify-between text-ink-600">
          <span>
            {formatPrice(tour.price_aud)} × {guests} guests
          </span>
          <span className="font-medium text-ink-900">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-ink-400 text-xs">
          <span>Platform fee (15% — paid by operator)</span>
          <span>{formatPrice(commission)}</span>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 btn-primary w-full !bg-brand-600 hover:!bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Confirming…" : `Confirm booking — ${formatPrice(total)}`}
      </button>

      {!userEmail && (
        <p className="mt-3 text-xs text-center text-ink-500">
          You&apos;ll need to{" "}
          <a href={`/login?next=/tours/${tour.slug}`} className="text-brand-600 font-medium hover:underline">
            log in
          </a>{" "}
          to complete your booking.
        </p>
      )}
    </form>
  );
}
