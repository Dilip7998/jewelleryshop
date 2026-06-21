"use client";

import Link from "next/link";
import { useState } from "react";
import { Gem, Menu, Search, ShieldCheck, X } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQs" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-[#1c1408]/95 text-white shadow-premium backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={BRAND_NAME}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-white/5 text-gold-soft">
            <Gem size={22} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-2xl font-bold leading-5 tracking-wide text-gold-soft drop-shadow-[0_1px_8px_rgba(242,208,113,0.45)]">
              {BRAND_NAME}
            </span>
            <span className="text-xs uppercase tracking-[0.24em] text-champagne">
              Fine Jewellery
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-pearl/86 transition hover:text-gold-soft"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/catalog"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-pearl transition hover:border-gold hover:text-gold-soft"
            aria-label="Search catalog"
            title="Search catalog"
          >
            <Search size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-gold/45 px-4 py-2 text-sm font-semibold text-gold-soft transition hover:bg-gold hover:text-charcoal"
          >
            <ShieldCheck size={17} aria-hidden="true" />
            Admin
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-gold/15 bg-[#1c1408] px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-3" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-pearl transition hover:bg-white/10 hover:text-gold-soft"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-bold text-charcoal"
            >
              <ShieldCheck size={17} aria-hidden="true" />
              Owner Admin
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
