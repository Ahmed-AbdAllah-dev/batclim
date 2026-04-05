// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // This should be the correct path

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