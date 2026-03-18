import HomeSection from "@/components/sections/HomeSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import VenueSection from "@/components/sections/VenueSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";
import NewHomeSection from "@/components/sections/NewHomeSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NewHomeSection />
      <StatsSection />
      <FeaturesSection />
      <VenueSection />
      <ProductsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
