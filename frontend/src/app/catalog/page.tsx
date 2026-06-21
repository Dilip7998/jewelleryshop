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
      <section className="bg-charcoal px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-soft">
            Catalog
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight sm:text-6xl">
            Explore jewellery by category, price, and availability.
          </h1>
        </div>
      </section>
      <CatalogClient />
    </>
  );
}
