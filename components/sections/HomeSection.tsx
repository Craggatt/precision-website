"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CornerSquares from "../CornerSquares";

const navItems = ["Products", "Custom", "Support", "Blog"];

function Nav() {
  return (
    <nav className="border-b border-[#e5e5e5] bg-white">
      <div className="max-w-[1600px] mx-auto border-x border-[#e5e5e5] px-10 flex items-center justify-between h-14 relative">
        <CornerSquares />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          src="https://precisionsigns.com.au/wp-content/uploads/2018/11/logo.png"
          alt="Precision Signs"
          className="h-7 object-contain"
          style={{ filter: "brightness(0)" }}
        />

        <div className="flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.p
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.15 + i * 0.06,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="font-satoshi text-[0.85rem] text-[#6b6b6b] hover:text-[#111111] cursor-pointer transition-colors"
            >
              {item}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <button
            className="font-satoshi text-[0.8rem] text-[#6b6b6b] px-4 py-1.5 rounded-sm hover:text-[#111111] transition-colors"
            style={{ border: "1px solid #e5e5e5" }}
          >
            Contact Us
          </button>
          <button className="font-satoshi text-[0.8rem] bg-[#111111] text-white px-4 py-1.5 rounded-sm hover:bg-[#2a2a2a] transition-colors font-medium">
            Get a Quote
          </button>
        </motion.div>
      </div>
    </nav>
  );
}

function AnimatedHeading() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const wordVariants = {
    hidden: { y: "100%", opacity: 0, rotateX: -40 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.08,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  const boldVariants = {
    hidden: { y: "120%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.12,
        ease: [0.19, 1, 0.22, 1] as const,
      },
    }),
  };

  const line1 = ["Transform", "your", "gaming", "floor"];
  const line2 = ["into", "an"];

  const word = (text: string, i: number) => (
    <span
      key={`${i}-${text}`}
      className="overflow-hidden inline-block"
      style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
    >
      <motion.span
        custom={i}
        variants={wordVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
        style={{ marginRight: "0.28em" }}
      >
        {text}
      </motion.span>
    </span>
  );

  const boldWord = (text: string, i: number) => (
    <span
      key={text}
      className="overflow-hidden inline-block"
      style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
    >
      <motion.span
        custom={i}
        variants={boldVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block text-brand-primary"
        style={{ marginRight: "0.28em" }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <h1
      ref={ref}
      className="font-aller font-bold text-[#111111] text-5xl md:text-[55px] leading-[1.06] tracking-tight"
      style={{ perspective: "1000px" }}
    >
      <span className="block">{line1.map((w, i) => word(w, i))}</span>
      <span className="block">
        {line2.map((w, i) => word(w, line1.length + i))}
        {boldWord("unforgettable", 0)}
      </span>
      <span className="block">{boldWord("experience.", 1)}</span>
    </h1>
  );
}

function ProductWindow() {
  return (
    <div className="relative">
      {/* Subtle glow beneath */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(11, 111, 211, 0.12)" }}
      />

      {/* Frame */}
      <div
        className="relative overflow-hidden"
        style={{
          border: "1px solid #e5e5e5",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5"
          style={{ borderBottom: "1px solid #e5e5e5", background: "#f9f9f9" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
          <span className="ml-3 font-satoshi text-[0.65rem] text-[#aaaaaa] tracking-wider">
            precisionsigns.com.au — gaming floor
          </span>
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-[#111111]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://precisionsigns.com.au/wp-content/themes/Precision%200.0.1/img/video.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
}

export default function HomeSection() {
  return (
    <section className="relative border-b border-[#e5e5e5] bg-white">
      <Nav />

      {/* Subtle brand glow — top right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 80% 20%, rgba(11,111,211,0.05), transparent)",
        }}
      />

      {/* Hero body */}
      <div className="max-w-[1600px] mx-auto border-x border-[#e5e5e5] relative px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[88vh]">
        {/* Thin vertical divider */}
        <div
          className="hidden lg:block absolute left-1/2 top-16 bottom-16 w-px pointer-events-none"
          style={{ background: "#e5e5e5" }}
        />

        {/* Left — text */}
        <div className="flex flex-col">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1 mb-6"
            style={{ border: "1px solid #e5e5e5", background: "#ffffff" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-satoshi text-[0.65rem] text-[#6b6b6b] tracking-[0.15em] uppercase">
              In Production
            </span>
          </motion.div>

          {/* Heading */}
          <AnimatedHeading />

          {/* Monospace version tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="font-mono-ui text-[0.65rem] text-[#aaaaaa] tracking-widest mt-5 uppercase"
          >
            v2.4 · AU-MADE · EST. 1999
          </motion.p>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 1.35,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="font-satoshi text-[#6b6b6b] text-base leading-relaxed mt-6 max-w-md"
          >
            Premium LED signage and digital displays for casinos, clubs, and
            hotels. Designed and manufactured locally with precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center gap-3 mt-9"
          >
            <button className="inline-flex items-center gap-2 font-satoshi text-[0.85rem] bg-[#111111] text-white px-5 py-2.5 rounded-sm hover:bg-[#2a2a2a] transition-colors font-medium">
              Get a Free Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              className="font-satoshi text-[0.85rem] text-[#6b6b6b] px-5 py-2.5 rounded-sm hover:text-[#111111] transition-colors"
              style={{ border: "1px solid #e5e5e5" }}
            >
              View Products
            </button>
          </motion.div>
        </div>

        {/* Right — product window */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <ProductWindow />
        </motion.div>
      </div>
    </section>
  );
}
