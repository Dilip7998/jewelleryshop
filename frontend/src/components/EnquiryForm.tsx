"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { submitEnquiry } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({ productId }: { productId?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(event.currentTarget);
    const input = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      productId
    };

    try {
      await submitEnquiry(input);
      event.currentTarget.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit enquiry");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-charcoal">
          Name
          <input
            name="name"
            required
            className="rounded-md border border-gold/24 bg-white px-4 py-3 text-sm outline-none ring-gold/30 transition focus:ring-4"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-charcoal">
          Phone Number
          <input
            name="phone"
            required
            className="rounded-md border border-gold/24 bg-white px-4 py-3 text-sm outline-none ring-gold/30 transition focus:ring-4"
            placeholder="+91 98765 43210"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-charcoal">
        Email
        <input
          name="email"
          type="email"
          required
          className="rounded-md border border-gold/24 bg-white px-4 py-3 text-sm outline-none ring-gold/30 transition focus:ring-4"
          placeholder="you@example.com"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-charcoal">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-md border border-gold/24 bg-white px-4 py-3 text-sm outline-none ring-gold/30 transition focus:ring-4"
          placeholder="Tell us which collection or product you are interested in."
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3 text-base font-bold text-gold-soft transition hover:bg-gold hover:text-charcoal disabled:cursor-wait disabled:opacity-60 sm:w-fit sm:text-sm"
      >
        <Send size={16} aria-hidden="true" />
        {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
      </button>
      {status === "success" ? (
        <p className="text-sm font-semibold text-emerald-700">
          Enquiry submitted. The boutique team will contact you shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm font-semibold text-red-700">{error}</p>
      ) : null}
    </form>
  );
}
