import React from 'react';
import { Star } from 'lucide-react';

export const RatingFilter = ({ selectedRating, onSelectRating }) => {
  const ratings = [4.5, 4.0, 3.5, 0];

  return (
    <div className="space-y-2">
      <span className="font-bold text-xs text-red-950 block">Minimum Rating</span>
      <div className="flex flex-wrap gap-2">
        {ratings.map((rate) => (
          <button
            key={rate}
            onClick={() => onSelectRating(rate)}
            className={`px-3 py-1 text-xs rounded-xl font-bold flex items-center gap-1 border transition cursor-pointer ${
              selectedRating === rate
                ? 'bg-red-50 border-red-600 text-red-950 font-bold shadow-xs'
                : 'border-red-900/10 text-red-900/70 hover:bg-red-50/50'
            }`}
          >
            {rate > 0 ? (
              <>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {rate}+
              </>
            ) : (
              'Any'
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
