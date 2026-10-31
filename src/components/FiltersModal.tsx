import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { FilterState } from '../types';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  totalResultsCount: number;
}

export const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  totalResultsCount,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  if (!isOpen) return null;

  const propertyTypes = ['All', 'Hotel', 'Resort', 'Villa', 'Homestay', 'Apartment'];
  const starRatings = [
    { label: 'All', value: 'All' },
    { label: '5 ★', value: '5' },
    { label: '4 ★ & above', value: '4' },
    { label: '3 ★ & above', value: '3' },
  ];
  const allAmenitiesList = [
    'Free Wi-Fi',
    'Swimming Pool',
    'AC',
    'Parking',
    'Restaurant',
    'Room Service',
  ];
  const mealOptions = [
    'All',
    'Room Only',
    'Breakfast',
    'Breakfast + Dinner',
    'All Meals',
  ];

  const handleToggleAmenity = (amenity: string) => {
    const exists = localFilters.amenities.includes(amenity);
    if (exists) {
      setLocalFilters({
        ...localFilters,
        amenities: localFilters.amenities.filter((a) => a !== amenity),
      });
    } else {
      setLocalFilters({
        ...localFilters,
        amenities: [...localFilters.amenities, amenity],
      });
    }
  };

  const handleSelectAllAmenities = () => {
    if (localFilters.amenities.length === allAmenitiesList.length) {
      setLocalFilters({ ...localFilters, amenities: [] });
    } else {
      setLocalFilters({ ...localFilters, amenities: [...allAmenitiesList] });
    }
  };

  const handleReset = () => {
    const resetState: FilterState = {
      priceMin: 500,
      priceMax: 10000,
      propertyType: 'All',
      starRating: 'All',
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'AC', 'Room Service'],
      meals: 'All',
    };
    setLocalFilters(resetState);
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF5F5] text-[#450A0A] rounded-t-3xl max-h-[90vh] overflow-y-auto max-w-md mx-auto w-full shadow-2xl flex flex-col border-t border-red-900/10 ring-1 ring-red-950/5">
        {/* Header */}
        <div className="sticky top-0 bg-[#FFF5F5]/95 backdrop-blur-md z-10 px-5 py-4 border-b border-red-900/10 flex items-center justify-between">
          <button
            id="btn-filters-close"
            onClick={onClose}
            className="p-1.5 -ml-1 text-red-950 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>

          <h2 className="text-base font-black text-red-950 tracking-tight font-brand">
            Filters
          </h2>

          <button
            id="btn-filters-reset"
            onClick={handleReset}
            className="text-xs font-black text-red-600 hover:text-red-700 cursor-pointer font-brand"
          >
            Reset
          </button>
        </div>

        {/* Filter Body */}
        <div className="p-5 space-y-6">
          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black text-red-950 font-brand">
                Price Range <span className="text-[10px] font-normal text-red-900/60">(per night)</span>
              </label>
              <span className="text-xs font-black text-red-700 font-brand">
                ₹{localFilters.priceMin.toLocaleString()} – ₹{localFilters.priceMax >= 10000 ? '10,000+' : localFilters.priceMax.toLocaleString()}
              </span>
            </div>

            {/* Slider */}
            <div className="px-2">
              <input
                id="input-filter-price-max"
                type="range"
                min="500"
                max="10000"
                step="500"
                value={localFilters.priceMax}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    priceMax: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-red-900/60 font-semibold mt-1">
                <span>₹500</span>
                <span>₹5,000</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="text-xs font-black text-red-950 block mb-2.5 font-brand">
              Property Type
            </label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => {
                const isSelected = localFilters.propertyType === type;
                return (
                  <button
                    key={type}
                    id={`btn-filter-type-${type.toLowerCase()}`}
                    onClick={() =>
                      setLocalFilters({ ...localFilters, propertyType: type })
                    }
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer font-brand ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-white text-red-950 border border-red-900/15 hover:bg-red-50'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <label className="text-xs font-black text-red-950 block mb-2.5 font-brand">
              Star Rating
            </label>
            <div className="flex flex-wrap gap-2">
              {starRatings.map((rating) => {
                const isSelected = localFilters.starRating === rating.value;
                return (
                  <button
                    key={rating.value}
                    id={`btn-filter-star-${rating.value}`}
                    onClick={() =>
                      setLocalFilters({ ...localFilters, starRating: rating.value })
                    }
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer font-brand ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-white text-red-950 border border-red-900/15 hover:bg-red-50'
                    }`}
                  >
                    {rating.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-black text-red-950 font-brand">
                Amenities
              </label>
              <button
                id="btn-filter-select-all"
                onClick={handleSelectAllAmenities}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 cursor-pointer"
              >
                {localFilters.amenities.length === allAmenitiesList.length
                  ? 'Deselect all'
                  : 'Select all'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {allAmenitiesList.map((amenity) => {
                const isChecked = localFilters.amenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className="flex items-center gap-2.5 text-xs text-red-950 font-bold cursor-pointer select-none"
                  >
                    <div
                      onClick={() => handleToggleAmenity(amenity)}
                      className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-red-600 text-white'
                          : 'border border-red-900/30 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Meals */}
          <div>
            <label className="text-xs font-black text-red-950 block mb-2.5 font-brand">
              Meals
            </label>
            <div className="flex flex-wrap gap-2">
              {mealOptions.map((meal) => {
                const isSelected = localFilters.meals === meal;
                return (
                  <button
                    key={meal}
                    id={`btn-filter-meal-${meal.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() =>
                      setLocalFilters({ ...localFilters, meals: meal })
                    }
                    className={`px-3.5 py-2 rounded-full text-xs font-black transition-all cursor-pointer font-brand ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-white text-red-950 border border-red-900/15 hover:bg-red-50'
                    }`}
                  >
                    {meal}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Apply Button */}
        <div className="sticky bottom-0 bg-[#FFF5F5] p-4 border-t border-red-900/10">
          <button
            id="btn-apply-filters-action"
            onClick={handleApply}
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black py-3.5 px-4 rounded-2xl text-center text-sm shadow-md transition-all cursor-pointer flex items-center justify-center font-brand"
          >
            Apply Filters
          </button>
          <p className="text-center text-[11px] text-red-900/60 mt-2 font-medium">
            {totalResultsCount} Properties Found
          </p>
        </div>
      </div>
    </div>
  );
};
