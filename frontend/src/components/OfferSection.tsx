"use client";

import { useEffect, useState } from "react";
import { fetchOffers } from "@/lib/api";
import { offers } from "@/lib/data";
import type { Offer } from "@/lib/types";
import { OfferCard } from "./OfferCard";
import { SectionHeading } from "./SectionHeading";

export function OfferSection() {
  const [items, setItems] = useState<Offer[]>(offers);

  useEffect(() => {
    fetchOffers()
      .then((data) => data.length > 0 && setItems(data))
      .catch(() => undefined);
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Offers"
          title="Festival Offers, Limited Time Discounts, New Arrivals"
          copy="Discover seasonal savings on selected gold, diamond, and bridal designs."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((offer) => (
            <OfferCard key={offer._id || offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
