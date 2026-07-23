'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
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

          <div className="flex justify-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 className="font-aller font-bold text-neutral-50 text-3xl md:text-5xl leading-tight">
                The technology evolved.
                <br />
                The workflow never did.
              </h2>
              <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mt-5">
                &quot;For over 20 years, Precision Signs has been at the
                forefront of digital gaming signage. Our displays evolved into
                stunning, high-impact digital experiences — but updating them
                stayed frustratingly manual.&quot;
              </p>
              <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mt-4">
                Every new game release or link change meant recreating custom
                content for multiple display resolutions, forcing venues to wait
                days or even weeks for a simple update. In an industry that
                moves fast, the old process couldn&apos;t keep up.
              </p>
              <p className="font-satoshi text-neutral-300 text-sm md:text-base italic mt-6">
                — Trevor Holden, Managing Director, Precision Signs
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
