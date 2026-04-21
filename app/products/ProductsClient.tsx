"use client";

import { useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import useProducts from "@/hooks/useProducts";
import { ALL_CATEGORIES } from "@/store/productStore";
import { Product, ProductCategory } from "@/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const CATEGORY_COLORS: Record<ProductCategory, string> = {
  "Overbank Signage":
    "bg-brand-primary/20 text-blue-300 border-brand-primary/30",
  "Entry Displays": "bg-emerald-900/40 text-emerald-400 border-emerald-700/40",
  Screens: "bg-purple-900/40 text-purple-400 border-purple-700/40",
  Infills: "bg-amber-900/40 text-amber-400 border-amber-700/40",
  "Jackpot History": "bg-rose-900/40 text-rose-400 border-rose-700/40",
  "Large Screens": "bg-cyan-900/40 text-cyan-400 border-cyan-700/40",
};

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-colors duration-200  h-fit">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
        <img
          src={product.feature_image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.status && (
          <div className="absolute top-3 left-3 bg-amber-500 text-black text-[0.65rem] font-satoshi font-bold px-2 py-0.5 uppercase tracking-wider">
            {product.status}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-aller font-bold text-white text-lg leading-tight">
            {product.name}
          </h3>
          <span
            className={`shrink-0 text-[0.65rem] font-satoshi font-semibold px-2 py-0.5 border rounded-sm uppercase tracking-wide ${CATEGORY_COLORS[product.category]}`}
          >
            {product.category}
          </span>
        </div>

        {product.subcategory && (
          <p className="text-neutral-500 font-satoshi text-xs uppercase tracking-wider -mt-1">
            {product.subcategory}
          </p>
        )}

        <p className="text-neutral-400 font-satoshi text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* {product.features.length > 0 && (
          <ul className="mt-auto flex flex-col gap-1">
            {product.features.slice(0, 3).map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-neutral-400 font-satoshi text-xs"
              >
                <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-brand-primary" />
                {f}
              </li>
            ))}
          </ul>
        )} */}

        <div className="mt-3 pt-3 border-t border-neutral-700 flex gap-2">
          <button className="flex-1 font-satoshi text-xs font-semibold py-2 border border-neutral-600 text-neutral-300 hover:border-neutral-400 hover:text-white transition-colors">
            Learn More
          </button>
          <button className="flex-1 font-satoshi text-xs font-semibold py-2 bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors">
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    filteredProducts,
    allProducts,
    selectedCategories,
    searchQuery,
    toggleCategory,
    setCategories,
    clearFilters,
    setSearchQuery,
  } = useProducts();

  // Initialise store from URL on mount
  useEffect(() => {
    const cats = searchParams
      .getAll("cat")
      .filter((c) =>
        ALL_CATEGORIES.includes(c as ProductCategory),
      ) as ProductCategory[];
    setCategories(cats);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pushCats = useCallback(
    (cats: ProductCategory[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("cat");
      cats.forEach((c) => params.append("cat", c));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const handleToggle = useCallback(
    (cat: ProductCategory) => {
      const next = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat];
      toggleCategory(cat);
      pushCats(next);
    },
    [selectedCategories, toggleCategory, pushCats],
  );

  const handleClear = useCallback(() => {
    clearFilters();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cat");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [clearFilters, router, pathname, searchParams]);

  const categoryCounts = ALL_CATEGORIES.reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat] = allProducts.filter((p) => p.category === cat).length;
      return acc;
    },
    {},
  );

  const hasActiveFilters =
    selectedCategories.length > 0 || searchQuery.trim().length > 0;

  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col ">
      <div className=" mx-auto w-full flex-1 min-h-0 flex flex-row pl-[calc(max(2rem,50vw-760px))]">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 py-8 pr-8 flex flex-col gap-6 border-r border-neutral-700 ">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 text-white font-satoshi text-sm pl-9 pr-3 py-2 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-satoshi text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                Category
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleClear}
                  className="font-satoshi text-xs text-brand-primary hover:text-blue-400 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            {ALL_CATEGORIES.map((cat) => {
              const active = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => handleToggle(cat)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-left transition-colors group ${
                    active
                      ? "bg-neutral-700/60 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-3.5 h-3.5 shrink-0 border transition-colors ${
                        active
                          ? "bg-brand-primary border-brand-primary"
                          : "border-neutral-600 group-hover:border-neutral-400"
                      } flex items-center justify-center`}
                    >
                      {active && (
                        <svg
                          viewBox="0 0 10 8"
                          className="w-2 h-2 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            d="M1 4l2.5 2.5L9 1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="font-satoshi text-sm">{cat}</span>
                  </div>
                  <span className="font-satoshi text-xs text-neutral-600">
                    {categoryCounts[cat]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active filter chips */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-satoshi text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                Active Filters
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleToggle(cat)}
                    className="flex items-center gap-1 bg-brand-primary/20 border border-brand-primary/30 text-blue-300 font-satoshi text-xs px-2 py-0.5 hover:bg-brand-primary/30 transition-colors"
                  >
                    {cat}
                    <X className="w-2.5 h-2.5" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main content */}

        <main data-lenis-prevent className="flex-1 min-h-0 w-full background-texture overflow-y-auto scrollbar-thin py-8 pl-8 pr-[calc(max(2rem,50vw-760px))]">
          <div>
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-satoshi text-sm text-neutral-400">
                {hasActiveFilters ? (
                  <>
                    <span className="text-white font-semibold">
                      {filteredProducts.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-white font-semibold">
                      {allProducts.length}
                    </span>{" "}
                    products
                  </>
                ) : (
                  <>
                    All{" "}
                    <span className="text-white font-semibold">
                      {allProducts.length}
                    </span>{" "}
                    products
                  </>
                )}
              </p>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-400 h-full "
                ref={parent}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <p className="font-aller font-bold text-white text-xl">
                  No products found
                </p>
                <p className="font-satoshi text-sm text-neutral-500">
                  Try adjusting your filters or search query.
                </p>
                <button
                  onClick={handleClear}
                  className="font-satoshi text-sm text-brand-primary hover:text-blue-400 transition-colors mt-1"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
