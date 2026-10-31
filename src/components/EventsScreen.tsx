import React, { useState } from 'react';
import {
  PartyPopper,
  Calendar,
  Clock,
  UtensilsCrossed,
  Users,
  MapPin,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Search,
  Filter,
  Flame,
  Wine,
  Building,
  Music,
  Heart,
  ChevronRight
} from 'lucide-react';
import { EventResort, EventType } from '../types';

interface EventsScreenProps {
  events: EventResort[];
  onSelectEvent: (resort: EventResort) => void;
  onBookNow: (resort: EventResort) => void;
  savedIds?: string[];
  onToggleWishlist?: (id: string) => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({
  events,
  onSelectEvent,
  onBookNow,
  savedIds = [],
  onToggleWishlist,
}) => {
  const [selectedEventType, setSelectedEventType] = useState<string>('All');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [guestCountFilter, setGuestCountFilter] = useState<number>(50);

  const eventTypes = [
    'All',
    'Birthday Party',
    'Pool Party & DJ Night',
    'Wedding & Reception',
    'Corporate Retreat',
    'Cocktail & Dinner',
  ];

  const filteredEvents = events.filter((resort) => {
    const matchesType =
      selectedEventType === 'All' ||
      resort.eventTypeSupported.includes(selectedEventType as EventType);
    const matchesLoc =
      !searchLocation ||
      resort.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      resort.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
      resort.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesCapacity = resort.capacityMax >= guestCountFilter;
    return matchesType && matchesLoc && matchesCapacity;
  });

  return (
    <div className="pb-28 md:pb-16 animate-fadeIn space-y-6 max-w-[1440px] mx-auto px-2 sm:px-4 text-[#450A0A]">
      {/* Hero Banner for Events */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-red-900/10 bg-gradient-to-br from-[#450A0A] via-red-950 to-[#2A0505] text-white p-6 sm:p-10 lg:p-14 ring-1 ring-red-950/5">
        <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/30 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-wider">
            <PartyPopper className="w-4 h-4 text-red-400" />
            <span>Private Resort Events & Celebrations</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-brand leading-tight">
            Book Entire Resorts for Parties, Weddings & Special Events
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-red-100/80 font-normal leading-relaxed">
            Reserve luxurious villas and resort venues with customized booking time slots and delicious chef-curated food catering options for your guests.
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <Clock className="w-5 h-5 text-red-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Specific Time Slots</div>
                <div className="text-red-200/80 text-[11px]">Morning, Evening & Full-Day</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <UtensilsCrossed className="w-5 h-5 text-red-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Food & Catering Choice</div>
                <div className="text-red-200/80 text-[11px]">Snacks, Buffets or Venue-Only</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <ShieldCheck className="w-5 h-5 text-red-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">100% Verified Venues</div>
                <div className="text-red-200/80 text-[11px]">Dedicated On-Site Manager</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Category Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-red-900/10 space-y-4 ring-1 ring-red-950/5">
        {/* Event Occasion Pills */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-red-900/70 mb-2.5 block font-brand">
            Select Your Celebration / Event Type:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedEventType(type)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedEventType === type
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-red-50/40 text-red-950 hover:bg-red-50 border border-red-900/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Search by location & guest slider */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 border-t border-red-900/10 items-center">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-red-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination or resort venue (e.g. Goa, Udaipur, Manali)..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-red-50/30 border border-red-900/20 text-xs sm:text-sm font-semibold text-red-950 focus:bg-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="md:col-span-6 flex items-center gap-4 bg-red-50/30 p-2.5 rounded-2xl border border-red-900/20">
            <Users className="w-4 h-4 text-red-600 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-xs font-bold text-red-950">
                <span>Expected Guests</span>
                <span className="text-red-700 font-black">{guestCountFilter}+ Guests</span>
              </div>
              <input
                type="range"
                min="20"
                max="400"
                step="10"
                value={guestCountFilter}
                onChange={(e) => setGuestCountFilter(Number(e.target.value))}
                className="w-full accent-red-600 h-1.5 bg-red-200 rounded-lg cursor-pointer mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resorts List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-red-950 font-brand">
            Available Resort Venues ({filteredEvents.length})
          </h2>
          <span className="text-xs font-semibold text-red-900/60">
            Instant event booking with custom timings & food
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-red-900/10 space-y-3 ring-1 ring-red-950/5">
            <PartyPopper className="w-12 h-12 text-red-300 mx-auto" />
            <div className="text-lg font-black text-red-950 font-brand">No event resorts matching criteria</div>
            <p className="text-xs sm:text-sm text-red-900/70 max-w-md mx-auto">
              Try adjusting your guest capacity slider or clearing the location search to see all verified celebration resorts.
            </p>
            <button
              onClick={() => {
                setSelectedEventType('All');
                setSearchLocation('');
                setGuestCountFilter(50);
              }}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold px-5 py-2.5 rounded-2xl transition-all cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((resort) => {
              const isSaved = savedIds.includes(resort.id);

              return (
                <div
                  key={resort.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-lg border border-red-900/10 hover:border-red-600/30 transition-all group flex flex-col justify-between ring-1 ring-red-950/5"
                >
                  <div>
                    {/* Top Image & Badges */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                      <img
                        src={resort.imageUrl}
                        alt={resort.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Top Action Tags */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div className="bg-red-950/80 backdrop-blur-md text-red-200 border border-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                          <PartyPopper className="w-3.5 h-3.5 text-red-400" />
                          <span>Event Ready Resort</span>
                        </div>

                        {onToggleWishlist && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(resort.id);
                            }}
                            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-red-950 flex items-center justify-center transition-all shadow-md cursor-pointer"
                            aria-label="Save to wishlist"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isSaved ? 'fill-red-600 text-red-600' : 'text-red-950'
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Bottom Info on Image */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-red-200 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-red-400" />
                          <span>{resort.location}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black font-brand drop-shadow-sm line-clamp-1">
                          {resort.name}
                        </h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Rating & Capacity Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-red-900/10">
                        <div className="flex items-center gap-2">
                          <div className="bg-red-50 text-red-800 px-2.5 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 border border-red-200">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{resort.rating}</span>
                          </div>
                          <span className="text-xs text-red-900/60 font-semibold">
                            ({resort.reviewsCount} host reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-red-950 bg-red-50/50 px-3 py-1 rounded-full border border-red-900/10">
                          <Users className="w-3.5 h-3.5 text-red-600" />
                          <span>Capacity: {resort.capacityMin} – {resort.capacityMax} Guests</span>
                        </div>
                      </div>

                      {/* Event Types Supported */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-red-900/70 uppercase tracking-wider block">
                          Supported Celebrations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {resort.eventTypeSupported.map((evt) => (
                            <span
                              key={evt}
                              className="text-[11px] font-semibold bg-red-50/40 text-red-900 border border-red-900/10 px-2.5 py-0.5 rounded-lg"
                            >
                              {evt}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlights / Specs */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-red-900/80 pt-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Custom Booking Timings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UtensilsCrossed className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Food from ₹{resort.foodStartingPricePerGuest}/guest</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action & Pricing Footer */}
                  <div className="p-5 sm:p-6 pt-0 bg-white">
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-red-900/10">
                      <div>
                        <div className="text-[11px] text-red-900/60 font-semibold">Resort Venue Rental</div>
                        <div className="text-xl font-black text-red-950 font-brand">
                          ₹{resort.venuePrice.toLocaleString()}
                          <span className="text-xs font-medium text-red-900/60"> / event</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectEvent(resort)}
                          className="px-4 py-2.5 rounded-2xl border border-red-900/20 text-xs font-bold text-red-950 hover:bg-red-50 transition-all cursor-pointer"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => onBookNow(resort)}
                          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Book Event</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
