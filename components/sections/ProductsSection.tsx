"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CornerSquares from "../CornerSquares";

const products = [
  { name: "Halo Maxi", variant: "Double Sided",  image: "/images/products/Halo-Maxi-4.png" },
  { name: "Halo Maxi", variant: "Single Sided",  image: "/images/products/Halo-Maxi-4.png" },
  { name: "Halo Maxi", variant: "Corner Unit",   image: "/images/products/Halo-Maxi-4.png" },
  { name: "Halo Maxi", variant: "Entry Display", image: "/images/products/Halo-Maxi-4.png" },
  { name: "Halo Maxi", variant: "Infill Panel",  image: "/images/products/Halo-Maxi-4.png" },
  { name: "Halo Maxi", variant: "Screen Mount",  image: "/images/products/Halo-Maxi-4.png" },
  { name: "Halo Maxi", variant: "Wall Flush",    image: "/images/products/Halo-Maxi-4.png" },
  { name: "Halo Maxi", variant: "Ceiling Drop",  image: "/images/products/Halo-Maxi-4.png" },
];

function ProductCell({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="relative p-8 border-r border-b border-[#e5e5e5] nth-4:border-r-0 nth-8:border-r-0 nth-5:border-b-0 nth-6:border-b-0 nth-7:border-b-0 nth-8:border-b-0 last:border-b-0 last:border-r-0"
    >
      <CornerSquares />

      {/* Image */}
      <div className="relative w-full aspect-4/3 bg-[#f9f9f9] border border-[#e5e5e5] overflow-hidden mb-6">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Info */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-aller font-bold text-[#111111] text-base leading-snug">
            {product.name}
          </p>
          <p className="font-satoshi text-[0.8rem] text-[#6b6b6b] mt-0.5">
            {product.variant}
          </p>
        </div>
        <button
          className="font-satoshi text-meta text-[#6b6b6b] px-3 py-1.5 rounded-sm hover:text-[#111111] transition-colors shrink-0"
          style={{ border: "1px solid #e5e5e5" }}
        >
          Find out More
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section className="border-t border-[#e5e5e5]">
      <div className="max-w-[1600px] mx-auto border-x border-[#e5e5e5]">
      {/* Section header — matches FeaturesSection pattern */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0 }}
        animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative px-10 py-12 border-b border-[#e5e5e5] flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <CornerSquares />
        <div>
          <p className="label-mono mb-3">Product catalogue</p>
          <h2 className="font-aller font-bold text-[#111111] text-3xl md:text-4xl leading-tight">
            Our Product Range
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {["Overbank Signage", "Entry Displays", "Screens", "Infills"].map((cat, i) => (
            <button
              key={cat}
              className="font-satoshi text-[0.78rem] px-3 py-1.5 rounded-sm transition-colors"
              style={{
                border: "1px solid #e5e5e5",
                background: i === 0 ? "#111111" : "transparent",
                color: i === 0 ? "#ffffff" : "#6b6b6b",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {products.map((product, index) => (
          <ProductCell key={index} product={product} index={index} />
        ))}
      </div>
      </div>
    </section>
  );
}
