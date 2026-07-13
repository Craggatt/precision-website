'use client';

import { AnimatePresence, motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import CornerSquares from '@/components/CornerSquares';

const faqs = [
  {
    question: 'Is Precision Pulse replacing our displays?',
    answer:
      'No. Precision Pulse is designed to work with existing display infrastructure wherever possible.',
  },
  {
    question: 'Who is Precision Pulse for?',
    answer:
      'Gaming venues, clubs, hotels and multi-site hospitality operators.',
  },
  {
    question: 'How quickly can updates be deployed?',
    answer: 'Under 60 seconds in the demonstration environment.',
  },
  {
    question: 'Can multiple venues be managed?',
    answer: 'Yes.',
  },
  {
    question: 'How do I learn more?',
    answer: 'Book a live demonstration.',
  },
];

function FaqItem({
  faq,
  index,
  inView,
}: {
  faq: { question: string; answer: string };
  index: number;
  inView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: 'easeOut' }}
      className="border-b border-neutral-700"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
      >
        <span className="font-satoshi text-neutral-100 text-lg md:text-xl transition-colors duration-200 group-hover:text-white">
          {faq.question}
        </span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-neutral-400 shrink-0 transition-colors duration-200 group-hover:text-brand-primary"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed pb-6 max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section className="bg-neutral-900 px-2.5 md:px-5 lg:px-10">
      <div className="max-w-[1600px] mx-auto border-x border-neutral-700">
        <div
          ref={ref}
          className="relative px-5 md:px-10 py-16 md:py-24 border-b border-neutral-700"
        >
          <CornerSquares bg="#14171a" borderColor="#2f343a" />

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-aller font-bold text-neutral-50 text-4xl md:text-5xl leading-tight mb-8 md:mb-10"
          >
            FAQs
          </motion.h2>

          <div className="border-t border-neutral-700">
            {faqs.map((faq, index) => (
              <FaqItem key={faq.question} faq={faq} index={index} inView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
