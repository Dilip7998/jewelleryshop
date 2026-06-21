export const BRAND_NAME = "Pooja Jewellers";
export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

// ── Contact details — edit here to update the whole site ──────────────────────
export const CONTACT_EMAIL = "hello@poojajewellers.example";
export const STORE_ADDRESS = "Bijulia Talaab, Ramgarh, Jharkhand";
// Used in the Google Maps embed — adjust to match your exact location
export const STORE_MAP_QUERY = "Bijulia Talaab, Ramgarh, Jharkhand";
export const WHATSAPP_MESSAGE =
  "Hello, I am interested in your jewellery collection.";

export const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

export const discountedPrice = (
  originalPrice: number,
  discountPercent: number
) => Math.round(originalPrice - (originalPrice * discountPercent) / 100);
