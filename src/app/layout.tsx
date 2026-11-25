import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Noto_Serif_Devanagari, Noto_Sans_Devanagari, Playfair_Display, Tangerine } from "next/font/google";
import "./globals.css";
import { RESTAURANT_DATA } from "@/data/restaurant";

const tangerine = Tangerine({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari-serif",
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari-sans",
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0E241B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hotelvatika.in"),
  title: `${RESTAURANT_DATA.name} | Parbhani — Authentic Vegetarian Cuisine & Celebration Halls`,
  description: `${RESTAURANT_DATA.tagline.en}. Fine dining, Punjabi specialities, clay tandoor breads, and banquet halls on Basmat Road, Parbhani.`,
  keywords: [
    "Hotel Vatika Parbhani",
    "Best restaurant in Parbhani",
    "Pure veg restaurant Parbhani",
    "Banquet hall Parbhani",
    "Basmat Road Parbhani restaurant",
    "Vatika Special Veg",
    "Paneer Angara Parbhani",
    "Birthday party hall Parbhani",
  ],
  authors: [{ name: "Hotel Vatika" }],
  openGraph: {
    title: `${RESTAURANT_DATA.name} | Parbhani`,
    description: "Photorealistic Culinary Heritage & Grand Celebration Halls in Parbhani, Maharashtra.",
    url: "https://hotelvatika.in",
    siteName: RESTAURANT_DATA.name,
    images: [
      {
        url: "/assets/photos/food/paneer-angara.webp",
        width: 1920,
        height: 1080,
        alt: "Hotel Vatika Signature Cuisine",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESTAURANT_DATA.name} | Parbhani`,
    description: "Fine Vegetarian Dining & Grand Celebration Banquet Halls in Parbhani.",
    images: ["/assets/photos/food/paneer-angara.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${tangerine.variable} ${playfair.variable} ${cormorant.variable} ${inter.variable} ${notoSerifDevanagari.variable} ${notoSansDevanagari.variable} dark`}
    >
      <body className="bg-[#0D221A] text-[#F6F1E8] font-sans antialiased selection:bg-[#CBB079]/30 selection:text-[#F6F1E8] min-h-screen overflow-x-hidden">
        {/* Subtle organic texture overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
