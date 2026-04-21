"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Send } from "lucide-react";
import CornerSquares from "../CornerSquares";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section className="border-t border-neutral-600 bg-neutral-900">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative border-b border-neutral-600"
      >
        <div className="max-w-[1600px] mx-auto border-x border-neutral-700 px-5 md:px-10 py-16 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-10 bg-neutral-700">
          <div className="max-w-xl">
            <p className="label-mono mb-4">Get started</p>
            <h2 className="font-aller font-bold text-white text-3xl md:text-5xl leading-tight">
              Ready to transform
              <br />
              your venue?
            </h2>
            <p className="font-satoshi text-neutral-200 text-base leading-relaxed mt-5 max-w-md">
              Talk to our team about a custom LED signage solution designed
              specifically for your gaming floor, club, or hotel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button className="inline-flex items-center justify-center gap-2 font-satoshi text-[0.85rem] bg-[#111111] text-white px-6 py-3 rounded-sm hover:bg-[#222222] transition-colors font-medium">
              Get a Free Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 font-satoshi text-[0.85rem] bg-brand-primary text-white px-6 py-3 rounded-sm hover:text-[#111111] transition-colors">
              <Send className="w-3.5 h-3.5" />
              Contact Us
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
