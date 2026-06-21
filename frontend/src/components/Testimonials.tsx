import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client trust"
          title="Designed for confident purchases"
          copy="Transparent communication, appointment support, and reliable follow-up."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-lg border border-gold/18 bg-white p-6 shadow-premium"
            >
              <div className="flex items-center justify-between">
                <Quote className="text-gold" size={28} aria-hidden="true" />
                <div className="flex text-gold">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-5 text-base leading-7 text-ink/72">
                “{testimonial.quote}”
              </p>
              <div className="mt-6">
                <p className="font-bold text-charcoal">{testimonial.name}</p>
                <p className="text-sm text-ink/55">{testimonial.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
