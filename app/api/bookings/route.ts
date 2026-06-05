import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/config";
import { getTourById } from "@/lib/tours";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL to .env.local" },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "You must be logged in to book" }, { status: 401 });
  }

  const body = await request.json();
  const { tour_id, booking_date, guests, notes, traveller_name, traveller_email } = body;

  if (!tour_id || !booking_date || !guests) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const tour = await getTourById(tour_id);
  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  if (guests < 1 || guests > tour.max_guests) {
    return NextResponse.json(
      { error: `Guests must be between 1 and ${tour.max_guests}` },
      { status: 400 }
    );
  }

  const total_price = tour.price_aud * guests;
  const commission_amount = total_price * tour.commission_rate;

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      tour_id,
      booking_date,
      guests,
      total_price,
      commission_amount,
      status: "confirmed",
      traveller_name,
      traveller_email,
      notes,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ booking: data });
}
