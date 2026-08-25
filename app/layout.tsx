import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyEPF – Simpler EPF Claims & Status",
  description: "A clearer way to check your EPF balance, track claims and understand next steps. Independent hackathon prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}