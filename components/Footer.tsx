"use client";

import CornerSquares from "./CornerSquares";

const links = {
  Products: ["Overbank Signage", "Entry Displays", "Screens", "Infills", "Custom"],
  Company: ["About Us", "Blog", "Careers", "Partners"],
  Support: ["Documentation", "Installation", "Warranty", "Contact"],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e5e5]">
      {/* Main footer grid */}
      <div className="max-w-[1600px] mx-auto border-x border-[#e5e5e5]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {/* Brand column */}
        <div className="relative p-10 border-r border-[#e5e5e5] col-span-2 md:col-span-1">
          <CornerSquares />
          <img
            src="https://precisionsigns.com.au/wp-content/uploads/2018/11/logo.png"
            alt="Precision Signs"
            className="h-7 object-contain mb-5"
            style={{ filter: "brightness(0)" }}
          />
          <p className="font-satoshi text-[0.85rem] text-[#6b6b6b] leading-relaxed max-w-[200px]">
            Australian-made LED signage for casinos, clubs, and hotels.
          </p>
          <p className="label-mono mt-6">Est. 1999 · Sydney, AU</p>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items], i) => (
          <div
            key={heading}
            className="relative p-10 border-r border-[#e5e5e5] last:border-r-0"
          >
            <CornerSquares />
            <p className="label-mono mb-5">{heading}</p>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a className="font-satoshi text-[0.85rem] text-[#6b6b6b] hover:text-[#111111] transition-colors cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e5e5e5]">
      <div className="max-w-[1600px] mx-auto border-x border-[#e5e5e5] relative px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <CornerSquares />
        <p className="font-satoshi text-[0.75rem] text-[#aaaaaa]">
          © {new Date().getFullYear()} Precision Signs Pty Ltd. All rights reserved.
        </p>
        <p className="font-mono-ui text-[0.6rem] text-[#cccccc] tracking-widest uppercase">
          AU-MADE · ISO 9001
        </p>
      </div>
      </div>
    </footer>
  );
}
