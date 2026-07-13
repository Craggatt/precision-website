'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import CornerSquares from '@/components/CornerSquares';

export default function WhySection() {
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
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="relative shrink-0"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-md overflow-hidden border border-neutral-700">
                <Image
                  src="/images/pulse/trevor.jpg"
                  alt="Trevor Holden"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="text-center md:text-left"
            >
              <h2 className="font-aller font-bold text-neutral-50 text-3xl md:text-4xl leading-tight">
                Why We Built
                <br />
                Precision Pulse
              </h2>
              <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed max-w-md mt-4">
                For more than 20 years we&apos;ve watched operators face the
                same frustration — the decision takes five minutes, the update
                takes three days. We decided to build a better way.
              </p>
              <p className="font-aller font-bold text-white text-lg mt-6">
                Trevor Holden
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
