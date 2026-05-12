'use client';

import Link from 'next/link';
import CornerSquares from './CornerSquares';

const links = {
  Products: [
    {
      name: 'Overbank Signage',
      link: '/products?cat=Overbank%20Signage',
    },
    {
      name: 'Entry Displays',
      link: '/products?cat=Entry%20Displays',
    },
    {
      name: 'Screens',
      link: '/products?cat=Screens',
    },
    {
      name: 'Infills',
      link: '/products?cat=Infills',
    },
    {
      name: 'Custom',
      link: '/products?cat=Custom',
    },
  ],
  Content: [
    {
      name: 'Precision Pixel',
      link: '/content/precision-pixel',
    },
    {
      name: 'Jackpot Scoreboard',
      link: '/content/jackpot-scoreboard',
    },
    {
      name: 'Custom Animation',
      link: '/content/custom-animation',
    },
    {
      name: 'Attract Content',
      link: '/content/attract-content',
    },
  ],
  Support: [
    {
      name: 'Support & Service',
      link: '/service-support',
    },
    {
      name: 'Contact',
      link: '/contact',
    },
    {
      name: 'Precision Pixel Login',
      link: 'https://pixel.precisionsigns.com.au/',
    },
    {
      name: 'Precision Pulse Login',
      link: 'https://pulse.precisionsigns.com.au/',
    },
  ],
};

export default function Footer() {
  return (
    <footer className=" bg-neutral-900 ">
      {/* Main footer grid */}
      <div className="px-2.5 md:px-5 lg:px-10">
        <div className="max-w-[1600px] mx-auto border-x border-[#2a2a2a]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {/* Brand column */}
            <div className="relative p-2.5 md:p-5 lg:p-10 py-10 border-b md:border-b-0 md:border-r border-[#2a2a2a] col-span-2 md:col-span-1">
              <CornerSquares bg="" />
              <img
                src="https://precisionsigns.com.au/wp-content/uploads/2018/11/logo.png"
                alt="Precision Signs"
                className="h-7 object-contain mb-5 brightness-0 invert"
              />
              <p className="font-satoshi text-[0.85rem] text-neutral-400 leading-relaxed max-w-[200px]">
                Australian-made LED signage for casinos, clubs, and hotels.
              </p>
              <p className="label-mono mt-6">Est. 1999 · Wagga Wagga, AU</p>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([heading, items], i) => (
              <div
                key={heading}
                className={`relative px-2.5 md:px-5 lg:px-10 py-10 border-[#2a2a2a] md:last:border-r-0 ${i === 1 ? 'border-r-0 md:border-r' : 'border-r'} ${i < 2 ? 'border-b md:border-b-0' : ''}`}
              >
                <CornerSquares />
                <p className="label-mono mb-5">{heading}</p>
                <ul className="flex flex-col gap-2.5">
                  {items.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.link}
                        prefetch
                        className="font-satoshi text-[0.85rem] text-neutral-300 hover:text-[#f0f0f0] transition-colors cursor-pointer"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2a2a2a]">
        <div className="max-w-[1600px] mx-auto border-x border-[#2a2a2a] relative px-2.5 md:px-5 lg:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CornerSquares />
          <p className="font-satoshi text-[0.75rem] text-neutral-400">
            © {new Date().getFullYear()} Precision Signs Pty Ltd. All rights
            reserved.
          </p>
          {/* <p className="font-mono-ui text-[0.6rem] text-[#444444] tracking-widest uppercase">
            AU-MADE · ISO 9001
          </p> */}
        </div>
      </div>
    </footer>
  );
}
