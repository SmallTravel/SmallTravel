import { isSanityConfigured } from "@/lib/config";
import {
  DEFAULT_TOURS_PAGE,
  type ToursPageContent,
} from "@/lib/sanity/tours-page-defaults";
import { getSanityClient } from "@/lib/sanity/client";
import { toursPageQuery } from "@/lib/sanity/queries";

function mergeToursPage(
  partial: Partial<ToursPageContent> | null
): ToursPageContent {
  if (!partial) return DEFAULT_TOURS_PAGE;
  return { ...DEFAULT_TOURS_PAGE, ...partial };
}

export async function getToursPage(): Promise<ToursPageContent> {
  if (!isSanityConfigured()) return DEFAULT_TOURS_PAGE;

  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } };

  try {
    const data = await getSanityClient().fetch<Partial<ToursPageContent> | null>(
      toursPageQuery,
      {},
      fetchOptions
    );
    return mergeToursPage(data);
  } catch {
    return DEFAULT_TOURS_PAGE;
  }
}
