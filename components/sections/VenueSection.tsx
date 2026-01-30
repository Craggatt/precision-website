"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
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
  const x = useTransform(
    scrollVelocity,
    [-1000, 0, 1000],
    [
      baseVelocity > 0 ? "-10%" : "10%",
      "0%",
      baseVelocity > 0 ? "10%" : "-10%",
    ],
  );

  // Triple the logos for seamless loop
  const tripleLogos = [...logos, ...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-12"
        animate={{
          x: baseVelocity > 0 ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        style={{ x }}
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
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  return (
    <section
      ref={containerRef}
      className="w-full bg-neutral-900 py-24 overflow-hidden py-[200px]"
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
          baseVelocity={1}
          scrollVelocity={smoothVelocity}
        />
      </div>

      {/* Bottom Row - scrolls right, speeds up when scrolling up */}
      <LogoRow
        logos={bottomRowLogos}
        baseVelocity={-1}
        scrollVelocity={smoothVelocity}
      />
    </section>
  );
}
