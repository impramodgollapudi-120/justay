import React from 'react';
import { PackageImage } from './PackageImage';
import { PackagePrice } from './PackagePrice';
import { PackageHighlights } from './PackageHighlights';
import { MapPin, Star, Clock, ArrowRight, Heart } from 'lucide-react';

export const PackageCard = ({
  pkg,
  onSelect,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const primaryImage =
    pkg.images && pkg.images.length > 0
      ? pkg.images[0]
      : 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      onClick={() => onSelect && onSelect(pkg)}
      className="bg-white rounded-3xl border border-red-900/10 hover:border-red-600/40 p-4 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col justify-between group relative ring-1 ring-red-950/5"
    >
      <div>
        <div className="relative">
          <PackageImage image={primaryImage} title={pkg.title} badge={pkg.badge} />
          {onToggleWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(pkg.id);
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-red-950 hover:text-red-600 transition shadow-sm cursor-pointer"
              aria-label="Toggle Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-red-600 text-red-600' : 'text-red-950'
                }`}
              />
            </button>
          )}
        </div>

        <div className="mt-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-red-900/70 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span className="line-clamp-1 font-semibold">{pkg.destination}</span>
            </div>
            <div className="flex items-center gap-1 bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{pkg.rating}</span>
              <span className="text-red-900/40 font-normal">({pkg.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-base font-black text-red-950 group-hover:text-red-600 transition-colors line-clamp-1 font-brand">
            {pkg.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-red-900/70 pb-1">
            <span className="inline-flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-md text-red-950 font-bold border border-red-200/50">
              <Clock className="w-3 h-3 text-red-600" /> {pkg.duration}
            </span>
            <span className="text-[11px] text-red-700 font-semibold">
              ✓ All Meals & Cab Included
            </span>
          </div>

          {pkg.highlights && pkg.highlights.length > 0 && (
            <div className="pt-2 border-t border-red-900/10">
              <PackageHighlights highlights={pkg.highlights} max={2} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-red-900/10 flex items-center justify-between gap-2">
        <PackagePrice price={pkg.price} originalPrice={pkg.originalPrice} duration={pkg.duration} />
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-2xl transition-all shadow-xs shrink-0 cursor-pointer"
        >
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
