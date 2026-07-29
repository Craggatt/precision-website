"use client";

import { useState } from "react";
import EntranceAnimation from "./EntranceAnimation";
import NewHomeSection from "./sections/NewHomeSection";
import Navbar from "./Navbar";
import AgeBanner from "./AgeBanner";
import { Product, ProductCategory, Content, ContentCategory } from "@/payload-types";

interface HeroEntranceProps {
  products: Product[];
  productCategories: ProductCategory[];
  content: Content[];
  contentCategories: ContentCategory[];
}
export default function HeroEntrance({ products, productCategories, content, contentCategories }: HeroEntranceProps) {
  const [ready, setReady] = useState(false);
  return (
    <>
      <Navbar ready={ready} products={products} productCategories={productCategories} content={content} contentCategories={contentCategories} />
      <AgeBanner ready={ready} />
      <EntranceAnimation onComplete={() => setReady(true)} />
      <NewHomeSection ready={ready} />
    </>
  );
}
