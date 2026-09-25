import React, { useState } from 'react';
import { Product, ActiveTab, Currency } from '../types';
import { CATEGORIES, PRODUCTS, CURRENCY_RATES } from '../data/mockData';

interface HomeScreenProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, qty: number) => void;
  onOpenQuoteModal: (p?: Product) => void;
  setActiveTab: (tab: ActiveTab) => void;
  currency: Currency;
  onOpenLogisticsModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenQuoteModal,
  setActiveTab,
  currency,
  onOpenLogisticsModal,
}) => {
  const currInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };
  const [newArrivalsFilter, setNewArrivalsFilter] = useState<string>('all');

  // Filter items for New Arrivals
  const newArrivalsList = PRODUCTS.filter((p) => {
    if (newArrivalsFilter === 'all') {
      return (
        p.id.startsWith('prod-na') ||
        p.badge === 'NEW' ||
        p.id === 'prod-wh-1' ||
        p.id === 'prod-sw-1'
      );
    }
    return p.category === newArrivalsFilter;
  });

  // Best Sellers items
  const bestSellersList = PRODUCTS.filter((p) => p.id.startsWith('prod-bs'));

  // Showcase items for hero floating pills
  const showcaseHeadphones = PRODUCTS.find((p) => p.id === 'prod-wh-1');
  const showcaseWatch = PRODUCTS.find((p) => p.id === 'prod-sw-1');
  const showcaseShoes = PRODUCTS.find((p) => p.id === 'prod-ss-1');
  const showcaseBottle = PRODUCTS.find((p) => p.id === 'prod-vb-1');

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-dark via-[#13161c] to-brand-dark text-white pt-6 pb-8 px-4 relative overflow-hidden">
        {/* Background Glow Accents */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-md mx-auto relative z-10">
          {/* Category/Tagline badge */}
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-0.5 w-4 bg-brand-orange"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Wholesale Made Easy
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight mb-2">
            Bigger <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
              Opportunities
            </span>{' '}
            <br />
            <span className="text-brand-orange">Together</span>
          </h1>

          <p className="text-gray-300 text-xs leading-relaxed max-w-xs mb-5">
            Your one-stop wholesale and supply solution for a smarter, stronger
            tomorrow.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5 mb-6">
            <a
              href="#new-arrivals"
              className="flex-1 bg-brand-orange hover:bg-brand-deepOrange text-white font-semibold text-xs py-3 px-4 rounded-xl text-center shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <span>Shop Now</span>
              <i className="ph ph-arrow-right font-bold"></i>
            </a>
            <button
              onClick={() => setActiveTab('category')}
              className="flex-1 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs py-3 px-4 rounded-xl text-center backdrop-blur transition active:scale-95 cursor-pointer"
            >
              Explore Categories
            </button>
          </div>

          {/* Trust Social Proof */}
          <div className="flex items-center gap-3 pt-1 border-t border-white/10 mb-6">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-neutral-900 bg-amber-500 flex items-center justify-center text-[10px] font-bold text-neutral-950">
                JD
              </div>
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-neutral-900 bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">
                MK
              </div>
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-neutral-900 bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white">
                AS
              </div>
              <div className="inline-block h-7 w-7 rounded-full ring-2 ring-neutral-900 bg-rose-500 flex items-center justify-center text-[10px] font-bold text-white">
                RZ
              </div>
            </div>
            <div className="text-[11px] text-gray-300 font-medium leading-tight">
              <strong className="text-white block font-bold">
                Trusted by 10,000+
              </strong>{' '}
              businesses nationwide
            </div>
          </div>

          {/* Floating Showcase Product Pills */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Item 1 */}
            {showcaseHeadphones && (
              <div
                onClick={() => onSelectProduct(showcaseHeadphones)}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex items-center gap-2.5 cursor-pointer transition transform active:scale-98"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center text-brand-orange text-xl shrink-0">
                  <i className="ph ph-headphones"></i>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-bold bg-red-500 text-white leading-none uppercase">
                    Hot
                  </span>
                  <p className="text-[11px] font-medium text-white truncate">
                    Wireless Headphone
                  </p>
                  <p className="text-xs font-bold text-brand-orange leading-tight">
                    {currInfo.symbol}
                    {(showcaseHeadphones.price * currInfo.rate).toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {/* Item 2 */}
            {showcaseWatch && (
              <div
                onClick={() => onSelectProduct(showcaseWatch)}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex items-center gap-2.5 cursor-pointer transition transform active:scale-98"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center text-brand-orange text-xl shrink-0">
                  <i className="ph ph-watch"></i>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-500 text-black leading-none uppercase">
                    Top
                  </span>
                  <p className="text-[11px] font-medium text-white truncate">
                    Smart Watch
                  </p>
                  <p className="text-xs font-bold text-brand-orange leading-tight">
                    {currInfo.symbol}
                    {(showcaseWatch.price * currInfo.rate).toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {/* Item 3 */}
            {showcaseShoes && (
              <div
                onClick={() => onSelectProduct(showcaseShoes)}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex items-center gap-2.5 cursor-pointer transition transform active:scale-98"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center text-brand-orange text-xl shrink-0">
                  <i className="ph ph-sneaker"></i>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500 text-white leading-none uppercase">
                    New
                  </span>
                  <p className="text-[11px] font-medium text-white truncate">
                    Sports Shoes
                  </p>
                  <p className="text-xs font-bold text-brand-orange leading-tight">
                    {currInfo.symbol}
                    {(showcaseShoes.price * currInfo.rate).toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {/* Item 4 */}
            {showcaseBottle && (
              <div
                onClick={() => onSelectProduct(showcaseBottle)}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex items-center gap-2.5 cursor-pointer transition transform active:scale-98"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center text-brand-orange text-xl shrink-0">
                  <i className="ph ph-flask"></i>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-bold bg-orange-500 text-white leading-none uppercase">
                    Sale
                  </span>
                  <p className="text-[11px] font-medium text-white truncate">
                    Vacuum Bottle
                  </p>
                  <p className="text-xs font-bold text-brand-orange leading-tight">
                    {currInfo.symbol}
                    {(showcaseBottle.price * currInfo.rate).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section
        aria-label="Core Benefits"
        className="bg-white border-y border-gray-200 py-4 px-3"
      >
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-left">
          {/* Benefit 1 */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-gray-50/70 border border-gray-100">
            <i className="ph ph-truck text-2xl text-brand-orange shrink-0 mt-0.5"></i>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-tight">
                Free Shipping
              </h4>
              <p className="text-[10px] text-gray-500">Orders over $50</p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-gray-50/70 border border-gray-100">
            <i className="ph ph-shield-check text-2xl text-brand-orange shrink-0 mt-0.5"></i>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-tight">
                Secure Payments
              </h4>
              <p className="text-[10px] text-gray-500">100% verified checkout</p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-gray-50/70 border border-gray-100">
            <i className="ph ph-arrow-u-up-left text-2xl text-brand-orange shrink-0 mt-0.5"></i>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-tight">
                Easy Returns
              </h4>
              <p className="text-[10px] text-gray-500">7-day hassle free policy</p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-gray-50/70 border border-gray-100">
            <i className="ph ph-headset text-2xl text-brand-orange shrink-0 mt-0.5"></i>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-tight">
                24/7 Support
              </h4>
              <p className="text-[10px] text-gray-500">Dedicated desk team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Categories */}
      <section className="py-6 px-4 max-w-md mx-auto" id="categories">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">
              Shop by Categories
            </h2>
            <p className="text-[11px] text-gray-500">
              Curated industrial & retail catalogs
            </p>
          </div>
          <button
            onClick={() => setActiveTab('category')}
            className="text-xs font-bold text-brand-orange flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All</span>
            <i className="ph ph-arrow-right text-xs"></i>
          </button>
        </div>

        {/* Category Grid 4x2 on mobile */}
        <div className="grid grid-cols-4 gap-2.5 text-center">
          {CATEGORIES.map((cat) => {
            const isMore = cat.id === 'more';
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab('category')}
                className="group flex flex-col items-center cursor-pointer text-left"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    isMore
                      ? 'bg-brand-orange/10 border border-brand-orange/20 shadow-sm text-brand-orange group-hover:bg-brand-orange group-hover:text-white'
                      : 'bg-white border border-gray-200/90 shadow-sm text-gray-700 group-hover:border-brand-orange group-hover:text-brand-orange'
                  }`}
                >
                  <i className={`ph ${cat.icon} text-2xl font-bold`}></i>
                </div>
                <span className="mt-1.5 text-[11px] font-semibold text-gray-800 line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[9px] text-brand-orange font-medium flex items-center">
                  {isMore ? 'Explore' : 'Shop'}{' '}
                  <i className="ph ph-caret-right text-[8px] ml-0.5"></i>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-5 bg-white border-y border-gray-200" id="new-arrivals">
        <div className="px-4 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-extrabold text-gray-900">
              New Arrivals
            </h2>
            <button
              onClick={() => setActiveTab('category')}
              className="text-xs font-semibold text-brand-orange flex items-center gap-1 cursor-pointer hover:underline"
            >
              <span>View All</span>
              <i className="ph ph-arrow-right text-xs"></i>
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 pt-1 text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'electronics', label: 'Electronics' },
              { id: 'lifestyle', label: 'Lifestyle' },
              { id: 'packaging', label: 'Packaging' },
              { id: 'accessories', label: 'Accessories' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setNewArrivalsFilter(chip.id)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap cursor-pointer transition ${
                  newArrivalsFilter === chip.id
                    ? 'bg-brand-orange text-white font-semibold shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Horizontally scrollable product carousel */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar touch-scroll py-1 -mx-4 px-4">
            {newArrivalsList.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="w-40 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-2xl p-2.5 flex flex-col justify-between relative shadow-sm cursor-pointer hover:border-orange-300 transition"
              >
                {product.badge && (
                  <span className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded text-[9px] font-bold bg-brand-orange text-white">
                    {product.badge}
                  </span>
                )}
                <div className="w-full h-28 bg-white rounded-xl flex items-center justify-center mb-2 overflow-hidden">
                  <i className={`ph ${product.icon} text-4xl text-neutral-800`}></i>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 my-0.5">
                    <i className="ph-fill ph-star"></i>
                    <span className="font-bold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-[9px] text-gray-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-black text-gray-900">
                      {currInfo.symbol}
                      {(product.price * currInfo.rate).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, product.moq);
                      }}
                      className="w-7 h-7 bg-brand-orange text-white rounded-lg flex items-center justify-center hover:bg-brand-deepOrange shadow-sm cursor-pointer transition active:scale-90"
                      title="Add minimum order to cart"
                    >
                      <i className="ph ph-shopping-cart-simple text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-6 px-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">
              Best Sellers
            </h2>
            <p className="text-[11px] text-gray-500">
              Highest volume wholesale purchases
            </p>
          </div>
          <button
            onClick={() => setActiveTab('category')}
            className="text-xs font-semibold text-brand-orange flex items-center gap-1 cursor-pointer hover:underline"
          >
            <span>View All</span>
            <i className="ph ph-arrow-right text-xs"></i>
          </button>
        </div>

        {/* 2 Column Responsive Product Grid */}
        <div className="grid grid-cols-2 gap-3">
          {bestSellersList.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col justify-between shadow-sm cursor-pointer hover:border-orange-300 transition"
            >
              <div className="w-full h-28 bg-gray-50 rounded-xl flex items-center justify-center mb-2">
                <i className={`ph ${product.icon} text-4xl text-gray-800`}></i>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 my-1">
                  <i className="ph-fill ph-star"></i>
                  <span className="font-bold text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-[9px] text-gray-400">
                    · MOQ {product.moq}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <span className="text-xs font-black text-gray-900">
                    {currInfo.symbol}
                    {(product.price * currInfo.rate).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, product.moq);
                    }}
                    className="w-7 h-7 bg-brand-orange text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-brand-deepOrange cursor-pointer transition active:scale-90"
                    title="Add minimum order to cart"
                  >
                    <i className="ph ph-shopping-cart-simple text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banners */}
      <section className="py-2 px-4 max-w-md mx-auto space-y-3.5">
        {/* Promo Card 1: Bulk Orders */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-orange-500 p-5 text-white shadow-md">
          <div className="relative z-10 max-w-[70%]">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
              Wholesale Direct
            </span>
            <h3 className="text-lg font-black leading-tight mb-1">
              Bulk Orders <br />
              Better Prices
            </h3>
            <p className="text-xs text-orange-100 mb-3 leading-snug">
              Get exclusive high-volume rates for your business.
            </p>
            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-white text-gray-900 text-xs font-bold py-2 px-3 rounded-lg inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
            >
              <span>Request a Quote</span>
              <i className="ph ph-arrow-right text-xs"></i>
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-30 text-white pointer-events-none">
            <i className="ph ph-boxes text-8xl"></i>
          </div>
        </div>

        {/* Promo Card 2: Nationwide Delivery */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 p-5 text-white shadow-md border border-neutral-700">
          <div className="relative z-10 max-w-[70%]">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-orange text-white px-2 py-0.5 rounded-full inline-block mb-1">
              Logistics
            </span>
            <h3 className="text-lg font-black leading-tight mb-1">
              Fast Supply <br />
              Nationwide
            </h3>
            <p className="text-xs text-neutral-300 mb-3 leading-snug">
              Reliable delivery for your business nationwide and worldwide.
            </p>
            <button
              onClick={onOpenLogisticsModal}
              className="bg-brand-orange text-white text-xs font-bold py-2 px-3 rounded-lg inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
            >
              <span>Learn More</span>
              <i className="ph ph-arrow-right text-xs"></i>
            </button>
          </div>
          <div className="absolute -right-3 -bottom-3 text-white/20 pointer-events-none">
            <i className="ph ph-truck text-8xl"></i>
          </div>
        </div>
      </section>

      {/* Trust And Stats */}
      <section className="mt-6 bg-brand-dark text-white py-6 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-xs font-bold text-center tracking-widest uppercase text-gray-400 mb-5">
            Trusted by Growing Businesses
          </h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            {/* Stat 1 */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <i className="ph ph-users-three text-brand-orange text-2xl mx-auto mb-1"></i>
              <span className="block text-xl font-black text-white">
                10,000+
              </span>
              <span className="text-[11px] text-gray-400">Happy Clients</span>
            </div>
            {/* Stat 2 */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <i className="ph ph-squares-four text-brand-orange text-2xl mx-auto mb-1"></i>
              <span className="block text-xl font-black text-white">500+</span>
              <span className="text-[11px] text-gray-400">
                Product Categories
              </span>
            </div>
            {/* Stat 3 */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <i className="ph ph-map-pin-line text-brand-orange text-2xl mx-auto mb-1"></i>
              <span className="block text-xl font-black text-white">
                Nationwide
              </span>
              <span className="text-[11px] text-gray-400">
                Delivery Coverage
              </span>
            </div>
            {/* Stat 4 */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <i className="ph ph-seal-check text-brand-orange text-2xl mx-auto mb-1"></i>
              <span className="block text-xl font-black text-white">100%</span>
              <span className="text-[11px] text-gray-400">
                Genuine Products
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-neutral-400 text-xs py-8 px-4 border-t border-neutral-800">
        <div className="max-w-md mx-auto space-y-6">
          {/* Footer Brand Info */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center font-black text-xl">
                <span className="text-white">Z</span>
                <span className="text-brand-orange">i</span>
              </div>
              <div className="text-left leading-none">
                <span className="block text-base font-black text-white tracking-tight">
                  DISTRIBUTION HUB
                </span>
                <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-semibold">
                  People · Products · Possibilities
                </span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 max-w-sm mt-1">
              The premier B2B and wholesale digital supply chain platform.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="grid grid-cols-2 gap-4 text-neutral-300 text-xs pt-2 border-t border-neutral-800/80">
            <div className="space-y-2">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider block">
                Company
              </span>
              <button
                onClick={() => setActiveTab('account')}
                className="block hover:text-white text-left cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={onOpenLogisticsModal}
                className="block hover:text-white text-left cursor-pointer"
              >
                Wholesale Terms
              </button>
              <button
                onClick={() => onOpenQuoteModal()}
                className="block hover:text-white text-left cursor-pointer"
              >
                Enterprise Careers
              </button>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider block">
                Support
              </span>
              <button
                onClick={() => setActiveTab('account')}
                className="block hover:text-white text-left cursor-pointer"
              >
                Help Center
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className="block hover:text-white text-left cursor-pointer"
              >
                Track Order
              </button>
              <button
                onClick={() => onOpenQuoteModal()}
                className="block hover:text-white text-left cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-neutral-800 text-center text-[10px] text-neutral-500">
            © 2026 Zi Distribution Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
