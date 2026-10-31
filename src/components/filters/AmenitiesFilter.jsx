import React from 'react';
import { AMENITIES_LIST } from '../../constants';

export const AmenitiesFilter = ({ selectedAmenities = [], onToggleAmenity }) => {
  return (
    <div className="space-y-2">
      <span className="font-bold text-xs text-red-950 block">Resort Amenities</span>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {AMENITIES_LIST.map((amenity) => {
          const isChecked = selectedAmenities.includes(amenity);
          return (
            <label key={amenity} className="flex items-center gap-2.5 text-xs text-red-900/80 hover:text-red-950 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleAmenity(amenity)}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-red-900/20 accent-red-600 cursor-pointer"
              />
              <span className="truncate">{amenity}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesFilter;
