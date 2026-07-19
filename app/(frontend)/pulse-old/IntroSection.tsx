'use client';

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';
import { useEffect, useRef } from 'react';
import CornerSquares from '@/components/CornerSquares';

function ScrollDashboard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);

  // 0 when the top of the block enters the viewport bottom,
  // 1 when it reaches 25% from the top — i.e. fully in view
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'start 0.25'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.98 && !playedRef.current) {
      playedRef.current = true;
      videoRef.current?.play().catch(() => {});
    }
  });

  // Reset when scrolled out of view so it replays on the way back
  const inView = useInView(wrapRef);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!inView) {
      video.pause();
      video.currentTime = 0;
      playedRef.current = false;
    } else if (scrollYProgress.get() >= 0.98 && !playedRef.current) {
      // Re-entering from above: progress is already 1, so the change
      // event won't fire — kick playback off here instead
      playedRef.current = true;
      video.play().catch(() => {});
    }
  }, [inView, scrollYProgress]);

  return (
    <div
      ref={wrapRef}
      className="relative max-w-7xl mx-auto mt-12 md:mt-16"
      style={{ perspective: '1400px' }}
    >
      {/* Glow — fades up as the panel flattens into view */}
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity, background: 'rgba(11, 111, 211, 0.18)' }}
        className="absolute inset-x-8 top-8 -bottom-8 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        style={{ rotateX, scale, transformOrigin: 'center 85%' }}
        className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-[0_32px_90px_rgba(0,0,0,0.55)]"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          poster="/images/pulse/animating-poster.webp"
          className="w-full h-auto"
        >
          <source src="/images/pulse/animating.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
}

export default function IntroSection() {
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-aller font-bold text-neutral-50 text-4xl md:text-5xl lg:text-6xl leading-tight">
              Introducing Precision Pulse
            </h2>
            <p className="font-satoshi text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mt-6">
              Hospitality and gaming venues are reducing display update times
              from days to under 60 seconds. No supplier bottlenecks, no
              approval delays, no endless email chains — just faster execution,
              greater control and a more responsive venue.
            </p>
          </motion.div>

          <ScrollDashboard />
        </div>
      </div>
    </section>
  );
}
