import type { Category, Offer, Product } from "./types";

export const categories: Category[] = [
  "Gold Jewellery",
  "Diamond Jewellery",
  "Silver Jewellery",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bangles"
];

export const products: Product[] = [
  {
    id: "gold-temple-necklace",
    name: "Temple Gold Necklace",
    category: "Gold Jewellery",
    originalPrice: 184999,
    discountPercent: 12,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Hand-finished 22K inspired necklace with a traditional motif.",
    material: "22K Gold Finish",
    sku: "AR-GN-101",
    inStock: true,
    featured: true
  },
  {
    id: "diamond-halo-ring",
    name: "Diamond Halo Ring",
    category: "Diamond Jewellery",
    originalPrice: 132000,
    discountPercent: 18,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "A luminous halo setting crafted for engagement and gifting.",
    material: "18K Gold, Certified Diamonds",
    sku: "AR-DR-204",
    inStock: true,
    featured: true,
    newArrival: true
  },
  {
    id: "silver-floral-earrings",
    name: "Silver Floral Earrings",
    category: "Silver Jewellery",
    originalPrice: 15999,
    discountPercent: 20,
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Lightweight sterling silver floral earrings for daily elegance.",
    material: "925 Sterling Silver",
    sku: "AR-SE-302",
    inStock: true
  },
  {
    id: "emerald-stacking-ring",
    name: "Emerald Stacking Ring",
    category: "Rings",
    originalPrice: 45999,
    discountPercent: 10,
    images: [
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1596944924591-1e64760c2be8?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Slim gemstone ring designed for stacking and occasion wear.",
    material: "18K Gold, Emerald Stone",
    sku: "AR-RG-406",
    inStock: true,
    newArrival: true
  },
  {
    id: "royal-choker-necklace",
    name: "Royal Choker Necklace",
    category: "Necklaces",
    originalPrice: 214999,
    discountPercent: 15,
    images: [
      "https://images.unsplash.com/photo-1599459182681-c938b7f9542c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Statement choker with layered stones and a premium bridal finish.",
    material: "Gold Polish, Kundan Stones",
    sku: "AR-NK-508",
    inStock: true,
    featured: true
  },
  {
    id: "pearl-drop-earrings",
    name: "Pearl Drop Earrings",
    category: "Earrings",
    originalPrice: 32999,
    discountPercent: 8,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Soft pearl drops with fine sparkle for evening occasions.",
    material: "Pearl, Zircon, Rhodium Finish",
    sku: "AR-ER-609",
    inStock: false
  },
  {
    id: "heritage-gold-bangles",
    name: "Heritage Gold Bangles",
    category: "Bangles",
    originalPrice: 154500,
    discountPercent: 11,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Pair of intricately carved bangles for festive styling.",
    material: "22K Gold Finish",
    sku: "AR-BG-711",
    inStock: true
  },
  {
    id: "solitaire-diamond-pendant",
    name: "Solitaire Diamond Pendant",
    category: "Diamond Jewellery",
    originalPrice: 98500,
    discountPercent: 16,
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Minimal solitaire pendant with a polished chain finish.",
    material: "18K Gold, Solitaire Diamond",
    sku: "AR-DP-812",
    inStock: true,
    featured: true
  }
];

export const offers: Offer[] = [
  {
    id: "akshaya-gold",
    title: "Festival Gold Savings",
    type: "Festival Offer",
    discountPercent: 18,
    description: "Special festive pricing on selected gold necklaces and bangles.",
    cta: "Explore Gold"
  },
  {
    id: "diamond-weekend",
    title: "Diamond Weekend",
    type: "Limited Time",
    discountPercent: 22,
    description: "Private appointment pricing on diamond rings and pendants.",
    cta: "Book Enquiry"
  },
  {
    id: "new-arrivals",
    title: "New Bridal Arrivals",
    type: "New Arrival",
    discountPercent: 10,
    description: "Introductory offer for the latest bridal collection.",
    cta: "View Collection"
  }
];

export const testimonials = [
  {
    name: "Priya Menon",
    location: "Bengaluru",
    quote:
      "The bridal necklace looked even better in person. The team guided us patiently through every detail."
  },
  {
    name: "Rohan Shah",
    location: "Mumbai",
    quote:
      "Clear pricing, certified diamonds, and fast WhatsApp coordination made the purchase feel trustworthy."
  },
  {
    name: "Ananya Rao",
    location: "Hyderabad",
    quote:
      "The custom ring finish was premium and delivery updates were handled very professionally."
  }
];
