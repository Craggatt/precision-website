"use client";

import { caseStudies } from "@/data/caseStudies";
import CircularGallery from "../CircularGallery";
import Tag from "../Tag";

const items = [
  {
    image: "/images/crossroads-hotel.jpg",
    text: "Crossroads Hotel",
  },
  {
    image: "/images/gaming-floor.png",
    text: "Gaming Floor Install",
  },
  {
    image: "/images/casino-overbank.png",
    text: "Casino Overbank",
  },
];

export default function GallerySection() {
  const items = caseStudies.map((cs) => {
    return {
      image: `/_next/image?url=${encodeURIComponent(cs.feature_image)}&w=1920&q=75`,
      text: cs.name,
    };
  });
  return (
    <section className="bg-neutral-900 border-b border-t border-t-neutral-700 border-b-neutral-700 h-screen flex flex-col">
      {/* Section header — keep padding here */}
      <div className="px-2.5 md:px-5 lg:px-10">
        <div className="max-w-[1600px] w-full mx-auto border-x border-b border-[#2a2a2a] p-2.5 md:p-5 py-10 lg:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col gap-300">
            <Tag number="02" text="OUR WORK" />
            <h2 className="font-aller font-bold text-white text-3xl md:text-5xl leading-tight">
              Featured installations
            </h2>
          </div>
          <p className="font-satoshi text-sm text-neutral-400 max-w-xs leading-relaxed">
            Drag to explore our recent casino, club, and hotel signage projects
            across Australia.
          </p>
        </div>
      </div>

      {/* Gallery wrapper — full width, with decorative lines as absolute overlays */}
      <div className="relative flex-1 w-full ">
        {/* Decorative vertical lines matching the 1600px container */}
        <div className="absolute inset-0 px-2.5 md:px-5 lg:px-10 pointer-events-none z-10">
          <div
            className="h-full max-w-[1600px] w-full mx-auto border-l border-r border-neutral-700"
            aria-hidden="true"
          />
        </div>

        {/* Gallery itself — full viewport width */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-neutral-900/0 to-neutral-900 -top-10">
          <CircularGallery
            items={items}
            bend={0.5}
            textColor="rgba(255,255,255,0.8)"
            borderRadius={0}
            scrollEase={0.02}
            font="bold 20px Aller"
          />
        </div>
      </div>
    </section>
  );
}
