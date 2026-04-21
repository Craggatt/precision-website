"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const navItems = ["Products", "Custom", "Support", "Blog"];

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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

        <div className="hidden md:flex items-center gap-8">
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
              className={`font-satoshi text-[0.85rem] font-semibold cursor-pointer transition-colors duration-300 ${
                scrolled
                  ? "text-[#111111] hover:text-[#555555]"
                  : "text-white hover:text-white/70"
              }`}
            >
              {item}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="hidden md:flex items-center gap-3"
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
          <button className="font-satoshi text-[0.8rem] bg-brand-primary text-white px-4 py-1.5 rounded-sm hover:bg-[#2a2a2a] transition-colors font-medium">
            Get a Quote
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
