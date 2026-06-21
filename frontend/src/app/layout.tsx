import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
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
    type: "website"
  }
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
