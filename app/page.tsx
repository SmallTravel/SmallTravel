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
import { getHomepage } from "@/lib/sanity/get-homepage";

const HERO_BADGE_ICONS = [BadgePercent, ShieldCheck, Megaphone] as const;
const OPERATOR_ICONS = [Handshake, BadgePercent, Megaphone, Users] as const;

export default async function Home() {
  const [tours, content] = await Promise.all([getTours(), getHomepage()]);
  const featured = tours.filter((t) => t.featured).slice(0, 6);

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/80 via-white to-amber-50/40" />
        <div className="container-narrow section-pad relative">
          <div className="max-w-3xl">
            <span className="eyebrow">{content.heroEyebrow}</span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink-900 leading-[1.05]">
              {content.heroTitle}{" "}
              <span className="text-brand-600">{content.heroTitleHighlight}</span>
            </h1>
            <p className="mt-6 text-lg text-ink-600 max-w-2xl leading-relaxed">
              {content.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={content.heroPrimaryCtaHref}
                className="btn-primary !bg-brand-600 hover:!bg-brand-700"
              >
                {content.heroPrimaryCtaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={content.heroSecondaryCtaHref} className="btn-secondary">
                {content.heroSecondaryCtaLabel}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-ink-500">
              {content.heroBadges.map((text, i) => {
                const Icon = HERO_BADGE_ICONS[i] ?? BadgePercent;
                const iconClass =
                  i === 0
                    ? "text-brand-600"
                    : i === 1
                      ? "text-emerald-500"
                      : "text-amber-500";
                return (
                  <span key={text} className="flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 ${iconClass}`} />
                    {text}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="bg-ink-50 border-y border-ink-100">
        <div className="container-narrow section-pad">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="eyebrow">{content.featuredEyebrow}</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900">
                {content.featuredTitle}
              </h2>
              <p className="mt-2 text-ink-600 max-w-xl">
                {content.featuredDescription}
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
            <span className="eyebrow">{content.howItWorksEyebrow}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
              {content.howItWorksTitle}
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {content.howItWorksSteps.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-semibold flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                  {item.body}
                </p>
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
                {content.operatorsEyebrow}
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                {content.operatorsTitle}
              </h2>
              <p className="mt-4 text-brand-100 leading-relaxed text-lg">
                {content.operatorsDescription}
              </p>
            </div>

            <div className="space-y-4">
              {content.operatorBenefits.map((item, index) => {
                const Icon = OPERATOR_ICONS[index] ?? Handshake;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl bg-white/10 border border-white/15 px-5 py-4"
                  >
                    <div className="text-brand-200 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="mt-1 text-sm text-brand-100">{item.body}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href={content.operatorsCtaHref}
              className="inline-flex items-center gap-2 rounded-full bg-white text-brand-700 hover:bg-brand-50 font-medium px-6 py-3 text-sm transition"
            >
              {content.operatorsCtaLabel}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white border-t border-ink-100">
        <div className="container-narrow section-pad">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.valueProps.map((text) => (
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
            {content.ctaTitle}
          </h2>
          <p className="mt-3 text-ink-600 max-w-lg mx-auto">
            {content.ctaDescription}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="btn-primary !bg-brand-600 hover:!bg-brand-700"
            >
              {content.ctaPrimaryLabel}
            </Link>
            <Link href="/tours" className="btn-secondary">
              {content.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
