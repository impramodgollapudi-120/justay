import React from 'react';
import { MapPin, Sun, Calendar, ArrowUpRight } from 'lucide-react';

export const PackageDestinationCard = ({ destination, onSelect }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(destination)}
      className="relative overflow-hidden rounded-3xl aspect-[4/5] group cursor-pointer border border-red-900/10 hover:border-red-600/40 hover:shadow-lg transition-all duration-300 ring-1 ring-red-950/5"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-black/30 to-transparent" />

      {destination.weather && (
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-white/10">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>{destination.weather}</span>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <span className="text-[11px] text-red-200 font-bold tracking-wide uppercase font-brand">
          {destination.tagline}
        </span>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <h4 className="text-lg font-black tracking-tight font-brand">{destination.name}</h4>
          <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-red-600 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {destination.bestTimeToVisit && (
          <p className="text-[11px] text-white/80 flex items-center gap-1 mt-1.5 font-medium">
            <Calendar className="w-3 h-3 text-red-300" /> Best Time: {destination.bestTimeToVisit}
          </p>
        )}
      </div>
    </div>
  );
};

export default PackageDestinationCard;
