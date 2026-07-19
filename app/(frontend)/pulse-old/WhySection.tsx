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

          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-10 md:gap-14 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="relative shrink-0"
            >
              <div className="relative w-44 h-44 md:w-80 lg:w-96 md:h-full rounded-md overflow-hidden border border-neutral-700">
                <Image
                  src="/images/pulse/trevor.jpg"
                  alt="Trevor Holden, Managing Director, Precision Signs"
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
                The technology evolved.
                <br />
                The workflow never did.
              </h2>
              <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mt-5">
                For over 20 years, Precision Signs has been at the forefront of
                digital gaming signage. Our displays evolved into stunning,
                high-impact digital experiences — but updating them stayed
                frustratingly manual. Every new game or link change meant
                custom content, recreated for multiple display resolutions, and
                venues waiting days or even weeks for a simple update. In an
                industry that moves fast, the process couldn&apos;t keep up.
              </p>
              <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mt-4">
                So we built Pulse — a smarter platform that puts control back
                in the hands of venues, so content updates can happen in
                minutes — reducing costs, eliminating delays, and unlocking the
                full potential of every digital display.
              </p>
              <p className="font-satoshi text-neutral-300 text-sm md:text-base italic mt-6">
                — Trevor Holden, Managing Director, Precision Signs
              </p>
              <svg
                viewBox="0 0 220 60"
                fill="none"
                aria-hidden
                className="w-40 h-auto mt-3 mx-auto md:mx-0 text-white/70"
              >
                <path
                  d="M12 42 C 24 12, 34 50, 46 32 S 64 14, 72 36 S 88 54 98 30 S 114 12 124 34 S 144 48 158 28 S 186 20 208 30"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
