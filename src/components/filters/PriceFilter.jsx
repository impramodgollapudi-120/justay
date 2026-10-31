import React from 'react';
import { formatCurrency } from '../../utils/priceFormatter';

export const PriceFilter = ({ minPrice = 0, maxPrice = 30000, currentMax, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-red-950">Budget per Night</span>
        <span className="font-black text-red-600 font-brand">Up to {formatCurrency(currentMax)}</span>
      </div>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        step={500}
        value={currentMax}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-red-100 rounded-lg appearance-none cursor-pointer accent-red-600"
      />
      <div className="flex justify-between text-[10px] text-red-900/50 font-medium">
        <span>{formatCurrency(minPrice)}</span>
        <span>{formatCurrency(maxPrice)}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
