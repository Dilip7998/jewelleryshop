import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[68vh] items-center bg-ivory px-4 py-16 text-center">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-deep">404</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">This page could not be found.</h1>
        <p className="mt-4 text-sm leading-6 text-ink/64">
          Return to the boutique or browse the complete jewellery catalog.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="rounded-full bg-charcoal px-6 py-3 text-sm font-bold text-gold-soft">Home</Link>
          <Link href="/catalog" className="rounded-full border border-gold/50 px-6 py-3 text-sm font-bold text-charcoal">View Catalog</Link>
        </div>
      </div>
    </section>
  );
}
