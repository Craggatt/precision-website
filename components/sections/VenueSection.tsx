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
  const baseX = useMotionValue(0);
  const rowRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    // Base speed (pixels per second)
    const baseSpeed = 50;

    // Get current scroll velocity and add it to base movement
    const velocityFactor = scrollVelocity.get() * 0.1;

    // Calculate movement for this frame
    const moveBy =
      baseVelocity * baseSpeed * (delta / 1000) +
      baseVelocity * velocityFactor * (delta / 1000);

    let newX = baseX.get() + moveBy;

    // Get the width of one set of logos for wrapping
    if (rowRef.current) {
      const singleSetWidth = rowRef.current.scrollWidth / 3;

      // Wrap around seamlessly
      if (baseVelocity > 0 && newX <= -singleSetWidth) {
        newX += singleSetWidth;
      } else if (baseVelocity < 0 && newX >= 0) {
        newX -= singleSetWidth;
      }
    }

    baseX.set(newX);
  });

  // Triple the logos for seamless loop
  const tripleLogos = [...logos, ...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={rowRef}
        className="flex gap-12"
        style={{ x: baseX }}
      >
        {tripleLogos.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="shrink-0 w-50 h-25 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 400,
    damping: 50,
  });

  return (
    <section
      ref={containerRef}
      className="w-full bg-neutral-900 py-[200px] overflow-hidden"
    >
      <div className="px-24 max-w-[2000px] mx-auto mb-12">
        <h3 className="text-heading text-white! text-[40px]!">
          Chosen by Industry Leaders
        </h3>
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
