"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

type ProductDetailGalleryProps = {
  product: Product;
};

export function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-[1.5rem] border border-gold/18 bg-white shadow-premium">
        <div className="relative aspect-[4/5] w-full bg-pearl sm:aspect-[5/4]">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {product.images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition ${
              activeImage === image
                ? "border-gold ring-2 ring-gold/30"
                : "border-gold/18 hover:border-gold/50"
            }`}
            aria-label={`View product image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${product.name} image ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
