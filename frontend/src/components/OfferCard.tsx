import { ArrowRight, Timer } from "lucide-react";
import Link from "next/link";
import type { Offer } from "@/lib/types";

type OfferCardProps = {
  offer: Offer;
};

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <article className="shine-border group rounded-lg bg-charcoal p-6 text-white shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-gold/18 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gold-soft">
          {offer.type}
        </span>
        <Timer className="text-gold-soft" size={20} aria-hidden="true" />
      </div>
      <h3 className="mt-7 font-display text-3xl leading-9">{offer.title}</h3>
      <p className="mt-3 text-sm leading-6 text-pearl/72">{offer.description}</p>
      <div className="mt-8 flex items-end justify-between gap-5">
        <div>
          <p className="font-display text-5xl leading-none text-gold-soft">
            {offer.discountPercent}%
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-pearl/56">
            Savings
          </p>
        </div>
        <Link
          href="/catalog"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-charcoal transition group-hover:translate-x-1"
          aria-label={offer.cta}
          title={offer.cta}
        >
          <ArrowRight size={19} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
