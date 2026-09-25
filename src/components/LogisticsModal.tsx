import React from 'react';

interface LogisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export const LogisticsModal: React.FC<LogisticsModalProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center">
              <i className="ph ph-truck text-lg font-bold"></i>
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900 leading-tight">
                Wholesale Logistics & Freight Network
              </h2>
              <span className="text-[10px] text-gray-400">
                Coast-to-coast fulfillment & freight SLAs
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer"
          >
            <i className="ph ph-x text-base"></i>
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          <div className="bg-neutral-900 text-white p-3.5 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5 text-brand-orange font-bold text-[11px] uppercase tracking-wider">
              <i className="ph ph-map-pin"></i> 4 Regional Fulfillment Centers
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Strategic distribution facilities in California, Texas, Illinois, and Georgia ensuring 1-3 business day ground reach to 98% of North American commercial zip codes.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-gray-900 text-xs">Wholesale Shipping Tiers</h4>
            <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 bg-gray-50 text-[11px]">
              <div className="p-2.5 flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-900 block">Orders over $50</span>
                  <span className="text-gray-500 text-[10px]">Standard commercial delivery</span>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  FREE
                </span>
              </div>

              <div className="p-2.5 flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-900 block">LTL Palletized Freight</span>
                  <span className="text-gray-500 text-[10px]">Over 300 lbs, liftgate included</span>
                </div>
                <span className="font-bold text-gray-900">$45.00 Flat rate</span>
              </div>

              <div className="p-2.5 flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-900 block">Full Truckload (FTL) & Containers</span>
                  <span className="text-gray-500 text-[10px]">Dedicated logistics booking</span>
                </div>
                <span className="font-bold text-brand-orange">Custom RFQ</span>
              </div>
            </div>
          </div>

          <div className="border border-amber-200 bg-amber-50/60 p-3 rounded-xl text-amber-900 text-[11px]">
            <strong className="block font-bold mb-0.5 flex items-center gap-1">
              <i className="ph ph-shield-check"></i> Cargo Insurance & Pallet Security
            </strong>
            Every shipment is 100% insured with tamper-evident band seals, serialized packing slips, and dock appointment scheduling.
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="flex-1 bg-brand-orange hover:bg-brand-deepOrange text-white font-bold py-2.5 rounded-xl transition cursor-pointer"
            >
              Get Custom Freight Quote
            </button>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
