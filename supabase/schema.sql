-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Tours
create table if not exists public.tours (
  id uuid primary key,
  slug text unique not null,
  title text not null,
  operator_name text not null,
  operator_location text not null default '',
  description text not null default '',
  long_description text not null default '',
  destination text not null,
  state text not null,
  duration text not null default '',
  price_aud numeric not null,
  commission_rate numeric not null default 0.15,
  max_guests int not null default 20,
  image_url text not null default '',
  highlights text[] not null default '{}',
  includes text[] not null default '{}',
  meeting_point text not null default '',
  rating numeric not null default 4.5,
  review_count int not null default 0,
  featured boolean not null default false,
  created_at timestamptz default now()
);

alter table public.tours enable row level security;

create policy "Tours are publicly readable"
  on public.tours for select
  using (true);

-- Bookings
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  tour_id uuid references public.tours on delete restrict not null,
  booking_date date not null,
  guests int not null default 1 check (guests > 0 and guests <= 50),
  total_price numeric not null,
  commission_amount numeric not null,
  status text not null default 'confirmed',
  traveller_name text,
  traveller_email text,
  notes text,
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "Users can view own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can create own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

-- Seed tours (IDs match lib/tours.ts MOCK_TOURS)
insert into public.tours (
  id, slug, title, operator_name, operator_location, description, long_description,
  destination, state, duration, price_aud, commission_rate, max_guests, image_url,
  highlights, includes, meeting_point, rating, review_count, featured
) values
(
  '11111111-1111-4111-8111-111111111101',
  'great-barrier-reef-snorkel',
  'Great Barrier Reef Snorkel Day Trip',
  'Reef Explorer Cairns',
  'Cairns, QLD',
  'Full-day outer reef pontoon with snorkelling gear, buffet lunch and marine biologist briefing.',
  'Join Reef Explorer Cairns for a full day on the outer Great Barrier Reef. Depart Cairns marina at 8:30am aboard a fast catamaran. Spend 4 hours at a private pontoon with snorkelling platforms, glass-bottom boat tours and an optional scuba intro dive.',
  'Great Barrier Reef', 'Queensland', '8 hours', 189, 0.15, 40,
  'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80',
  array['Outer reef pontoon', 'Marine biologist talk', 'Buffet lunch included'],
  array['Snorkel gear', 'Return transfers', 'Reef levy', 'Morning tea'],
  'Reef Fleet Terminal, 1 Spence St, Cairns', 4.9, 312, true
),
(
  '11111111-1111-4111-8111-111111111102',
  'blue-mountains-day-trip',
  'Blue Mountains & Three Sisters Day Trip',
  'Blue Mountains Adventures',
  'Katoomba, NSW',
  'Scenic rail, rainforest walks and Three Sisters lookout with a small-group guide from Sydney.',
  'Escape Sydney for a small-group day in the Blue Mountains. Travel by comfortable minibus to Katoomba, ride the Scenic Railway, walk the Cliff Walk to Three Sisters lookout, and visit Wentworth Falls.',
  'Blue Mountains', 'New South Wales', '10 hours', 129, 0.15, 14,
  'https://images.unsplash.com/photo-1506973035872-a4ec16b8ebb8?auto=format&fit=crop&w=1200&q=80',
  array['Scenic Railway', 'Three Sisters', 'Small group (max 14)'],
  array['Sydney pickup', 'National park fees', 'Morning tea', 'Local guide'],
  'Circular Quay, Wharf 5, Sydney', 4.8, 198, true
),
(
  '11111111-1111-4111-8111-111111111103',
  'uluru-sunset-field-of-light',
  'Uluru Sunset & Field of Light',
  'Red Centre Experiences',
  'Yulara, NT',
  'Sunset canapés at Uluru followed by the Field of Light art installation after dark.',
  'Watch Uluru glow at sunset from a private dune viewing area with sparkling wine and canapés. As darkness falls, wander through Bruce Munro''s Field of Light.',
  'Uluru', 'Northern Territory', '4 hours', 245, 0.15, 24,
  'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80',
  array['Sunset viewing', 'Field of Light entry', 'Anangu guide'],
  array['Resort transfers', 'Canapés', 'Sparkling wine', 'Park pass'],
  'Ayers Rock Resort Town Square', 4.9, 156, true
),
(
  '11111111-1111-4111-8111-111111111104',
  'phillip-island-penguins',
  'Phillip Island Penguin Parade',
  'Penguin Tours Victoria',
  'Phillip Island, VIC',
  'Afternoon coastal drive, koala boardwalk and premium penguin viewing at sunset.',
  'Leave Melbourne mid-afternoon for Phillip Island. Stop at the Koala Conservation Reserve boardwalk, stroll Cape Woolamai beach, then take premium seats at the Penguin Parade.',
  'Phillip Island', 'Victoria', '9 hours', 95, 0.15, 20,
  'https://images.unsplash.com/photo-1558642452-9d2a7aff7a2b?auto=format&fit=crop&w=1200&q=80',
  array['Premium penguin seats', 'Koala boardwalk', 'Cape Woolamai'],
  array['Melbourne pickup', 'Penguin Parade ticket', 'National park fees'],
  'Federation Square, Melbourne', 4.7, 421, false
),
(
  '11111111-1111-4111-8111-111111111105',
  'freycinet-oyster-kayak',
  'Freycinet Oyster Farm Kayak',
  'Tassie Coastal Co',
  'Coles Bay, TAS',
  'Paddle crystal waters, shuck fresh oysters on the water and walk to Wineglass Bay lookout.',
  'Start with a guided kayak across sheltered Coles Bay to a floating oyster farm. Shuck and taste Pacific oysters straight from the lease.',
  'Freycinet', 'Tasmania', '6 hours', 165, 0.15, 10,
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  array['Oyster farm visit', 'Kayaking', 'Wineglass Bay lookout'],
  array['Kayak & wetsuit', 'Oyster tasting', 'Park pass', 'Local guide'],
  'Freycinet National Park Visitor Centre', 4.9, 87, true
),
(
  '11111111-1111-4111-8111-111111111106',
  'rottnest-island-bike-snorkel',
  'Rottnest Island Bike & Snorkel',
  'Island Hopper WA',
  'Fremantle, WA',
  'Ferry to Rottnest, bike hire, snorkel at The Basin and a selfie stop with quokkas.',
  'Catch the fast ferry from Fremantle to Rottnest Island. Collect your bike at the pier and follow a mapped coastal loop to The Basin for snorkelling.',
  'Rottnest Island', 'Western Australia', '7 hours', 112, 0.15, 30,
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80',
  array['Bike hire', 'The Basin snorkel', 'Quokka spotting'],
  array['Return ferry', 'Bike hire', 'Snorkel set', 'Island map'],
  'B-Shed Ferry Terminal, Fremantle', 4.8, 264, false
),
(
  '11111111-1111-4111-8111-111111111107',
  'daintree-rainforest-walk',
  'Daintree Rainforest & Mossman Gorge',
  'Daintree Cultural Walks',
  'Port Douglas, QLD',
  'Kuku Yalanji-led walk through Mossman Gorge and a Daintree river crocodile cruise.',
  'Travel north from Port Douglas with a Kuku Yalanji guide. Walk the Mossman Gorge circuit learning bush tucker and traditional uses of native plants.',
  'Daintree', 'Queensland', '8 hours', 98, 0.15, 12,
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
  array['Indigenous guide', 'Mossman Gorge', 'River cruise'],
  array['Guide fees', 'River cruise', 'Lunch', 'Port Douglas pickup'],
  'Port Douglas Marina Mirage', 4.9, 143, false
),
(
  '11111111-1111-4111-8111-111111111108',
  'barossa-valley-wine-tour',
  'Barossa Valley Small-Batch Wine Tour',
  'Barossa Small Batch',
  'Tanunda, SA',
  'Visit three family-owned cellar doors with cheese platters and a winemaker meet-and-greet.',
  'Skip the big commercial wineries. This tour visits three family-run Barossa cellar doors including a Grenache specialist and a biodynamic vineyard.',
  'Barossa Valley', 'South Australia', '8 hours', 175, 0.15, 8,
  'https://images.unsplash.com/photo-1506377247377-2ccd5b3d8ffe?auto=format&fit=crop&w=1200&q=80',
  array['Family wineries', 'Winemaker meet', 'Cheese platters'],
  array['Tastings at 3 wineries', 'Cheese platter', 'Adelaide transfers'],
  'Adelaide Central Market, Gouger St', 4.8, 176, false
)
on conflict (id) do nothing;
