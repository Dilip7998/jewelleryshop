"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProducts() {
  const [items, setItems] = useState<Product[]>(products);

  useEffect(() => {
    fetchProducts()
      .then((data) => data.length > 0 && setItems(data))
      .catch(() => undefined);
  }, []);

  const markedFeatured = items.filter((product) => product.featured);
  const featured = (markedFeatured.length > 0 ? markedFeatured : items).slice(0, 4);

  return (
    <section className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Signature pieces"
            title="Featured Products"
            copy="A curated selection from our gold, diamond, and bridal lines."
          />
          <Link
            href="/catalog"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-sm font-bold text-charcoal transition hover:bg-gold hover:text-charcoal"
          >
            View Catalog
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
