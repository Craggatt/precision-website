'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import CornerSquares from '@/components/CornerSquares';

const benefits = [
  'Priority deployment',
  'Founding pricing',
  'Product roadmap influence',
  'Direct access to leadership',
  'Dedicated onboarding',
  'Early access to features',
];

export default function FoundingVenueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section className="bg-neutral-900 px-2.5 md:px-5 lg:px-10">
      <div className="max-w-[1600px] mx-auto border-x border-neutral-700">
        <div
          ref={ref}
          className="relative px-5 md:px-10 py-16 md:py-24 border-b border-neutral-700"
        >
          <CornerSquares bg="#14171a" borderColor="#2f343a" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12"
          >
            <h2 className="font-aller font-bold text-neutral-50 text-4xl md:text-5xl leading-tight">
              Become A Founding Venue
            </h2>
            <div className="flex items-center gap-3 shrink-0 md:pb-2">
              <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400">
                See the benefits
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-neutral-400"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.08,
                  ease: 'easeOut',
                }}
                className="group flex items-center justify-center text-center bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-10 md:py-12 transition-colors duration-300 hover:border-brand-primary/50"
              >
                <span className="font-satoshi text-neutral-300 text-sm md:text-base leading-snug transition-colors duration-300 group-hover:text-white">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
