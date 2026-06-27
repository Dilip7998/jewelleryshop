import { STORE_MAP_QUERY } from "@/lib/constants";

export function ContactMap() {
  return (
    <div className="overflow-hidden rounded-lg border border-gold/18 shadow-premium">
      <iframe
        title="Store location map"
        src={`https://www.google.com/maps?q=${encodeURIComponent(STORE_MAP_QUERY)}&output=embed`}
        className="h-[280px] w-full sm:h-[360px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
