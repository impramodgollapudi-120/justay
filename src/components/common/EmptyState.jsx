import React from 'react';
import { Package, Search, RotateCcw } from 'lucide-react';

export const EmptyState = ({
  title = 'No items found',
  description = 'Try adjusting your search filters or dates to find available luxury options.',
  onReset,
  icon: Icon = Package,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-red-900/10 p-10 text-center max-w-md mx-auto my-8 shadow-xs ring-1 ring-red-950/5">
      <div className="w-16 h-16 mx-auto bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-4 border border-red-200 shadow-inner">
        <Icon className="w-8 h-8 stroke-[1.8]" />
      </div>
      <h3 className="text-lg font-black text-red-950 mb-1.5 font-brand">{title}</h3>
      <p className="text-red-900/70 text-xs mb-6 leading-relaxed max-w-xs mx-auto font-medium">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
