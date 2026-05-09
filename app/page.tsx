import Link from "next/link";
import {
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles,
  Map,
  Compass,
  CalendarDays,
  Heart,
  ShieldCheck,
  Wallet,
  Headphones,
  Quote,
  PlayCircle,
  Plane,
  Hotel,
  MapPin,
} from "lucide-react";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustStrip />
      <FeatureSplit
        eyebrow="AI itinerary builder"
        title="Tell us your vibe. Get a trip in 30 seconds."
        body="Drop in a few words — “10 days, foodie, mid-budget, love a coastal drive” — and our AI plans every day, hour and ferry. Tweak anything with a follow-up message; the plan updates instantly."
        bullets={[
          "Personalised day-by-day, optimised for travel time",
          "Fits your budget, pace and travel style",
          "Swap or skip anything with one message",
          "Built on real local knowledge, not stock lists",
        ]}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Sydney Opera House at sunset"
        cta={{ label: "Try the AI planner", href: "/agent" }}
      />
      <FeatureSplit
        reverse
        eyebrow="Curated experiences"
        title="Every state, hand-picked."
        body="From Reef pontoons in Cairns to wombat-spotting in Tasmania, our editors have walked, sailed, snorkelled and four-wheel-driven every experience we list. No filler, no tourist traps."
        bullets={[
          "1,200+ vetted operators across all 8 states & territories",
          "Indigenous-led tours and small-group favourites",
          "Honest editor notes — what's worth it, what's not",
          "Bookmark, compare and add to your itinerary in a click",
        ]}
        image="https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Twelve Apostles, Great Ocean Road"
        cta={{ label: "Browse experiences", href: "#" }}
      />
      <FeatureSplit
        eyebrow="One booking, all of it"
        title="Flights, stays, tours — confirmed in clicks."
        body="When the plan looks right, we book it. Domestic flights, hotels, day tours and rental cars — all on one confirmation, with free cancellation on most things and 24/7 help on the road."
        bullets={[
          "Best price guarantee on flights & hotels",
          "Free cancellation on most stays and tours",
          "One itinerary, one confirmation email",
          "24/7 traveller support — text, call or chat",
        ]}
        image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Friends on an Australian road trip"
        cta={{ label: "How booking works", href: "#" }}
      />
      <Stats />
      <Destinations />
      <Testimonials />
      <WhyUs />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ------------------------------- HERO ------------------------------- */

function Hero() {
  return (
    <section className="relative bg-white">
      <div className="container-narrow section-pad relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink-900 leading-[1.05]">
              Plan your perfect <br className="hidden sm:block" />
              <span className="text-rose-600">Aussie adventure.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-600 max-w-xl leading-relaxed">
              From the Reef to the Red Centre — tell us your vibe and our AI
              builds you a personalised, day-by-day Australia itinerary you
              can actually book. Flights, stays and experiences in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/agent" className="btn-primary !bg-rose-600 hover:!bg-rose-700 !shadow-rose-500/30">
                Plan my trip
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#sample" className="btn-secondary">
                <PlayCircle className="w-4 h-4" />
                See sample itineraries
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-ink-500">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="font-medium text-ink-700">4.9</span>
                <span>· 12,400+ travellers</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Free to plan
              </div>
            </div>
          </div>

          <ItineraryMock />
        </div>
      </div>
    </section>
  );
}

