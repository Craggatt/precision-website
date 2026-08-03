'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import ParallaxImage from './ParallaxImage';

const benefits = [
  {
    title: 'Faster execution',
    description: 'Go from idea to display in an instant.',
  },
  {
    title: 'Greater control',
    description: 'Manage everything in-house from a single dashboard.',
  },
  {
    title: 'Less admin',
    description: 'Eliminate back-and-forth support emails.',
  },
  {
    title: 'Consistent messaging',
    description: 'Update multi-resolution displays simultaneously.',
  },
];

export default function ChangesProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section className="bg-neutral-900">
      <div className="px-2.5 md:px-5 lg:px-10">
        <div className="max-w-[1600px] mx-auto border-x border-neutral-700">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="relative min-h-72 lg:min-h-140 order-2 lg:order-1 border-t lg:border-t-0 border-neutral-700"
            >
              <ParallaxImage
                src="/images/pulse/car.png"
                alt="Sports car moving at speed"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col justify-center px-5 md:px-10 py-16 md:py-24 order-1 lg:order-2 lg:border-l border-neutral-700"
              style={{
                background:
                  'linear-gradient(135deg, #0a1420 0%, #14171a 55%, #0d1926 100%)',
              }}
            >
              <h2 className="font-aller font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
                Precision Pulse will change the process, not just the screen.
              </h2>
              <p className="font-satoshi text-neutral-300 text-sm md:text-base leading-relaxed max-w-md mt-6">
                Stop relying on external suppliers and waiting games. Create,
                approve, and deploy content yourself in real time.
              </p>
              <ul className="font-satoshi text-neutral-300 text-sm md:text-base leading-relaxed max-w-md mt-6 space-y-3">
                {benefits.map(benefit => (
                  <li key={benefit.title} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                    <span>
                      <span className="text-white font-medium">
                        {benefit.title}
                      </span>{' '}
                      – {benefit.description}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Full-width brand rule, as in the layout */}
      <div className="h-1.5 bg-brand-primary" />
    </section>
  );
}
