"use client";

import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles, RefreshCw } from "lucide-react";
import {
  FlightToolCard,
  HotelToolCard,
  ActivityToolCard,
  FinalizeToolCard,
} from "./ToolCard";
import { TripPanel, type Itinerary } from "./TripPanel";

const STARTER_PROMPTS = [
  "10 days driving the East Coast — Sydney to Cairns, mid-budget",
  "Family trip to the Great Barrier Reef in July, 2 adults + 2 teens",
  "Outback adventure: Uluru and Kakadu, 7 days from London",
  "Foodie long weekend in Melbourne",
];

export default function Chat() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
    setInput,
  } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error(err);
    },
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role !== "assistant" || !m.parts) continue;
      for (const p of m.parts) {
        if (
          p.type === "tool-invocation" &&
          p.toolInvocation.toolName === "finalizeItinerary" &&
          p.toolInvocation.state === "result"
        ) {
          const plan = (p.toolInvocation.args ?? {}) as Itinerary;
          setItinerary(plan);
          return;
        }
      }
    }
  }, [messages]);

  const isBusy = status === "submitted" || status === "streaming";

  const visibleMessages = useMemo(
    () => messages.filter((m) => m.role !== "system"),
    [messages],
  );

  function reset() {
    setMessages([]);
    setItinerary(null);
    setInput("");
  }

  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="px-6 py-4 border-b border-ink-200/70 bg-white/60 backdrop-blur flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-ink-900 leading-tight group-hover:text-rose-700 transition">
                Australia Trip Planner
              </div>
              <div className="text-xs text-ink-500">
                Your AI concierge for Australian trips
              </div>
            </div>
          </Link>
          <button
            onClick={reset}
            className="ml-auto inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-800 transition px-3 py-1.5 rounded-lg hover:bg-ink-100"
          >
            <RefreshCw className="w-4 h-4" /> New trip
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <div className="max-w-2xl mx-auto">
            {visibleMessages.length === 0 && <Welcome onPick={(p) => setInput(p)} />}

            <div className="space-y-4">
              {visibleMessages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {status === "submitted" && <ThinkingBubble />}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-ink-200/70 bg-white/70 backdrop-blur px-4 sm:px-8 py-4"
        >
          <div className="max-w-2xl mx-auto flex gap-2 items-end">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim()) handleSubmit();
                }
              }}
              rows={1}
              placeholder="Where shall we go? e.g. 5 nights in Lisbon next month"
              className="flex-1 resize-none rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300/60 focus:border-indigo-300 transition shadow-sm"
            />
            <button
              type="submit"
              disabled={isBusy || !input.trim()}
              className="rounded-2xl px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-medium shadow-md shadow-indigo-500/20 transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </form>
      </div>

      <aside className="hidden lg:block w-[420px] xl:w-[480px] border-l border-ink-200/70 bg-white/40 backdrop-blur shrink-0">
        <TripPanel itinerary={itinerary} />
      </aside>
    </div>
  );
}

function Welcome({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="text-center py-10 animate-fade-in">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
        <Sparkles className="w-7 h-7" />
      </div>
      <h1 className="mt-4 text-2xl font-semibold text-ink-900">
        Where to next?
      </h1>
      <p className="text-ink-500 mt-1">
        Tell me about your dream trip and I'll plan the whole thing.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 max-w-xl mx-auto">
        {STARTER_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => onPick(p)}
            className="text-left text-sm rounded-xl border border-ink-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 transition px-4 py-3 text-ink-700"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: any }) {
  const isUser = message.role === "user";
  const text =
    message.parts
      ?.filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("") ?? message.content;

  const toolParts =
    message.parts?.filter((p: any) => p.type === "tool-invocation") ?? [];

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-slide-up`}
    >
      <div className={`max-w-[88%] ${isUser ? "" : "w-full"}`}>
        {text && (
          <div
            className={
              isUser
                ? "bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm shadow-md shadow-indigo-500/20"
                : "bg-white border border-ink-200 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-ink-800 shadow-sm whitespace-pre-wrap"
            }
          >
            {text}
          </div>
        )}
        {toolParts.length > 0 && (
          <div className="mt-1">
            {toolParts.map((p: any, i: number) => (
              <ToolPart key={i} invocation={p.toolInvocation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ToolPart({ invocation }: { invocation: any }) {
  const status: "running" | "done" =
    invocation.state === "result" ? "done" : "running";
  const result = invocation.state === "result" ? invocation.result : undefined;
  const args = invocation.args ?? {};

  switch (invocation.toolName) {
    case "searchFlights":
      return <FlightToolCard args={args} result={result} status={status} />;
    case "searchHotels":
      return <HotelToolCard args={args} result={result} status={status} />;
    case "searchActivities":
      return <ActivityToolCard args={args} result={result} status={status} />;
    case "finalizeItinerary":
      return <FinalizeToolCard status={status} />;
    default:
      return null;
  }
}

function ThinkingBubble() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-white border border-ink-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <span className="typing-dot" />
        <span className="typing-dot ml-1" />
        <span className="typing-dot ml-1" />
      </div>
    </div>
  );
}
