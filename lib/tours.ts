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

export async function getToursByState(stateName: string): Promise<Tour[]> {
  const tours = await getTours();
  return tours.filter((t) => t.state === stateName);
}

export async function getToursByCity(
  stateName: string,
  cityName: string
): Promise<Tour[]> {
  const tours = await getTours();
  const needle = cityName.toLowerCase();

  return tours.filter((t) => {
    if (t.state !== stateName) return false;
    return (
      t.destination.toLowerCase().includes(needle) ||
      t.operator_location.toLowerCase().includes(needle) ||
      t.meeting_point.toLowerCase().includes(needle) ||
      t.description.toLowerCase().includes(needle)
    );
  });
}
