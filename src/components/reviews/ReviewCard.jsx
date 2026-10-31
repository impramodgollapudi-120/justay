import React from 'react';
import RatingStars from './RatingStars';
import { BadgeCheck } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  return (
    <div className="bg-red-50/30 rounded-2xl border border-red-900/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt={review.author}
            className="w-9 h-9 rounded-full object-cover border border-red-200"
          />
          <div>
            <h5 className="text-xs font-bold text-red-950 flex items-center gap-1 font-brand">
              {review.author}
              {review.verifiedStay && (
                <span className="text-red-700 inline-flex items-center gap-0.5 text-[10px] font-bold">
                  <BadgeCheck className="w-3 h-3 text-red-600" /> Verified Stay
                </span>
              )}
            </h5>
            <span className="text-[10px] text-red-900/60 font-medium">{review.date}</span>
          </div>
        </div>
        <RatingStars rating={review.rating} size="xs" />
      </div>
      <p className="text-xs text-red-900/80 leading-relaxed font-medium">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
