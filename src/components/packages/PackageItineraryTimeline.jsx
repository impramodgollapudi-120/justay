import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Coffee, Utensils, Car, Sparkles, Bed } from 'lucide-react';

export const PackageItineraryTimeline = ({ itinerary = [] }) => {
  const [expandedDay, setExpandedDay] = useState(1);

  const toggleDay = (dayNum) => {
    setExpandedDay((prev) => (prev === dayNum ? null : dayNum));
  };

  return (
    <div className="space-y-3">
      {itinerary.map((dayItem) => {
        const isExpanded = expandedDay === dayItem.day;

        return (
          <div
            key={dayItem.day}
            className={`border rounded-3xl transition-all duration-200 overflow-hidden bg-white ring-1 ring-red-950/5 ${
              isExpanded
                ? 'border-red-600/40 shadow-xs'
                : 'border-red-900/10 hover:border-red-900/20'
            }`}
          >
            {/* Header / Day Accordion Toggle */}
            <button
              type="button"
              onClick={() => toggleDay(dayItem.day)}
              className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-red-50 text-red-700 font-black text-xs flex items-center justify-center border border-red-200 shrink-0 font-brand">
                  D{dayItem.day}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                    Day {dayItem.day}
                  </span>
                  <h4 className="text-sm font-black text-red-950 line-clamp-1 font-brand">{dayItem.title}</h4>
                </div>
              </div>
              <div className="text-red-900/40 p-1">
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-red-600" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </button>

            {/* Body */}
            {isExpanded && (
              <div className="px-5 pb-5 pt-1 space-y-3.5 border-t border-red-900/10 text-xs">
                <p className="text-red-900/80 leading-relaxed font-medium">{dayItem.description}</p>

                {/* Places visited chips */}
                {dayItem.places && dayItem.places.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="font-bold text-red-950 block text-[11px]">
                      Key Highlights & Sightseeing:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dayItem.places.map((place, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50/60 text-red-900 border border-red-900/10 rounded-xl text-[11px] font-semibold"
                        >
                          <MapPin className="w-3 h-3 text-red-600" />
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Day logistics strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-red-900/10 text-[11px] text-red-900/70">
                  {dayItem.stay && (
                    <div className="flex items-center gap-1.5 bg-red-50/30 border border-red-900/10 p-2 rounded-xl">
                      <Bed className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="line-clamp-1">
                        <strong className="text-red-950 font-bold">Stay:</strong> {dayItem.stay}
                      </span>
                    </div>
                  )}

                  {dayItem.meals && (
                    <div className="flex items-center gap-1.5 bg-red-50/30 border border-red-900/10 p-2 rounded-xl">
                      <Utensils className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="line-clamp-1">
                        <strong className="text-red-950 font-bold">Meals:</strong> {dayItem.meals}
                      </span>
                    </div>
                  )}

                  {dayItem.transport && (
                    <div className="flex items-center gap-1.5 bg-red-50/30 border border-red-900/10 p-2 rounded-xl">
                      <Car className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="line-clamp-1">
                        <strong className="text-red-950 font-bold">Transfer:</strong> {dayItem.transport}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PackageItineraryTimeline;
