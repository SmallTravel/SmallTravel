export type HomepageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  heroBadges: string[];
  featuredEyebrow: string;
  featuredTitle: string;
  featuredDescription: string;
  howItWorksEyebrow: string;
  howItWorksTitle: string;
  howItWorksSteps: { title: string; body: string }[];
  operatorsEyebrow: string;
  operatorsTitle: string;
  operatorsDescription: string;
  operatorBenefits: { title: string; body: string }[];
  operatorsCtaLabel: string;
  operatorsCtaHref: string;
  valueProps: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export const DEFAULT_HOMEPAGE: HomepageContent = {
  heroEyebrow: "Australian tour marketplace",
  heroTitle: "Book local tours.",
  heroTitleHighlight: "Support local operators.",
  heroSubtitle:
    "Australia Trip Planner connects travellers with independent Australian tour operators — the ones who can't afford 30% commissions on big platforms. Fair pricing for everyone: operators pay just 15% on confirmed bookings.",
  heroPrimaryCtaLabel: "Browse tours",
  heroPrimaryCtaHref: "/tours",
  heroSecondaryCtaLabel: "List your tour",
  heroSecondaryCtaHref: "#operators",
  heroBadges: [
    "15% commission only",
    "Pay on confirmed bookings",
    "Free promotion for operators",
  ],
  featuredEyebrow: "Featured tours",
  featuredTitle: "Hand-picked from local operators",
  featuredDescription:
    "Reef trips, outback sunsets, wine country and more — every listing is run by an independent Australian business.",
  howItWorksEyebrow: "How it works",
  howItWorksTitle: "Simple for travellers. Fair for operators.",
  howItWorksSteps: [
    {
      title: "Browse & book",
      body: "Find tours across every state. Create an account, pick a date, and confirm your booking in minutes.",
    },
    {
      title: "Operator confirms",
      body: "Your booking goes direct to the local operator. They handle the experience — we just connect you.",
    },
    {
      title: "Everyone wins",
      body: "You get an authentic trip at a fair price. The operator keeps more of their margin. We earn 15% on confirmed bookings only.",
    },
  ],
  operatorsEyebrow: "For tour operators",
  operatorsTitle: "Can't afford 30%? List with us at 15%.",
  operatorsDescription:
    "Many brilliant local operators are locked out of big platforms because the commission is too high. Australia Trip Planner is built for you — free promotion on our website and social channels, and you only pay when a booking is confirmed.",
  operatorBenefits: [
    {
      title: "Direct bookings",
      body: "Travellers book your tours on Australia Trip Planner. You receive the booking details and run the experience.",
    },
    {
      title: "15% commission",
      body: "Half what the big platforms charge. No listing fees, no monthly subscription.",
    },
    {
      title: "Free promotion",
      body: "Featured on our site and social media. Reach travellers looking for authentic local experiences.",
    },
    {
      title: "Win-win-win",
      body: "Operators grow their business. Travellers discover hidden gems. We earn a fair cut on real bookings.",
    },
  ],
  operatorsCtaLabel: "Partner with us",
  operatorsCtaHref: "mailto:partners@australiatripplanner.com.au",
  valueProps: [
    "8 Australian states & territories",
    "Independent local operators",
    "15% commission — not 30%",
    "Confirmed bookings only",
  ],
  ctaTitle: "Ready to explore Australia?",
  ctaDescription:
    "Create a free account, browse tours from local operators, and book your next adventure.",
  ctaPrimaryLabel: "Create free account",
  ctaSecondaryLabel: "Browse tours",
};
