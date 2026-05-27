'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Tag from '../Tag';
import { Media, Testimonial } from '@/payload-types';

function TestimonialCell({
  testimonial,
  index,
  isRightCol,
}: {
  testimonial: Testimonial;
  index: number;
  isRightCol: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });

  const isLeftCol = !isRightCol;
  const isFirstRow = index < 2;

  const profileImg = testimonial.profilePicture?.value;
  const profileUrl =
    typeof profileImg === 'object' ? ((profileImg as Media).url ?? null) : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className={[
        'relative p-2.5 py-10 md:p-5 lg:p-10 overflow-hidden bg-neutral-800',
        isLeftCol ? 'md:border-r md:border-neutral-700' : '',
        isFirstRow ? 'border-b border-neutral-700' : '',
        index === 2 ? 'border-b border-neutral-700 md:border-b-0' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className="block font-aller font-bold text-[3rem] leading-none lg:mb-4 text-neutral-600"
        aria-hidden
      >
        &ldquo;
      </span>

      <p className="font-satoshi text-neutral-300 text-[0.95rem] leading-relaxed mb-6 lg:mb-8">
        {testimonial.quote}
      </p>

      <div className="flex items-center gap-3">
        {profileUrl ? (
          <img
            src={profileUrl}
            alt={testimonial.name ?? ''}
            className="w-9 h-9 rounded-full shrink-0 object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full shrink-0 bg-neutral-600" />
        )}
        <div>
          <p className="font-aller font-bold text-neutral-200 text-[0.85rem] leading-snug">
            {testimonial.name}
          </p>
          <p className="font-satoshi text-[0.75rem] text-neutral-400 mt-0.5">
            {testimonial.position} · {testimonial.organisation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: '0px 0px -10% 0px',
  });

  const featured = testimonials.filter(t => t.isFeatured);
  const display = featured.slice(0, 4);
  if (display.length < 4 && testimonials.length > 0) {
    const first = testimonials[0];
    while (display.length < 4) display.push(first);
  }

  const totalCols = 2;

  return (
    <section className="px-2.5 md:px-5 lg:px-10 border-t border-neutral-700 bg-neutral-900">
      <div className="max-w-[1600px] mx-auto border-x border-neutral-700 relative bg-neutral-900 ">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative px-2.5 md:px-5 lg:px-10 py-10 md:py-12 border-b border-b-neutral-700 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <Tag number="04" text="TESTIMONIALS" />
            <h2 className="font-aller font-bold text-neutral-50 text-4xl md:text-5xl leading-tight mt-300">
              Trusted by Australia&apos;s
              <br />
              leading venues
            </h2>
          </div>
          <p className="font-satoshi text-neutral-400 text-[0.9rem] leading-relaxed max-w-sm">
            Partnering with Venues demanding supported signage systems that
            drive performance
          </p>
        </motion.div>

        {/* Testimonial grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {display.map((testimonial, index) => (
            <TestimonialCell
              key={`${testimonial.id}-${index}`}
              testimonial={testimonial}
              index={index}
              isRightCol={index % totalCols === totalCols - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
