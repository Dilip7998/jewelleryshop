export const BRAND_NAME = "Pooja Jewellers";
export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

// All placeholder business details can be replaced through frontend env variables.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@poojajewellers.example";
export const CONTACT_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 99999 99999";
export const STORE_ADDRESS =
  process.env.NEXT_PUBLIC_STORE_ADDRESS ||
  "Bijulia Talaab, Ramgarh, Jharkhand";
export const STORE_MAP_QUERY =
  process.env.NEXT_PUBLIC_STORE_MAP_QUERY || STORE_ADDRESS;
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  "https://example.com/instagram";
export const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ||
  "https://example.com/facebook";
export const X_URL =
  process.env.NEXT_PUBLIC_X_URL || "https://example.com/x";
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
