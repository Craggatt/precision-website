"use client";

import VenueSection from "@/components/sections/VenueSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/sections/GallerySection";
import NewProductsSection from "@/components/sections/NewProductsSection";
import HeroEntrance from "@/components/HeroEntrance";
import QuoteForm from "@/components/QuoteForm";
import { useQuoteStore } from "@/store/quoteStore";
import { AnimatePresence } from "motion/react";

export default function Home() {
  const open = useQuoteStore((s) => s.open);
  return (
    <main className="min-h-screen max-w-screen overlow-y-hidden">
      <HeroEntrance />
      <NewProductsSection />
      <GallerySection />
      <VenueSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <AnimatePresence>{open && <QuoteForm />}</AnimatePresence>
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
