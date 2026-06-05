import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import TourCard from "@/components/tours/TourCard";
import { getTours } from "@/lib/tours";

export const metadata = {
  title: "Browse tours — Australia Trip Planner",
  description: "Book authentic Australian tours direct from local operators. Fair 15% commission.",
};

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <main>
      <Nav />
      <section className="bg-white border-b border-ink-100">
        <div className="container-narrow section-pad !pb-12">
          <span className="eyebrow">All tours</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
            Book direct from local operators
          </h1>
          <p className="mt-4 text-lg text-ink-600 max-w-2xl">
            Every tour is run by an independent Australian operator. They get free promotion;
            you get authentic experiences — and they only pay 15% on confirmed bookings.
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
