import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about jewellery pricing, discounts, availability, enquiries, and appointments."
};

const faqs = [
  {
    question: "Are the displayed prices final?",
    answer:
      "Displayed prices include the current promotional discount. Final billing may vary by customization, size, tax, hallmarking, and making charges."
  },
  {
    question: "Can I enquire before visiting the shop?",
    answer:
      "Yes. Use WhatsApp or the enquiry form to ask about product availability, appointments, and customization."
  },
  {
    question: "Can products go out of stock?",
    answer:
      "Yes. The admin dashboard allows the boutique owner to mark each item as in stock or out of stock."
  },
  {
    question: "Do you support custom jewellery?",
    answer:
      "Custom requests can be discussed through the enquiry form or WhatsApp depending on design, budget, and delivery timeline."
  },
  {
    question: "How are offers applied?",
    answer:
      "Festival, limited-time, and new-arrival offers are shown on selected products and campaign sections."
  }
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-charcoal px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-soft">
            FAQs
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] sm:text-6xl">
            Common questions about jewellery enquiries.
          </h1>
        </div>
      </section>
      <section className="bg-ivory py-16 sm:py-20">
        <div className="mx-auto grid max-w-4xl gap-4 px-4 sm:px-6 lg:px-8">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-lg border border-gold/18 bg-white p-6 shadow-premium"
            >
              <h2 className="font-display text-2xl text-charcoal">
                {faq.question}
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/68">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
