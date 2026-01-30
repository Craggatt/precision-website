"use client";
import { Send, User, MessageCircle } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "../Button";
import FixedQuoteButton from "../FixedQuoteButton";

// Animated text component that reveals words with a staggered wave effect
function AnimatedHeading() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Word animation variants
  const wordVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
      rotateX: -40,
    },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.08,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Bold word variants with more dramatic entrance
  const boldWordVariants = {
    hidden: {
      y: "120%",
      opacity: 0,
    },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.6 + i * 0.12,
        ease: [0.19, 1, 0.22, 1],
      },
    }),
  };

  const line1Words = ["Transform", "your", "gaming", "floor"];
  const line2Words = ["into", "an"];

  const renderWords = (words: string[], startIndex: number) => {
    return words.map((word, index) => (
      <span
        key={`${startIndex}-${index}`}
        className="overflow-hidden inline-block"
        style={{ paddingBottom: "0.15em", marginBottom: "-0.15em" }}
      >
        <motion.span
          custom={startIndex + index}
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-block"
          style={{ marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      </span>
    ));
  };

  return (
    <h1
      ref={ref}
      className="text-4xl md:text-[78px] font-aller text-neutral-50 leading-[1.1]"
      style={{ perspective: "1000px" }}
    >
      {/* Line 1: Transform your gaming floor */}
      <span className="block">{renderWords(line1Words, 0)}</span>

      {/* Line 2: into an + unforgettable */}
      <span className="block">
        {renderWords(line2Words, line1Words.length)}

        {/* Bold text: unforgettable */}
        <b className="text-brand-primary text-[82px] inline-block">
          <span
            className="overflow-hidden inline-block"
            style={{ paddingBottom: "0.15em", marginBottom: "-0.15em" }}
          >
            <motion.span
              custom={0}
              variants={boldWordVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="inline-block"
            >
              unforgettable
            </motion.span>
          </span>
        </b>
      </span>

      {/* Line 3: experience. */}
      <span className="block">
        <b className="text-brand-primary text-[82px] ">
          <span
            className="overflow-hidden inline-block"
            style={{ paddingBottom: "0.15em", marginBottom: "-0.15em" }}
          >
            <motion.span
              custom={1}
              variants={boldWordVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="inline-block"
            >
              experience.
            </motion.span>
          </span>
        </b>
      </span>
    </h1>
  );
}

// Animated nav items with staggered fade
function AnimatedNav() {
  const navItems = ["Home", "Products", "Custom", "Support", "Blog"];

  return (
    <div className="flex flex-row items-center gap-600">
      {navItems.map((item, index) => (
        <motion.p
          key={item}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1 + index * 0.08,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="text-label text-white cursor-pointer hover:text-neutral-300 transition-colors"
        >
          {item}
        </motion.p>
      ))}
    </div>
  );
}

// Fixed quote button component
function FixedQuoteButtonOld() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 1.8,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="fixed -bottom-[28px] right-24 z-50"
    >
      <svg width="400" height="120" viewBox="0 0 400 120">
        <path
          d="M 10 100 
         Q 0 100, 8 85 
         L 58 10 
         Q 65 0, 80 0 
         L 370 0 
         Q 380 0, 380 10 
         L 380 90 
         Q 380 100, 370 100 
         Z"
          fill="#2f343a"
          stroke="#2f343a"
          stroke-width="0"
        />
      </svg>
    </motion.div>
  );
}

export default function HomeSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <video
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover -z-10"
        autoPlay={true}
        muted
        loop
        playsInline
      >
        <source
          src="https://precisionsigns.com.au/wp-content/themes/Precision%200.0.1/img/video.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 to-neutral-900"></div>
      <div className="relative z-10 text-white px-24 max-w-[2000px]! w-full h-full">
        <div className="flex flex-col justify-between h-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-row items-center justify-between py-400"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              src="https://precisionsigns.com.au/wp-content/uploads/2018/11/logo.png"
              alt="Precision Signs Logo"
            />
            <AnimatedNav />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-row gap-400"
            >
              <Button
                text="Contact Us"
                icon={<Send className="h-4 w-4" />}
                iconPosition="left"
              />
              <Button
                text=""
                icon={<User className="h-4 w-4" />}
                className="bg-neutral-600"
                iconPosition="left"
              />
            </motion.div>
          </motion.div>

          {/* Hero H1 - Centered */}
          <AnimatedHeading />

          {/* Bottom paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.4,
              ease: [0.19, 1, 0.22, 1],
            }}
            className=" leading-relaxed mb-400 text-body text-neutral-300"
          >
            Premium Australian-made LED signage and digital displays for
            casinos, clubs, and hotels.
            <br />
            Designed and manufactured locally with precision.
          </motion.p>
        </div>
      </div>

      {/* Fixed Quote Button */}
      <FixedQuoteButton />
    </section>
  );
}
