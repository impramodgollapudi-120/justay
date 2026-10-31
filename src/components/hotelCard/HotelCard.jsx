import React from 'react';
import HotelGallery from './HotelGallery';
import HotelAmenities from './HotelAmenities';
import HotelInfo from './HotelInfo';
import { ArrowRight } from 'lucide-react';

export const HotelCard = ({ hotel, onSelect }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(hotel)}
      className="bg-white rounded-3xl border border-red-900/10 hover:border-red-600/40 p-4 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col justify-between ring-1 ring-red-950/5"
    >
      <div>
        <HotelGallery images={hotel.images} name={hotel.name} />
        <div className="mt-4">
          <HotelInfo hotel={hotel} />
        </div>
        <div className="mt-3">
          <HotelAmenities amenities={hotel.amenities} max={3} />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-red-900/10 flex items-center justify-between">
        <span className="text-xs text-red-950 font-semibold">Free Cancellation • Instant Booking</span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 px-3.5 py-2 rounded-2xl transition cursor-pointer shadow-xs"
        >
          View Rooms <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
