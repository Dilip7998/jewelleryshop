export const BRAND_NAME = "Pooja Jewellers";
export const PHONE_NUMBER = "919999999999";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const CONTACT_EMAIL = "hello@poojajewellers.example";
export const CONTACT_PHONE_DISPLAY = "+91 99999 99999";
export const STORE_ADDRESS = "Bijulia Talaab, Ramgarh, Jharkhand";
export const STORE_MAP_QUERY = STORE_ADDRESS;
export const INSTAGRAM_URL = "https://example.com/instagram";
export const FACEBOOK_URL = "https://example.com/facebook";
export const X_URL = "https://example.com/x";
export const WHATSAPP_MESSAGE =
  "Hello, I am interested in your jewellery collection.";

export const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const phoneCallUrl = `tel:+${PHONE_NUMBER}`;

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
