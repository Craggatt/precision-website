import { create } from "zustand";
import { Product, ProductCategory } from "@/payload-types";

interface ProductStore {
  allProducts: Product[];
  categories: ProductCategory[];
  selectedCategories: string[];
  searchQuery: string;
  filteredProducts: Product[];
  isLoading: boolean;

  fetchProducts: () => Promise<void>;
  toggleCategory: (name: string) => void;
  setCategories: (names: string[]) => void;
  clearFilters: () => void;
  setSearchQuery: (query: string) => void;
}

function getCategoryName(product: Product): string {
  return typeof product.category === "object" ? product.category.name : "";
}

function extractText(node: Record<string, unknown>): string {
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.children)) {
    return (node.children as Record<string, unknown>[]).map(extractText).join(" ");
  }
  return "";
}

function applyFilters(
  products: Product[],
  selectedCategories: string[],
  searchQuery: string,
): Product[] {
  let result = products;

  if (selectedCategories.length > 0) {
    result = result.filter((p) => selectedCategories.includes(getCategoryName(p)));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        getCategoryName(p).toLowerCase().includes(q) ||
        extractText(p.description as Record<string, unknown>)
          .toLowerCase()
          .includes(q),
    );
  }

  return result;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  allProducts: [],
  categories: [],
  selectedCategories: [],
  searchQuery: "",
  filteredProducts: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/products?depth=2&limit=100"),
        fetch("/api/product-categories?limit=100"),
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const allProducts: Product[] = productsData.docs ?? [];
      const categories: ProductCategory[] = categoriesData.docs ?? [];
      const { selectedCategories, searchQuery } = get();
      set({
        allProducts,
        categories,
        filteredProducts: applyFilters(allProducts, selectedCategories, searchQuery),
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  toggleCategory: (name) => {
    const { selectedCategories, allProducts, searchQuery } = get();
    const next = selectedCategories.includes(name)
      ? selectedCategories.filter((c) => c !== name)
      : [...selectedCategories, name];
    set({
      selectedCategories: next,
      filteredProducts: applyFilters(allProducts, next, searchQuery),
    });
  },

  setCategories: (names) => {
    const { allProducts, searchQuery } = get();
    set({
      selectedCategories: names,
      filteredProducts: applyFilters(allProducts, names, searchQuery),
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
