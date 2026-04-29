"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import BorderGlow from "./BorderGlow";
import { useQuoteStore } from "@/store/quoteStore";
import { Media, Product, ProductCategory, ProductSubcategory } from "@/payload-types";

const navItems = ["Products", "Custom", "Support", "Blog"];

interface NavbarProps {
  ready: boolean;
  products: Product[];
  productCategories: ProductCategory[];
}

export default function Navbar({ ready, products, productCategories }: NavbarProps) {
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

  const menu = productCategories.map((cat) => {
    const thumbnailImg = cat.thumbnail.value;
    const thumbnailUrl =
      typeof thumbnailImg === "object" ? ((thumbnailImg as Media).url ?? null) : null;

    const catProducts = products.filter((p) => {
      const c = p.category;
      return typeof c === "object" ? c.id === cat.id : c === cat.id;
    });

    const subcategoryMap: Record<string, string[]> = {};
    for (const product of catProducts) {
      const subs = product.subcategory;
      let subName = "General";
      if (subs && subs.length > 0) {
        const first = subs[0];
        subName = typeof first === "object" ? (first as ProductSubcategory).name : "General";
      }
      if (!subcategoryMap[subName]) subcategoryMap[subName] = [];
      subcategoryMap[subName].push(product.name);
    }

    const subcategories = Object.entries(subcategoryMap).map(([name, items]) => ({
      name,
      items,
    }));

    return { id: cat.id, name: cat.name, slug: cat.slug, thumbnailUrl, subcategories };
  });

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
                  <div className="flex flex-row w-full">
                    {menu.map((item) => (
                      <a
                        href={`/products?cat=${encodeURIComponent(item.name)}`}
                        className="flex flex-col p-5 border-l border-l-neutral-700 flex-1 hover:bg-neutral-800/50 transition-colors"
                        key={item.id}
                      >
                        {item.thumbnailUrl && (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.name}
                            className="w-28 h-20 object-contain"
                          />
                        )}
                        <h3 className="font-aller text-xl mt-2">{item.name}</h3>
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-row w-full bg-neutral-800">
                    {menu.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col p-5 border-l border-l-neutral-700 flex-1 gap-6"
                      >
                        {item.subcategories.map((sub) => (
                          <div key={sub.name} className="flex flex-col">
                            <h3 className="uppercase font-mono text-neutral-400 text-xs mb-2">
                              {sub.name}
                            </h3>
                            <div className="flex flex-col gap-1">
                              {sub.items.map((productName) => (
                                <h4
                                  key={productName}
                                  className="font-aller text-neutral-300 text-sm"
                                >
                                  {productName}
                                </h4>
                              ))}
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
