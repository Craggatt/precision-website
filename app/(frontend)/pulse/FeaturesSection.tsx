'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import CornerSquares from '@/components/CornerSquares';

const features = [
  {
    icon: '/images/pulse/20y.svg',
    title: '20+ years experience',
  },
  {
    icon: '/images/pulse/hospitality.svg',
    title: 'Hospitality industry expertise',
  },
  {
    icon: '/images/pulse/gambling.svg',
    title: 'Gaming venue experience',
  },
  {
    icon: '/images/pulse/australia.svg',
    title: 'National support capacity',
  },
];

// Border assignments per cell: 2-col grid on mobile, 4-col on md+
const cellBorders = [
  'border-r border-b md:border-b-0',
  'border-b md:border-b-0 md:border-r',
  'border-r',
  '',
];

function FeatureCell({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className={`group relative p-5 md:p-8 lg:p-10 border-neutral-700 ${cellBorders[index]}`}
    >
      <CornerSquares bg="#14171a" borderColor="#2f343a" />
      <p className="font-mono text-[0.65rem] tracking-[0.18em] text-neutral-600 mb-8">
        {String(index + 1).padStart(2, '0')}
      </p>
      <div className="w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 mb-8 relative transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
        <Image src={feature.icon} alt="" fill className="object-contain" />
      </div>
      <h3 className="font-aller font-bold text-neutral-50 text-base md:text-lg lg:text-xl leading-snug">
        {feature.title}
      </h3>
      <div className="mt-4 h-px w-8 bg-neutral-700 transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-brand-primary" />
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: '0px 0px -10% 0px',
  });

  return (
    <section className="border-t border-neutral-700 bg-neutral-900 px-2.5 md:px-5 lg:px-10">
      <div className="max-w-[1600px] mx-auto border-x border-neutral-700">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative px-5 md:px-10 py-12 md:py-16 border-b border-neutral-700"
        >
          <CornerSquares bg="#14171a" borderColor="#2f343a" />
          <h2 className="font-aller font-bold text-neutral-50 text-3xl md:text-4xl lg:text-5xl leading-tight">
            Supporting Gaming & Hospitality
            <br />
            Venues For More Than 20 Years
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-neutral-700">
          {features.map((feature, index) => (
            <FeatureCell key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
