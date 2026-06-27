import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="luxury-gradient text-white sm:min-h-[78vh]"
      style={{
        "--hero-image":
          "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=90')"
      } as React.CSSProperties}
    >
      <div className="mx-auto flex min-h-[calc(100svh-64px)] max-w-7xl items-center px-4 py-12 sm:min-h-[78vh] sm:px-6 sm:py-16 lg:px-8">
        <div className="w-full min-w-0 max-w-3xl animate-fade-up overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-soft">
            Festive collection now live
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.65rem,12vw,3.5rem)] leading-[1.02] text-white sm:mt-5 sm:text-6xl lg:text-7xl">
            Jewellery Crafted for Moments That Stay
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-pearl/82 sm:text-lg">
            Explore refined gold, diamond, silver, and bridal pieces with
            transparent pricing, curated offers, and direct boutique assistance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-base font-bold text-charcoal shadow-glow transition hover:-translate-y-1 hover:bg-gold-soft sm:w-auto sm:text-sm"
            >
              Shop Now
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-bold text-white transition hover:border-gold hover:bg-white/10 sm:w-auto sm:text-sm"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Contact Us
            </a>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-3 gap-2 sm:mt-12 sm:gap-3">
            {[
              ["Up to 22%", "Diamond weekend"],
              ["0% Making", "Selected designs"],
              ["New", "Bridal arrivals"]
            ].map(([value, label]) => (
              <div key={label} className="min-w-0 border-l border-gold/55 pl-2.5 sm:pl-4">
                <p className="font-display text-2xl text-gold-soft sm:text-3xl">{value}</p>
                <p className="mt-1 text-[0.65rem] uppercase leading-4 tracking-[0.1em] text-pearl/64 sm:text-xs sm:tracking-[0.18em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-y border-gold/18 bg-charcoal/88">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-pearl sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 font-semibold">
            <CalendarDays size={17} className="text-gold-soft" aria-hidden="true" />
            Seasonal private previews open this week.
          </span>
          <Link href="/contact" className="font-bold text-gold-soft hover:text-white">
            Book an appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
