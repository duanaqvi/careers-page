import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Careers — ImagineArt",
  description:
    "Join the small team building AI that's already in the hands of 100M+ creators. Images, video, music and editing — all on one canvas.",
  openGraph: {
    title: "Careers — ImagineArt",
    description:
      "Join the small team building AI for 100M+ creators. See our open roles.",
    url: "https://imagine.art/careers",
    siteName: "ImagineArt",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
