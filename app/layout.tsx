import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "JANSEVA — One place to get government work done",
  description:
    "Independent prototype: tell us what you need, we guide you through the citizen journey. Not an official government service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
