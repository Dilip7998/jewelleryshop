import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { ProductDetailGallery } from "@/components/ProductDetailGallery";
import { ProductWhatsAppShareButton } from "@/components/ProductWhatsAppShareButton";
import { fetchProducts } from "@/lib/api";
import {
  discountedPrice,
  formatCurrency,
  SITE_URL,
  phoneCallUrl,
  whatsappUrl
} from "@/lib/constants";
import { products as fallbackProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

function productKey(product: Product) {
  return product._id || product.id || product.name.toLowerCase().replace(/\s+/g, "-");
}

async function loadProduct(productId: string) {
  try {
    const liveProducts = await fetchProducts();
    const liveMatch = liveProducts.find((product) => productKey(product) === productId);
    if (liveMatch) return liveMatch;
  } catch {
    // Fall back to bundled reference data below.
  }

  return fallbackProducts.find((product) => productKey(product) === productId) || null;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = await loadProduct(decodeURIComponent(productId));
  if (!product) {
    return {
      title: "Product Details",
      description: "Browse jewellery images, pricing, and product details."
    };
  }

  return {
    title: product.name,
    description: product.description
  };
}

export default async function ProductDetailsPage({
  params
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId: rawProductId } = await params;
  const productId = decodeURIComponent(rawProductId);
  const product = await loadProduct(productId);

  if (!product) notFound();

  const price = discountedPrice(product.originalPrice, product.discountPercent);
  const productPageUrl = `${SITE_URL}/catalog/${productId}`;
  const whatsappMessage = [
    "Hello, I want to know more about this product.",
    `Product: ${product.name}`,
    `Category: ${product.category}`,
    `Price: ${formatCurrency(price)}`,
    product.material ? `Material: ${product.material}` : "",
    product.sku ? `SKU: ${product.sku}` : "",
    `Link: ${productPageUrl}`,
    product.images[0] ? `Image: ${product.images[0]}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="bg-ivory py-6 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal transition hover:text-gold-deep"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to catalog
            </Link>

            <ProductDetailGallery product={product} />
          </div>

          <div className="rounded-[1.5rem] border border-gold/18 bg-white p-5 shadow-premium sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
                {product.category}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  product.inStock
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-charcoal text-pearl"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/68 sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 rounded-[1.25rem] bg-ivory p-4">
              <div className="flex flex-wrap items-end gap-3">
                <p className="text-sm text-ink/46 line-through">
                  {formatCurrency(product.originalPrice)}
                </p>
                <p className="font-display text-4xl text-charcoal">
                  {formatCurrency(price)}
                </p>
                <span className="rounded-full bg-charcoal px-3 py-1 text-xs font-bold text-gold-soft">
                  {product.discountPercent}% OFF
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Hallmark Certified", "Certified quality"],
                ["Free Delivery", "Across service areas"],
                ["Easy Returns", "Support from the boutique"]
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-[1rem] border border-gold/18 bg-ivory p-4">
                  <p className="text-sm font-bold text-charcoal">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-ink/60">{subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  Material
                </p>
                <p className="mt-2 text-sm text-ink/72">{product.material || "Not specified"}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  SKU
                </p>
                <p className="mt-2 text-sm text-ink/72">{product.sku || "Not specified"}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={phoneCallUrl}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-charcoal px-5 text-sm font-bold text-gold-soft transition hover:bg-gold hover:text-charcoal"
              >
                <Phone size={16} aria-hidden="true" />
                Call Boutique
              </a>
              <ProductWhatsAppShareButton
                title={product.name}
                shareText={whatsappMessage}
                shareUrl={productPageUrl}
                imageUrl={product.images[0]}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
