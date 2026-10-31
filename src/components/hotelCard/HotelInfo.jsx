import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/priceFormatter';

export const HotelInfo = ({ hotel }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
            {hotel.propertyType}
          </span>
          <h3 className="text-base font-black text-red-950 mt-1 line-clamp-1 font-brand">{hotel.name}</h3>
        </div>
        <div className="flex items-center gap-1 bg-red-50 text-red-800 border border-red-200 px-2 py-1 rounded-lg text-xs font-bold shrink-0">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{hotel.rating}</span>
          <span className="text-red-900/40 font-normal">({hotel.reviewsCount})</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-red-900/70 text-xs font-medium">
        <MapPin className="w-3.5 h-3.5 shrink-0 text-red-600" />
        <span className="line-clamp-1 font-semibold">{hotel.location}</span>
      </div>

      <p className="text-red-900/80 text-xs leading-relaxed line-clamp-2 font-medium">{hotel.description}</p>

      <div className="flex items-baseline justify-between pt-2 border-t border-red-900/10">
        <div className="text-xs text-red-900/60 font-medium">
          Starting from
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-red-950 font-brand">{formatCurrency(hotel.pricePerNight)}</span>
            <span className="text-red-900/60 text-xs">/ night</span>
            {hotel.originalPrice > hotel.pricePerNight && (
              <span className="line-through text-red-900/40 text-xs">{formatCurrency(hotel.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;
