import { create } from "zustand";
import { Product } from "@/types";

interface QuoteStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedProducts: Product[];
  toggleProduct: (product: Product) => void;
  isSelected: (slug: string) => boolean;
  clearProducts: () => void;
}

export const useQuoteStore = create<QuoteStore>((set, get) => ({
  open: false,
  setOpen: (open) => set({ open: open }),
  selectedProducts: [],

  toggleProduct: (product) => {
    const { selectedProducts } = get();
    const exists = selectedProducts.some((p) => p.slug === product.slug);
    set({
      selectedProducts: exists
        ? selectedProducts.filter((p) => p.slug !== product.slug)
        : [...selectedProducts, product],
    });
  },

  isSelected: (slug) => get().selectedProducts.some((p) => p.slug === slug),

  clearProducts: () => set({ selectedProducts: [] }),
}));
