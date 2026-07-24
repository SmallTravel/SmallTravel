import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import DestinationBreadcrumbs from "@/components/destinations/DestinationBreadcrumbs";
import DestinationGuideContent from "@/components/destinations/DestinationGuideContent";
import TourCard from "@/components/tours/TourCard";
import {
  getAllStates,
  getCityBySlug,
  getStatePath,
} from "@/lib/destinations";
import { extractNavSections } from "@/lib/destinations-nav";
import { getCityGuideContent } from "@/lib/sanity/get-city-guide";
import { getToursByCity } from "@/lib/tours";

type Props = { params: Promise<{ state: string; city: string }> };

export async function generateStaticParams() {
  const states = await getAllStates();
  return states.flatMap((state) =>
    state.cities.map((city) => ({
      state: state.slug,
      city: city.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const result = await getCityBySlug(stateSlug, citySlug);
  if (!result) return { title: "Destination not found" };

  try {
    const guide = await getCityGuideContent(stateSlug, citySlug);
    return {
      title: guide.metaTitle,
      description: guide.metaDescription,
    };
  } catch {
    return { title: "Destination not found" };
  }
}

export default async function CityDestinationPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const result = await getCityBySlug(stateSlug, citySlug);
  if (!result) notFound();

  const { state, city } = result;
  let guide;
  try {
    guide = await getCityGuideContent(stateSlug, citySlug);
  } catch {
    notFound();
  }
  const tours = await getToursByCity(state.name, city.name);
  const navSections = extractNavSections(stateSlug, citySlug, guide.blocks);

  return (
    <main>
      <Nav />
      <article className="bg-white">
        <div className="container-narrow section-pad !pb-10">
          <DestinationBreadcrumbs
            crumbs={[
              { label: "Destinations", href: "/destinations" },
              { label: state.name, href: getStatePath(state) },
              { label: city.name },
            ]}
          />

          <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            {guide.title}
          </h1>

          {navSections.length > 0 && (
            <nav aria-label="On this page" className="mt-6">
              <ul className="flex flex-wrap gap-2">
                {navSections.map((section) => (
                  <li key={section.href}>
                    <a
                      href={section.href}
                      className="inline-block px-3 py-1.5 rounded-full text-sm bg-ink-50 border border-ink-200 text-ink-700 hover:border-brand-200 hover:text-brand-700 transition"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="container-narrow px-6 sm:px-10 lg:px-16 pb-12">
          <div className="max-w-3xl">
            <figure className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={guide.heroImage.src}
                alt={guide.heroImage.alt}
                className="w-full rounded-2xl object-cover aspect-[16/10] bg-ink-100"
              />
              {guide.heroImage.caption && (
                <figcaption className="mt-3 text-sm text-ink-500 italic">
                  {guide.heroImage.caption}
                </figcaption>
              )}
            </figure>

            <p className="text-lg text-ink-700 leading-relaxed mb-8">
              {guide.intro}
            </p>

            <DestinationGuideContent blocks={guide.blocks} />
          </div>
        </div>
      </article>

      <section className="bg-ink-50 border-t border-ink-100">
        <div className="container-narrow px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
          <h2 className="text-2xl font-semibold text-ink-900 mb-8">
            Tours in {city.name}
          </h2>
          {tours.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-ink-200 bg-white p-8 text-center">
              <p className="text-ink-600">
                No tours listed for {city.name} yet — check back soon or browse all
                tours.
              </p>
              <Link href="/tours" className="btn-primary mt-4 inline-flex">
                Browse all tours
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
