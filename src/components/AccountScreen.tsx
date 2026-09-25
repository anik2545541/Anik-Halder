import React, { useState } from 'react';
import { WholesaleOrder, QuoteRequest, Currency } from '../types';
import { MOCK_ORDERS, CURRENCY_RATES } from '../data/mockData';

interface AccountScreenProps {
  orders: WholesaleOrder[];
  quotes: QuoteRequest[];
  currency: Currency;
  onOpenLogisticsModal: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  orders,
  quotes,
  currency,
  onOpenLogisticsModal,
}) => {
  const currInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };
  const allOrders = [...orders, ...MOCK_ORDERS];
  const [selectedOrder, setSelectedOrder] = useState<WholesaleOrder | null>(null);

  return (
    <div className="pb-24 max-w-md mx-auto px-4 pt-4">
      {/* Account Profile Header */}
      <div className="bg-neutral-900 text-white rounded-2xl p-4 shadow-md mb-4 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-brand-orange text-white font-black text-xl flex items-center justify-center shadow-md">
            AI
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-black text-white">
                Apex Industrial LLC
              </h2>
              <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <i className="ph-fill ph-seal-check text-xs"></i> Verified B2B
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Account ID: #B2B-89210 · Tax Exemption Valid
            </p>
          </div>
        </div>

        {/* Credit Limit & Terms */}
        <div className="bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/80 relative z-10 text-xs">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-gray-400 font-medium">
              Commercial Credit Terms (Net-30)
            </span>
            <span className="text-brand-orange font-bold text-xs">
              {currInfo.symbol}{(18200 * currInfo.rate).toLocaleString()} Available
            </span>
          </div>
          <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden mb-1.5">
            <div
              className="bg-brand-orange h-full rounded-full"
              style={{ width: '72%' }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>Used: {currInfo.symbol}{(6800 * currInfo.rate).toLocaleString()}</span>
            <span>Total Limit: {currInfo.symbol}{(25000 * currInfo.rate).toLocaleString()}</span>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Quick Action Pills */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
        <button
          onClick={onOpenLogisticsModal}
          className="bg-white border border-gray-200 p-2.5 rounded-xl hover:border-brand-orange transition cursor-pointer"
        >
          <i className="ph ph-truck text-brand-orange text-xl mb-1 block"></i>
          <span className="font-bold text-gray-800 text-[11px]">Freight Terms</span>
        </button>
        <div className="bg-white border border-gray-200 p-2.5 rounded-xl">
          <i className="ph ph-receipt text-brand-orange text-xl mb-1 block"></i>
          <span className="font-bold text-gray-800 text-[11px]">Tax Exempt</span>
          <span className="text-[9px] text-emerald-600 block font-semibold">Active</span>
        </div>
        <div className="bg-white border border-gray-200 p-2.5 rounded-xl">
          <i className="ph ph-identification-card text-brand-orange text-xl mb-1 block"></i>
          <span className="font-bold text-gray-800 text-[11px]">Key Rep</span>
          <span className="text-[9px] text-gray-500 block">Sarah Chen</span>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <i className="ph ph-package text-brand-orange"></i> Wholesale Orders & POs
          </h3>
          <span className="text-[10px] text-gray-400 font-medium">
            {allOrders.length} records
          </span>
        </div>

        <div className="space-y-2.5">
          {allOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs hover:border-orange-300 transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <span className="text-xs font-black text-gray-900 block font-mono">
                    {order.poNumber}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Order ID: {order.id} · {order.date}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : order.status === 'In Transit'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <span className="text-gray-500 text-[11px]">
                  {order.itemsCount} units · {order.carrier || 'Freight Line'}
                </span>
                <span className="font-black text-brand-orange">
                  {currInfo.symbol}{(order.total * currInfo.rate).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submitted RFQs */}
      {quotes.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <i className="ph ph-file-text text-brand-orange"></i> Active Quote Requests
            </h3>
            <span className="text-[10px] text-gray-400 font-medium">
              {quotes.length} RFQs
            </span>
          </div>

          <div className="space-y-2">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-gray-900">
                    {q.productName}
                  </span>
                  <span className="text-[9px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-bold">
                    {q.status}
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 flex justify-between">
                  <span>Target: {q.targetQuantity.toLocaleString()} units</span>
                  <span className="font-mono text-gray-400">{q.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Tracking Modal Detail */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Wholesale Shipment Tracking
                </span>
                <h3 className="text-base font-black text-gray-900">
                  {selectedOrder.poNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer"
              >
                <i className="ph ph-x text-base"></i>
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-2 border border-gray-100 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Carrier:</span>
                <span className="font-bold text-gray-800">
                  {selectedOrder.carrier || 'FedEx Freight Direct'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking Code:</span>
                <span className="font-bold font-mono text-brand-orange">
                  {selectedOrder.trackingNumber || 'FX-8849-201-US'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dispatch Date:</span>
                <span className="font-bold text-gray-800">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Units:</span>
                <span className="font-bold text-gray-800">{selectedOrder.itemsCount} units</span>
              </div>
            </div>

            {/* Tracking progress steps */}
            <div className="space-y-3 mb-5 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  <i className="ph-fill ph-check"></i>
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Warehouse Pick & Palletized</span>
                  <span className="text-[10px] text-gray-400">California Central Depot</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  <i className="ph-fill ph-check"></i>
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Departed Linehaul Hub</span>
                  <span className="text-[10px] text-gray-400">En route via Interstate LTL Freight</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  <i className="ph ph-truck"></i>
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Local Distribution Terminal</span>
                  <span className="text-[10px] text-brand-orange font-semibold">Scheduled Delivery Dock Arrival</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
