import React from 'react';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import AmenitiesFilter from './AmenitiesFilter';
import { Filter, RotateCcw } from 'lucide-react';

export const HotelFilter = ({
  maxPrice,
  onPriceChange,
  selectedRating,
  onRatingChange,
  selectedAmenities,
  onToggleAmenity,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-6 shadow-xs ring-1 ring-red-950/5">
      <div className="flex items-center justify-between border-b border-red-900/10 pb-3">
        <h4 className="font-black text-red-950 text-sm flex items-center gap-1.5 font-brand">
          <Filter className="w-4 h-4 text-red-600" /> Refine Stays
        </h4>
        <button
          onClick={onReset}
          className="text-xs text-red-900/60 hover:text-red-600 flex items-center gap-1 transition font-bold cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Clear
        </button>
      </div>

      <PriceFilter currentMax={maxPrice} onChange={onPriceChange} />
      <RatingFilter selectedRating={selectedRating} onSelectRating={onRatingChange} />
      <AmenitiesFilter selectedAmenities={selectedAmenities} onToggleAmenity={onToggleAmenity} />
    </div>
  );
};

export default HotelFilter;
