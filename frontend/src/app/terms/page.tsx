import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for jewellery offers and enquiries."
};

const sections: [string, string][] = [
  [
    "Product information",
    "Product images, prices, discounts, and availability are shown for enquiry purposes and may change based on stock, customization, taxes, and market rates."
  ],
  [
    "Offers",
    "Festival offers, limited-time discounts, and new-arrival promotions can be updated, paused, or withdrawn by the shop owner."
  ],
  [
    "Enquiries",
    "Submitting an enquiry does not reserve stock unless confirmed by the boutique team."
  ],
  [
    "Payments and delivery",
    "Payment, delivery, insurance, exchange, and customization terms should be confirmed directly before purchase."
  ],
  [
    "Website use",
    "Admin access is restricted to authorized shop staff. Unauthorized use of admin APIs or dashboard features is prohibited."
  ]
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-charcoal px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-soft">
            Terms
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight sm:text-6xl">
            Terms & Conditions
          </h1>
        </div>
      </section>
      <section className="bg-ivory py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5">
            {sections.map(([heading, copy]) => (
              <article
                key={heading}
                className="rounded-lg border border-gold/18 bg-white p-6 shadow-premium"
              >
                <h2 className="font-display text-2xl text-charcoal">{heading}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/68">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
