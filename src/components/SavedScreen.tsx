import React from 'react';
import { Product, Currency } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

interface SavedScreenProps {
  savedProducts: Product[];
  onRemoveSaved: (productId: string) => void;
  onAddToCart: (p: Product, qty: number) => void;
  onSelectProduct: (p: Product) => void;
  currency: Currency;
  onAddAllToCart: () => void;
  onOpenQuoteModal: (p?: Product) => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedProducts,
  onRemoveSaved,
  onAddToCart,
  onSelectProduct,
  currency,
  onAddAllToCart,
  onOpenQuoteModal,
}) => {
  const currInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };

  const totalEstimatedCost = savedProducts.reduce(
    (sum, p) => sum + p.price * p.moq * currInfo.rate,
    0
  );

  return (
    <div className="pb-24 max-w-md mx-auto px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-brand-orange font-bold uppercase tracking-wider mb-1">
            <i className="ph ph-bookmark-simple"></i>
            <span>Procurement Wishlist</span>
          </div>
          <h1 className="text-xl font-black text-gray-900 leading-tight">
            Saved Products ({savedProducts.length})
          </h1>
          <p className="text-xs text-gray-500">
            Items earmarked for future bulk ordering and restocking.
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={onAddAllToCart}
            className="bg-brand-orange hover:bg-brand-deepOrange text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs flex items-center gap-1 transition cursor-pointer"
          >
            <i className="ph ph-shopping-bag text-sm"></i>
            <span>Add All</span>
          </button>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-gray-200 p-6">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center text-3xl mx-auto mb-3">
            <i className="ph ph-heart"></i>
          </div>
          <h3 className="text-sm font-bold text-gray-800 mb-1">
            No saved products yet
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
            Tap the heart icon on any wholesale product or catalog card to bookmark items here for easy reordering.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Box */}
          <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-3 mb-4 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold block">
                Total at Initial MOQs
              </span>
              <span className="text-base font-black text-brand-orange">
                {currInfo.symbol}
                {totalEstimatedCost.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-white border border-orange-200 text-gray-800 text-[11px] font-bold py-1.5 px-3 rounded-lg hover:border-brand-orange transition cursor-pointer"
            >
              Export RFQ for All
            </button>
          </div>

          {/* List of saved products */}
          <div className="space-y-3">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white border border-gray-200 rounded-2xl p-3 shadow-xs hover:border-orange-300 transition cursor-pointer flex gap-3 relative"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 text-3xl shrink-0">
                  <i className={`ph ${product.icon}`}></i>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">
                        {product.categoryLabel}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <span className="text-[10px] text-gray-500 block">
                        MOQ: {product.moq} pcs · SKU: {product.sku}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSaved(product.id);
                      }}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition"
                      title="Remove from saved"
                    >
                      <i className="ph ph-trash text-sm"></i>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs font-black text-gray-900">
                      {currInfo.symbol}
                      {(product.price * currInfo.rate).toFixed(2)}{' '}
                      <span className="text-[10px] font-normal text-gray-400">/ unit</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, product.moq);
                      }}
                      className="bg-brand-orange hover:bg-brand-deepOrange text-white text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer transition active:scale-95"
                    >
                      <i className="ph ph-shopping-cart-simple text-xs"></i>
                      <span>Order MOQ</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
