"use client";

import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CornerSquares from "../CornerSquares";

function AnimatedHeading({ ready }: { ready: boolean }) {
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
        animate={ready ? "visible" : "hidden"}
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
        animate={ready ? "visible" : "hidden"}
        className="inline-block text-white"
        style={{ marginRight: "0.28em" }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <h1
      className="font-aller text-white  leading-[1.06] tracking-tight "
      style={{ perspective: "1000px" }}
    >
      <span className="block text-4xl sm:text-5xl md:text-[64px]">
        {line1.map((w, i) => word(w, i))}
      </span>
      <span className="block font-bold text-5xl sm:text-5xl md:text-[64px]">
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

export default function NewHomeSection({ ready = false }: { ready?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  return (
    <section
      className="relative border-b border-[#2a2a2a] bg-[#0a0a0a] h-screen flex flex-col justify-between overflow-hidden"
      ref={ref}
    >
      {/* Full-section video background */}
      <motion.video
        className="absolute inset-0 w-full h-full object-cover scale-125 z-0"
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

      {/* Overlay */}
      <div className="absolute inset-0 z-1 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="h-14" />
        <div className="px-2.5 md:px-5 lg:px-10">
          <div className="relative w-full max-w-[1600px] px-2.5 md:px-5 mx-auto lg:px-10 py-10 border-x border-white/20 h-fit">
            <div className="bg-white/20 h-1.25 w-1.25 absolute top-[-3px] left-[-3px] z-10"></div>
            <div className="bg-white/20 h-1.25 w-1.25 absolute top-[-3px] right-[-3px] z-10"></div>
            <AnimatedHeading ready={ready} />
            <div className="bg-white/20 h-1.25 w-1.25 absolute bottom-[-3px] left-[-3px] z-10"></div>
            <div className="bg-white/20 h-1.25 w-1.25 absolute bottom-[-3px] right-[-3px] z-10"></div>
          </div>
        </div>

        {/* Hero body */}
        <div className="px-2.5 md:px-5 lg:px-10 flex-1 border-y border-white/20">
          <div className="relative max-w-[1600px] overflow-hidden mx-auto h-full w-full border-x border-white/20">
            <p className="absolute left-2.5 md:left-5 lg:left-10 bottom-2.5 md:bottom-5 lg:bottom-10 max-w-xs font-satoshi text-sm text-neutral-300 leading-relaxed pr-10 md:pr-0">
              Premium Australian-made LED signage and digital displays for
              casinos, clubs, and hotels. Designed and manufactured locally with
              precision.
            </p>
            {/* Spinning circular text */}
            <div className="absolute right-2.5 md:right-5 lg:right-10 bottom-2.5 md:bottom-5 lg:bottom-10 flex items-center justify-center w-24 h-24">
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <path
                    id="circle"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text
                  className="fill-white/80 text-[11px]"
                  style={{ fontSize: 11, letterSpacing: "0.18em" }}
                >
                  <textPath href="#circle" startOffset="0%">
                    SEE OUR WORK • SEE OUR WORK •
                  </textPath>
                </text>
              </motion.svg>
              <ArrowDown className="w-4 h-4 text-white/80 relative z-10" />
            </div>
          </div>
        </div>
        <div className="h-[40px] md:h-[60px] lg:h-[80px] px-2.5 md:px-5 lg:px-10">
          <div className="relative max-w-[1600px] mx-auto h-full w-full border-x border-white/20">
            <div className="bg-white/20 h-1.25 w-1.25 absolute top-[-3px] left-[-3px] z-10"></div>
            <div className="bg-white/20 h-1.25 w-1.25 absolute top-[-3px] right-[-3px] z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
