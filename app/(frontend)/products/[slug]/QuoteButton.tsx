"use client";

import { useQuoteStore } from "@/store/quoteStore";

export default function QuoteButton() {
  const setOpen = useQuoteStore((s) => s.setOpen);
  return (
    <button
      onClick={() => setOpen(true)}
      className="flex-1 font-satoshi text-sm font-semibold py-3 px-6 bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors"
    >
      Get a Quote
    </button>
  );
}
