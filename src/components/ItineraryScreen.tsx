import React, { useState } from 'react';
import {
  ArrowLeft,
  Plane,
  Utensils,
  SunMedium,
  ShoppingBag,
  Wine,
  Bed,
  Compass,
  Waves,
  Sparkles
} from 'lucide-react';
import { TravelPackage } from '../types';

interface ItineraryScreenProps {
  packageData: TravelPackage;
  onBack: () => void;
  onProceedToBook: (pkg: TravelPackage) => void;
}

export const ItineraryScreen: React.FC<ItineraryScreenProps> = ({
  packageData,
  onBack,
  onProceedToBook,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const currentDay = packageData.itinerary[selectedDayIndex] || packageData.itinerary[0];

  const getActivityIcon = (iconType: string) => {
    switch (iconType) {
      case 'flight':
        return Plane;
      case 'food':
        return Utensils;
      case 'beach':
        return SunMedium;
      case 'shopping':
        return ShoppingBag;
      case 'dining':
        return Wine;
      case 'hotel':
        return Bed;
      case 'activity':
        return Waves;
      case 'sightseeing':
      default:
        return Compass;
    }
  };

  const getHighlightIcon = (icon: string) => {
    switch (icon) {
      case 'umbrella':
        return SunMedium;
      case 'water':
        return Waves;
      case 'food':
        return Utensils;
      case 'cocktail':
        return Wine;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="pb-28 bg-[#FFF5F5] min-h-screen animate-fadeIn text-[#450A0A]">
      {/* Header Bar */}
      <div className="sticky top-0 backdrop-blur-2xl bg-white/90 sm:bg-[#FFF5F5]/90 z-20 px-4 sm:px-8 py-3.5 border-b border-red-900/10 flex items-center justify-between shadow-xs ring-1 ring-red-950/5">
        <button
          id="btn-itinerary-back"
          onClick={onBack}
          className="p-2 -ml-1 text-red-950 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h1 className="text-base sm:text-lg font-black text-red-950 tracking-tight font-brand">
          Tour Itinerary
        </h1>

        <div className="w-8" />
      </div>

      <div className="px-4 pt-4 max-w-4xl mx-auto space-y-4">
        {/* Day Selector Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {packageData.itinerary.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                id={`btn-day-tab-${day.dayNumber}`}
                onClick={() => setSelectedDayIndex(idx)}
                className={`flex-1 min-w-[90px] py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer font-brand ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-red-950 border border-red-900/10 hover:bg-red-50'
                }`}
              >
                Day {day.dayNumber}
              </button>
            );
          })}
        </div>

        {/* Day Subtitle */}
        <div className="mt-4 mb-2 flex items-center justify-between">
          <h2 className="text-xs font-black text-red-900/70 uppercase tracking-wider font-brand">
            Day {currentDay.dayNumber}: {currentDay.dayTitle}
          </h2>
          <span className="text-[11px] text-red-700 font-bold bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
            {currentDay.activities.length} planned activities
          </span>
        </div>

        {/* Timeline Component */}
        <div className="relative pl-6 mt-3 space-y-5 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-red-900/20">
          {currentDay.activities.map((activity, idx) => {
            const Icon = getActivityIcon(activity.iconType);
            return (
              <div
                key={idx}
                className="relative flex items-start gap-3.5 group"
              >
                {/* Timeline Node Icon */}
                <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-red-50 border-2 border-red-600 text-red-600 flex items-center justify-center shadow-2xs z-10">
                  <Icon className="w-3 h-3 stroke-[2.2]" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white p-4 rounded-3xl border border-red-900/10 shadow-xs group-hover:border-red-600/30 transition-all ring-1 ring-red-950/5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-700 block font-brand">
                    {activity.time}
                  </span>
                  <h3 className="text-sm font-black text-red-950 mt-0.5 leading-snug font-brand">
                    {activity.title}
                  </h3>
                  {activity.description && (
                    <p className="text-xs text-red-900/80 mt-1 leading-relaxed font-medium">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Package Highlights Card */}
        <div className="mt-8 bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
          <h3 className="text-sm font-black text-red-950 tracking-tight mb-3 font-brand">
            Package Highlights
          </h3>

          <div className="grid grid-cols-4 gap-2">
            {packageData.highlights.map((highlight, idx) => {
              const HighlightIcon = getHighlightIcon(highlight.icon);
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mb-1.5 shadow-2xs">
                    <HighlightIcon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold text-red-950 leading-tight">
                    {highlight.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/90 border-t border-red-900/10 p-3.5 z-40 shadow-[0_-8px_32px_rgba(69,10,10,0.06)] ring-1 ring-red-950/5">
        <div className="max-w-4xl mx-auto">
          <button
            id="btn-itinerary-book"
            onClick={() => onProceedToBook(packageData)}
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black py-3.5 px-4 rounded-2xl text-center text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 font-brand"
          >
            <span>Book This Package</span>
            <span className="text-xs font-normal opacity-90">
              • ₹{packageData.price.toLocaleString()} /person
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
