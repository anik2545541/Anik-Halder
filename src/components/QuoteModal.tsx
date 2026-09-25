import React, { useState } from 'react';
import { Product, QuoteRequest } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSubmitQuote: (quote: QuoteRequest) => void;
  allProducts: Product[];
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmitQuote,
  allProducts,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    product ? product.id : allProducts[0]?.id || ''
  );
  const [targetQty, setTargetQty] = useState<number>(product ? product.moq * 5 : 100);
  const [companyName, setCompanyName] = useState('Apex Industrial Sourcing Inc.');
  const [contactName, setContactName] = useState('David Miller');
  const [email, setEmail] = useState('procurement@apexindustrial.com');
  const [phone, setPhone] = useState('+1 (555) 382-9012');
  const [destinationZip, setDestinationZip] = useState('90001');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [notes, setNotes] = useState('Need custom pallet wrap and barcoded packaging for nationwide distribution.');
  const [submitted, setSubmitted] = useState<QuoteRequest | null>(null);

  if (!isOpen) return null;

  const currentProd = allProducts.find((p) => p.id === selectedProductId) || product;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote: QuoteRequest = {
      id: `RFQ-${Math.floor(100000 + Math.random() * 900000)}`,
      companyName,
      contactName,
      email,
      phone,
      productId: currentProd?.id,
      productName: currentProd?.name || 'Multiple Wholesale Products',
      targetQuantity: targetQty,
      targetPricePerUnit: targetPrice ? parseFloat(targetPrice) : undefined,
      destinationZip,
      notes,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
    };
    setSubmitted(newQuote);
    onSubmitQuote(newQuote);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center">
              <i className="ph ph-file-text text-lg font-bold"></i>
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900 leading-tight">
                Request Volume Wholesale Quote
              </h2>
              <span className="text-[10px] text-gray-400">
                Direct factory pricing & custom freight quotation
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmitted(null);
              onClose();
            }}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
          >
            <i className="ph ph-x text-lg"></i>
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-3">
              <i className="ph-fill ph-check-circle"></i>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
              RFQ Submitted Successfully
            </span>
            <h3 className="text-lg font-black text-gray-900 mb-1">
              Quote #{submitted.id}
            </h3>
            <p className="text-xs text-gray-500 mb-4 max-w-xs">
              Our B2B key accounts team will review your target quantity of{' '}
              <strong className="text-gray-800 font-bold">
                {submitted.targetQuantity.toLocaleString()} units
              </strong>{' '}
              and reply within 2 business hours.
            </p>

            <div className="w-full bg-gray-50 p-3 rounded-xl border border-gray-200 text-left text-xs space-y-1.5 mb-5">
              <div className="flex justify-between">
                <span className="text-gray-400">Product:</span>
                <span className="font-bold text-gray-800 truncate max-w-[200px]">
                  {submitted.productName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Company:</span>
                <span className="font-semibold text-gray-800">
                  {submitted.companyName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Destination:</span>
                <span className="font-semibold text-gray-800">
                  ZIP {submitted.destinationZip}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(null);
                onClose();
              }}
              className="w-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs">
            {/* Selected Product */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Target Product
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
              >
                {allProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Base: ${p.price.toFixed(2)} · MOQ: {p.moq})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Quantity & Target Unit Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Target Units (MOQ: {currentProd?.moq || 10})
                </label>
                <input
                  type="number"
                  required
                  min={currentProd?.moq || 5}
                  value={targetQty}
                  onChange={(e) => setTargetQty(parseInt(e.target.value) || 10)}
                  className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Target Unit Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Optional expectation"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            {/* Company & Contact Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            {/* Destination ZIP */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Destination ZIP / Postal Code (For Freight Calculation)
              </label>
              <input
                type="text"
                required
                value={destinationZip}
                onChange={(e) => setDestinationZip(e.target.value)}
                className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
              />
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Custom Requirements / OEM / Packaging Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border-gray-300 text-xs py-2 px-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-orange"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
              >
                <span>Submit Wholesale RFQ</span>
                <i className="ph ph-paper-plane-right font-bold text-sm"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
