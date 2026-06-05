import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, MapPin, Star } from "lucide-react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import BookingForm from "@/components/tours/BookingForm";
import { isSupabaseConfigured } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/config";
import { getTourBySlug } from "@/lib/tours";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  let user = null;
  let profile: { full_name: string | null; email: string | null } | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    if (user) {
      profile = (
        await supabase
          .from("profiles")
          .select("full_name, email")
          .eq("id", user.id)
          .single()
      ).data;
    }
  }

  return (
    <main>
      <Nav />
      <section className="bg-white">
        <div className="container-narrow px-6 sm:px-10 lg:px-16 pt-8 pb-0">
          <Link href="/tours" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900">
            <ArrowLeft className="w-4 h-4" />
            All tours
          </Link>
        </div>

        <div className="container-narrow section-pad !pt-6">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-ink-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tour.image_url}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-ink-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {tour.destination}, {tour.state}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {tour.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {tour.rating} ({tour.review_count} reviews)
                </span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
                {tour.title}
              </h1>

              <p className="mt-2 text-ink-600">
                Operated by{" "}
                <span className="font-medium text-ink-900">{tour.operator_name}</span>
                {" · "}
                {tour.operator_location}
              </p>

              <p className="mt-6 text-ink-700 leading-relaxed">{tour.long_description}</p>

              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-ink-900 mb-3">Highlights</h3>
                  <ul className="space-y-2">
                    {tour.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-ink-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-ink-900 mb-3">Included</h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-ink-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-ink-50 border border-ink-100 px-5 py-4">
                <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
                  Meeting point
                </div>
                <p className="mt-1 text-sm text-ink-800">{tour.meeting_point}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <div className="mb-4 text-center lg:text-left">
                  <div className="text-3xl font-semibold text-ink-900">
                    {formatPrice(tour.price_aud)}
                  </div>
                  <div className="text-sm text-ink-500">per person</div>
                </div>
                <BookingForm
                  tour={tour}
                  userEmail={user?.email ?? profile?.email}
                  userName={profile?.full_name}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
