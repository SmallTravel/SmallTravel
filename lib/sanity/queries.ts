import { groq } from "next-sanity";

export const homepageQuery = groq`
  *[_type == "homepage" && _id == "homepage"][0]{
    heroEyebrow,
    heroTitle,
    heroTitleHighlight,
    heroSubtitle,
    heroPrimaryCtaLabel,
    heroPrimaryCtaHref,
    heroSecondaryCtaLabel,
    heroSecondaryCtaHref,
    heroBadges,
    featuredEyebrow,
    featuredTitle,
    featuredDescription,
    howItWorksEyebrow,
    howItWorksTitle,
    howItWorksSteps[]{ title, body },
    operatorsEyebrow,
    operatorsTitle,
    operatorsDescription,
    operatorBenefits[]{ title, body },
    operatorsCtaLabel,
    operatorsCtaHref,
    valueProps,
    ctaTitle,
    ctaDescription,
    ctaPrimaryLabel,
    ctaSecondaryLabel
  }
`;