function ItineraryMock() {
  const days: { day: number; date: string; place: string; tags: string[]; highlight?: string }[] = [
    { day: 1, date: "Sat · Sep 13", place: "Sydney", tags: ["Arrival", "Harbour walk"] },
    { day: 2, date: "Sun · Sep 14", place: "Sydney", tags: ["Bondi to Coogee", "Opera House tour"], highlight: "Pick" },
    { day: 3, date: "Mon · Sep 15", place: "Blue Mountains", tags: ["Day trip", "Three Sisters"] },
    { day: 4, date: "Tue · Sep 16", place: "Cairns", tags: ["Fly QF914", "Esplanade"] },
    { day: 5, date: "Wed · Sep 17", place: "Great Barrier Reef", tags: ["Snorkel pontoon"], highlight: "Must" },
    { day: 6, date: "Thu · Sep 18", place: "Daintree", tags: ["Rainforest", "Cape Tribulation"] },
  ];
  return (
    <div className="relative animate-fade-in">
      <div className="relative rounded-2xl bg-white border border-ink-200 shadow-xl shadow-ink-900/5 overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ink-100 bg-ink-50/50">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 text-xs text-ink-500">
            australiatripplanner.com / my-trip
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-rose-600 font-semibold">
                14-day itinerary
              </div>
              <div className="text-base font-semibold text-ink-900 mt-0.5">
                East Coast & the Reef
              </div>
              <div className="text-xs text-ink-500 mt-0.5">
                Sep 13 → Sep 26 · 2 travellers · mid-budget
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-ink-500">Estimated total</div>
              <div className="text-base font-semibold text-ink-900">$4,820</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <Pill icon={<Plane className="w-3.5 h-3.5" />} label="Flights" value="3 booked" />
            <Pill icon={<Hotel className="w-3.5 h-3.5" />} label="Stays" value="5 hotels" />
            <Pill icon={<Compass className="w-3.5 h-3.5" />} label="Tours" value="7 added" />
          </div>

          <div className="rounded-xl border border-ink-100 overflow-hidden">
            <div className="px-4 py-2.5 bg-ink-50/60 text-xs font-medium text-ink-700 flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5" />
              Days 1 – 6 of 14
            </div>
            <ul className="divide-y divide-ink-100">
              {days.map((d) => (
                <li
                  key={d.day}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm"
                >
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                    {d.day}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-ink-900 truncate">
                      {d.place}
                    </div>
                    <div className="text-[11px] text-ink-500 truncate">
                      {d.date} · {d.tags.join(" · ")}
                    </div>
                  </div>
                  {d.highlight && (
                    <span className="text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      {d.highlight}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-ink-500">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>
              AI suggested swapping day 6 for a Whitsundays sail — accept?
            </span>
          </div>
        </div>
      </div>

      <div className="absolute -left-6 bottom-6 hidden md:block rounded-2xl bg-white border border-ink-200 shadow-xl px-4 py-3 animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <div className="text-sm font-medium">Itinerary saved</div>
            <div className="text-xs text-ink-500">Shared with Sam · 2 travellers</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-ink-100 px-3 py-2 flex items-center gap-2 bg-white">
      <div className="text-rose-500">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-ink-500">
          {label}
        </div>
        <div className="text-xs font-semibold text-ink-900 truncate">{value}</div>
      </div>
    </div>
  );
}

/* ----------------------------- TRUST STRIP --------------------------- */

function TrustStrip() {
  return (
    <section className="border-y border-ink-100 bg-white">
      <div className="container-narrow px-6 sm:px-10 lg:px-16 py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
        <div className="text-sm text-ink-500">
          As featured by travellers in <span className="font-medium text-ink-700">Lonely Planet</span>,
          {" "}
          <span className="font-medium text-ink-700">Conde Nast</span>,{" "}
          <span className="font-medium text-ink-700">Time Out</span> and{" "}
          <span className="font-medium text-ink-700">The Guardian Australia</span>.
        </div>
        <div className="md:ml-auto flex items-center gap-6 flex-wrap text-ink-400 text-sm font-medium tracking-wide">
          <span>TRUSTPILOT · 4.9★</span>
          <span>12,400+ TRIPS</span>
          <span>ATAS ACCREDITED</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FEATURE SPLIT --------------------------- */

function FeatureSplit({
  eyebrow,
  title,
  body,
  bullets,
  image,
  imageAlt,
  cta,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  cta: { label: string; href: string };
  reverse?: boolean;
}) {
  return (
    <section className="bg-white">
      <div className="container-narrow section-pad">
        <div
          className={
            "grid lg:grid-cols-2 gap-12 items-center " +
            (reverse ? "lg:[&>*:first-child]:order-last" : "")
          }
        >
          <div className="animate-fade-in">
            <span className="eyebrow !text-rose-600">{eyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed text-lg">{body}</p>
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3 text-ink-700">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              {cta.href.startsWith("/") ? (
                <Link href={cta.href} className="btn-ghost !text-rose-600 hover:!text-rose-700">
                  {cta.label} <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a href={cta.href} className="btn-ghost !text-rose-600 hover:!text-rose-700">
                  {cta.label} <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-ink-200 shadow-xl shadow-ink-900/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- STATS ------------------------------- */

function Stats() {
  const stats = [
    { value: "12,400+", label: "Trips planned across Australia" },
    { value: "8/8", label: "States and territories covered" },
    { value: "1,200+", label: "Vetted local experiences" },
    { value: "4.9★", label: "Average traveller rating" },
  ];
  return (
    <section className="bg-white border-y border-ink-100">
      <div className="container-narrow section-pad">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow !text-rose-600">By the numbers</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            Trusted by travellers headed Down Under.
          </h2>
          <p className="mt-3 text-ink-600">
            From the Top End to Tassie — built by Aussies, for travellers
            from anywhere.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-ink-100 p-6 text-center"
            >
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink-900">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-ink-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- DESTINATIONS --------------------------- */

function Destinations() {
  const dests = [
    {
      name: "Sydney & New South Wales",
      blurb: "Harbour, beaches and the Blue Mountains",
      tag: "Most popular",
      img: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Great Barrier Reef & Tropical North",
      blurb: "Reef, rainforest and the Daintree",
      tag: "Bucket list",
      img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Uluru & the Red Centre",
      blurb: "Outback skies and First Nations stories",
      tag: "Once-in-a-lifetime",
      img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Melbourne & Victoria",
      blurb: "Laneways, food and the Great Ocean Road",
      tag: "Foodie pick",
      img: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Tasmania",
      blurb: "Wild coast, MONA and wombat country",
      tag: "Editor's love",
      img: "https://images.unsplash.com/photo-1581373449483-37449f962b6c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Western Australia",
      blurb: "Rottnest, Margaret River and Ningaloo",
      tag: "Underrated",
      img: "https://images.unsplash.com/photo-1535139262971-c51845709a48?auto=format&fit=crop&w=1000&q=80",
    },
  ];
  return (
    <section id="sample" className="bg-white">
      <div className="container-narrow section-pad">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-xl">
            <span className="eyebrow !text-rose-600">Where to next</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Six unforgettable corners of Australia.
            </h2>
            <p className="mt-3 text-ink-600">
              Pick one — or weave them together. Our planner builds the
              connecting flights, drives and ferries automatically.
            </p>
          </div>
          <Link href="/agent" className="btn-secondary">
            Plan a multi-stop trip <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dests.map((d) => (
            <a
              key={d.name}
              href="#"
              className="group rounded-2xl overflow-hidden border border-ink-100 bg-white hover:shadow-xl hover:-translate-y-0.5 transition"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-rose-700 backdrop-blur">
                  {d.tag}
                </div>
              </div>
              <div className="p-5">
                <div className="font-semibold text-ink-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  {d.name}
                </div>
                <div className="text-sm text-ink-600 mt-1">{d.blurb}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rose-600 group-hover:gap-2 transition-all">
                  See itineraries <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- TESTIMONIALS ---------------------------- */

function Testimonials() {
  const items = [
    {
      quote:
        "I had a vague idea — two weeks, beaches, no driving stress. Twenty minutes later we had a perfect East Coast itinerary, hotels and Reef trip booked. Best holiday we've ever taken.",
      author: "Sophie M.",
      role: "Traveller",
      company: "London → Cairns, 14 days",
    },
    {
      quote:
        "We're picky travellers. The AI actually listened — swapped a touristy day in Sydney for a hike in Royal National Park and it was the highlight of the trip.",
      author: "Daniel & Aiko",
      role: "Honeymooners",
      company: "Tokyo → Sydney, 10 days",
    },
    {
      quote:
        "Family of four, two fussy teens. Australia Trip Planner balanced reef snorkelling, koala spotting and a beach day in Byron without us arguing once.",
      author: "Priya R.",
      role: "Family of 4",
      company: "Mumbai → East Coast, 12 days",
    },
    {
      quote:
        "Booked our Uluru sunrise, Kakadu safari and a stop at MONA in one go. Felt like having a local mate who happens to know everywhere in Australia.",
      author: "Mike S.",
      role: "Solo traveller",
      company: "Auckland → Outback loop, 9 days",
    },
  ];

  return (
    <section className="bg-white border-y border-ink-100">
      <div className="container-narrow section-pad">
        <div className="max-w-2xl">
          <span className="eyebrow !text-rose-600">Travellers love it</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Real trips, planned in minutes.
          </h2>
          <p className="mt-3 text-ink-600">
            From honeymoons to family adventures, here's what travellers say
            after using Australia Trip Planner.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <figure
              key={i}
              className="rounded-2xl bg-white border border-ink-100 p-7 shadow-sm hover:shadow-md transition"
            >
              <Quote className="w-6 h-6 text-rose-500" />
              <blockquote className="mt-3 text-ink-800 text-lg leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Avatar name={t.author} />
                <div>
                  <div className="text-sm font-semibold text-ink-900">
                    {t.author}
                  </div>
                  <div className="text-xs text-ink-500">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const colors = [
    "from-rose-400 to-rose-600",
    "from-amber-400 to-amber-600",
    "from-emerald-400 to-emerald-600",
    "from-sky-400 to-sky-600",
    "from-indigo-400 to-indigo-600",
    "from-fuchsia-400 to-fuchsia-600",
  ];
  const idx =
    Math.abs(name.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) %
    colors.length;
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[idx]} text-white text-sm font-semibold flex items-center justify-center shadow`}
    >
      {initials}
    </div>
  );
}

/* -------------------------------- WHY US ------------------------------ */

function WhyUs() {
  const items = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI does the heavy lifting",
      body:
        "No more 40 browser tabs. Describe the trip you want; we plan, price and refine in seconds.",
    },
    {
      icon: <Map className="w-5 h-5" />,
      title: "Built by Aussies",
      body:
        "Our editors live here. Every recommendation has been tested on the ground — not scraped from a list.",
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      title: "Best price, all in one bill",
      body:
        "We match prices across major OTAs and bundle flights, stays and tours into a single booking.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Flexible & cancellable",
      body:
        "Free changes on most stays and tours. Plans shift; we keep the trip moving with you.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Made for every kind of trip",
      body:
        "Solo backpacker, honeymoon, family chaos or a 60-something campervan run — same planner, different vibe.",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Real human help, on the road",
      body:
        "Reach an Aussie travel specialist 24/7 from anywhere — text, call or in-app chat.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="container-narrow section-pad">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow !text-rose-600">Why choose us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            The friendliest way to plan Australia.
          </h2>
          <p className="mt-3 text-ink-600">
            Smart software, with real Australian travel experts behind it.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-ink-100 p-6 hover:border-rose-200 hover:bg-rose-50/40 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                {it.icon}
              </div>
              <h3 className="mt-4 font-semibold text-ink-900">{it.title}</h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FINAL CTA ----------------------------- */

function FinalCTA() {
  return (
    <section id="trial" className="bg-white border-t border-ink-100">
      <div className="container-narrow section-pad text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink-900">
          Your Australian adventure starts here.
        </h2>
        <p className="mt-4 text-ink-600 text-lg max-w-xl mx-auto">
          Free to plan. No credit card. Just the trip you've been dreaming
          about — Down Under.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/agent"
            className="inline-flex items-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-3 shadow-md shadow-rose-500/20"
          >
            Plan my trip <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#sample"
            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-ink-50 text-ink-900 font-medium px-6 py-3 border border-ink-200"
          >
            Browse sample itineraries
          </a>
        </div>
        <div className="mt-6 text-sm text-ink-500 flex items-center gap-6 justify-center flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free planning
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free cancellation on most bookings
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24/7 human support
          </span>
        </div>
      </div>
    </section>
  );
}
