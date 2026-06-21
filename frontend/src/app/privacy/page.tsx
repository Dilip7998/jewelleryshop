import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for jewellery enquiries and newsletter data."
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Privacy Policy"
      sections={[
        [
          "Information we collect",
          "We collect information submitted through enquiry forms, newsletter subscriptions, WhatsApp interactions, and admin-managed product workflows."
        ],
        [
          "How we use information",
          "Contact details are used for product enquiries, appointment coordination, offer updates, and customer support."
        ],
        [
          "Data storage",
          "Production deployments should store enquiries and admin records in MongoDB with server-side access control."
        ],
        [
          "Third parties",
          "Image storage, email notifications, WhatsApp, analytics, and maps may involve external providers configured by the shop owner."
        ],
        [
          "Contact",
          "Customers can request correction or deletion of submitted information by contacting the boutique."
        ]
      ]}
    />
  );
}

function PolicyPage({
  eyebrow,
  title,
  sections
}: {
  eyebrow: string;
  title: string;
  sections: [string, string][];
}) {
  return (
    <>
      <section className="bg-charcoal px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-soft">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight sm:text-6xl">
            {title}
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
