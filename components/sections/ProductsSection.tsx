"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CornerSquares from "../CornerSquares";

const products = [
  {
    name: "Halo Maxi",
    variant: "Double Sided",
    image: "/images/products/Halo-Maxi-4.png",
  },
  {
    name: "Halo Maxi",
    variant: "Single Sided",
    image: "/images/products/Halo-Maxi-4.png",
  },
  {
    name: "Halo Maxi",
    variant: "Corner Unit",
    image: "/images/products/Halo-Maxi-4.png",
  },
  {
    name: "Halo Maxi",
    variant: "Entry Display",
    image: "/images/products/Halo-Maxi-4.png",
  },
  {
    name: "Halo Maxi",
    variant: "Infill Panel",
    image: "/images/products/Halo-Maxi-4.png",
  },
  {
    name: "Halo Maxi",
    variant: "Screen Mount",
    image: "/images/products/Halo-Maxi-4.png",
  },
  {
    name: "Halo Maxi",
    variant: "Wall Flush",
    image: "/images/products/Halo-Maxi-4.png",
  },
  {
    name: "Halo Maxi",
    variant: "Ceiling Drop",
    image: "/images/products/Halo-Maxi-4.png",
  },
];

function ProductCell({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="relative p-8 border-r border-b border-[#2a2a2a] even:border-r-0 md:even:border-r md:nth-4:border-r-0 md:nth-8:border-r-0 md:nth-5:border-b-0 md:nth-6:border-b-0 nth-7:border-b-0 nth-8:border-b-0 last:border-b-0 last:border-r-0"
    >
      <CornerSquares />

      {/* Image */}
      <div className="relative w-full aspect-4/3 bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden mb-6">
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
          <p className="font-aller font-bold text-[#f0f0f0] text-base leading-snug">
            {product.name}
          </p>
          <p className="font-satoshi text-[0.8rem] text-[#888888] mt-0.5">
            {product.variant}
          </p>
        </div>
        <button
          className="font-satoshi text-meta text-[#888888] px-3 py-1.5 rounded-sm hover:text-[#f0f0f0] transition-colors shrink-0"
          style={{ border: "1px solid #2a2a2a" }}
        >
          Find out More
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -15% 0px",
  });

  return (
    <section className="border-t border-[#2a2a2a] overflow-hidden bg-[#111111]">
      <div className="max-w-[1600px] mx-auto border-x border-[#2a2a2a] bg-[#111111]">
        {/* Section header — matches FeaturesSection pattern */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative px-5 md:px-10 py-10 md:py-12 border-b border-[#2a2a2a] flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <CornerSquares />
          <div>
            <p className="label-mono mb-3">Product catalogue</p>
            <h2 className="font-aller font-bold text-[#f0f0f0] text-3xl md:text-4xl leading-tight">
              Our Product Range
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {["Overbank Signage", "Entry Displays", "Screens", "Infills"].map(
              (cat, i) => (
                <button
                  key={cat}
                  className="font-satoshi text-[0.78rem] px-3 py-1.5 rounded-sm transition-colors"
                  style={{
                    border: "1px solid #2a2a2a",
                    background: i === 0 ? "#f0f0f0" : "transparent",
                    color: i === 0 ? "#111111" : "#888888",
                  }}
                >
                  {cat}
                </button>
              ),
            )}
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
