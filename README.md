# Wanderly — AI Travel Agent POC

A no-DB, no-auth Next.js proof-of-concept for an AI travel agent. The agent
plans trips end-to-end: clarifies the brief, searches mocked flights / hotels /
activities through tool calls, and renders a live day-by-day itinerary in a
side panel.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS
- Vercel AI SDK (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`) with streaming + tool calls
- `lucide-react` icons
- Zod for tool schemas
- Mock travel data in `lib/mock-travel.ts` (no external APIs)

## Setup

```bash
npm install
cp .env.example .env.local
# edit .env.local and set OPENAI_API_KEY
npm run dev
```

Then open http://localhost:3000.

### Environment variables

| Var              | Required | Default         | Notes                    |
| ---------------- | -------- | --------------- | ------------------------ |
| `OPENAI_API_KEY` | yes      | —               | Your OpenAI API key      |
| `OPENAI_MODEL`   | no       | `gpt-4o-mini`   | Any chat-capable model   |

## How it works

- `app/api/chat/route.ts` defines the agent. The system prompt makes it
  decisive (one clarifying question max, sensible defaults). Four tools are
  exposed to the model:
  - `searchFlights({ from, to, date })`
  - `searchHotels({ city, checkIn, checkOut })`
  - `searchActivities({ city })`
  - `finalizeItinerary({...})` — when called, the client renders the plan in
    the side panel.
- Tool execution is fully mocked in `lib/mock-travel.ts`. Results are
  deterministic per query so the demo feels stable.
- `components/Chat.tsx` uses `useChat` from `@ai-sdk/react` for streaming.
  Each tool invocation renders a live "running → done" card inline in the
  conversation.
- `components/TripPanel.tsx` renders the final itinerary on the right side.

## Try it

Some prompts that show off the flow:

- `5 nights in Lisbon next month, mid-budget, love food & jazz`
- `Weekend in Tokyo from SFO, foodie focus`
- `Family trip to Costa Rica in March, beaches + nature`

## What's intentionally not here

- No database, no auth, no user accounts
- No real flight/hotel APIs (mock results)
- No persistence between refreshes — this is a POC

## File map

```
app/
  api/chat/route.ts   # Agent + tool definitions
  layout.tsx
  page.tsx
  globals.css
components/
  Chat.tsx            # Chat UI + tool cards + welcome state
  TripPanel.tsx       # Right-side itinerary panel
  ToolCard.tsx        # Inline tool invocation cards
lib/
  mock-travel.ts      # Mock flights / hotels / activities
```
