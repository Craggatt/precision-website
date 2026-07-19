'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import ParallaxImage from './ParallaxImage';

export default function RealCostSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section className="bg-neutral-900 px-2.5 md:px-5 lg:px-10">
      <div className="max-w-[1600px] mx-auto border-x border-neutral-700">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 border-b border-neutral-700">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col justify-center px-5 md:px-10 py-16 md:py-24"
          >
            <h2 className="font-aller font-bold text-neutral-50 text-3xl md:text-4xl lg:text-5xl leading-tight">
              The Real Cost Isn&apos;t The
              <br />
              Display. It&apos;s The Delay.
            </h2>
            <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed max-w-md mt-6">
              A promotion, a jackpot milestone, a compliance update — the
              decision takes minutes. Getting it live takes days: requests,
              suppliers, artwork, approvals, while the opportunity disappears.
              Most venues have accepted that as normal. We don&apos;t.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative min-h-72 lg:min-h-140 border-t lg:border-t-0 lg:border-l border-neutral-700"
          >
            <ParallaxImage
              src="/images/pulse/traffic.png"
              alt="Traffic at a standstill"
              sizes="(max-width: 1024px) 100vw, 50vw"
              overlayClassName="bg-neutral-900/30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
