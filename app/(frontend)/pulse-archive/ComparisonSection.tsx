'use client';

import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const OLD_WAY_STEPS = [
  'Decision Made',
  'Request Supplier',
  'Artwork',
  'Approvals',
  'Wait Days',
  'Missed Opportunities',
  'Live',
];

const PULSE_STEPS = ['Decide', 'Deploy', 'Done'];

function HorizontalProcess({
  steps,
  active = false,
}: {
  steps: string[];
  active?: boolean;
}) {
  return (
    <div className="mt-4 overflow-x-auto pb-2">
      <ol className="grid min-w-[58rem] grid-cols-7 gap-8">
        {steps.map((step, i) => (
          <li key={step} className="relative flex items-stretch">
            <div
              className={`flex min-h-14 w-full items-center justify-start rounded-sm border px-3 py-2 text-left font-satoshi font-medium text-sm ${
                active
                  ? 'border-brand-primary/45 bg-brand-primary/10 text-white shadow-[0_0_18px_rgba(11,111,211,0.12)]'
                  : 'border-neutral-600 bg-neutral-900/35 text-white'
              }`}
            >
              {step}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight
                aria-hidden
                size={16}
                strokeWidth={1.5}
                className={`absolute top-1/2 left-full ml-2 -translate-y-1/2 ${active ? 'text-brand-primary' : 'text-neutral-200'}`}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative rounded-lg border border-neutral-700/80 bg-neutral-800/40 backdrop-blur-sm overflow-hidden"
      >
        <div className="p-5 md:p-6">
          <h2 className="font-aller font-bold text-neutral-0 text-lg md:text-xl">
            THE OLD WAY
          </h2>
          <HorizontalProcess steps={OLD_WAY_STEPS} />
        </div>

        <div className="border-t border-neutral-700/80 bg-linear-to-br from-brand-primary/10 via-transparent to-brand-primary/5 p-5 md:p-6">
          <h2 className="flex items-center gap-2 font-aller font-bold text-white text-lg md:text-xl">
            <span>WITH</span>
            <Image
              src="/images/pulse/pulse.png"
              alt="PULSE"
              width={160}
              height={90}
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </h2>
          <HorizontalProcess steps={PULSE_STEPS} active />
        </div>
      </motion.div>
    </div>
  );
}
