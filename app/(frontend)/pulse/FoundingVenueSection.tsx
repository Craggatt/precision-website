'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import ParallaxImage from './ParallaxImage';

export default function FoundingVenueSection() {
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
              Become A<br />
              Founding Venue
            </h2>
            <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed max-w-md mt-6">
              Join a select group of operators helping shape the next standard
              in gaming floor communications — priority deployment, founding
              pricing, roadmap influence, and direct access to the Pulse team.
              Places are limited to what our onboarding and engineering teams
              can support.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative min-h-72 lg:min-h-140 border-t lg:border-t-0 lg:border-l border-neutral-700"
          >
            <ParallaxImage
              src="/images/pulse/venue.png"
              alt="Gaming venue floor with digital displays"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
