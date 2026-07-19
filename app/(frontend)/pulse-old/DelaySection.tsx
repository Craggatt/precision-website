'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useEffect } from 'react';
import CornerSquares from '@/components/CornerSquares';

const processSteps = [
  { number: '01', title: 'Decision Made', time: '30 Seconds' },
  { number: '02', title: 'Design Requested', time: '5 Minutes' },
  { number: '03', title: 'Supplier Engagement', time: '7 Days' },
  { number: '04', title: 'Artwork Revisions', time: '5 Days' },
  { number: '05', title: 'Approvals', time: '5 Minutes' },
  { number: '06', title: 'Deployment', time: '30 Minutes' },
];

const painPoints = [
  'Lost opportunities',
  'Delayed jackpot campaigns',
  'Delayed promotions',
  'More administration',
  'Reduced responsiveness',
];

function ProcessCard({
  step,
  index,
  inView,
}: {
  step: { number: string; title: string; time: string };
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative"
    >
      <svg
        className="w-full h-auto"
        viewBox="0 0 180 160"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0h180v130h-20l-10 10H0V0z"
          fill="#1f2328"
          strokeWidth="1"
          className="stroke-[#404040] transition-colors duration-300 group-hover:stroke-brand-primary/50"
        />
      </svg>
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col">
        <span className="font-aller font-bold text-4xl md:text-5xl lg:text-6xl text-neutral-600 leading-none transition-colors duration-300 group-hover:text-brand-primary/40">
          {step.number}
        </span>
        <div className="mt-auto pb-4">
          <h3 className="font-aller font-bold text-white text-sm md:text-base leading-tight">
            {step.title}
          </h3>
          <p className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-neutral-500 mt-1.5">
            {step.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function DelaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef(null);
  const headingRef = useRef(null);
  const cardsInView = useInView(cardsRef, {
    once: true,
    margin: '0px 0px -10% 0px',
  });
  const headingInView = useInView(headingRef, {
    once: true,
    margin: '0px 0px -10% 0px',
  });
  const painRef = useRef(null);
  const painInView = useInView(painRef, {
    once: true,
    margin: '0px 0px -10% 0px',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - rect.top) / (windowHeight + rect.height * 0.5)
        )
      );

      const totalLength = 1200;
      line.style.strokeDashoffset = String(totalLength * (1 - progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-900 px-2.5 md:px-5 lg:px-10"
    >
      <div className="max-w-[1600px] mx-auto border-x border-neutral-700">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative px-5 md:px-10 py-12 md:py-16 border-b border-neutral-700"
        >
          <CornerSquares bg="#14171a" borderColor="#2f343a" />
          <p className="font-aller font-bold text-neutral-400 text-2xl md:text-3xl lg:text-4xl leading-tight mb-1">
            The Real Cost Isn&apos;t the Display.
          </p>
          <h2 className="font-aller font-bold text-neutral-50 text-4xl md:text-5xl lg:text-6xl leading-tight">
            It&apos;s The Delay.
          </h2>
        </motion.div>

        <div
          ref={cardsRef}
          className="relative px-5 md:px-10 py-12 md:py-16 border-b border-neutral-700 bg-neutral-900 background-texture-faint"
        >
          <CornerSquares bg="#14171a" borderColor="#2f343a" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={cardsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="flex justify-end mb-8"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400">
                Your current process
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-neutral-400"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          <div className="relative">
            {/* Zigzag connecting line */}
            <svg
              className="absolute top-1/2 left-0 w-full h-16 -translate-y-1/2 pointer-events-none hidden lg:block"
              viewBox="0 0 1200 60"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                ref={lineRef}
                d="M0 30 L100 30 L120 50 L200 50 L220 30 L300 30 L320 50 L400 50 L420 30 L500 30 L520 50 L600 50 L620 30 L700 30 L720 50 L800 50 L820 30 L900 30 L920 50 L1000 50 L1020 30 L1100 30 L1120 50 L1200 50"
                stroke="#0b6fd3"
                strokeWidth="2"
                strokeDasharray="1200"
                strokeDashoffset="1200"
              />
            </svg>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 relative z-10">
              {processSteps.map((step, index) => (
                <ProcessCard
                  key={step.number}
                  step={step}
                  index={index}
                  inView={cardsInView}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          ref={painRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-b border-neutral-700"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={point}
              initial={{ opacity: 0 }}
              animate={painInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              className={`relative flex items-center gap-3 px-5 md:px-6 py-6 border-neutral-700 ${index < painPoints.length - 1 ? 'border-b sm:border-b lg:border-b-0' : ''} ${index % 2 === 0 ? 'sm:border-r' : ''} lg:border-r lg:last:border-r-0`}
            >
              <CornerSquares bg="#14171a" borderColor="#2f343a" />
              <div className="w-6 h-6 rounded-full border border-red-500/70 flex items-center justify-center shrink-0">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-red-500"
                >
                  <path
                    d="M9 3L3 9M3 3l6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-aller font-bold text-white text-sm md:text-base">
                {point}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
