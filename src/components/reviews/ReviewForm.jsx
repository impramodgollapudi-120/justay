import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

export const ReviewForm = ({ targetId, targetType = 'hotel', onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (onSubmit) {
      onSubmit({
        targetId,
        targetType,
        author: author.trim() || 'Verified Guest',
        rating,
        comment,
      });
    }
    setSubmitted(true);
    setComment('');
  };

  if (submitted) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
        <p className="text-xs font-semibold text-red-800">
          Thank you for sharing your experience! Your verified review has been published.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-4 shadow-xs ring-1 ring-red-950/5">
      <h5 className="text-sm font-bold text-red-950">Write a Review</h5>

      <div className="flex items-center gap-2">
        <span className="text-xs text-red-900/70">Your Rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className="p-0.5 focus:outline-none cursor-pointer"
            >
              <Star
                className={`w-5 h-5 ${
                  star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your Name (Optional)"
          className="w-full px-3 py-2.5 text-xs rounded-2xl border border-red-900/15 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-red-950 placeholder:text-red-900/40"
        />
      </div>

      <div>
        <textarea
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about the resort hospitality, food, amenities..."
          required
          className="w-full px-3 py-2.5 text-xs rounded-2xl border border-red-900/15 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-red-950 placeholder:text-red-900/40"
        ></textarea>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-2xl transition-all shadow-xs cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" /> Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
