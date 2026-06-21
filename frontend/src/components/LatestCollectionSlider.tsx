"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/lib/data";

export function LatestCollectionSlider() {
  const latest = useMemo(
    () => products.filter((product) => product.newArrival || product.featured),
    []
  );
  const [index, setIndex] = useState(0);
  const active = latest[index];

  const changeSlide = (direction: number) => {
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) return latest.length - 1;
      if (next >= latest.length) return 0;
      return next;
    });
  };

  return (
    <section className="bg-charcoal py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-soft">
            Latest collection
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Bridal and evening pieces with modern finishing.
          </h2>
          <p className="mt-5 text-base leading-7 text-pearl/72">
            Browse new arrivals with high-polish finishes, refined settings, and
            versatile silhouettes for gifting, weddings, and occasions.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => changeSlide(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-gold-soft transition hover:border-gold hover:bg-gold hover:text-charcoal"
              aria-label="Previous collection item"
              title="Previous"
            >
              <ChevronLeft size={19} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => changeSlide(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-gold-soft transition hover:border-gold hover:bg-gold hover:text-charcoal"
              aria-label="Next collection item"
              title="Next"
            >
              <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[460px] overflow-hidden rounded-lg border border-gold/24 bg-white/5">
          <Image
            src={active.images[0]}
            alt={active.name}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal via-charcoal/78 to-transparent p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">
              {active.category}
            </p>
            <h3 className="mt-2 font-display text-3xl text-white">
              {active.name}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-pearl/72">
              {active.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
