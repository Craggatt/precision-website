import HomeSection from "@/components/sections/HomeSection";
import StatsSection from "@/components/sections/StatsSection";
import VenueSection from "@/components/sections/VenueSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/sections/GallerySection";
import NewProductsSection from "@/components/sections/NewProductsSection";
import HeroEntrance from "@/components/HeroEntrance";
import GradualBlur from "@/components/GradualBlur";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroEntrance />
      <NewProductsSection />
      <GallerySection />
      <VenueSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      {/* <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      /> */}
    </main>
  );
}
