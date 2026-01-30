import { Button } from "@/components/Button";
import HomeSection from "@/components/sections/HomeSection";
import ProductsSection from "@/components/sections/ProductsSection";
import VenueSection from "@/components/sections/VenueSection";
import { Send, User } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeSection />
      <VenueSection />
      <ProductsSection />
    </main>
  );
}
