import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  Handshake,
  Megaphone,
  ShieldCheck,
  Users,
} from "lucide-react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import TourCard from "@/components/tours/TourCard";
import { getTours } from "@/lib/tours";

export default async function Home() {
  const tours = await getTours();
  const featured = tours.filter((t) => t.featured).slice(0, 6);

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/80 via-white to-amber-50/40" />
        <div className="container-narrow section-pad relative">
          <div className="max-w-3xl">
            <span className="eyebrow">Australian tour marketplace</span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink-900 leading-[1.05]">
              Book local tours.{" "}
              <span className="text-brand-600">Support local operators.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-600 max-w-2xl leading-relaxed">
              Australia Trip Planner connects travellers with independent Australian tour operators —
              the ones who can&apos;t afford 30% commissions on big platforms. Fair pricing
              for everyone: operators pay just 15% on confirmed bookings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tours" className="btn-primary !bg-brand-600 hover:!bg-brand-700">
                Browse tours
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#operators" className="btn-secondary">
                List your tour
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-ink-500">
              <span className="flex items-center gap-1.5">
                <BadgePercent className="w-4 h-4 text-brand-600" />
                15% commission only
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Pay on confirmed bookings
              </span>
              <span className="flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-amber-500" />
                Free promotion for operators
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="bg-ink-50 border-y border-ink-100">
        <div className="container-narrow section-pad">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="eyebrow">Featured tours</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900">
                Hand-picked from local operators
              </h2>
              <p className="mt-2 text-ink-600 max-w-xl">
                Reef trips, outback sunsets, wine country and more — every listing is run
                by an independent Australian business.
              </p>
            </div>
            <Link href="/tours" className="btn-ghost !text-brand-600 shrink-0">
              View all tours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white">
        <div className="container-narrow section-pad">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
              Simple for travellers. Fair for operators.
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse & book",
                body: "Find tours across every state. Create an account, pick a date, and confirm your booking in minutes.",
              },
              {
                step: "2",
                title: "Operator confirms",
                body: "Your booking goes direct to the local operator. They handle the experience — we just connect you.",
              },
              {
                step: "3",
                title: "Everyone wins",
                body: "You get an authentic trip at a fair price. The operator keeps more of their margin. We earn 15% on confirmed bookings only.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-semibold flex items-center justify-center text-sm">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For operators */}
      <section id="operators" className="bg-brand-600 text-white">
        <div className="container-narrow section-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-200">
                For tour operators
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                Can&apos;t afford 30%? List with us at 15%.
              </h2>
              <p className="mt-4 text-brand-100 leading-relaxed text-lg">
                Many brilliant local operators are locked out of big platforms because the
                commission is too high. Australia Trip Planner is built for you — free promotion on
                our website and social channels, and you only pay when a booking is confirmed.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: <Handshake className="w-5 h-5" />,
                  title: "Direct bookings",
                  body: "Travellers book your tours on Australia Trip Planner. You receive the booking details and run the experience.",
                },
                {
                  icon: <BadgePercent className="w-5 h-5" />,
                  title: "15% commission",
                  body: "Half what the big platforms charge. No listing fees, no monthly subscription.",
                },
                {
                  icon: <Megaphone className="w-5 h-5" />,
                  title: "Free promotion",
                  body: "Featured on our site and social media. Reach travellers looking for authentic local experiences.",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Win-win-win",
                  body: "Operators grow their business. Travellers discover hidden gems. We earn a fair cut on real bookings.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl bg-white/10 border border-white/15 px-5 py-4"
                >
                  <div className="text-brand-200 shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-1 text-sm text-brand-100">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="mailto:partners@australiatripplanner.com.au"
              className="inline-flex items-center gap-2 rounded-full bg-white text-brand-700 hover:bg-brand-50 font-medium px-6 py-3 text-sm transition"
            >
              Partner with us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white border-t border-ink-100">
        <div className="container-narrow section-pad">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "8 Australian states & territories",
              "Independent local operators",
              "15% commission — not 30%",
              "Confirmed bookings only",
            ].map((text) => (
              <div key={text} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-ink-700 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-50">
        <div className="container-narrow section-pad text-center">
          <h2 className="text-3xl font-semibold text-ink-900">
            Ready to explore Australia?
          </h2>
          <p className="mt-3 text-ink-600 max-w-lg mx-auto">
            Create a free account, browse tours from local operators, and book your next adventure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="btn-primary !bg-brand-600 hover:!bg-brand-700">
              Create free account
            </Link>
            <Link href="/tours" className="btn-secondary">
              Browse tours
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
