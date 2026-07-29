'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { CalendarClock, ArrowRight } from 'lucide-react';

export default function AgeBanner({ ready = true }: { ready?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -8 }}
      transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      className="fixed top-14 left-0 right-0 z-40"
    >
      <Link
        href="/pulse"
        prefetch
        className="group block bg-linear-to-r from-brand-primary-active via-brand-primary to-brand-primary-active"
      >
        <div className="relative overflow-hidden">
          {/* Top highlight edge */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/25" />

          <div className="max-w-[1600px] mx-auto px-2.5 md:px-5 lg:px-10 h-10 flex items-center justify-center gap-2.5">
            <CalendarClock
              size={15}
              strokeWidth={1.75}
              className="hidden sm:block shrink-0 text-white/90"
            />
            <p className="font-satoshi text-white text-[0.7rem] sm:text-[0.8rem] leading-none whitespace-nowrap">
              <span className="font-semibold">
                See Precision Pulse live at AGE 2026
              </span>
              <span className="hidden md:inline text-white/80">
                {' '}
                — Stand 868 · ICC Sydney · 11–13 August
              </span>
              <span className="md:hidden text-white/80"> · Stand 868</span>
            </p>
            <span className="shrink-0 inline-flex items-center gap-1 font-satoshi text-white text-[0.7rem] sm:text-[0.8rem] font-medium leading-none">
              <span className="hidden sm:inline">Learn more</span>
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
