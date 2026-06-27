import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BRAND_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | Premium Jewellery Boutique`,
    template: `%s | ${BRAND_NAME}`
  },
  description:
    "Luxury gold, diamond, silver, bridal, ring, necklace, earring, and bangle collections with seasonal offers and direct WhatsApp enquiries.",
  keywords: [
    "jewellery shop",
    "gold jewellery",
    "diamond jewellery",
    "rings",
    "necklaces",
    "earrings",
    "bangles",
    "bridal jewellery"
  ],
  openGraph: {
    title: `${BRAND_NAME} | Premium Jewellery Boutique`,
    description:
      "Explore premium jewellery collections, offers, and direct enquiries.",
    type: "website",
    siteName: BRAND_NAME,
    locale: "en_IN"
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1c1408"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
