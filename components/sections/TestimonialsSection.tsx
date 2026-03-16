"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CornerSquares from "../CornerSquares";

const testimonials = [
  {
    quote:
      "The overbank signage Precision installed across our gaming floor has been running 24/7 for three years without a single failure. The quality is unmatched.",
    author: "James Hollis",
    role: "Gaming Floor Manager",
    venue: "The Star Sydney",
  },
  {
    quote:
      "From design brief to installation, the whole process was seamless. They understood our brand requirements and delivered something that genuinely elevates the space.",
    author: "Karen Mace",
    role: "Head of Operations",
    venue: "Twin Towns Services Club",
  },
  {
    quote:
      "We've used three different signage suppliers over the years. Precision Signs is the only one that actually builds for the demands of a casino environment.",
    author: "David Nguyen",
    role: "Facilities Director",
    venue: "Crown Melbourne",
  },
  {
    quote:
      "Their team had our entry displays installed over a weekend with zero disruption to trading. The result looks incredible and our members have noticed.",
    author: "Sarah Okoye",
    role: "Club Manager",
    venue: "Bankstown Sports Club",
  },
];

function TestimonialCell({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="relative p-10 border-r border-b border-[#e5e5e5] nth-2:border-r-0 md:nth-2:border-r md:nth-2:border-[#e5e5e5] md:nth-4:border-r-0 nth-3:border-b-0 nth-4:border-b-0 last:border-b-0"
    >
      <CornerSquares />

      {/* Quote mark */}
      <span
        className="block font-aller font-bold text-[3rem] leading-none mb-4"
        style={{ color: "#e5e5e5" }}
        aria-hidden
      >
        &ldquo;
      </span>

      <p className="font-satoshi text-[#3a3a3a] text-[0.95rem] leading-relaxed mb-8">
        {testimonial.quote}
      </p>

      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div
          className="w-9 h-9 rounded-full shrink-0"
          style={{ background: "#f2f2f2", border: "1px solid #e5e5e5" }}
        />
        <div>
          <p className="font-aller font-bold text-[#111111] text-[0.85rem] leading-snug">
            {testimonial.author}
          </p>
          <p className="font-satoshi text-[0.75rem] text-[#aaaaaa] mt-0.5">
            {testimonial.role} · {testimonial.venue}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });

  return (
    <section className="border-t border-[#e5e5e5]">
      <div className="max-w-[1600px] mx-auto border-x border-[#e5e5e5]">
      {/* Section header */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0 }}
        animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative px-10 py-12 border-b border-[#e5e5e5] flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <CornerSquares />
        <div>
          <p className="label-mono mb-3">Client testimonials</p>
          <h2 className="font-aller font-bold text-[#111111] text-3xl md:text-4xl leading-tight">
            Trusted by Australia&apos;s<br />leading venues
          </h2>
        </div>
        <p className="font-satoshi text-[#6b6b6b] text-[0.9rem] leading-relaxed max-w-sm">
          From major casinos to regional clubs, our signage is installed across
          hundreds of gaming venues nationwide.
        </p>
      </motion.div>

      {/* Testimonial grid — 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <TestimonialCell
            key={testimonial.author}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
