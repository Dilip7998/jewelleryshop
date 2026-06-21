import Image from "next/image";
import { Instagram } from "lucide-react";
import { products } from "@/lib/data";

export function InstagramGallery() {
  const gallery = products.slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold-deep">
              Social gallery
            </p>
            <h2 className="mt-3 font-display text-4xl text-charcoal">
              Follow the boutique edit
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-sm font-bold text-charcoal transition hover:bg-gold"
          >
            <Instagram size={17} aria-hidden="true" />
            Instagram
          </a>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {gallery.map((product) => (
            <div
              key={product.id}
              className="relative aspect-square overflow-hidden rounded-lg bg-pearl"
            >
              <Image
                src={product.images[0]}
                alt={`${product.name} gallery image`}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
