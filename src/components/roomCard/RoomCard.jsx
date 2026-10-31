import React from 'react';
import RoomGallery from './RoomGallery';
import RoomFacilities from './RoomFacilities';
import RoomPrice from './RoomPrice';
import { Users, BedDouble, Maximize2 } from 'lucide-react';

export const RoomCard = ({ room, isSelected, onSelect }) => {
  return (
    <div
      className={`bg-white rounded-3xl border transition-all duration-300 p-5 ring-1 ring-red-950/5 ${
        isSelected ? 'border-red-600 ring-2 ring-red-600/30 shadow-md' : 'border-red-900/10 hover:border-red-900/20'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-4">
          <RoomGallery images={room.images} name={room.name} />
        </div>

        <div className="md:col-span-5 space-y-3">
          <h4 className="text-base font-black text-red-950 font-brand">{room.name}</h4>
          <p className="text-xs text-red-900/70 leading-relaxed font-medium">{room.description}</p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-red-950 font-bold">
            <span className="inline-flex items-center gap-1.5 bg-red-50/50 border border-red-900/10 px-2.5 py-1 rounded-xl">
              <Users className="w-3.5 h-3.5 text-red-600" /> Max {room.maxOccupancy} Guests
            </span>
            <span className="inline-flex items-center gap-1.5 bg-red-50/50 border border-red-900/10 px-2.5 py-1 rounded-xl">
              <BedDouble className="w-3.5 h-3.5 text-red-600" /> {room.bedType}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-red-50/50 border border-red-900/10 px-2.5 py-1 rounded-xl">
              <Maximize2 className="w-3.5 h-3.5 text-red-600" /> {room.size}
            </span>
          </div>

          <div className="pt-2">
            <RoomFacilities facilities={room.facilities} />
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col items-end justify-between h-full border-t md:border-t-0 md:border-l border-red-900/10 pt-4 md:pt-0 md:pl-5 space-y-4">
          <RoomPrice pricePerNight={room.pricePerNight} originalPrice={room.originalPrice} />
          <button
            onClick={() => onSelect && onSelect(room)}
            className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              isSelected
                ? 'bg-red-700 text-white shadow-xs hover:bg-red-800'
                : 'bg-red-600 text-white hover:bg-red-700 shadow-xs'
            }`}
          >
            {isSelected ? '✓ Room Selected' : 'Select This Room'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
