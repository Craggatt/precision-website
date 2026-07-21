'use client';

import { motion } from 'motion/react';

export default function PulseHero() {
  return (
    <div className="text-center px-2.5 md:px-5">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="font-satoshi font-medium text-xs md:text-sm tracking-[0.24em] text-brand-primary mb-4"
      >
        PRECISION PULSE
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
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
        className="font-satoshi text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-4"
      >
        Add a game. Update a link. Launch a promotion. Change your messaging.
        <br />
        With Precision Pulse, every screen updates in moments.
        <br />
        No supplier. No approval chain. No waiting.
      </motion.p>
    </div>
  );
}
