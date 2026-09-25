import React, { useState } from 'react';
import { ActiveTab, Currency, Product } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  savedCount: number;
  onOpenCart: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectProduct: (p: Product) => void;
  allProducts: Product[];
}

export const Header: React.FC<HeaderProps> = ({
  setActiveTab,
  cartCount,
  savedCount,
  onOpenCart,
  currency,
  setCurrency,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  allProducts,
}) => {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredQuickResults = searchQuery.trim()
    ? allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  return (
    <>
      {/* Announcement Bar */}
      <aside className="bg-black text-gray-300 text-[11px] py-1.5 px-3 border-b border-neutral-800">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
            <span className="truncate font-medium text-neutral-200">
              Your Trusted Wholesale Partner
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 text-neutral-400 relative">
            <span className="hidden sm:inline">Wide Range Products</span>
            <div className="relative">
              <button
                className="flex items-center gap-1 font-semibold text-white hover:text-brand-orange transition-colors cursor-pointer"
                type="button"
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              >
                <span>{currency} ({currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : 'CA$'})</span>
                <i className="ph ph-caret-down text-xs"></i>
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 top-full mt-1.5 bg-[#181a20] border border-neutral-700 rounded-lg shadow-xl py-1 z-50 min-w-[110px] text-xs">
                  {(['USD', 'EUR', 'GBP', 'CAD'] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-neutral-800 transition ${
                        currency === curr ? 'text-brand-orange font-bold' : 'text-gray-300'
                      }`}
                    >
                      <span>{curr}</span>
                      <span className="text-[10px] text-gray-500">
                        {curr === 'USD' ? '$' : curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : 'CA$'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="px-4 py-2.5 max-w-md mx-auto">
          {/* Top Row: Brand & Profile/Cart Actions */}
          <div className="flex items-center justify-between gap-3 mb-2">
            {/* Logo */}
            <button
              onClick={() => setActiveTab('home')}
              aria-label="Zi Distribution Hub Home"
              className="flex items-center gap-1.5 text-left focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-sm">
                <span className="text-white">Z</span>
                <span className="text-brand-orange">i</span>
              </div>
              <div className="leading-none">
                <span className="block text-sm font-black tracking-tight text-black">
                  DISTRIBUTION HUB
                </span>
                <span className="text-[7.5px] uppercase tracking-wider text-neutral-500 font-bold">
                  People · Products · Possibilities
                </span>
              </div>
            </button>

            {/* Quick Action Icons */}
            <div className="flex items-center gap-1.5 text-neutral-700">
              <button
                aria-label="Account"
                onClick={() => setActiveTab('account')}
                className="p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer text-gray-700 hover:text-brand-orange"
                type="button"
                title="Wholesale Account"
              >
                <i className="ph ph-user text-xl"></i>
              </button>

              <button
                aria-label="Favorites"
                onClick={() => setActiveTab('saved')}
                className="p-1.5 rounded-full hover:bg-gray-100 transition relative cursor-pointer text-gray-700 hover:text-brand-orange"
                type="button"
                title="Saved Products"
              >
                <i className="ph ph-heart text-xl"></i>
                {savedCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-orange text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {savedCount}
                  </span>
                )}
              </button>

              <button
                aria-label="Cart"
                onClick={onOpenCart}
                className="p-1.5 rounded-full hover:bg-gray-100 transition relative cursor-pointer text-gray-700 hover:text-brand-orange"
                type="button"
                title="Wholesale Cart"
              >
                <i className="ph ph-shopping-bag text-xl"></i>
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-orange text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Search Bar Form */}
          <div className="relative">
            <div className="relative flex items-center">
              <input
                className="w-full text-xs rounded-xl bg-gray-100/90 border-0 py-2.5 pl-3.5 pr-10 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-brand-orange focus:bg-white transition"
                placeholder="Search for products, brands, categories..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <button
                className="absolute right-1 w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center hover:bg-brand-deepOrange shadow-sm cursor-pointer"
                type="button"
                onClick={() => {
                  if (searchQuery.trim()) {
                    setActiveTab('category');
                  }
                }}
              >
                <i className="ph ph-magnifying-glass text-base font-bold"></i>
              </button>
            </div>

            {/* Quick search suggestions */}
            {isSearchFocused && filteredQuickResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                <div className="p-2 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span>Quick Results</span>
                  <span>{filteredQuickResults.length} found</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {filteredQuickResults.map((product) => (
                    <div
                      key={product.id}
                      onMouseDown={() => {
                        onSelectProduct(product);
                        setSearchQuery('');
                      }}
                      className="p-2.5 flex items-center gap-3 hover:bg-orange-50/50 cursor-pointer transition"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-brand-orange text-lg shrink-0">
                        <i className={`ph ${product.icon}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {product.categoryLabel} · MOQ: {product.moq} pcs
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-brand-orange">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
