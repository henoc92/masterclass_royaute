import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Instrument Serif — serif moderne et simple, italique éditorial
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://masterclass-royaute.com"),
  title: {
    default: "Masterclass Royauté — Impacter et diriger en milieu hostile",
    template: "%s · Masterclass Royauté",
  },
  description:
    "Une formation chrétienne de leadership en 12 modules, fondée sur les enseignements de l'Apôtre Yves Castanou. Tu as été fait roi. Il est temps de régner.",
  keywords: [
    "Masterclass Royauté",
    "Yves Castanou",
    "leadership chrétien",
    "formation",
    "ICC",
    "dirigeants chrétiens",
  ],
  authors: [{ name: "Masterclass Royauté" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://masterclass-royaute.com",
    siteName: "Masterclass Royauté",
    title: "Masterclass Royauté — Impacter et diriger en milieu hostile",
    description:
      "12 modules · 24 sessions · ~12 heures. Une formation dense, pensée pour les dirigeants.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masterclass Royauté",
    description: "Tu as été fait roi. Il est temps de régner.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
