import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Australia Trip Planner — Book tours from local operators",
  description:
    "Australia's fair tour marketplace. Book authentic experiences direct from local operators — they pay just 15% commission on confirmed bookings.",
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
