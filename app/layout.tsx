import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Australia Trip Planner — Plan your perfect Aussie adventure",
  description:
    "AI-powered trip planning for Australia. Build personalised itineraries across Sydney, the Great Barrier Reef, Uluru, Tasmania and beyond — flights, stays and experiences in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
