import React from 'react';
import { MapPin } from 'lucide-react';

const POPULAR_DESTS = ['Coorg', 'Udaipur', 'Shimla', 'Goa', 'Munnar', 'Manali', 'Jaipur'];

export const DestinationSearch = ({ selected, onSelect }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
      <span className="text-xs font-bold text-red-900/50 shrink-0 font-brand">Popular:</span>
      {POPULAR_DESTS.map((dest) => (
        <button
          key={dest}
          onClick={() => onSelect(dest === selected ? '' : dest)}
          className={`px-3.5 py-1 text-xs rounded-full whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer font-bold ${
            selected === dest
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-red-50/60 hover:bg-red-100 text-red-950 border border-red-900/10'
          }`}
        >
          <MapPin className="w-3 h-3 text-red-600" />
          {dest}
        </button>
      ))}
    </div>
  );
};

export default DestinationSearch;
