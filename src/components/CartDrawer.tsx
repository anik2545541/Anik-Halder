import React, { useState } from 'react';
import { CartItem, Currency, WholesaleOrder } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currency: Currency;
  onCheckoutSuccess: (order: WholesaleOrder) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  currency,
  onCheckoutSuccess,
}) => {
  const [poNumber, setPoNumber] = useState('PO-' + Math.floor(10000 + Math.random() * 90000));
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'freight' | 'priority'>('standard');
  const [paymentTerms, setPaymentTerms] = useState<'net30' | 'wire' | 'card'>('net30');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<WholesaleOrder | null>(null);

  if (!isOpen) return null;

  const currInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };
  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.selectedTierPrice * item.quantity,
    0
  );
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Free shipping threshold: $50
  const freeShippingThresholdUSD = 50;
  const isFreeShipping = rawSubtotal >= freeShippingThresholdUSD;
  const amountToFreeShipping = Math.max(0, freeShippingThresholdUSD - rawSubtotal);
  const freeShippingProgress = Math.min(
    100,
    (rawSubtotal / freeShippingThresholdUSD) * 100
  );

  const shippingCostUSD = isFreeShipping
    ? 0
    : shippingMethod === 'freight'
    ? 45
    : shippingMethod === 'priority'
    ? 25
    : 12.0;
  const totalUSD = rawSubtotal + shippingCostUSD;

  const convertedSubtotal = rawSubtotal * currInfo.rate;
  const convertedShipping = shippingCostUSD * currInfo.rate;
  const convertedTotal = totalUSD * currInfo.rate;

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const newOrder: WholesaleOrder = {
        id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        poNumber: poNumber || `PO-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString().split('T')[0],
        itemsCount: totalItemsCount,
        total: totalUSD,
        status: paymentTerms === 'net30' ? 'Processing' : 'In Transit',
        trackingNumber: `FX-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
          1000 + Math.random() * 9000
        )}-US`,
        carrier: 'FedEx Freight Direct',
      };
      setOrderComplete(newOrder);
      setIsCheckingOut(false);
      onCheckoutSuccess(newOrder);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center">
              <i className="ph ph-shopping-bag text-lg font-bold"></i>
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900 leading-tight">
                Wholesale Cart ({items.length})
              </h2>
              <span className="text-[10px] text-gray-500">
                {totalItemsCount} total units queued
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-gray-400 hover:text-red-600 transition cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer transition"
            >
              <i className="ph ph-x text-lg"></i>
            </button>
          </div>
        </div>

        {orderComplete ? (
          /* Order Confirmation View */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4">
              <i className="ph-fill ph-check-circle"></i>
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
              Order Confirmed & Placed
            </span>
            <h3 className="text-xl font-black text-gray-900 mb-1">
              Thank You for Your Order!
            </h3>
            <p className="text-xs text-gray-500 mb-4 max-w-xs">
              Your wholesale PO has been routed to fulfillment. An official invoice
              and packing slip have been sent to your registered company email.
            </p>

            <div className="w-full bg-gray-50 rounded-xl p-3 border border-gray-200 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-bold font-mono text-gray-800">
                  {orderComplete.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">PO Number:</span>
                <span className="font-bold font-mono text-gray-800">
                  {orderComplete.poNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tracking Code:</span>
                <span className="font-bold font-mono text-brand-orange">
                  {orderComplete.trackingNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Terms:</span>
                <span className="font-bold text-gray-800 uppercase">
                  Net-30 Commercial Terms
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-sm">
                <span>Total Invoiced:</span>
                <span className="text-brand-orange">
                  {currInfo.symbol}
                  {(orderComplete.total * currInfo.rate).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderComplete(null);
                onClose();
              }}
              className="w-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bold text-xs py-3 rounded-xl shadow-md transition cursor-pointer"
            >
              Continue Sourcing
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-400">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl mb-3">
              <i className="ph ph-shopping-bag"></i>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              Your Wholesale Cart is Empty
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mb-4">
              Explore our factory-direct catalog and tiered bulk volume pricing.
            </p>
            <button
              onClick={onClose}
              className="bg-brand-orange hover:bg-brand-deepOrange text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          /* Cart List & Checkout Steps */
          <>
            {/* Free Shipping Alert Bar */}
            <div className="bg-orange-50/80 px-4 py-2.5 border-b border-orange-100">
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="text-orange-950 flex items-center gap-1">
                  <i className="ph ph-truck text-brand-orange"></i>
                  {isFreeShipping ? (
                    <span className="text-emerald-700">
                      ✓ Free Nationwide Freight Qualified!
                    </span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="text-brand-orange">
                        {currInfo.symbol}
                        {(amountToFreeShipping * currInfo.rate).toFixed(2)}
                      </strong>{' '}
                      for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-gray-500">Threshold: $50</span>
              </div>
              <div className="w-full bg-orange-200/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-orange h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => {
                const itemTotal = item.selectedTierPrice * item.quantity * currInfo.rate;
                return (
                  <div
                    key={item.product.id}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 flex gap-3 relative"
                  >
                    <div className="w-14 h-14 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 text-2xl shrink-0">
                      <i className={`ph ${item.product.icon}`}></i>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-mono block">
                            SKU: {item.product.sku} · MOQ: {item.product.moq}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition cursor-pointer p-0.5"
                          title="Remove item"
                        >
                          <i className="ph ph-trash text-sm"></i>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60">
                        {/* Quantity Adjuster */}
                        <div className="flex items-center border border-gray-300 rounded-md bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= item.product.moq}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                          >
                            <i className="ph ph-minus text-[10px]"></i>
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.product.id, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                          >
                            <i className="ph ph-plus text-[10px]"></i>
                          </button>
                        </div>

                        {/* Price Details */}
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block">
                            {currInfo.symbol}
                            {(item.selectedTierPrice * currInfo.rate).toFixed(2)}/ea
                          </span>
                          <span className="text-xs font-black text-gray-900">
                            {currInfo.symbol}
                            {itemTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Wholesale PO & Billing Options */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-2.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                    Customer PO / Reference #
                  </label>
                  <input
                    type="text"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="w-full text-xs rounded-lg border-gray-300 bg-white py-1.5 px-2.5 focus:ring-1 focus:ring-brand-orange"
                    placeholder="e.g. PO-89201"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                    B2B Payment Terms
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                    <button
                      type="button"
                      onClick={() => setPaymentTerms('net30')}
                      className={`p-1.5 rounded-lg border font-semibold cursor-pointer transition ${
                        paymentTerms === 'net30'
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      Net-30 Terms
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentTerms('wire')}
                      className={`p-1.5 rounded-lg border font-semibold cursor-pointer transition ${
                        paymentTerms === 'wire'
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      Wire / ACH
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentTerms('card')}
                      className={`p-1.5 rounded-lg border font-semibold cursor-pointer transition ${
                        paymentTerms === 'card'
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      Credit Card
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                    Fulfillment & Shipping Speed
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('standard')}
                      className={`p-1.5 rounded-lg border text-left cursor-pointer ${
                        shippingMethod === 'standard'
                          ? 'border-brand-orange bg-orange-50 font-bold text-brand-orange'
                          : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      <span>Standard Ground</span>
                      <span className="block text-[9px] font-normal text-gray-500">
                        {isFreeShipping ? 'FREE' : '$12.00'} · 3-5 days
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingMethod('freight')}
                      className={`p-1.5 rounded-lg border text-left cursor-pointer ${
                        shippingMethod === 'freight'
                          ? 'border-brand-orange bg-orange-50 font-bold text-brand-orange'
                          : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      <span>Pallet LTL Freight</span>
                      <span className="block text-[9px] font-normal text-gray-500">
                        $45.00 · Liftgate Included
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Cart Summary & Checkout */}
            <div className="bg-white border-t border-gray-200 p-4 space-y-2">
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItemsCount} units):</span>
                  <span className="font-semibold text-gray-900">
                    {currInfo.symbol}
                    {convertedSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-gray-900">
                    {convertedShipping === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `${currInfo.symbol}${convertedShipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 pt-1 border-t border-gray-100">
                  <span>Total Order:</span>
                  <span className="text-brand-orange">
                    {currInfo.symbol}
                    {convertedTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                disabled={isCheckingOut}
                onClick={handleCompleteOrder}
                className="w-full bg-brand-orange hover:bg-brand-deepOrange disabled:bg-gray-400 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <i className="ph ph-spinner animate-spin text-base"></i>
                    <span>Processing Wholesale PO...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Wholesale Order</span>
                    <i className="ph ph-arrow-right font-bold"></i>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
