import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { CATEGORIES, PRODUCTS, CURRENCY_RATES } from '../data/mockData';

interface CategoryScreenProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, qty: number) => void;
  currency: Currency;
  initialCategory?: string;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({
  onSelectProduct,
  onAddToCart,
  currency,
  initialCategory = 'all',
}) => {
  const currInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory);
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'moq-asc'>('featured');
  const [searchInternal, setSearchInternal] = useState('');

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCat);

  // Filter products
  let filtered = PRODUCTS.filter((p) => {
    if (selectedCat !== 'all' && selectedCat !== 'more') {
      if (p.category !== selectedCat) return false;
    }
    if (searchInternal.trim()) {
      const q = searchInternal.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  // Sort products
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'moq-asc') {
    filtered.sort((a, b) => a.moq - b.moq);
  }

  return (
    <div className="pb-24 max-w-md mx-auto px-4 pt-4">
      {/* Page Title */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-xs text-brand-orange font-bold uppercase tracking-wider mb-1">
          <i className="ph ph-stack"></i>
          <span>Wholesale Catalog</span>
        </div>
        <h1 className="text-xl font-black text-gray-900 leading-tight">
          Browse by Categories
        </h1>
        <p className="text-xs text-gray-500">
          Factory-direct catalog across 8 industrial and commercial sectors.
        </p>
      </div>

      {/* Internal Search */}
      <div className="relative mb-3">
        <input
          type="text"
          value={searchInternal}
          onChange={(e) => setSearchInternal(e.target.value)}
          placeholder="Filter within catalog (e.g. charger, shoe, bottle)..."
          className="w-full text-xs rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-8 shadow-xs focus:ring-1 focus:ring-brand-orange"
        />
        {searchInternal && (
          <button
            onClick={() => setSearchInternal('')}
            className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
          >
            <i className="ph ph-x-circle"></i>
          </button>
        )}
      </div>

      {/* Horizontal Category Pill Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
        <button
          onClick={() => {
            setSelectedCat('all');
            setSelectedSubcat('all');
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
            selectedCat === 'all'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Departments ({PRODUCTS.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCat(cat.id);
              setSelectedSubcat('all');
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition ${
              selectedCat === cat.id
                ? 'bg-brand-orange text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className={`ph ${cat.icon}`}></i>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Subcategory pills if specific category selected */}
      {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-2.5 mb-3 border border-gray-200/80">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Specialties in {activeCategoryObj.name}</span>
            <span className="text-brand-orange">{activeCategoryObj.count}+ SKUs</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeCategoryObj.subcategories.map((sub, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded-md text-gray-700 font-medium cursor-pointer hover:border-brand-orange"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Controls Bar: Count and Sort */}
      <div className="flex items-center justify-between text-xs mb-3 pt-1 border-t border-gray-100">
        <span className="text-gray-500 font-medium">
          Showing <strong className="text-gray-900">{filtered.length}</strong> wholesale products
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-gray-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs bg-white border border-gray-200 rounded-lg py-1 px-2 text-gray-700 focus:ring-1 focus:ring-brand-orange"
          >
            <option value="featured">Featured Volume</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="moq-asc">Lowest MOQ</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-6">
          <i className="ph ph-magnifying-glass text-4xl text-gray-300 mb-2"></i>
          <p className="text-xs font-bold text-gray-800">No matching products found</p>
          <p className="text-[11px] text-gray-400 mt-1">Try clearing your search term</p>
          <button
            onClick={() => {
              setSelectedCat('all');
              setSearchInternal('');
            }}
            className="mt-3 bg-brand-orange text-white text-xs font-semibold px-4 py-1.5 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col justify-between shadow-xs hover:border-orange-300 hover:shadow-md transition cursor-pointer relative"
            >
              {product.badge && (
                <span className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded text-[8px] font-bold bg-brand-orange text-white uppercase">
                  {product.badge}
                </span>
              )}
              <div className="w-full h-28 bg-gray-50 rounded-xl flex items-center justify-center mb-2">
                <i className={`ph ${product.icon} text-4xl text-gray-700`}></i>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                  {product.categoryLabel}
                </span>
                <h3 className="text-xs font-bold text-gray-900 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 my-0.5">
                  <i className="ph-fill ph-star"></i>
                  <span className="font-bold text-gray-700">{product.rating}</span>
                  <span className="text-[9px] text-gray-400">({product.reviewCount})</span>
                </div>
                <div className="text-[10px] text-gray-500 mb-1">
                  MOQ: <span className="font-bold text-gray-700">{product.moq} pcs</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <div>
                    <span className="text-[9px] text-gray-400 block">From</span>
                    <span className="text-xs font-black text-gray-900">
                      {currInfo.symbol}
                      {(product.tiers[product.tiers.length - 1].price * currInfo.rate).toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, product.moq);
                    }}
                    className="w-7 h-7 bg-brand-orange text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-brand-deepOrange cursor-pointer transition active:scale-90"
                    title={`Add MOQ (${product.moq} pcs) to Cart`}
                  >
                    <i className="ph ph-shopping-cart-simple text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
