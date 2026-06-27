"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { categories as fallbackCategories, products as fallbackProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

const maxCatalogPrice = 250000;

export function CatalogClient() {
  const [items, setItems] = useState<Product[]>(fallbackProducts);
  const [categories, setCategories] = useState<string[]>(fallbackCategories);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(maxCatalogPrice);
  const [stockOnly, setStockOnly] = useState(false);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productData, categoryData]) => {
        if (productData.length > 0) setItems(productData);
        if (categoryData.length > 0) setCategories(categoryData);
      })
      .catch(() => {
        setItems(fallbackProducts);
        setCategories(fallbackCategories);
      });
  }, []);

  const filtered = useMemo(() => {
    return items.filter((product) => {
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      const matchesPrice = product.originalPrice <= maxPrice;
      const matchesStock = stockOnly ? product.inStock : true;
      return matchesQuery && matchesCategory && matchesPrice && matchesStock;
    });
  }, [category, items, maxPrice, query, stockOnly]);

  return (
    <section className="bg-ivory py-10 sm:py-14">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full min-w-0 overflow-hidden rounded-lg border border-gold/18 bg-white p-4 shadow-premium sm:p-5">
          <div className="grid min-w-0 gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <label className="relative block min-w-0">
              <span className="sr-only">Search products</span>
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/45"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 w-full rounded-full border border-gold/20 bg-ivory pl-11 pr-4 text-sm outline-none ring-gold/30 transition focus:ring-4"
                placeholder="Search rings, necklaces, diamonds..."
              />
            </label>

            <label className="flex items-center gap-3 rounded-full border border-gold/20 bg-ivory px-4 py-3 text-sm font-semibold text-charcoal">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(event) => setStockOnly(event.target.checked)}
                className="h-4 w-4 accent-gold"
              />
              In Stock
            </label>

            <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-ivory px-4 py-3 text-sm font-semibold text-charcoal">
              <SlidersHorizontal size={17} aria-hidden="true" />
              {filtered.length} Items
            </div>
          </div>

          <div className="mt-5 flex min-w-0 flex-wrap gap-2">
            {["All", ...categories].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  category === item
                    ? "bg-charcoal text-gold-soft"
                    : "border border-gold/24 bg-white text-charcoal hover:bg-gold/12"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-2">
            <div className="flex items-center justify-between text-sm font-semibold text-charcoal">
              <span>Maximum price</span>
              <span>{formatCurrency(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max={maxCatalogPrice}
              step="5000"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-full min-w-0 accent-gold"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-lg border border-gold/18 bg-white p-8 text-center shadow-premium">
            <p className="font-display text-2xl text-charcoal">
              No products match this filter.
            </p>
            <p className="mt-2 text-sm text-ink/60">
              Adjust category, search, stock, or price to view more pieces.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
