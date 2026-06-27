import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Jewellery Catalog",
  description:
    "Browse gold jewellery, diamond jewellery, silver jewellery, rings, necklaces, earrings, and bangles with search and price filters."
};

export default function CatalogPage() {
  return (
    <>
      <section className="bg-charcoal px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-7xl overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-soft">
            Catalog
          </p>
          <h1 className="mt-4 max-w-3xl break-words font-display text-4xl leading-[1.1] sm:text-6xl">
            Explore jewellery by category, price, and availability.
          </h1>
        </div>
      </section>
      <CatalogClient />
    </>
  );
}
