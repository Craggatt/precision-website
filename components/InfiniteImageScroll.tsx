'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface InfiniteImageScrollProps {
  /**
   * Array of image URLs to display in the infinite scroll
   */
  images: string[];

  /**
   * Animation speed in seconds (default: 20)
   * Lower = faster, Higher = slower
   */
  speed?: number;

  /**
   * Direction of scroll animation (default: 'right')
   */
  direction?: 'left' | 'right';

  /**
   * Image height in pixels (default: 400)
   */
  imageHeight?: number;

  /**
   * Gap between images in pixels (default: 24)
   */
  gap?: number;

  /**
   * Pause animation on hover (default: true)
   */
  pauseOnHover?: boolean;
}

function getTranslateX(el: HTMLElement): number {
  const transform = window.getComputedStyle(el).transform;
  if (!transform || transform === 'none') return 0;
  const match = transform.match(/matrix\(([^)]+)\)/);
  if (!match) return 0;
  const parts = match[1].split(',').map((v) => parseFloat(v.trim()));
  return parts[4] ?? 0;
}

export default function InfiniteImageScroll({
  images,
  speed = 500,
  direction = 'right',
  imageHeight = 400,
  gap = 24,
  pauseOnHover = true,
}: InfiniteImageScrollProps) {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const halfWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    halfWidthRef.current = track.scrollWidth / 2;
    xRef.current = direction === 'left' ? 0 : -halfWidthRef.current;
    track.style.transform = `translateX(${xRef.current}px)`;

    const tick = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pausedRef.current && halfWidthRef.current > 0) {
        const pxPerMs = halfWidthRef.current / (speed * 1000);
        if (direction === 'left') {
          xRef.current -= pxPerMs * dt;
          if (xRef.current <= -halfWidthRef.current) {
            xRef.current += halfWidthRef.current;
          }
        } else {
          xRef.current += pxPerMs * dt;
          if (xRef.current >= 0) {
            xRef.current -= halfWidthRef.current;
          }
        }
        track.style.transform = `translateX(${xRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [direction, speed, images.length]);

  const handleMouseEnter = () => {
    if (!pauseOnHover) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const currentX = getTranslateX(track);
    const viewportRect = viewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;

    let closestDelta = 0;
    let closestDistance = Infinity;
    for (const item of itemRefs.current) {
      if (!item) continue;
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(itemCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestDelta = viewportCenter - itemCenter;
      }
    }

    const targetX = currentX + closestDelta;

    pausedRef.current = true;
    xRef.current = targetX;
    track.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    track.style.transform = `translateX(${targetX}px)`;
  };

  const shiftByStep = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = imageHeight * (4 / 3);
    const step = itemWidth + gap;
    const half = halfWidthRef.current;

    let target = getTranslateX(track) - dir * step;
    if (half > 0) {
      if (target <= -half) target += half;
      if (target >= 0) target -= half;
    }

    pausedRef.current = true;
    xRef.current = target;
    track.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    track.style.transform = `translateX(${target}px)`;
  };

  const handleItemClick = (index: number) => {
    const item = itemRefs.current[index];
    const viewport = viewportRef.current;
    if (!item || !viewport) return;

    const viewportRect = viewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;
    const offset = itemCenter - viewportCenter;

    // Ignore clicks on the item already centered
    if (Math.abs(offset) < itemRect.width / 2) return;

    shiftByStep(offset > 0 ? 1 : -1);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={viewportRef}
      onMouseEnter={handleMouseEnter}
    >
      <div className="infinite-scroll-mask w-full">
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${gap}px` }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleItemClick(index)}
              className="relative flex-shrink-0 cursor-pointer overflow-hidden transition-transform duration-300 ease-out hover:scale-105 hover:brightness-110"
              style={{
                height: `${imageHeight}px`,
                width: 'auto',
                aspectRatio: '4/3',
              }}
            >
              <Image
                src={image}
                alt={`Gallery image ${(index % images.length) + 1}`}
                fill
                className="object-cover"
                sizes={`${Math.round(imageHeight * (4 / 3))}px`}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll to previous image"
        onClick={() => shiftByStep(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll to next image"
        onClick={() => shiftByStep(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
