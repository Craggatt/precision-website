import { create } from "zustand";
import { Product, ProductCategory } from "@/types";
import { wesbiteData } from "@/data/products";

const ALL_CATEGORIES: ProductCategory[] = [
  "Overbank Signage",
  "Entry Displays",
  "Screens",
  "Infills",
  "Jackpot History",
  "Large Screens",
];

interface ProductStore {
  allProducts: Product[];
  selectedCategories: ProductCategory[];
  searchQuery: string;
  filteredProducts: Product[];

  toggleCategory: (category: ProductCategory) => void;
  setCategories: (categories: ProductCategory[]) => void;
  clearFilters: () => void;
  setSearchQuery: (query: string) => void;
}

function applyFilters(
  products: Product[],
  selectedCategories: ProductCategory[],
  searchQuery: string
): Product[] {
  let result = products;

  if (selectedCategories.length > 0) {
    result = result.filter((p) => selectedCategories.includes(p.category));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  return result;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  allProducts: wesbiteData.products,
  selectedCategories: [],
  searchQuery: "",
  filteredProducts: wesbiteData.products,

  toggleCategory: (category) => {
    const { selectedCategories, allProducts, searchQuery } = get();
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    set({
      selectedCategories: next,
      filteredProducts: applyFilters(allProducts, next, searchQuery),
    });
  },

  setCategories: (categories) => {
    const { allProducts, searchQuery } = get();
    set({
      selectedCategories: categories,
      filteredProducts: applyFilters(allProducts, categories, searchQuery),
    });
  },

  clearFilters: () => {
    const { allProducts, searchQuery } = get();
    set({
      selectedCategories: [],
      filteredProducts: applyFilters(allProducts, [], searchQuery),
    });
  },

  setSearchQuery: (query) => {
    const { allProducts, selectedCategories } = get();
    set({
      searchQuery: query,
      filteredProducts: applyFilters(allProducts, selectedCategories, query),
    });
  },
}));

export { ALL_CATEGORIES };
