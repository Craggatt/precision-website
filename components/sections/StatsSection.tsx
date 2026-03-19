"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CornerSquares from "../CornerSquares";

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "200+", label: "Venues Fitted" },
  { value: "50+", label: "Products" },
  { value: "3", label: "States Covered" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section ref={ref} className="bg-[#111111]">
      <div className="max-w-[1600px] mx-auto border-x border-[#2a2a2a] bg-[#111111]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="relative px-5 md:px-8 py-8 md:py-10 border-r border-[#2a2a2a] last:border-r-0 nth-2:border-r-0 md:nth-2:border-r md:nth-2:border-[#2a2a2a]"
            >
              <CornerSquares />
              <p className="font-mono-ui text-[2.5rem] leading-none text-brand-primary">
                {stat.value}
              </p>
              <p className="label-mono mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
