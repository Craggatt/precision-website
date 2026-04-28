import VenueSection from "@/components/sections/VenueSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/sections/GallerySection";
import HeroEntrance from "@/components/HeroEntrance";
import ProductsSection from "@/components/sections/ProductsSection";
import { payloadService } from "@/services/payloadService";
import QuoteFormSection from "@/components/sections/QuoteFormSection";
import { ProductCategories } from "@/collections/ProductCategories";

export default async function Home() {
  const products = await payloadService.getProducts();
  const productCategories = await payloadService.getProductCategories();
  const testimonials = await payloadService.getTestimonials();
  const projects = await payloadService.getProjects();
  const venueLogos = await payloadService.getVenueLogos();

  return (
    <main className="min-h-screen max-w-screen overlow-y-hidden">
      <HeroEntrance products={products} productCategories={productCategories} />
      <ProductsSection productCategories={productCategories} />
      <GallerySection projects={projects} />
      <VenueSection venueLogos={venueLogos} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
      <Footer />
      <QuoteFormSection />
    </main>
  );
}
