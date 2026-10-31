import React from 'react';
import { PROPERTY_TYPES } from '../../constants';

export const FilterBar = ({ selectedType, onSelectType, activeFiltersCount = 0, onClearAll }) => {
  return (
    <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2">
        {PROPERTY_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onSelectType(type)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
              selectedType === type
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white border border-red-900/10 text-red-950 hover:bg-red-50 ring-1 ring-red-950/5'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={onClearAll}
          className="text-xs text-red-700 font-bold hover:underline shrink-0 cursor-pointer"
        >
          Reset ({activeFiltersCount})
        </button>
      )}
    </div>
  );
};

export default FilterBar;
