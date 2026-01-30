"use client";
import { Send, User } from "lucide-react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { useRef } from "react";
import { Button } from "../Button";
import FixedQuoteButton from "../FixedQuoteButton";

// Wrapper component for scroll-based exit animation
function ScrollFadeOut({
  children,
  scrollYProgress,
  startExit,
  endExit,
}: {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  startExit: number;
  endExit: number;
}) {
  const y = useTransform(scrollYProgress, [startExit, endExit], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [startExit, endExit], [1, 0]);

  return <motion.div style={{ y, opacity }}>{children}</motion.div>;
}

// Animated text component that reveals words with a staggered wave effect
function AnimatedHeading({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Scroll-based exit
  const y = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);

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
        ease: [0.215, 0.61, 0.355, 1] as const,
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
        ease: [0.19, 1, 0.22, 1] as const,
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
    <motion.h1
      ref={ref}
      style={{ perspective: "1000px", y, opacity }}
      className="text-4xl md:text-[78px] font-aller text-neutral-50 leading-[1.1]"
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
    </motion.h1>
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

export default function HomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
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
          {/* Header - exits first (0 to 0.25) */}
          <ScrollFadeOut
            scrollYProgress={scrollYProgress}
            startExit={0}
            endExit={0.25}
          >
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
          </ScrollFadeOut>

          {/* Hero H1 - exits second (0.1 to 0.4) */}
          <AnimatedHeading scrollYProgress={scrollYProgress} />

          {/* Bottom paragraph - exits last (0.2 to 0.5) */}
          <ScrollFadeOut
            scrollYProgress={scrollYProgress}
            startExit={0.2}
            endExit={0.5}
          >
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
          </ScrollFadeOut>
        </div>
      </div>

      {/* Fixed Quote Button */}
      <FixedQuoteButton />
    </section>
  );
}
