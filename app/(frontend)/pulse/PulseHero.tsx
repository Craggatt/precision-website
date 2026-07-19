'use client';

import { motion } from 'motion/react';
import { CalendarClock } from 'lucide-react';
import BookDemoButton from './BookDemoButton';

export default function PulseHero() {
  return (
    <div className="text-center px-2.5 md:px-5">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-aller font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight bg-linear-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent"
      >
        Update Every Screen.
        <br />
        The Moment You Decide.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        className="font-satoshi text-neutral-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto mt-4"
      >
        Add a game. Change a link. Update your messaging — and watch it go live
        across every screen, in moments. No supplier. No approval chain. No
        waiting on someone else&apos;s timeline. That&apos;s Precision Pulse.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="mt-6"
      >
        <BookDemoButton className="inline-flex items-center gap-2.5 font-satoshi font-medium text-sm bg-brand-primary text-white px-6 py-3 rounded-sm hover:bg-brand-primary-hover transition-colors cursor-pointer shadow-[0_8px_30px_rgba(11,111,211,0.4)]">
          <CalendarClock size={17} strokeWidth={1.75} />
          Book a live demonstration
        </BookDemoButton>
      </motion.div>
    </div>
  );
}
