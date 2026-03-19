"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CornerSquares from "../CornerSquares";

const navItems = ["Products", "Custom", "Support", "Blog"];

function Nav() {
  return (
    <nav className="border-b border-[#2a2a2a]">
      <div className="max-w-[1600px] mx-auto border-x border-[#2a2a2a] px-10 flex items-center justify-between h-14 relative">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          src="https://precisionsigns.com.au/wp-content/uploads/2018/11/logo.png"
          alt="Precision Signs"
          className="h-7 object-contain brightness-0 invert"
        />

        <div className="hidden md:flex items-center gap-8">
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
              className="font-satoshi text-[0.85rem] text-white font-semibold hover:text-[#111111] cursor-pointer transition-colors"
            >
              {item}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="hidden md:flex items-center gap-3"
        >
          <button
            className="font-satoshi text-[0.8rem]  text-white px-4 py-1.5 rounded-sm hover:text-[#111111] transition-colors"
            style={{ border: "1px solid #2a2a2a" }}
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

  const line1 = ["Transform", "your", "gaming", "floor", "into", "an"];
  //const line2 = ["into", "an"];

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
        className="inline-block text-white"
        style={{ marginRight: "0.28em" }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <h1
      ref={ref}
      className="font-aller text-white text-3xl sm:text-4xl md:text-[45px] leading-[1.06] tracking-tight "
      style={{ perspective: "1000px" }}
    >
      <span className="block">{line1.map((w, i) => word(w, i))}</span>
      <span className="block font-bold">
        {boldWord("unforgettable experience.", 0)}
      </span>
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

export default function NewHomeSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  return (
    <section
      className="relative border-b border-[#2a2a2a] bg-[#0a0a0a] h-[100vh] flex flex-col justify-between"
      ref={ref}
    >
      <Nav />
      <div className="relative w-full max-w-[1600px] mx-auto p-600 border-x border-white h-fit">
        <div className="bg-white h-1.25 w-1.25 absolute top-[-3px] left-[-3px] z-10"></div>
        <div className="bg-white h-1.25 w-1.25 absolute top-[-3px] right-[-3px] z-10"></div>
        <AnimatedHeading />
        <div className="bg-white h-1.25 w-1.25 absolute bottom-[-3px] left-[-3px] z-10"></div>
        <div className="bg-white h-1.25 w-1.25 absolute bottom-[-3px] right-[-3px] z-10"></div>
      </div>
      {/* Hero body */}
      <div className="px-4 md:px-800 flex-1 border-y border-white">
        <div className="relative g-[#111111] max-w-[1600px] overflow-hidden mx-auto h-full w-full  border-x border-white">
          <motion.video
            className="absolute inset-0 w-full h-full object-cover scale-120"
            autoPlay
            muted
            loop
            playsInline
            style={{ translateY: videoY }}
          >
            <source
              src="https://precisionsigns.com.au/wp-content/themes/Precision%200.0.1/img/video.mp4"
              type="video/mp4"
            />
          </motion.video>
          <img
            src="images/logo-white.png"
            className="absolute -bottom-2 left-0 w-[1400px]"
          ></img>
        </div>
      </div>
      <div className="h-[80px]">
        <div className="relative g-[#111111] max-w-[1600px]  mx-auto h-full w-full  border-x border-white">
          <div className="bg-white h-1.25 w-1.25 absolute top-[-3px] left-[-3px] z-10"></div>
          <div className="bg-white h-1.25 w-1.25 absolute top-[-3px] right-[-3px] z-10"></div>
        </div>
      </div>
    </section>
  );
}
