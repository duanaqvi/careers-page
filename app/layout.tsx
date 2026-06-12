import type { Metadata } from "next";
import "./globals.css";
import RevealInit from "@/components/RevealInit";

const BASE_URL = "https://imagine.art";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Careers at ImagineArt — Build AI for 800K+ Daily Creators",
    template: "%s | ImagineArt Careers",
  },
  description:
    "ImagineArt is hiring engineers, designers and marketers to build the world's leading creative AI platform. 800K+ daily active users, $35M+ ARR, bootstrapped from Pakistan. Browse open roles.",
  keywords: [
    "ImagineArt jobs", "ImagineArt careers", "creative AI jobs",
    "AI startup hiring", "generative AI careers", "Pakistan tech jobs",
    "remote AI engineer jobs", "imagine art hiring", "ML engineer jobs",
  ],
  authors: [{ name: "ImagineArt", url: BASE_URL }],
  creator: "ImagineArt",
  publisher: "ImagineArt",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/careers`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/careers`,
    siteName: "ImagineArt",
    locale: "en_US",
    title: "Careers at ImagineArt — Build AI for 800K+ Daily Creators",
    description:
      "Join the small team building the world's leading creative AI platform. Open roles in engineering, design, and marketing.",
  },
  twitter: {
    card: "summary",
    site: "@imagine_art",
    creator: "@imagine_art",
    title: "Careers at ImagineArt — Build AI for 800K+ Creators",
    description:
      "Join the small team building the world's leading creative AI platform. Browse open roles.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
