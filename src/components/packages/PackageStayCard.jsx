import React from 'react';
import { Star, MapPin, Bed, Check } from 'lucide-react';

export const PackageStayCard = ({ stay }) => {
  if (!stay) return null;

  return (
    <div className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-3 shadow-xs ring-1 ring-red-950/5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
          Handpicked Accommodation
        </span>
        {stay.starRating && (
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="text-red-950 font-bold">{stay.starRating}-Star Luxury</span>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {stay.image && (
          <img
            src={stay.image}
            alt={stay.hotelName}
            className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-red-900/10"
          />
        )}
        <div className="space-y-1">
          <h4 className="text-sm font-black text-red-950 line-clamp-1 font-brand">{stay.hotelName}</h4>
          <p className="text-xs text-red-900/70 flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-red-600" /> {stay.location}
          </p>
          <div className="flex items-center gap-1 text-xs text-red-950 font-bold pt-1">
            <Bed className="w-3.5 h-3.5 text-red-600" />
            <span>{stay.roomType}</span>
          </div>
        </div>
      </div>

      {stay.amenities && stay.amenities.length > 0 && (
        <div className="pt-2 border-t border-red-900/10 flex flex-wrap gap-2">
          {stay.amenities.map((amenity, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-900/80 bg-red-50/50 border border-red-900/10 px-2.5 py-0.5 rounded-lg"
            >
              <Check className="w-3 h-3 text-red-600" /> {amenity}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageStayCard;
