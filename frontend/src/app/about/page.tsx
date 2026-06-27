import Image from "next/image";
import type { Metadata } from "next";
import { Award, Gem, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Aurum Royale, a premium jewellery boutique for gold, diamond, silver, and bridal collections."
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-soft">
              About {BRAND_NAME}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] sm:text-6xl">
              A boutique built on craftsmanship and trust.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-pearl/74">
              We curate timeless jewellery for weddings, gifting, and everyday
              elegance with careful finishing, transparent communication, and
              personal consultation.
            </p>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-gold/24 sm:min-h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1400&q=88"
              alt="Luxury jewellery craftsmanship"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Standards"
            title="Every detail is handled with care"
            copy="From product consultation to final delivery, the boutique process is designed for confidence."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: Gem,
                title: "Curated materials",
                copy: "Gold, diamond, sterling silver, pearl, and gemstone pieces chosen for lasting appeal."
              },
              {
                icon: ShieldCheck,
                title: "Transparent buying",
                copy: "Clear pricing, visible discounts, product details, and direct enquiry support."
              },
              {
                icon: Award,
                title: "Occasion ready",
                copy: "Collections shaped for bridal styling, festive gifting, and personal milestones."
              }
            ].map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="rounded-lg border border-gold/18 bg-white p-6 shadow-premium"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/12 text-gold-deep">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-3xl text-charcoal">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-ink/66">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
