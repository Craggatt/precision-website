import { useProductStore } from "@/store/productStore";
export { wesbiteData } from "@/data/products";

export default function useProducts() {
  const filteredProducts = useProductStore((s) => s.filteredProducts);
  const allProducts = useProductStore((s) => s.allProducts);
  const selectedCategories = useProductStore((s) => s.selectedCategories);
  const searchQuery = useProductStore((s) => s.searchQuery);
  const toggleCategory = useProductStore((s) => s.toggleCategory);
  const setCategories = useProductStore((s) => s.setCategories);
  const clearFilters = useProductStore((s) => s.clearFilters);
  const setSearchQuery = useProductStore((s) => s.setSearchQuery);

  return {
    filteredProducts,
    allProducts,
    selectedCategories,
    searchQuery,
    toggleCategory,
    setCategories,
    clearFilters,
    setSearchQuery,
  };
}
