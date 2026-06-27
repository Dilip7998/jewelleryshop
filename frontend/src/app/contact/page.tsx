import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactMap } from "@/components/ContactMap";
import { EnquiryForm } from "@/components/EnquiryForm";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  STORE_ADDRESS,
  whatsappUrl
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact the jewellery boutique, send an enquiry, visit the store, or start a WhatsApp chat."
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-charcoal px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-soft">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] sm:text-6xl">
            Visit the boutique or send a private enquiry.
          </h1>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="rounded-lg border border-gold/18 bg-white p-6 shadow-premium">
              <h2 className="font-display text-3xl text-charcoal">
                Boutique Details
              </h2>
              <div className="mt-6 grid gap-4 text-sm text-ink/70">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 gap-3 break-all hover:text-gold-deep"
                >
                  <Phone size={18} className="text-gold-deep" aria-hidden="true" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex min-w-0 gap-3 break-all hover:text-gold-deep"
                >
                  <Mail size={18} className="text-gold-deep" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
                <span className="flex gap-3">
                  <MapPin size={18} className="text-gold-deep" aria-hidden="true" />
                  {STORE_ADDRESS}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <ContactMap />
            </div>
          </div>

          <div className="rounded-lg border border-gold/18 bg-white p-6 shadow-premium">
            <h2 className="font-display text-3xl text-charcoal">
              Enquiry Form
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink/62">
              Share your contact details and preferred jewellery requirement.
            </p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
