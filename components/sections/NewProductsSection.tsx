"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Tag from "../Tag";
import FlowingMenu from "../FlowingMenu";

const menuItems = [
  {
    link: "/products?cat=Overbank+Signage",
    text: "Overbank Signage",
    image: "/images/casino-overbank.png",
  },
  {
    link: "/products?cat=Entry+Displays",
    text: "Entry Displays",
    image: "/images/gaming-floor.png",
  },
  {
    link: "/products?cat=Screens",
    text: "Screens",
    image: "/images/crossroads-hotel.jpg",
  },
  {
    link: "/products?cat=Infills",
    text: "Infills",
    image: "/images/casino-overbank.png",
  },
  {
    link: "/products?cat=Jackpot+History",
    text: "Jackpot History",
    image: "/images/gaming-floor.png",
  },
];

export default function NewProductsSection() {
  const [menuHovered, setMenuHovered] = useState(false);

  return (
    <div className="lg:h-screen bg-neutral-900 px-2.5 md:px-5 lg:px-10">
      <div className="max-w-[1600px] mx-auto h-full flex flex-col lg:flex-row border-x border-neutral-700">
        {/* Left: Gaming floor copy + buttons */}
        <div
          className={`flex flex-col justify-center py-10 px-2.5 md:px-5 lg:px-10 gap-500 overflow-hidden shrink lg:basis-0 grow transition-[flex-grow] duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] min-h-[50vh]`}
        >
          <div className="flex flex-col gap-300">
            <Tag number="01" text="OUR PRODUCTS" />
            <h2 className="font-aller font-black text-4xl lg:text-5xl leading-tight">
              Gaming floor <br />
              signage, engineered.
            </h2>
          </div>
          <p className="font-satoshi text-neutral-400 text-sm leading-relaxed max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex flex-row gap-300">
            <a
              href="/products"
              className="font-satoshi text-sm text-white px-5 py-2.5 rounded-sm transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              View Products
            </a>
            <button className="font-satoshi text-sm bg-brand-primary text-white px-5 py-2.5 rounded-sm hover:bg-neutral-200 transition-colors font-medium flex items-center gap-200">
              Get a Quote
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Right: Flowing product menu */}
        <div
          className="border-t border-t-neutral-700 lg:border-t-0 lg:border-l lg:border-l-neutral-700"
          style={{
            flexGrow: menuHovered ? 2 : 1,
            flexShrink: 1,
            flexBasis: 0,
            transition: "flex-grow 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
          onMouseEnter={() => setMenuHovered(true)}
          onMouseLeave={() => setMenuHovered(false)}
        >
          <FlowingMenu
            items={menuItems}
            bgColor="#14171a"
            marqueeBgColor="#0b6fd3"
            marqueeTextColor="#ffffff"
            borderColor="#404040"
            textColor="#ffffff"
          />
        </div>
      </div>
    </div>
  );
}
