'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, CalendarClock } from 'lucide-react';
import Aurora from '@/components/Aurora';
import { useDemoStore } from '@/store/demoStore';

export default function PulseCTASection() {
  const { setOpen } = useDemoStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section className="border-t border-neutral-600 bg-neutral-900">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative border-b border-neutral-600 px-2.5 md:px-5 lg:px-10"
      >
        <div className="relative max-w-[1600px] mx-auto border-x border-neutral-700 px-2.5 md:px-5 lg:px-10 py-16 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-10 bg-neutral-800 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={['#1f2328', '#0b6fd3', '#1f2328']}
              blend={0.6}
              amplitude={0.8}
              speed={0.4}
            />
          </div>
          <div className="relative z-10 max-w-xl">
            <h2 className="font-aller font-bold text-white text-3xl md:text-4xl leading-tight">
              Venue operators should not
              <br />
              have to wait days to update a screen.
            </h2>
            <p className="font-satoshi text-neutral-200 text-base leading-relaxed mt-5 max-w-md">
              Cut display update times from days to moments — no supplier
              bottlenecks, no approval chains, no waiting.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              className="inline-flex items-center justify-center gap-2 font-satoshi text-[0.85rem] text-white px-6 py-3 rounded-sm transition-colors font-medium border border-white/20 hover:bg-white/20 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Apply For Founding Venue Status
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 font-satoshi text-[0.85rem] bg-brand-primary text-white px-6 py-3 rounded-sm transition-colors hover:bg-neutral-950 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Book A Demonstration
              <CalendarClock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
