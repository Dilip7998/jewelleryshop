import { Award, BadgeCheck, Gem, LockKeyhole, Truck } from "lucide-react";

const badges = [
  { icon: BadgeCheck, label: "Certified Stones" },
  { icon: LockKeyhole, label: "Secure Enquiry" },
  { icon: Award, label: "Hallmark Quality" },
  { icon: Truck, label: "Insured Delivery" },
  { icon: Gem, label: "Custom Designs" }
];

export function TrustBadges() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-3 sm:grid-cols-3 sm:gap-3 sm:px-6 lg:grid-cols-5 lg:px-8">
        {badges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-lg border border-gold/16 bg-ivory px-3 py-3.5 sm:gap-3 sm:px-4 sm:py-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold-deep">
              <Icon size={19} aria-hidden="true" />
            </span>
            <span className="text-[0.8rem] font-bold leading-4 text-charcoal sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
