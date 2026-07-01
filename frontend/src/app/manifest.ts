import type { MetadataRoute } from "next";
import { BRAND_NAME } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME,
    short_name: BRAND_NAME,
    description: "Premium gold, diamond, silver, and bridal jewellery boutique.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf0",
    theme_color: "#1c1408",
    icons: [
      {
        src: "/brand/pooja-jewellers-logo.png",
        sizes: "1350x1165",
        type: "image/png"
      }
    ]
  };
}
