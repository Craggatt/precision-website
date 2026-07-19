'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import CornerSquares from '@/components/CornerSquares';

const beforeItems = [
  'Waiting days',
  'Supplier dependency',
  'Approval bottlenecks',
  'Manual workflows',
  'Delayed execution',
];

const afterItems = [
  'Faster deployment',
  'Internal control',
  'Greater agility',
  'Immediate updates',
  'Operational efficiency',
];

function CrossBullet() {
  return (
    <div className="w-5 h-5 rounded-full border border-red-500/70 flex items-center justify-center shrink-0">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-red-500">
        <path
          d="M9 3L3 9M3 3l6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function CheckBullet() {
  return (
    <div className="w-5 h-5 rounded-full border border-brand-primary flex items-center justify-center shrink-0">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-brand-primary">
        <path
          d="M2.5 6.5L5 9l4.5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function ShiftSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section className="bg-neutral-900 px-2.5 md:px-5 lg:px-10">
      <div className="max-w-[1600px] mx-auto border-x border-neutral-700">
        <div
          ref={ref}
          className="relative px-5 md:px-10 py-16 md:py-24 border-b border-neutral-700 bg-neutral-900 background-texture-faint"
        >
          <CornerSquares bg="#14171a" borderColor="#2f343a" />

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-aller font-bold text-neutral-50 text-4xl md:text-5xl leading-tight text-center"
          >
            The Shift With Precision Pulse
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mt-12 md:mt-16 items-start">
            {/* Before Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="rounded-md border border-neutral-700 bg-neutral-800 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <CrossBullet />
                <h3 className="font-aller font-bold text-white text-lg md:text-xl">
                  Before Pulse
                </h3>
              </div>
              <ul className="flex flex-col gap-4">
                {beforeItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.08,
                      ease: 'easeOut',
                    }}
                    className="flex items-center gap-3"
                  >
                    <CrossBullet />
                    <span className="font-satoshi text-neutral-300 text-sm md:text-base">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* After Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="relative rounded-md border border-brand-primary p-6 md:p-8 shadow-[0_0_50px_rgba(11,111,211,0.25)]"
              style={{
                background:
                  'linear-gradient(135deg, #0a1420 0%, #14171a 60%, #0a1420 100%)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-brand-primary shrink-0"
                >
                  <path
                    d="M2 12h4l3-8 6 16 3-8h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="font-aller font-bold text-white text-lg md:text-xl">
                  After Pulse
                </h3>
              </div>
              <ul className="flex flex-col gap-4">
                {afterItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.55 + index * 0.08,
                      ease: 'easeOut',
                    }}
                    className="flex items-center gap-3"
                  >
                    <CheckBullet />
                    <span className="font-satoshi text-neutral-100 text-sm md:text-base">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
