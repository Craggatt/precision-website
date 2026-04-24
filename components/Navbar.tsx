"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import BorderGlow from "./BorderGlow";
import { useQuoteStore } from "@/store/quoteStore";

const navItems = ["Products", "Custom", "Support", "Blog"];

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [productsHovered, setProductsHovered] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setOpen } = useQuoteStore();

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsHovered(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setProductsHovered(false), 100);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    {
      name: "Overbank Signage",
      description:
        "Precision Signs offer content support with each Halo purchase, which includes free game theme changes if required for 12 months.",
      category: [
        {
          name: "Mini",
          items: [
            {
              name: "Halo Mini Single Sided",
            },
            {
              name: "Halo Mini Double Sided",
            },
            {
              name: "Halo Mini Carousel",
            },
          ],
        },
        {
          name: "Standard",
          items: [
            {
              name: "Halo Single Sided",
            },
            {
              name: "Halo Double Sided",
            },
            {
              name: "Halo Carousel",
            },
          ],
        },
        {
          name: "Maxi",
          items: [
            {
              name: "Halo Maxi Single Sided",
            },
            {
              name: "Halo Maxi Double Sided",
            },
            {
              name: "Halo Maxi Carousel",
            },
          ],
        },
        {
          name: "GameRise",
          items: [
            {
              name: "GameRise",
            },
          ],
        },
      ],
    },
    {
      name: "Entry Displays",
      description:
        "Precision Signs offer content support with each Halo purchase, which includes free game theme changes if required for 12 months.",
      category: [
        {
          name: "Gongs",
          items: [
            {
              name: "Gong - 1200",
            },
            {
              name: "Gong - 1850",
            },
          ],
        },
      ],
    },
    {
      name: "Screens",
      description:
        "Precision Signs offer content support with each Halo purchase, which includes free game theme changes if required for 12 months.",
      category: [
        {
          name: "End of Bank",
          items: [
            {
              name: "Bank Ends",
            },
            {
              name: 'Neoglass 55"',
            },
          ],
        },
      ],
    },
    {
      name: "Infills",
      description:
        "Precision Signs offer content support with each Halo purchase, which includes free game theme changes if required for 12 months.",
      category: [
        {
          name: "LED Infill",
          items: [
            {
              name: "Monolith Mini",
            },
            {
              name: "Monolith",
            },
          ],
        },
      ],
    },
    {
      name: "Overbank Signage",
      description:
        "Precision Signs offer content support with each Halo purchase, which includes free game theme changes if required for 12 months.",
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md ${
          scrolled ? "bg-white/80 " : "bg-transparent border-b border-white/20"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-10 flex items-center justify-between h-14 relative">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            src="https://precisionsigns.com.au/wp-content/uploads/2018/11/logo.png"
            alt="Precision Signs"
            className={`h-9 object-contain transition-all duration-300 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />

          <div className="hidden md:flex items-stretch gap-8">
            {navItems.map((item, i) => (
              <motion.p
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: ready ? 1 : 0 }}
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={`font-satoshi text-[0.85rem] font-semibold cursor-pointer transition-colors duration-300 flex items-center ${
                  scrolled
                    ? "text-[#111111] hover:text-[#555555]"
                    : "text-white hover:text-white/70"
                }`}
                onHoverStart={() => item === "Products" && openMenu()}
                onHoverEnd={() => item === "Products" && closeMenu()}
              >
                {item}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="hidden md:flex items-center gap-3 h-full"
          >
            <button
              className={`font-satoshi text-[0.8rem] px-4 py-1.5 rounded-sm transition-colors duration-300 ${
                scrolled
                  ? "text-[#111111] border border-[#111111]/20 hover:bg-gray-100"
                  : "text-white border border-white/20 hover:text-white/70"
              }`}
            >
              Contact Us
            </button>
            <button
              className="font-satoshi text-[0.8rem] bg-brand-primary text-white px-4 py-1.5 rounded-sm hover:bg-[#2a2a2a] transition-colors font-medium"
              onClick={() => setOpen(true)}
            >
              Get a Quote
            </button>
          </motion.div>
        </div>
      </nav>
      <AnimatePresence>
        {productsHovered && (
          <motion.div
            className="w-full fixed top-14 left-0 z-50 px-10 h-screen backdrop-blur-lg"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <BorderGlow
              backgroundColor="#171717"
              borderRadius={0}
              colors={["#0b6fd3", "#1a7fe3", "#0958a8"]}
              glowColor="210 90 60"
              glowIntensity={1.2}
              glowRadius={30}
              edgeSensitivity={20}
              className="max-w-[1600px] mx-auto"
            >
              <div onMouseEnter={openMenu} onMouseLeave={closeMenu}>
                <motion.div
                  className="flex flex-col w-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="flex flex-row w-full ">
                    {menu.map((item) => {
                      return (
                        <div
                          className="flex flex-col p-5 border-l border-l-neutral-700"
                          key={item.name}
                        >
                          <img
                            src="https://precisionsigns.com.au/wp-content/uploads/2023/07/Halo-Maxi-4.png"
                            alt={item.name}
                            className="w-28"
                          />
                          <h3 className="font-aller text-xl mt-2">
                            Overbank Signage
                          </h3>
                          <p className="font-satoshi text-sm text-neutral-400">
                            Precision Signs offer content support with each Halo
                            purchase, which includes free game theme changes if
                            required for 12 months.
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-row w-full bg-neutral-800">
                    {menu.map((item) => (
                      <div
                        key={item.name}
                        className="flex-col  p-5 border-l border-l-neutral-700 flex-1 gap-6 flex"
                      >
                        {item &&
                          item?.category?.map((category, index) => (
                            <div key={index} className="flex flex-col ">
                              <div>
                                <h3 className="uppercase font-mono text-neutral-400 mb-2">
                                  {category.name}
                                </h3>
                                <div className="flex flex-col gap-1">
                                  {category.items.map((product) => (
                                    <h4
                                      key={product.name}
                                      className="font-aller text-neutral-300"
                                    >
                                      {product.name}
                                    </h4>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </BorderGlow>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
