import { useProductStore } from "@/store/productStore";

export default function useProducts() {
  const filteredProducts = useProductStore((s) => s.filteredProducts);
  const allProducts = useProductStore((s) => s.allProducts);
  const categories = useProductStore((s) => s.categories);
  const selectedCategories = useProductStore((s) => s.selectedCategories);
  const searchQuery = useProductStore((s) => s.searchQuery);
  const isLoading = useProductStore((s) => s.isLoading);
  const initializeProducts = useProductStore((s) => s.initializeProducts);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const toggleCategory = useProductStore((s) => s.toggleCategory);
  const setCategories = useProductStore((s) => s.setCategories);
  const clearFilters = useProductStore((s) => s.clearFilters);
  const setSearchQuery = useProductStore((s) => s.setSearchQuery);

  return {
    filteredProducts,
    allProducts,
    categories,
    selectedCategories,
    searchQuery,
    isLoading,
    initializeProducts,
    fetchProducts,
    toggleCategory,
    setCategories,
    clearFilters,
    setSearchQuery,
  };
}
