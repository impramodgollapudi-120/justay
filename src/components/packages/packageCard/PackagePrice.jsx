import React from 'react';
import { formatCurrency } from '../../../utils/priceFormatter';

export const PackagePrice = ({ price, originalPrice, duration = '3N / 4D' }) => {
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <div className="flex flex-col">
      <span className="text-[11px] text-red-900/60 font-medium">Starting per person</span>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-black text-red-950 font-brand">{formatCurrency(price)}</span>
        {originalPrice > price && (
          <span className="text-xs text-red-900/40 line-through font-normal">
            {formatCurrency(originalPrice)}
          </span>
        )}
        {discountPercent && (
          <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-lg border border-red-200">
            {discountPercent}% OFF
          </span>
        )}
      </div>
      <span className="text-[11px] text-red-700 font-bold">{duration} all-inclusive</span>
    </div>
  );
};

export default PackagePrice;
