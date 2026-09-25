import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isSaved: boolean;
  onToggleSave: (product: Product) => void;
  currency: Currency;
  onRequestQuote: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isSaved,
  onToggleSave,
  currency,
  onRequestQuote,
}) => {
  if (!product) return null;

  const currInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };
  const [qty, setQty] = useState<number>(product.moq);

  // Calculate tier price for the current quantity
  const getTierPrice = (quantity: number) => {
    let price = product.price;
    for (const tier of product.tiers) {
      if (quantity >= tier.minQty) {
        if (!tier.maxQty || quantity <= tier.maxQty) {
          price = tier.price;
        } else if (quantity > (tier.maxQty || 0)) {
          price = tier.price;
        }
      }
    }
    return price;
  };

  const currentUnitPrice = getTierPrice(qty);
  const convertedUnitPrice = currentUnitPrice * currInfo.rate;
  const totalPrice = convertedUnitPrice * qty;

  const handleQtyChange = (newQty: number) => {
    if (newQty >= product.moq) {
      setQty(newQty);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-gray-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-2 py-0.5 rounded-md">
              {product.categoryLabel}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              SKU: {product.sku}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleSave(product)}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition cursor-pointer"
              title="Save to Wishlist"
            >
              <i
                className={`ph ${
                  isSaved ? 'ph-fill ph-heart text-brand-orange' : 'ph-heart'
                } text-xl`}
              ></i>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition cursor-pointer"
            >
              <i className="ph ph-x text-lg"></i>
            </button>
          </div>
        </div>

        {/* Product Visual & Headline */}
        <div className="p-4 pb-2">
          <div className="w-full h-48 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100">
            {product.badge && (
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-brand-orange text-white shadow-xs">
                {product.badge}
              </span>
            )}
            <i className={`ph ${product.icon} text-7xl text-neutral-800`}></i>
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-medium text-emerald-700 flex items-center gap-1 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {product.stock.toLocaleString()} units available
            </div>
          </div>

          <div className="mt-3">
            <h2 className="text-lg font-black text-gray-900 leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <i className="ph-fill ph-star"></i>
                <span className="text-gray-800">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-400">
                ({product.reviewCount} verified wholesale reviews)
              </span>
              <span className="text-xs text-emerald-600 font-medium ml-auto">
                Ready to Ship
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Tier Pricing Matrix */}
        <div className="px-4 py-2">
          <div className="bg-orange-50/70 border border-orange-200/70 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1">
                <i className="ph ph-chart-line-down text-brand-orange"></i> Wholesale Tier Pricing
              </span>
              <span className="text-[10px] text-brand-orange font-semibold">
                MOQ: {product.moq} pcs
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {product.tiers.map((tier, idx) => {
                const isActive =
                  qty >= tier.minQty && (!tier.maxQty || qty <= tier.maxQty);
                return (
                  <div
                    key={idx}
                    onClick={() => setQty(tier.minQty)}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      isActive
                        ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                        : 'bg-white text-gray-800 border-orange-100 hover:border-orange-300'
                    }`}
                  >
                    <span className="block text-[10px] font-semibold opacity-90">
                      {tier.minQty}{tier.maxQty ? ` - ${tier.maxQty}` : '+'} pcs
                    </span>
                    <span className="block text-sm font-extrabold mt-0.5">
                      {currInfo.symbol}
                      {(tier.price * currInfo.rate).toFixed(2)}
                    </span>
                    <span
                      className={`block text-[9px] mt-0.5 ${
                        isActive ? 'text-orange-100' : 'text-emerald-600 font-medium'
                      }`}
                    >
                      {idx === 0 ? 'Standard' : idx === 1 ? 'Save ~12%' : 'Save ~22%'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="px-4 py-2">
          <h4 className="text-xs font-bold text-gray-900 mb-1.5 flex items-center gap-1">
            <i className="ph ph-info text-brand-orange"></i> Supply & Logistics Details
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <div>
              <span className="text-[10px] text-gray-400 block">Packaging</span>
              <span className="font-semibold text-gray-800 text-[11px]">
                {product.specs.packaging}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Lead Time</span>
              <span className="font-semibold text-gray-800 text-[11px]">
                {product.specs.leadTime}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Unit Weight</span>
              <span className="font-semibold text-gray-800 text-[11px]">
                {product.specs.weight}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Origin Port</span>
              <span className="font-semibold text-gray-800 text-[11px]">
                {product.specs.origin}
              </span>
            </div>
          </div>
        </div>

        {/* Quantity Controls & Add to Cart Action Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-auto">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <button
                  type="button"
                  onClick={() => handleQtyChange(qty - 1)}
                  disabled={qty <= product.moq}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <i className="ph ph-minus text-xs"></i>
                </button>
                <input
                  type="number"
                  value={qty}
                  min={product.moq}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || product.moq;
                    handleQtyChange(val);
                  }}
                  className="w-14 text-center text-xs font-bold bg-transparent border-0 py-1 focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => handleQtyChange(qty + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  <i className="ph ph-plus text-xs"></i>
                </button>
              </div>
            </div>

            {/* Quick bulk presets */}
            <div className="flex items-center gap-1">
              {[10, 50, 100].map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => handleQtyChange(qty + inc)}
                  className="text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-700 cursor-pointer"
                >
                  +{inc}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px]">Unit Price (Tier applied)</span>
              <span className="font-bold text-gray-800">
                {currInfo.symbol}{convertedUnitPrice.toFixed(2)} / unit
              </span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block text-[10px]">Total Order Amount</span>
              <span className="text-base font-black text-brand-orange">
                {currInfo.symbol}{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRequestQuote(product)}
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold text-xs py-3 px-3 rounded-xl transition cursor-pointer text-center"
            >
              Request Custom RFQ
            </button>
            <button
              onClick={() => {
                onAddToCart(product, qty);
                onClose();
              }}
              className="flex-1 bg-brand-orange hover:bg-brand-deepOrange text-white font-bold text-xs py-3 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <i className="ph ph-shopping-cart-simple text-sm font-bold"></i>
              <span>Add to Wholesale Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
