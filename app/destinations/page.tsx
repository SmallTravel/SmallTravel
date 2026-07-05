import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import StateCard from "@/components/destinations/StateCard";
import { getAllStates } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destinations | Australia Trip Planner",
  description:
    "Explore Australia's states and regions — from Sydney and the Blue Mountains to the Great Barrier Reef and Uluru.",
};

export default async function DestinationsPage() {
  const states = await getAllStates();

  return (
    <main>
      <Nav />
      <section className="bg-white border-b border-ink-100">
        <div className="container-narrow section-pad !pb-12">
          <span className="eyebrow">Explore Australia</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            Destinations
          </h1>
          <p className="mt-4 text-lg text-ink-600 max-w-2xl">
            Plan your trip by state and region. Browse local tours and experiences
            from operators who know the area best.
          </p>
        </div>
      </section>

      <section className="bg-ink-50">
        <div className="container-narrow px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {states.map((state) => (
              <StateCard key={state.slug} state={state} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
