import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
}) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 py-1.5 px-4 max-w-md mx-auto shadow-lg"
    >
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center cursor-pointer transition ${
            activeTab === 'home'
              ? 'text-brand-orange font-bold'
              : 'text-gray-500 hover:text-brand-orange'
          }`}
        >
          <i
            className={`ph ${
              activeTab === 'home' ? 'ph-fill ph-house' : 'ph-house'
            } text-xl`}
          ></i>
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Category */}
        <button
          onClick={() => setActiveTab('category')}
          className={`flex flex-col items-center cursor-pointer transition ${
            activeTab === 'category'
              ? 'text-brand-orange font-bold'
              : 'text-gray-500 hover:text-brand-orange'
          }`}
        >
          <i
            className={`ph ${
              activeTab === 'category' ? 'ph-fill ph-grid-four' : 'ph-grid-four'
            } text-xl`}
          ></i>
          <span className="text-[10px] mt-0.5">Category</span>
        </button>

        {/* Deals (Floating center button) */}
        <button
          onClick={() => setActiveTab('deals')}
          className={`flex flex-col items-center cursor-pointer transition group`}
        >
          <div
            className={`w-10 h-10 -mt-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition transform group-active:scale-95 ${
              activeTab === 'deals'
                ? 'bg-brand-deepOrange ring-2 ring-orange-300'
                : 'bg-brand-orange hover:bg-brand-deepOrange'
            } text-white`}
          >
            <i className="ph ph-tag text-lg"></i>
          </div>
          <span
            className={`text-[10px] mt-0.5 ${
              activeTab === 'deals'
                ? 'text-brand-orange font-bold'
                : 'text-gray-500 group-hover:text-brand-orange'
            }`}
          >
            Deals
          </span>
        </button>

        {/* Saved */}
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center cursor-pointer transition relative ${
            activeTab === 'saved'
              ? 'text-brand-orange font-bold'
              : 'text-gray-500 hover:text-brand-orange'
          }`}
        >
          <div className="relative">
            <i
              className={`ph ${
                activeTab === 'saved' ? 'ph-fill ph-heart' : 'ph-heart'
              } text-xl`}
            ></i>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-brand-orange text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Saved</span>
        </button>

        {/* Account */}
        <button
          onClick={() => setActiveTab('account')}
          className={`flex flex-col items-center cursor-pointer transition ${
            activeTab === 'account'
              ? 'text-brand-orange font-bold'
              : 'text-gray-500 hover:text-brand-orange'
          }`}
        >
          <i
            className={`ph ${
              activeTab === 'account' ? 'ph-fill ph-user' : 'ph-user'
            } text-xl`}
          ></i>
          <span className="text-[10px] mt-0.5">Account</span>
        </button>
      </div>
    </nav>
  );
};
