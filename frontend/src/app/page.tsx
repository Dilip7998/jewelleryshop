import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Hero } from "@/components/Hero";
import { InstagramGallery } from "@/components/InstagramGallery";
import { LatestCollectionSlider } from "@/components/LatestCollectionSlider";
import { Newsletter } from "@/components/Newsletter";
import { OfferSection } from "@/components/OfferSection";
import { Testimonials } from "@/components/Testimonials";
import { TrustBadges } from "@/components/TrustBadges";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <OfferSection />
      <FeaturedProducts />
      <LatestCollectionSlider />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
