'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

/**
 * Fills its (relatively positioned) parent with an image 15% taller than the
 * frame, anchored to the bottom. Scroll-linked translation pans through the
 * hidden 15% as the section crosses the viewport — a classic slow-parallax.
 */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  overlayClassName,
}: {
  src: string;
  alt: string;
  sizes?: string;
  overlayClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Element is 115% of the frame; 13% of its own height ≈ the extra 15%
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '13%']);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 bottom-0 h-[115%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </motion.div>
      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      )}
    </div>
  );
}
