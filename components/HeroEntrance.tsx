"use client";

import { useState } from "react";
import EntranceAnimation from "./EntranceAnimation";
import NewHomeSection from "./sections/NewHomeSection";
import Navbar from "./Navbar";
import { Product, ProductCategory } from "@/payload-types";

interface HeroEntranceProps {
  products: Product[];
  productCategories: ProductCategory[];
}
export default function HeroEntrance({ products, productCategories }: HeroEntranceProps) {
  const [ready, setReady] = useState(false);
  return (
    <>
      <Navbar ready={ready} products={products} productCategories={productCategories} />
      <EntranceAnimation onComplete={() => setReady(true)} />
      <NewHomeSection ready={ready} />
    </>
  );
}
