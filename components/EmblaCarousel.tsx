"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface EmblaCarouselProps {
  items: { image: string; text: string }[];
}

export default function EmblaCarousel({ items }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Viewport */}
      <div className="overflow-hidden w-full flex-1" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative flex-[0_0_85%] min-w-0 mx-2 rounded-lg overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.text}
                fill
                className="object-cover"
                sizes="85vw"
                unoptimized={item.image.startsWith("/_next/image")}
              />
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-white font-aller font-bold text-xl">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 pb-2 px-2.5">
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-600 text-neutral-400 hover:text-white hover:border-neutral-400 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dots */}
        <button
          onClick={scrollNext}
          aria-label="Next slide"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-600 text-neutral-400 hover:text-white hover:border-neutral-400 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
