'use client';

import { AnimatePresence, motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import CornerSquares from '@/components/CornerSquares';

const faqs = [
  {
    question: 'Will Precision Pulse replacing our displays?',
    answer:
      "No. it's designed to work with your existing display infrastructure wherever possible.",
  },
  {
    question: 'Who is it designed for?',
    answer:
      'Gaming venues, clubs, hotels and hospitality groups looking to improve control and cut update delays.',
  },
  {
    question: 'How quickly will content be updated?',
    answer: 'In moments, depending on your workflow and venue environment.',
  },
  {
    question: 'Will I be able to manage multiple venues?',
    answer:
      'Yes. multi-site operators manage all locations from one central platform.',
  },
  {
    question: 'How long will implementation take?',
    answer:
      'Timelines vary by venue, but onboarding is guided end-to-end — venue assessment, network review, configuration and training are all handled as part of rollout.',
  },
  {
    question: 'Will we need technical staff to run it?',
    answer:
      'No. Pulse is built for venue and operations teams to use directly, without needing IT or design skills.',
  },
  {
    question: 'Will content be compliant with gaming regulations?',
    answer:
      "Pulse gives you direct control over what's published, so your existing compliance and approval processes apply. you decide what goes live and when.",
  },
  {
    question: 'What will happen to our current supplier relationship?',
    answer:
      "That's your call. Many venues keep suppliers for larger creative projects and use Pulse for the day-to-day updates that don't need to wait on anyone.",
  },
  {
    question: 'Will our content and data be secure?',
    answer:
      'Yes — access and publishing controls sit with your venue, with permissions managed at the operator level.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Founding Partners receive 12 months free as part of the program. Pricing beyond that is discussed as part of your demonstration.',
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
      transition={{
        duration: 0.4,
        delay: 0.15 + index * 0.08,
        ease: 'easeOut',
      }}
      className="border-b border-neutral-700"
    >
      <button
        onClick={() => setOpen(o => !o)}
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
              <FaqItem
                key={faq.question}
                faq={faq}
                index={index}
                inView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
