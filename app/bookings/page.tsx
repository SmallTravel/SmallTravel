import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/config";
import type { Booking, Tour } from "@/lib/types";

export const metadata = {
  title: "My bookings — Australia Trip Planner",
};

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ booked?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, tour:tours(*)")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const rows = (bookings ?? []) as (Booking & { tour: Tour })[];

  return (
    <main>
      <Nav />
      <section className="bg-white">
        <div className="container-narrow section-pad">
          <h1 className="text-3xl font-semibold text-ink-900">My bookings</h1>
          <p className="mt-2 text-ink-600">Your confirmed tour reservations.</p>

          {params.booked === "1" && (
            <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-100 px-5 py-4 text-sm text-emerald-800">
              Booking confirmed! The operator will be in touch with final details.
            </div>
          )}

          {rows.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-ink-50 px-6 py-16 text-center">
              <p className="text-ink-600">You haven&apos;t booked any tours yet.</p>
              <Link href="/tours" className="mt-4 inline-block btn-primary !bg-brand-600 hover:!bg-brand-700">
                Browse tours
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {rows.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-ink-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row gap-5"
                >
                  {b.tour?.image_url && (
                    <div className="sm:w-40 shrink-0 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-ink-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.tour.image_url}
                        alt={b.tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="font-semibold text-ink-900">
                          {b.tour?.title ?? "Tour"}
                        </h2>
                        <p className="text-sm text-ink-500 mt-0.5">
                          {b.tour?.operator_name}
                        </p>
                      </div>
                      <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {b.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-600">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(b.booking_date).toLocaleDateString("en-AU", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {b.guests} {b.guests === 1 ? "guest" : "guests"}
                      </span>
                      {b.tour && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {b.tour.destination}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 text-lg font-semibold text-ink-900">
                      {formatPrice(b.total_price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
