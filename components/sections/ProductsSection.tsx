"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CornerSquares from "../CornerSquares";

const featuredProduct = {
  name: "Halo Maxi",
  variant: "Double Sided",
  description: "Our flagship overbank signage unit — dual-faced LED display engineered for maximum gaming floor visibility. Built to Australian standards with premium aluminium extrusion and customisable RGB lighting zones.",
  image: "/images/products/Halo-Maxi-4.png",
};

const products = [
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
];

function FeaturedCell() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative col-span-2 row-span-2 border-r border-[#e5e5e5] flex flex-col"
    >
      <CornerSquares bg="#e5e5e5" />

      {/* Image */}
      <div className="relative flex-1 bg-[#f5f5f5] overflow-hidden min-h-[300px]">
        <Image
          src={featuredProduct.image}
          alt={featuredProduct.name}
          fill
          className="object-contain p-12"
        />
        <span
          className="absolute top-4 left-4 font-satoshi text-[0.7rem] tracking-widest uppercase px-2.5 py-1"
          style={{ background: "#111111", color: "#ffffff" }}
        >
          Featured
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col p-8 md:p-10 border-t border-[#e5e5e5]">
        <p className="font-satoshi text-meta tracking-widest uppercase text-[#aaaaaa] mb-2">
          {featuredProduct.variant}
        </p>
        <h3 className="font-aller font-bold text-[#111111] text-3xl md:text-4xl leading-tight mb-4">
          {featuredProduct.name}
        </h3>
        <p className="font-satoshi text-[0.9rem] text-[#666666] leading-relaxed mb-6">
          {featuredProduct.description}
        </p>
        <div className="flex items-center gap-3">
          <button className="font-satoshi text-[0.82rem] px-5 py-2.5 rounded-sm bg-[#111111] text-white hover:bg-[#2a2a2a] transition-colors font-medium">
            Find out More
          </button>
          <button
            className="font-satoshi text-[0.82rem] px-5 py-2.5 rounded-sm text-[#111111] hover:bg-[#f0f0f0] transition-colors"
            style={{ border: "1px solid #e5e5e5" }}
          >
            Get a Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
}

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
      className={`relative p-6 border-b border-[#e5e5e5] ${index % 2 === 0 ? "border-r" : ""} ${index >= 2 ? "border-b-0" : ""}`}
    >
      <CornerSquares bg="#e5e5e5" />

      {/* Image */}
      <div className="relative w-full aspect-4/3 bg-[#f5f5f5] border border-[#e5e5e5] overflow-hidden mb-5">
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
          <p className="font-satoshi text-[0.8rem] text-[#aaaaaa] mt-0.5">
            {product.variant}
          </p>
        </div>
        <button
          className="font-satoshi text-[0.75rem] text-[#666666] px-3 py-1.5 rounded-sm hover:text-[#111111] transition-colors shrink-0"
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
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -15% 0px",
  });

  return (
    <section className="border-t border-[#e5e5e5] overflow-hidden bg-white">
      <div className="max-w-[1600px] mx-auto border-x border-[#e5e5e5] bg-white">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative px-5 md:px-10 py-10 md:py-12 border-b border-[#e5e5e5] flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <CornerSquares bg="#e5e5e5" />
          <div>
            <p className="label-mono mb-3 text-[#aaaaaa]">Product catalogue</p>
            <h2 className="font-aller font-bold text-[#111111] text-3xl md:text-4xl leading-tight">
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
                    border: "1px solid #e5e5e5",
                    background: i === 0 ? "#111111" : "transparent",
                    color: i === 0 ? "#ffffff" : "#888888",
                  }}
                >
                  {cat}
                </button>
              ),
            )}
          </div>
        </motion.div>

        {/* 4-col grid: featured spans left 2 cols × 2 rows, 4 products fill right 2 cols × 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2">
          <FeaturedCell />
          {products.map((product, index) => (
            <ProductCell key={index} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
