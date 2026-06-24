import type { Tour } from "./types";
import { createClient } from "./supabase/server";
import { isSanityConfigured, isSupabaseConfigured } from "./config";
import { getSanityTours } from "./sanity/get-tours";
import { MOCK_TOURS } from "./tours-mock";

export { MOCK_TOURS };

export async function getTours(): Promise<Tour[]> {
  if (isSanityConfigured()) {
    const sanityTours = await getSanityTours();
    if (sanityTours.length) return sanityTours;
  }

  if (!isSupabaseConfigured()) return MOCK_TOURS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("featured", { ascending: false })
      .order("title");

    if (error || !data?.length) return MOCK_TOURS;
    return data as Tour[];
  } catch {
    return MOCK_TOURS;
  }
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const tours = await getTours();
  return tours.find((t) => t.slug === slug) ?? null;
}

export async function getTourById(id: string): Promise<Tour | null> {
  const tours = await getTours();
  return tours.find((t) => t.id === id) ?? null;
}
