import React from 'react';
import { formatCurrency } from '../../utils/priceFormatter';

export const RoomPrice = ({ pricePerNight, originalPrice }) => {
  return (
    <div className="text-right">
      <div className="flex items-baseline justify-end gap-1.5">
        <span className="text-xl font-black text-red-950 font-brand">{formatCurrency(pricePerNight)}</span>
        <span className="text-xs text-red-900/60 font-medium">/ night</span>
      </div>
      {originalPrice > pricePerNight && (
        <span className="line-through text-xs text-red-900/40 block font-medium">{formatCurrency(originalPrice)}</span>
      )}
      <span className="text-[11px] text-red-700 font-bold">+ Taxes & Fees Included</span>
    </div>
  );
};

export default RoomPrice;
