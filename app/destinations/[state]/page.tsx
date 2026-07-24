import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import DestinationBreadcrumbs from "@/components/destinations/DestinationBreadcrumbs";
import DestinationGuideContent from "@/components/destinations/DestinationGuideContent";
import CityCard from "@/components/destinations/CityCard";
import TourCard from "@/components/tours/TourCard";
import { getAllStates, getStateBySlug } from "@/lib/destinations";
import { getStateGuideContent } from "@/lib/sanity/get-state-guide";
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

  try {
    const guide = await getStateGuideContent(stateSlug);
    return {
      title: guide.metaTitle,
      description: guide.metaDescription,
    };
  } catch {
    return { title: "Destination not found" };
  }
}

export default async function StateDestinationPage({ params }: Props) {
  const { state: stateSlug } = await params;
  const state = await getStateBySlug(stateSlug);
  if (!state) notFound();

  let guide;
  try {
    guide = await getStateGuideContent(stateSlug);
  } catch {
    notFound();
  }
  const tours = await getToursByState(state.name);
  const showPlaces = guide.showPlacesGrid && state.cities.length > 0;

  return (
    <main>
      <Nav />
      <article className="bg-white">
        <div className="container-narrow section-pad !pb-8">
          <DestinationBreadcrumbs
            crumbs={[
              { label: "Destinations", href: "/destinations" },
              { label: state.name },
            ]}
          />

          <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            {guide.title}
          </h1>
        </div>

        <div className="container-narrow px-6 sm:px-10 lg:px-16 pb-12">
          <div className="max-w-3xl">
            <figure className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={guide.heroImage.src}
                alt={guide.heroImage.alt}
                className="w-full object-cover aspect-[16/10] bg-ink-100"
              />
              {guide.heroImage.caption && (
                <figcaption className="mt-3 text-sm italic text-[#3498db]">
                  {guide.heroImage.caption}
                </figcaption>
              )}
            </figure>

            {guide.intro && (
              <p className="text-ink-700 leading-relaxed mb-6">{guide.intro}</p>
            )}
          </div>

          <DestinationGuideContent
            blocks={guide.blocks}
            stateSlug={state.slug}
          />
        </div>
      </article>

      {showPlaces && (
        <section className="bg-ink-50 border-t border-ink-100">
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
        <section className="bg-white border-t border-ink-100">
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
