'use client';

import { motion, useInView } from 'motion/react';
import { Fragment, useRef } from 'react';
import Aurora from '@/components/Aurora';
import CornerSquares from '@/components/CornerSquares';
import Image from 'next/image';

const steps = [
  {
    icon: '/images/pulse/decision.svg',
    label: 'Decide',
    description:
      'Choose your promo, update a jackpot score, or change a link in the dashboard.',
  },
  {
    icon: '/images/pulse/pulse.svg',
    label: 'Deploy',
    description:
      'Hit approve to instantly format the content for all your floor resolutions.',
  },
  {
    icon: '/images/pulse/Live.svg',
    label: 'Done',
    description:
      'Watch your new content go live across every single display simultaneously.',
  },
];

export default function GamingFloorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section className="bg-neutral-900 px-2.5 md:px-5 lg:px-10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[1600px] mx-auto border-x border-neutral-700"
      >
        <div className="relative border-b border-neutral-700 px-5 md:px-10 py-16 md:py-24 overflow-hidden bg-neutral-800">
          <CornerSquares bg="#14171a" borderColor="#2f343a" />
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={['#1f2328', '#0b6fd3', '#1f2328']}
              blend={0.6}
              amplitude={0.8}
              speed={0.4}
            />
          </div>

          <div className="relative z-10">
            <h2 className="font-aller font-bold text-white text-4xl md:text-5xl lg:text-5xl leading-tight mb-4">
              Go Live In 3 Simple Steps
            </h2>
            <p className="font-satoshi text-neutral-300 text-base md:text-lg max-w-md mb-16 md:mb-20">
              Precision Pulse streamlines your entire workflow down to three
              fast actions.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 md:px-4 lg:px-12">
              {steps.map((step, index) => (
                <Fragment key={step.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.25,
                      ease: 'easeOut',
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4 relative">
                      <Image
                        src={step.icon}
                        alt={step.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-mono text-[0.6rem] tracking-[0.18em] text-neutral-400 mb-1.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-aller font-bold text-white text-lg md:text-xl">
                      {step.label}
                    </span>
                    <span className="font-satoshi text-neutral-400 text-xs md:text-sm text-center max-w-52 mt-2">
                      {step.description}
                    </span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex items-center flex-1 mx-6 lg:mx-12">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.55 + index * 0.25,
                          ease: 'easeOut',
                        }}
                        className="w-full h-0.5 bg-linear-to-r from-white/50 to-white/20 origin-left"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 1 + index * 0.25,
                        }}
                        className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-8 border-l-white/50 shrink-0"
                      />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
