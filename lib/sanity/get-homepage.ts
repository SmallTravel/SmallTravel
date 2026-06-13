import { isSanityConfigured } from "@/lib/config";
import {
  DEFAULT_HOMEPAGE,
  type HomepageContent,
} from "@/lib/sanity/homepage-defaults";
import { getSanityClient } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/sanity/queries";

function mergeHomepage(partial: Partial<HomepageContent> | null): HomepageContent {
  if (!partial) return DEFAULT_HOMEPAGE;

  return {
    ...DEFAULT_HOMEPAGE,
    ...partial,
    heroBadges: partial.heroBadges?.length
      ? partial.heroBadges
      : DEFAULT_HOMEPAGE.heroBadges,
    howItWorksSteps: partial.howItWorksSteps?.length
      ? partial.howItWorksSteps
      : DEFAULT_HOMEPAGE.howItWorksSteps,
    operatorBenefits: partial.operatorBenefits?.length
      ? partial.operatorBenefits
      : DEFAULT_HOMEPAGE.operatorBenefits,
    valueProps: partial.valueProps?.length
      ? partial.valueProps
      : DEFAULT_HOMEPAGE.valueProps,
  };
}

export async function getHomepage(): Promise<HomepageContent> {
  if (!isSanityConfigured()) return DEFAULT_HOMEPAGE;

  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } };

  try {
    const data = await getSanityClient().fetch<Partial<HomepageContent> | null>(
      homepageQuery,
      {},
      fetchOptions
    );
    return mergeHomepage(data);
  } catch {
    return DEFAULT_HOMEPAGE;
  }
}
