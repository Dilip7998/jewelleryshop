"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { subscribeNewsletter } from "@/lib/api";

export function Newsletter() {
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");

    try {
      await subscribeNewsletter(email);
      setMessage("Subscribed to collection updates.");
      event.currentTarget.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Subscription failed.");
    }
  };

  return (
    <section className="bg-charcoal py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold-soft">
            Newsletter
          </p>
          <h2 className="mt-3 font-display text-4xl">Private collection alerts</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-pearl/72">
            Receive new arrival previews, festival offers, and appointment-only
            collection updates.
          </p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            className="rounded-full border border-white/20 bg-white px-5 py-3 text-sm text-charcoal outline-none ring-gold/35 transition focus:ring-4"
            placeholder="Email address"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-charcoal transition hover:bg-gold-soft"
          >
            <Mail size={17} aria-hidden="true" />
            Subscribe
          </button>
          {message ? (
            <p className="text-sm font-semibold text-gold-soft sm:col-span-2">
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
