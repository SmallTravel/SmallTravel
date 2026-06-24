import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import TourCard from "@/components/tours/TourCard";
import { getToursPage } from "@/lib/sanity/get-tours-page";
import { getTours } from "@/lib/tours";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getToursPage();
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function ToursPage() {
  const [tours, content] = await Promise.all([getTours(), getToursPage()]);

  return (
    <main>
      <Nav />
      <section className="bg-white border-b border-ink-100">
        <div className="container-narrow section-pad !pb-12">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            {content.title}
          </h1>
          <p className="mt-4 text-lg text-ink-600 max-w-2xl">
            {content.description}
          </p>
        </div>
      </section>

      <section className="bg-ink-50">
        <div className="container-narrow px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
