"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Zap, Wrench, Shield, Clock, Star, Headphones } from "lucide-react";
import CornerSquares from "../CornerSquares";

const features = [
  {
    icon: Star,
    title: "Australian Made",
    description:
      "Designed and manufactured locally in Australia, ensuring quality control, fast turnaround times, and full compliance with Australian standards.",
    link: "/images/custom-design.png",
  },
  {
    icon: Zap,
    title: "LED Innovation",
    description:
      "Cutting-edge LED technology delivering vibrant, energy-efficient displays that captivate guests and stand out on any gaming floor.",

    link: "/images/led.png",
  },
  {
    icon: Wrench,
    title: "Custom Design",
    description:
      "Bespoke signage solutions tailored to your venue's brand identity, floor layout, and regulatory requirements.",
    link: "/images/custom-design.png",
  },
  {
    icon: Clock,
    title: "Rapid Installation",
    description:
      "Professional installation teams minimise venue downtime — getting your signage operational quickly and without disruption.",
    link: "/images/led.png",
  },
  {
    icon: Shield,
    title: "Casino-Grade Durability",
    description:
      "Every product is engineered to withstand 24/7 operation in high-traffic gaming environments, backed by rigorous quality testing.",
    link: "/images/custom-design.png",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "Dedicated service and maintenance teams ensure your signage keeps performing at its best, long after installation.",
    link: "/images/led.png",
  },
];

function FeatureCell({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="relative p-5 md:p-10 border-r border-b border-[#e5e5e5] even:border-r-0 md:even:border-r-0 lg:even:border-r lg:nth-3:border-r-0 last:border-b-0 md:nth-5:border-b-0 md:nth-6:border-b-0 lg:nth-4:border-b-0 lg:nth-5:border-b-0 lg:nth-6:border-b-0 last:border-r-0"
    >
      <CornerSquares />
      {/* Icon chip — brand-tinted border on hover */}
      <img src={feature.link} className="w-[150px]"></img>

      <h3 className="font-aller font-bold text-[#111111] text-[1.05rem] leading-snug mb-2">
        {feature.title}
      </h3>
      <p className="font-satoshi text-[#6b6b6b] text-[0.9rem] leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });

  return (
    <section className="border-t border-[#e5e5e5] bg-linear-to-b from-brand-primary via-white to white">
      <div className="max-w-[1600px] mx-auto border-x border-[#e5e5e5] bg-white">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative px-5 md:px-10 py-10 md:py-12 border-b border-[#e5e5e5] flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <CornerSquares />
          <div>
            <p className="label-mono mb-3">Why Precision Signs</p>
            <h2 className="font-aller font-bold text-[#111111] text-3xl md:text-4xl leading-tight">
              Signage built for the gaming floor
            </h2>
          </div>
          <p className="font-satoshi text-[#6b6b6b] text-[0.9rem] leading-relaxed max-w-sm">
            Every product is engineered to meet the demanding standards of
            Australia&apos;s leading casinos, clubs, and hotels.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCell key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
