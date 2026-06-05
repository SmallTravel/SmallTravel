## Australia Trip Planner

Australian tour marketplace — book tours direct from local operators at a fair 15% commission.

## Setup

```bash
npm install
```

1. Create a [Supabase](https://supabase.com) project
2. Copy `.env.example` to `.env.local` and fill in (project: [dmxbwubkilnxumkulscy](https://supabase.com/dashboard/project/dmxbwubkilnxumkulscy)):
   - `NEXT_PUBLIC_SUPABASE_URL=https://dmxbwubkilnxumkulscy.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — publishable key
   - `SUPABASE_SECRET_KEY` — secret key (server only, never commit)
3. Run `supabase/schema.sql` in the Supabase SQL Editor (creates tables + seeds tours) — **required for bookings**
4. In Supabase Auth → URL Configuration, add `http://localhost:3000/auth/callback` as a redirect URL
5. For easier local testing, disable email confirmation: Auth → Providers → Email → turn off “Confirm email”

```bash
npm run dev
```

## Features

- Browse 8 mock Australian tours (Reef, Blue Mountains, Uluru, Phillip Island, Freycinet, Rottnest, Daintree, Barossa)
- User registration and login (Supabase Auth)
- Book tours with date, guest count and notes
- View booking history at `/bookings`

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketplace homepage |
| `/tours` | Browse all tours |
| `/tours/[slug]` | Tour detail + booking form |
| `/login`, `/signup` | Authentication |
| `/bookings` | My bookings (requires login) |
