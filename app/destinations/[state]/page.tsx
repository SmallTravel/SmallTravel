import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import DestinationBreadcrumbs from "@/components/destinations/DestinationBreadcrumbs";
import CityCard from "@/components/destinations/CityCard";
import TourCard from "@/components/tours/TourCard";
import { getAllStates, getStateBySlug } from "@/lib/destinations";
import { getToursByState } from "@/lib/tours";

type Props = { params: Promise<{ state: string }> };

export async function generateStaticParams() {
  const states = await getAllStates();
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = await getStateBySlug(stateSlug);
  if (!state) return { title: "Destination not found" };

  return {
    title: `${state.name} | Destinations | Australia Trip Planner`,
    description: state.description,
  };
}

export default async function StateDestinationPage({ params }: Props) {
  const { state: stateSlug } = await params;
  const state = await getStateBySlug(stateSlug);
  if (!state) notFound();

  const tours = await getToursByState(state.name);

  return (
    <main>
      <Nav />
      <section className="relative bg-white border-b border-ink-100 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={state.imageUrl}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
        </div>
        <div className="container-narrow section-pad relative !pb-12">
          <DestinationBreadcrumbs
            crumbs={[
              { label: "Destinations", href: "/destinations" },
              { label: state.name },
            ]}
          />
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            {state.name}
          </h1>
          <p className="mt-4 text-lg text-ink-600 max-w-2xl">{state.description}</p>
        </div>
      </section>

      {state.cities.length > 0 && (
        <section className="bg-ink-50 border-b border-ink-100">
          <div className="container-narrow px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
            <h2 className="text-2xl font-semibold text-ink-900 mb-8">
              Places to visit
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.cities.map((city) => (
                <CityCard key={city.slug} state={state} city={city} />
              ))}
            </div>
          </div>
        </section>
      )}

      {tours.length > 0 && (
        <section className="bg-white">
          <div className="container-narrow px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
            <h2 className="text-2xl font-semibold text-ink-900 mb-8">
              Tours in {state.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
