import HomeSection from "@/components/sections/HomeSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import VenueSection from "@/components/sections/VenueSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeSection />
      <StatsSection />
      <FeaturesSection />
      <VenueSection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
