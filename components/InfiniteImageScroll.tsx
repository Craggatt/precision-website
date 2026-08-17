'use client';

import Image from 'next/image';

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

export default function InfiniteImageScroll({
  images,
  speed = 20,
  direction = 'right',
  imageHeight = 400,
  gap = 24,
  pauseOnHover = true,
}: InfiniteImageScrollProps) {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  // Animation style
  const animationName = direction === 'left' ? 'scroll-left' : 'scroll-right';

  return (
    <div className="w-full overflow-hidden">
      <div className="infinite-scroll-mask w-full">
        <div
          className="flex"
          style={{
            gap: `${gap}px`,
            animationName: animationName,
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
          onMouseEnter={(e) => {
            if (pauseOnHover) {
              e.currentTarget.style.animationPlayState = 'paused';
            }
          }}
          onMouseLeave={(e) => {
            if (pauseOnHover) {
              e.currentTarget.style.animationPlayState = 'running';
            }
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 overflow-hidden transition-transform duration-300 ease-out hover:scale-105 hover:brightness-110"
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
    </div>
  );
}
