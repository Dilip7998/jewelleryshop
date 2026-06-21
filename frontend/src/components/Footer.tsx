import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { BRAND_NAME, whatsappUrl, CONTACT_EMAIL, STORE_ADDRESS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-charcoal text-pearl">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl text-white">{BRAND_NAME}</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-pearl/72">
            Premium gold, diamond, silver, and bridal jewellery with transparent
            pricing, curated offers, and direct boutique support.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "Twitter" }
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold-soft transition hover:border-gold hover:bg-gold hover:text-charcoal"
                aria-label={label}
                title={label}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-soft">
            Shop
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-pearl/74">
            <Link href="/catalog" className="hover:text-gold-soft">
              Gold Jewellery
            </Link>
            <Link href="/catalog" className="hover:text-gold-soft">
              Diamond Jewellery
            </Link>
            <Link href="/catalog" className="hover:text-gold-soft">
              Rings
            </Link>
            <Link href="/catalog" className="hover:text-gold-soft">
              Bridal Collection
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-soft">
            Company
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-pearl/74">
            <Link href="/about" className="hover:text-gold-soft">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-gold-soft">
              Contact Us
            </Link>
            <Link href="/privacy" className="hover:text-gold-soft">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-soft">
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-soft">
            Visit
          </h3>
          <div className="mt-4 grid gap-3 text-sm text-pearl/74">
            <a href={whatsappUrl} className="flex gap-2 hover:text-gold-soft">
              <Phone size={16} aria-hidden="true" />
              WhatsApp Boutique
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex gap-2 hover:text-gold-soft"
            >
              <Mail size={16} aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
            <span className="flex gap-2">
              <MapPin size={16} aria-hidden="true" />
              {STORE_ADDRESS}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-pearl/60">
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
