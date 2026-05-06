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
  const [products, productCategories, content, contentCategories, testimonials, projects, venueLogos] = await Promise.all([
    payloadService.getProducts(),
    payloadService.getProductCategories(),
    payloadService.getContent(),
    payloadService.getContentCategories(),
    payloadService.getTestimonials(),
    payloadService.getProjects(),
    payloadService.getVenueLogos(),
  ]);

  return (
    <main className="min-h-screen max-w-screen overlow-y-hidden">
      <HeroEntrance products={products} productCategories={productCategories} content={content} contentCategories={contentCategories} />
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
