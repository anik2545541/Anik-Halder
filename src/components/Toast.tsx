import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 w-[90%] max-w-sm">
      <div className="bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-neutral-700 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping shrink-0"></span>
          <p className="text-xs font-medium text-gray-100 truncate">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white shrink-0 p-1 cursor-pointer"
        >
          <i className="ph ph-x text-sm"></i>
        </button>
      </div>
    </div>
  );
};
