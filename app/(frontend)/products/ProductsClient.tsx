'use client';

import { useEffect, useCallback, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { track } from '@vercel/analytics';
import useProducts from '@/hooks/useProducts';
import { Product, ProductCategory, Media } from '@/payload-types';
import Link from 'next/link';
import { useQuoteStore } from '@/store/quoteStore';

const CATEGORY_COLORS: Record<string, string> = {
  'Overbank Signage':
    'bg-brand-primary/20 text-blue-300 border-brand-primary/30',
  'Entry Displays': 'bg-emerald-900/40 text-emerald-400 border-emerald-700/40',
  Screens: 'bg-purple-900/40 text-purple-400 border-purple-700/40',
  Infills: 'bg-amber-900/40 text-amber-400 border-amber-700/40',
  'Jackpot History': 'bg-rose-900/40 text-rose-400 border-rose-700/40',
  'Large Screens': 'bg-cyan-900/40 text-cyan-400 border-cyan-700/40',
};

function getProductCategoryName(product: Product): string {
  return typeof product.category === 'object'
    ? (product.category as ProductCategory).name
    : '';
}

function getProductImageUrl(product: Product): string | null {
  const img = product.featuredImage;
  if (typeof img.value === 'object') return (img.value as Media).url ?? null;
  return null;
}

function extractPlainText(node: Record<string, unknown>): string {
  if (typeof node.text === 'string') return node.text;
  if (Array.isArray(node.children)) {
    return (node.children as Record<string, unknown>[])
      .map(extractPlainText)
      .join(' ');
  }
  return '';
}

function getProductDescription(product: Product): string {
  return extractPlainText(product.description as Record<string, unknown>);
}

function getProductSubcategoryName(product: Product): string | null {
  const subs = product.subcategory;
  if (!subs || subs.length === 0) return null;
  const first = subs[0];
  return typeof first === 'object' ? first.name : null;
}

function ProductCard({ product }: { product: Product }) {
  const imageUrl = getProductImageUrl(product);
  const categoryName = getProductCategoryName(product);
  const subcategoryName = getProductSubcategoryName(product);
  const description = getProductDescription(product);
  const colorClass =
    CATEGORY_COLORS[categoryName] ??
    'bg-neutral-800 text-neutral-400 border-neutral-700';
  const { setOpen } = useQuoteStore();
  return (
    <div className="group flex flex-col bg-neutral-900 border border-neutral-700 duration-200 h-fit">
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-800">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-aller font-bold text-white text-base sm:text-lg leading-tight">
            {product.name}
          </h3>
          <span
            className={`shrink-0 text-[0.6rem] sm:text-[0.65rem] font-satoshi font-semibold px-1.5 sm:px-2 py-0.5 border rounded-sm uppercase tracking-wide ${colorClass}`}
          >
            {categoryName}
          </span>
        </div>

        {subcategoryName && (
          <p className="text-neutral-500 font-satoshi text-xs uppercase tracking-wider -mt-1">
            {subcategoryName}
          </p>
        )}

        <p className="text-neutral-400 font-satoshi text-xs sm:text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="mt-3 pt-3 border-t border-neutral-700 flex flex-col sm:flex-row gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 font-satoshi text-xs font-semibold py-2 border border-neutral-600 text-neutral-300 hover:border-neutral-400 hover:text-white transition-colors text-center"
          >
            Learn More
          </Link>
          <button
            className="flex-1 font-satoshi text-xs font-semibold py-2 bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors"
            onClick={() => {
              track('Get a Quote Clicked', { page: window.location.pathname });
              setOpen(true);
            }}
          >
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProductsClientProps {
  products: Product[];
  categories: ProductCategory[];
}

export default function ProductsClient({
  products: initialProducts,
  categories: initialCategories,
}: ProductsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const {
    filteredProducts,
    allProducts,
    categories,
    selectedCategories,
    searchQuery,
    isLoading,
    initializeProducts,
    toggleCategory,
    setCategories,
    clearFilters,
    setSearchQuery,
  } = useProducts();

  useEffect(() => {
    initializeProducts(initialProducts, initialCategories);
    const cats = searchParams
      .getAll('cat')
      .filter(c => initialCategories.some(cat => cat.name === c));
    if (cats.length > 0) setCategories(cats);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pushCats = useCallback(
    (cats: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('cat');
      cats.forEach(c => params.append('cat', c));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleToggle = useCallback(
    (catName: string) => {
      const next = selectedCategories.includes(catName)
        ? selectedCategories.filter(c => c !== catName)
        : [...selectedCategories, catName];
      toggleCategory(catName);
      pushCats(next);
    },
    [selectedCategories, toggleCategory, pushCats]
  );

  const handleClear = useCallback(() => {
    clearFilters();
    const params = new URLSearchParams(searchParams.toString());
    params.delete('cat');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [clearFilters, router, pathname, searchParams]);

  const categoryCounts = categories.reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat.name] = allProducts.filter(
        p =>
          typeof p.category === 'object' &&
          (p.category as ProductCategory).name === cat.name
      ).length;
      return acc;
    },
    {}
  );

  const hasActiveFilters =
    selectedCategories.length > 0 || searchQuery.trim().length > 0;

  const FilterContent = () => (
    <>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 text-white font-satoshi text-sm pl-9 pr-3 py-2 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
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
        {categories.map(cat => {
          const active = selectedCategories.includes(cat.name);
          return (
            <button
              key={cat.id}
              onClick={() => handleToggle(cat.name)}
              className={`flex items-center justify-between w-full px-3 py-2 text-left transition-colors group ${
                active
                  ? 'bg-neutral-700/60 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3.5 h-3.5 shrink-0 border transition-colors ${
                    active
                      ? 'bg-brand-primary border-brand-primary'
                      : 'border-neutral-600 group-hover:border-neutral-400'
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
                <span className="font-satoshi text-sm">{cat.name}</span>
              </div>
              <span className="font-satoshi text-xs text-neutral-600">
                {categoryCounts[cat.name] ?? 0}
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
            {selectedCategories.map(cat => (
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
    </>
  );

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col">
      {/* Mobile filter button */}
      <div className="lg:hidden px-4 sm:px-6 py-4 border-b border-neutral-700">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center gap-2 w-full justify-center py-2.5 px-4 bg-neutral-800 border border-neutral-700 text-white font-satoshi text-sm hover:bg-neutral-700 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters {hasActiveFilters && `(${selectedCategories.length})`}
        </button>
      </div>

      {/* Mobile filter modal */}
      {isMobileFilterOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-neutral-900 border-r border-neutral-700 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="font-aller font-bold text-xl text-white">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full flex-1 min-h-0 flex flex-row lg:pl-[calc(max(2rem,50vw-760px))]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 py-8 pr-8 flex-col gap-6 border-r border-neutral-700">
          <FilterContent />
        </aside>

        {/* Main content */}
        <main
          data-lenis-prevent
          className="flex-1 min-h-0 w-full background-texture overflow-y-auto scrollbar-thin py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:pl-8 lg:pr-[calc(max(2rem,50vw-760px))]"
        >
          <div>
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-satoshi text-sm text-neutral-400">
                {isLoading ? (
                  <span className="text-neutral-500">Loading products…</span>
                ) : hasActiveFilters ? (
                  <>
                    <span className="text-white font-semibold">
                      {filteredProducts.length}
                    </span>{' '}
                    of{' '}
                    <span className="text-white font-semibold">
                      {allProducts.length}
                    </span>{' '}
                    products
                  </>
                ) : (
                  <>
                    All{' '}
                    <span className="text-white font-semibold">
                      {allProducts.length}
                    </span>{' '}
                    products
                  </>
                )}
              </p>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-neutral-800 animate-pulse aspect-[4/5]"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 h-full">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
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
