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

export const toursPageQuery = groq`
  *[_type == "toursPage" && _id == "toursPage"][0]{
    metaTitle,
    metaDescription,
    eyebrow,
    title,
    description
  }
`;

export const destinationsQuery = groq`
  {
    "states": *[_type == "stateGuide"] | order(name asc) {
      name,
      slug,
      description,
      imageUrl,
      metaTitle,
      metaDescription,
      image {
        asset->{ url },
        alt
      }
    },
    "cities": *[_type == "cityGuide"] | order(stateSlug asc, cityName asc) {
      cityName,
      stateSlug,
      citySlug,
      shortDescription,
      cardImageUrl,
      heroImageUrl,
      intro,
      heroImage {
        asset->{ url }
      }
    }
  }
`;

export const cityGuideQuery = groq`
  *[_type == "cityGuide" && stateSlug == $stateSlug && citySlug == $citySlug][0]{
    cityName,
    shortDescription,
    cardImageUrl,
    pageTitle,
    metaTitle,
    metaDescription,
    intro,
    heroCaption,
    heroImageUrl,
    heroImage {
      asset->{ url },
      alt
    },
    content[]{
      _type,
      _key,
      text,
      level,
      anchorId,
      caption,
      externalUrl,
      image {
        asset->{ url },
        alt
      },
      items[]{
        text,
        subItems
      }
    }
  }
`;

export const toursQuery = groq`
  *[_type == "tour"] | order(featured desc, title asc) {
    _id,
    "slug": slug.current,
    title,
    operatorName,
    operatorLocation,
    description,
    longDescription,
    destination,
    state,
    duration,
    priceAud,
    commissionRate,
    maxGuests,
    image {
      asset->{ _id, url },
      hotspot,
      crop,
      alt
    },
    imageUrl,
    highlights,
    includes,
    meetingPoint,
    rating,
    reviewCount,
    featured
  }
`;
