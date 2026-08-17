"use client";

import { useState } from "react";
import EntranceAnimation from "./EntranceAnimation";
import NewHomeSection from "./sections/NewHomeSection";
import Navbar from "./Navbar";
import AgeBanner from "./AgeBanner";
import { Product, ProductCategory, Content, ContentCategory, Project } from "@/payload-types";

interface HeroEntranceProps {
  products: Product[];
  productCategories: ProductCategory[];
  content: Content[];
  contentCategories: ContentCategory[];
  projects: Project[];
}
export default function HeroEntrance({ products, productCategories, content, contentCategories, projects }: HeroEntranceProps) {
  const [ready, setReady] = useState(false);
  return (
    <>
      <Navbar ready={ready} products={products} productCategories={productCategories} content={content} contentCategories={contentCategories} projects={projects} />
      <EntranceAnimation onComplete={() => setReady(true)} />
      <NewHomeSection ready={ready} />
    </>
  );
}
