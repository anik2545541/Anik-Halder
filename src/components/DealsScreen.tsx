import React, { useState, useEffect } from 'react';
import { Product, Currency } from '../types';
import { PRODUCTS, CURRENCY_RATES } from '../data/mockData';

interface DealsScreenProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, qty: number) => void;
  currency: Currency;
  onOpenQuoteModal: (p?: Product) => void;
}

export const DealsScreen: React.FC<DealsScreenProps> = ({
  onSelectProduct,
  onAddToCart,
  currency,
  onOpenQuoteModal,
}) => {
  const currInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter deal products (tagged HOT, SALE, or high-tier discounts)
  const dealProducts = PRODUCTS.filter(
    (p) => p.badge === 'HOT' || p.badge === 'SALE' || p.id === 'prod-bs-3' || p.id === 'prod-na-1'
  );

  return (
    <div className="pb-24 max-w-md mx-auto px-4 pt-4">
      {/* Deals Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white p-5 shadow-lg mb-5">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit text-[10px] font-extrabold uppercase tracking-widest text-amber-300 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
            <span>Flash Wholesale Lots</span>
          </div>

          <h1 className="text-2xl font-black leading-tight mb-1">
            Overstock & Volume Clearance
          </h1>
          <p className="text-xs text-orange-100 mb-3 max-w-xs leading-snug">
            Save up to 40% on master-carton bulk lots directly from verified manufacturer excess inventory.
          </p>

          {/* Live Countdown Box */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-xl p-2.5 w-fit border border-white/10">
            <span className="text-[10px] uppercase font-bold text-gray-300">
              Lot closes in:
            </span>
            <div className="flex items-center gap-1 font-mono font-black text-sm text-amber-300">
              <span className="bg-black/60 px-1.5 py-0.5 rounded">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-black/60 px-1.5 py-0.5 rounded">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-black/60 px-1.5 py-0.5 rounded">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Decorative icon background */}
        <div className="absolute -right-4 -bottom-6 opacity-20 text-white pointer-events-none">
          <i className="ph ph-tag text-9xl"></i>
        </div>
      </div>

      {/* Volume Tiers Highlight Card */}
      <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-xs mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <i className="ph ph-trend-up text-brand-orange text-base"></i> Volume Rebate Program
          </span>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold">
            Active Today
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Combine orders across all electronics & lifestyle departments to hit volume thresholds:
        </p>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
            <span className="block font-bold text-gray-800">50+ units</span>
            <span className="block text-brand-orange font-black text-sm mt-0.5">10% OFF</span>
            <span className="text-[9px] text-gray-400">Carton rate</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
            <span className="block font-bold text-gray-800">200+ units</span>
            <span className="block text-brand-orange font-black text-sm mt-0.5">22% OFF</span>
            <span className="text-[9px] text-gray-400">Pallet rate</span>
          </div>
          <div className="bg-orange-50 rounded-lg p-2 border border-orange-200">
            <span className="block font-bold text-gray-900">500+ units</span>
            <span className="block text-brand-deepOrange font-black text-sm mt-0.5">35% OFF</span>
            <span className="text-[9px] text-brand-orange font-semibold">Container rate</span>
          </div>
        </div>
      </div>

      {/* Clearance Lot Listings */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">
          Featured Clearance SKUs
        </h2>
        <span className="text-[10px] text-gray-400">Updated hourly</span>
      </div>

      <div className="space-y-3">
        {dealProducts.map((product) => {
          const discountPercent = Math.round(
            ((product.price - product.tiers[product.tiers.length - 1].price) /
              product.price) *
              100 +
              10
          );
          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white border border-gray-200 rounded-2xl p-3 shadow-xs hover:border-orange-300 transition cursor-pointer flex gap-3 items-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg">
                SAVE {discountPercent}%
              </div>

              <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 text-3xl shrink-0">
                <i className={`ph ${product.icon}`}></i>
              </div>

              <div className="flex-1 min-w-0 pr-8">
                <span className="text-[9px] text-gray-400 uppercase font-bold block">
                  {product.categoryLabel} · MOQ: {product.moq} pcs
                </span>
                <h3 className="text-xs font-bold text-gray-900 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-black text-brand-orange">
                    {currInfo.symbol}
                    {(product.tiers[product.tiers.length - 1].price * currInfo.rate).toFixed(2)}
                  </span>
                  <span className="text-[10px] text-gray-400 line-through">
                    {currInfo.symbol}
                    {((product.price * 1.25) * currInfo.rate).toFixed(2)}
                  </span>
                  <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Factory direct
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product, product.moq);
                }}
                className="w-8 h-8 rounded-lg bg-brand-orange hover:bg-brand-deepOrange text-white flex items-center justify-center shadow-xs cursor-pointer transition active:scale-95 shrink-0"
                title="Add deal to cart"
              >
                <i className="ph ph-shopping-cart-simple text-sm"></i>
              </button>
            </div>
          );
        })}
      </div>

      {/* Custom Container RFQ Box */}
      <div className="mt-5 p-4 rounded-2xl bg-neutral-900 text-white">
        <h3 className="text-sm font-black mb-1 flex items-center gap-1.5">
          <i className="ph ph-shipping-container text-brand-orange text-lg"></i>
          FCL Container Load Purchasing?
        </h3>
        <p className="text-xs text-neutral-300 mb-3 leading-snug">
          Looking to import 20ft/40ft ocean containers or dedicated truckloads? Work with our senior enterprise trade broker.
        </p>
        <button
          onClick={() => onOpenQuoteModal()}
          className="bg-brand-orange hover:bg-brand-deepOrange text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span>Connect with Trade Desk</span>
          <i className="ph ph-arrow-right text-xs"></i>
        </button>
      </div>
    </div>
  );
};
