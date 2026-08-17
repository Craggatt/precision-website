'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function PulseHero() {
  return (
    <div className="mx-auto w-full max-w-[1600px] text-left">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-4"
      ></motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="font-aller font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight "
      >
        Update Every Screen.
        <br />
        <span className="text-brand-primary">The Moment You Decide.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        className="mt-4 max-w-2xl font-satoshi text-sm leading-relaxed text-neutral-300 md:text-base"
      >
        Add a game. Update a link. Launch a promotion. Change your messaging.
        <br />
        With <b>Precision Pulse</b>, every screen updates in moments.
        <br />
        <b>No supplier. No approval chain. No waiting.</b>
      </motion.p>
    </div>
  );
}
