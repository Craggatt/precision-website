"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  useInView,
} from "motion/react";

const topRowLogos = [
  "aussie.png",
  "bayview.png",
  "bradys.png",
  "castlereagh.png",
  "crown.png",
  "farrer.png",
  "federal.png",
];

const bottomRowLogos = [
  "hornsby.png",
  "hunter.png",
  "lodge.png",
  "moorebank.png",
  "northside.png",
  "parc.png",
  "woywoy.png",
];

function LogoRow({
  logos,
  baseVelocity,
  scrollVelocity,
}: {
  logos: string[];
  baseVelocity: number;
  scrollVelocity: ReturnType<typeof useSpring>;
}) {
  // Start at -singleSetWidth for right-moving row, 0 for left-moving
  const baseX = useMotionValue(baseVelocity > 0 ? -1 : 0);
  const rowRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useAnimationFrame((_, delta) => {
    if (!rowRef.current) return;

    const singleSetWidth = rowRef.current.scrollWidth / 3;

    // Initialize position for right-moving row
    if (!initializedRef.current && baseVelocity > 0) {
      baseX.set(-singleSetWidth);
      initializedRef.current = true;
    } else if (!initializedRef.current) {
      initializedRef.current = true;
    }

    // Base speed (pixels per second)
    const baseSpeed = 50;

    // Scroll velocity increases speed (absolute value, always speeds up)
    const scrollBoost = Math.abs(scrollVelocity.get()) * 0.15;
    const totalSpeed = baseSpeed + scrollBoost;

    // Calculate movement for this frame
    const moveBy = baseVelocity * totalSpeed * (delta / 1000);
    let newX = baseX.get() + moveBy;

    // Wrap around seamlessly
    if (baseVelocity < 0 && newX <= -singleSetWidth) {
      // Moving left: when we've moved one set width left, reset
      newX += singleSetWidth;
    } else if (baseVelocity > 0 && newX >= 0) {
      // Moving right: when we reach 0, jump back
      newX -= singleSetWidth;
    }

    baseX.set(newX);
  });

  // Triple the logos for seamless loop
  const tripleLogos = [...logos, ...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <motion.div ref={rowRef} className="flex gap-12" style={{ x: baseX }}>
        {tripleLogos.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="shrink-0 w-50 h-25 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-300"
          >
            <Image
              src={`/images/venues/${logo}`}
              alt={logo.replace(".png", "")}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function VenueSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -25% 0px", // Triggers when 25% into viewport
  });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 400,
    damping: 50,
  });

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#f9f9f9] border-t border-[#e5e5e5] py-24 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-10 mb-10">
        <p className="label-mono mb-3">Trusted by venues across Australia</p>
        <motion.h3
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-aller font-bold text-[#111111] text-3xl"
        >
          Chosen by Industry Leaders
        </motion.h3>
      </div>

      {/* Top Row - scrolls left, speeds up when scrolling down */}
      <div className="mb-8">
        <LogoRow
          logos={topRowLogos}
          baseVelocity={-1}
          scrollVelocity={smoothVelocity}
        />
      </div>

      {/* Bottom Row - scrolls right, speeds up when scrolling up */}
      <LogoRow
        logos={bottomRowLogos}
        baseVelocity={1}
        scrollVelocity={smoothVelocity}
      />
    </section>
  );
}
