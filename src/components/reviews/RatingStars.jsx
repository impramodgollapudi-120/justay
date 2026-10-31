import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, maxStars = 5, size = 'sm', showNumber = false }) => {
  const starSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const starClass = starSizes[size] || starSizes.sm;

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-amber-500">
        {[...Array(maxStars)].map((_, i) => (
          <Star
            key={i}
            className={`${starClass} ${
              i < Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-stone-300'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs font-bold text-stone-700 ml-1">{Number(rating).toFixed(1)}</span>
      )}
    </div>
  );
};

export default RatingStars;
