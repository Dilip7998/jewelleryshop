import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import {
  discountedPrice,
  formatCurrency,
  SITE_URL,
  whatsappUrl
} from "@/lib/constants";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const price = discountedPrice(product.originalPrice, product.discountPercent);
  const productId = product._id || product.id || encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, "-"));
  const productHref = `/catalog/${productId}`;
  const productUrl = `${SITE_URL}${productHref}`;
  const message = encodeURIComponent(
    [
      "Hello, I want to know more about this product.",
      `Product: ${product.name}`,
      `Category: ${product.category}`,
      `Price: ${formatCurrency(price)}`,
      `Image: ${product.images[0] || ""}`,
      `Link: ${productUrl}`
    ]
      .filter(Boolean)
      .join("\n")
  );
  const productWhatsappUrl = whatsappUrl.replace(
    /text=.*/,
    `text=${message}`
  );

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-gold/18 bg-white shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link href={productHref} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-pearl">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 rounded-full bg-charcoal px-3 py-1 text-xs font-bold text-gold-soft">
            {product.discountPercent}% OFF
          </div>
          <div
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
              product.inStock
                ? "bg-white/90 text-emerald-700"
                : "bg-charcoal/88 text-pearl"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
            {product.category}
          </p>
          {product.newArrival ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-ink/70">
              <Sparkles size={14} aria-hidden="true" />
              New
            </span>
          ) : null}
        </div>
        <Link href={productHref}>
          <h3 className="mt-2 font-display text-2xl leading-7 text-charcoal transition group-hover:text-gold-deep">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/64">
          {product.description}
        </p>

        <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-ink/46 line-through">
              {formatCurrency(product.originalPrice)}
            </p>
            <p className="text-xl font-bold text-charcoal">
              {formatCurrency(price)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={productHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-2 text-sm font-bold text-charcoal transition hover:bg-gold/10"
            >
              View Details
            </Link>
            <a
              href={productWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-sm font-bold text-gold-soft transition hover:bg-gold hover:text-charcoal"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Enquire
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
