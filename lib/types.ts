export type Tour = {
  id: string;
  slug: string;
  title: string;
  operator_name: string;
  operator_location: string;
  description: string;
  long_description: string;
  destination: string;
  state: string;
  duration: string;
  price_aud: number;
  commission_rate: number;
  max_guests: number;
  image_url: string;
  highlights: string[];
  includes: string[];
  meeting_point: string;
  rating: number;
  review_count: number;
  featured: boolean;
};

export type Booking = {
  id: string;
  user_id: string;
  tour_id: string;
  booking_date: string;
  guests: number;
  total_price: number;
  commission_amount: number;
  status: string;
  traveller_name: string | null;
  traveller_email: string | null;
  notes: string | null;
  created_at: string;
  tour?: Tour;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
};
