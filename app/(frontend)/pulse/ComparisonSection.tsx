'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const OLD_WAY_STEPS = [
  'Decision made',
  'Request sent to supplier',
  'Artwork created',
  'Revisions and approvals',
  'Waiting days for update',
  'Missed opportunities',
  'Finally deployed',
];

const PULSE_STEPS = [
  { title: 'Decision made', detail: 'Yours, whenever you make it' },
  { title: 'You deploy it', detail: 'From anywhere' },
  { title: 'Every screen updates', detail: 'All venues, in a moment' },
];

function VsBadge({ className }: { className?: string }) {
  return (
    <div
      className={`size-11 rounded-full border border-neutral-600 bg-neutral-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center font-aller font-bold text-neutral-300 text-sm ${className ?? ''}`}
    >
      VS
    </div>
  );
}

export default function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <div className="max-w-5xl mx-auto w-full px-2.5 md:px-5 lg:px-10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative rounded-lg border border-neutral-700/80 bg-neutral-800/40 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      >
        {/* The old way */}
        <div className="p-6 md:p-8">
          <h2 className="font-aller font-bold text-neutral-300 text-xl md:text-2xl">
            The Old Way
          </h2>
          <span className="inline-flex mt-2.5 font-satoshi font-medium text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 border border-neutral-600/80 rounded-full px-3 py-1">
            7 steps · Days of waiting
          </span>
          <ul className="mt-6 space-y-3">
            {OLD_WAY_STEPS.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.2 + i * 0.08,
                  ease: 'easeOut',
                }}
                className="flex items-baseline gap-4"
              >
                <span className="font-satoshi font-medium text-neutral-600 text-sm tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-aller font-bold text-neutral-400 text-sm md:text-base">
                  {step}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mobile divider with VS badge */}
        <div className="flex lg:hidden items-center gap-4 px-6">
          <div className="h-px flex-1 bg-neutral-700" />
          <VsBadge />
          <div className="h-px flex-1 bg-neutral-700" />
        </div>

        {/* With Pulse */}
        <div className="p-6 md:p-8 lg:border-l border-neutral-700/80 bg-linear-to-br from-brand-primary/10 via-transparent to-brand-primary/5 flex flex-col">
          <h2 className="font-aller font-bold text-white text-xl md:text-2xl">
            With Pulse
          </h2>
          <span className="inline-flex self-start mt-2.5 font-satoshi font-medium text-[0.65rem] tracking-[0.18em] uppercase text-brand-primary border border-brand-primary/40 bg-brand-primary/10 rounded-full px-3 py-1">
            3 steps · Moments
          </span>
          <ul className="mt-6">
            {PULSE_STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.4 + i * 0.15,
                  ease: 'easeOut',
                }}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {/* Connecting line between step badges */}
                {i < PULSE_STEPS.length - 1 && (
                  <div className="absolute left-4.5 top-9 bottom-0 w-px bg-linear-to-b from-brand-primary/50 to-brand-primary/10" />
                )}
                <div className="size-9 shrink-0 rounded-full bg-brand-primary/10 border border-brand-primary/40 flex items-center justify-center font-satoshi font-medium text-brand-primary text-xs tabular-nums shadow-[0_0_16px_rgba(11,111,211,0.25)]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="pt-0.5">
                  <p className="font-aller font-bold text-white text-base md:text-lg leading-tight">
                    {step.title}
                  </p>
                  <p className="font-satoshi text-neutral-400 text-sm mt-0.5">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
            className="mt-auto pt-8"
          >
            <div className="flex items-center justify-center gap-3 bg-brand-primary rounded-sm px-6 py-3 shadow-[0_8px_30px_rgba(11,111,211,0.35)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-white" />
              </span>
              <span className="font-satoshi font-medium text-white text-sm tracking-[0.2em] uppercase">
                Live. In Moments.
              </span>
            </div>
          </motion.div>
        </div>

        {/* Desktop VS badge on the seam */}
        <VsBadge className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
      </motion.div>
    </div>
  );
}
