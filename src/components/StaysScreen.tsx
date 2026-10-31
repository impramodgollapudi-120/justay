import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  SlidersHorizontal,
  ArrowUpDown,
  Map as MapIcon,
  Star,
  Heart,
  Utensils,
  ZoomIn,
  MapPin,
  Search,
  X,
  Sparkles,
  Building2,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { StayProperty, FilterState, SearchParams } from '../types';
import { FiltersModal } from './FiltersModal';

interface StaysScreenProps {
  stays: StayProperty[];
  onBack: () => void;
  onSelectStay: (stay: StayProperty) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  searchParams: SearchParams;
  onUpdateSearchParams?: (params: Partial<SearchParams>) => void;
}

const PROPERTY_TYPES = ['All', 'Resort', 'Hotel', 'Villa', 'Homestay'];

export const StaysScreen: React.FC<StaysScreenProps> = ({
  stays,
  onBack,
  onSelectStay,
  wishlistIds,
  onToggleWishlist,
  searchParams,
  onUpdateSearchParams,
}) => {
  const cityNames: string[] = Array.from(new Set<string>(stays.map((stay) => String(stay.city || '')).filter((city) => city.length > 0)));
  const DESTINATION_TABS: Array<{ id: string; label: string; short: string }> = [{ id: 'All', label: 'All destinations', short: 'All Stays' }, ...cityNames.map((city) => ({ id: city, label: city, short: city }))];
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating'>('recommended');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract initial destination or default to All
  const initialDestination = useMemo(() => {
    if (!searchParams.destination || searchParams.destination === 'All Destinations' || searchParams.destination === 'All') {
      return 'All';
    }
    const match = DESTINATION_TABS.find(
      (t) => t.id !== 'All' && searchParams.destination.toLowerCase().includes(t.id.toLowerCase())
    );
    return match ? match.id : 'All';
  }, [searchParams.destination]);

  const [selectedDestination, setSelectedDestination] = useState<string>(initialDestination);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('All');

  const [filters, setFilters] = useState<FilterState>({
    priceMin: 500,
    priceMax: 15000,
    propertyType: 'All',
    starRating: 'All',
    amenities: ['Free Wi-Fi', 'Swimming Pool', 'AC', 'Room Service'],
    meals: 'All',
    sortBy: 'recommended',
  });

  const handleSelectCity = (cityId: string) => {
    setSelectedDestination(cityId);
    if (onUpdateSearchParams) {
      onUpdateSearchParams({
        destination: cityId === 'All' ? 'All Destinations' : `${cityId}, India`,
      });
    }
  };

  // Filtered & Sorted Stays calculation
  const filteredStays = useMemo(() => {
    let result = [...stays];

    // 1. Destination filter
    if (selectedDestination !== 'All') {
      result = result.filter((s) => {
        const stayCity = (s.city || '').toLowerCase();
        const stayLocation = (s.location || '').toLowerCase();
        const target = selectedDestination.toLowerCase();
        return stayCity.includes(target) || stayLocation.includes(target);
      });
    }

    // 2. Quick property type filter
    if (selectedPropertyType !== 'All') {
      result = result.filter(
        (s) => String(s.propertyType || '').toLowerCase() === selectedPropertyType.toLowerCase()
      );
    }

    // 3. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          String(s.name || '').toLowerCase().includes(q) ||
          String(s.location || '').toLowerCase().includes(q) ||
          String(s.city || '').toLowerCase().includes(q) ||
          (Array.isArray(s.amenities) && s.amenities.some((a) => String(a || '').toLowerCase().includes(q)))
      );
    }

    // 4. Modal price range filter
    result = result.filter(
      (s) => Number(s.pricePerNight || 0) >= filters.priceMin && Number(s.pricePerNight || 0) <= filters.priceMax
    );

    // 5. Star rating filter
    if (filters.starRating !== 'All') {
      const minStars = parseInt(filters.starRating, 10);
      if (!isNaN(minStars)) {
        result = result.filter((s) => Number(s.starRating || 0) >= minStars);
      }
    }

    // 6. Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter((s) =>
        filters.amenities.every((reqAmenity) =>
          (Array.isArray(s.amenities) && s.amenities.some((a) => String(a || '').toLowerCase().includes(reqAmenity.toLowerCase())))
        )
      );
    }

    // 7. Sort
    if (sortBy === 'price_low') {
      result.sort((a, b) => Number(a.pricePerNight || 0) - Number(b.pricePerNight || 0));
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => Number(b.pricePerNight || 0) - Number(a.pricePerNight || 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else {
      result.sort((a, b) => Number(b.reviewsCount || 0) - Number(a.reviewsCount || 0));
    }

    return result;
  }, [stays, selectedDestination, selectedPropertyType, searchQuery, filters, sortBy]);

  // Counts by destination
  const destinationCounts = useMemo(() => {
    const counts: Record<string, number> = { All: stays.length };
    DESTINATION_TABS.forEach((tab) => {
      if (tab.id !== 'All') {
        counts[tab.id] = stays.filter((s) => {
          const stayCity = (s.city || '').toLowerCase();
          const stayLocation = (s.location || '').toLowerCase();
          const target = tab.id.toLowerCase();
          return stayCity.includes(target) || stayLocation.includes(target);
        }).length;
      }
    });
    return counts;
  }, [stays, DESTINATION_TABS]);

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Top Banner with Destination Picker and Filters */}
      <div className="px-1 sm:px-2 mb-6">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-sm border border-red-900/10 ring-1 ring-red-950/5 space-y-4">
          {/* Header Row: Back button, Title, Result counts */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                id="btn-stays-back"
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-950 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black text-red-950 tracking-tight leading-tight">
                    {selectedDestination === 'All'
                      ? 'All Resorts & Stays'
                      : `Resorts & Stays in ${selectedDestination}`}
                  </h1>
                  <span className="text-xs font-extrabold text-red-950 bg-red-600/15 px-2.5 py-0.5 rounded-full border border-red-700/20">
                    {filteredStays.length} {filteredStays.length === 1 ? 'Stay' : 'Stays'}
                  </span>
                  {selectedDestination !== 'All' && (
                    <button
                      onClick={() => handleSelectCity('All')}
                      className="text-[11px] font-bold text-red-600 hover:text-red-700 underline cursor-pointer ml-1"
                    >
                      Show All Destinations
                    </button>
                  )}
                </div>
                <p className="text-xs text-red-900/70 font-medium mt-0.5">
                  {selectedDestination === 'All'
                    ? 'Explore verified luxury resorts, heritage villas, palace stays & hill cottages across India'
                    : `Handpicked luxury properties, scenic stays & pool villas in ${selectedDestination}`}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons: Sort, Filters, Map */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-red-900/10">
              {/* Filters Button */}
              <button
                id="btn-open-filters"
                onClick={() => setIsFilterModalOpen(true)}
                className="flex-1 sm:flex-initial py-2 px-3.5 bg-white hover:bg-red-50 border border-red-900/20 rounded-2xl text-xs font-bold text-red-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
                <span>Filters</span>
              </button>

              {/* Sort Menu */}
              <div className="flex-1 sm:flex-initial relative">
                <button
                  id="btn-toggle-sort"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="w-full py-2 px-3.5 bg-white hover:bg-red-50 border border-red-900/20 rounded-2xl text-xs font-bold text-red-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-red-600" />
                  <span>
                    {sortBy === 'price_low'
                      ? 'Price: Low'
                      : sortBy === 'price_high'
                      ? 'Price: High'
                      : sortBy === 'rating'
                      ? 'Top Rated'
                      : 'Sort'}
                  </span>
                </button>

                {showSortMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-red-900/15 py-1.5 z-30 animate-fadeIn">
                    <button
                      onClick={() => {
                        setSortBy('recommended');
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${
                        sortBy === 'recommended'
                          ? 'text-red-950 font-bold bg-red-50'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Recommended Stays
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('price_low');
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${
                        sortBy === 'price_low'
                          ? 'text-red-950 font-bold bg-red-50'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('price_high');
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${
                        sortBy === 'price_high'
                          ? 'text-red-950 font-bold bg-red-50'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('rating');
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold ${
                        sortBy === 'rating'
                          ? 'text-red-950 font-bold bg-red-50'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      Highest Guest Rating
                    </button>
                  </div>
                )}
              </div>

              {/* Map Toggle */}
              <button
                id="btn-toggle-map"
                onClick={() => setIsMapActive(!isMapActive)}
                className={`flex-1 sm:flex-initial py-2 px-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                  isMapActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/20'
                    : 'bg-white border border-red-900/20 text-red-950 hover:bg-red-50'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
            </div>
          </div>

          {/* Search Bar Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-red-900/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by resort name, city (Goa, Manali, Kerala...), amenities or location..."
              className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-red-900/15 rounded-2xl text-xs sm:text-sm font-medium text-red-950 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Destination Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-900/70">
                Filter by Destination
              </span>
              <span className="text-[11px] font-bold text-red-900/60">
                {selectedDestination === 'All' ? 'Showing All India' : `Selected: ${selectedDestination}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
              {DESTINATION_TABS.map((tab) => {
                const isSelected = selectedDestination === tab.id;
                const count = destinationCounts[tab.id] || 0;
                return (
                  <button
                    key={tab.id}
                    id={`dest-tab-${tab.id.toLowerCase()}`}
                    onClick={() => handleSelectCity(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-600/20'
                        : 'bg-stone-100 hover:bg-red-50 text-red-950 border border-red-900/10'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {count > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-red-600/10 text-red-700'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Property Type Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-red-900/10 no-scrollbar">
            <span className="text-[11px] font-bold text-red-900/60 shrink-0">Type:</span>
            {PROPERTY_TYPES.map((type) => {
              const isActive = selectedPropertyType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedPropertyType(type)}
                  className={`text-xs px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'bg-white text-stone-600 hover:text-red-950 border border-stone-200'
                  }`}
                >
                  {type === 'All' ? 'All Types' : type}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map View Interactive Banner */}
      {isMapActive && (
        <div className="p-4 bg-red-900/10 rounded-3xl border border-red-900/20 mb-6 animate-fadeIn">
          <div className="relative h-56 rounded-2xl overflow-hidden shadow-inner bg-stone-200 border border-red-900/20 flex flex-col items-center justify-center p-4">
            <div className="absolute inset-0 bg-radial from-red-500/20 via-red-100/50 to-stone-100 opacity-90" />
            <div className="relative z-10 text-center max-w-md">
              <MapPin className="w-8 h-8 text-red-600 mx-auto animate-bounce" />
              <p className="text-sm font-extrabold text-red-950 mt-2">
                Showing {filteredStays.length} Verified Properties{' '}
                {selectedDestination === 'All' ? 'across India' : `in ${selectedDestination}`}
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                {selectedDestination === 'All' ? (
                  <>
                    <span className="bg-white/95 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs text-red-950 border border-red-900/10">
                      Goa (6 stays)
                    </span>
                    <span className="bg-white/95 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs text-red-950 border border-red-900/10">
                      Kerala (2 stays)
                    </span>
                    <span className="bg-white/95 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs text-red-950 border border-red-900/10">
                      Udaipur (2 stays)
                    </span>
                    <span className="bg-white/95 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs text-red-950 border border-red-900/10">
                      Manali (2 stays)
                    </span>
                    <span className="bg-white/95 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs text-red-950 border border-red-900/10">
                      Jaipur (1 stay)
                    </span>
                    <span className="bg-white/95 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs text-red-950 border border-red-900/10">
                      Coorg (1 stay)
                    </span>
                    <span className="bg-white/95 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs text-red-950 border border-red-900/10">
                      Rishikesh (1 stay)
                    </span>
                  </>
                ) : (
                  filteredStays.map((s) => (
                    <span
                      key={s.id}
                      className="bg-white/95 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs text-red-950 border border-red-900/10"
                    >
                      {String(s.location || s.city || 'India').split(',')[0]} (₹{Number(s.pricePerNight || 0).toLocaleString()})
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hotel / Stay Cards Grid */}
      <div className="px-1 sm:px-2">
        {filteredStays.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-red-900/15 my-4 max-w-lg mx-auto shadow-sm">
            <Building2 className="w-12 h-12 text-red-900/40 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-red-950">No Stays Found</h3>
            <p className="text-red-900/70 text-xs sm:text-sm font-medium mt-1">
              No stays matching "{searchQuery || selectedDestination}" with your current filters.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => {
                  setSelectedDestination('All');
                  setSelectedPropertyType('All');
                  setSearchQuery('');
                  setFilters({
                    priceMin: 500,
                    priceMax: 15000,
                    propertyType: 'All',
                    starRating: 'All',
                    amenities: [],
                    meals: 'All',
                  });
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Reset All Filters & Show All
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredStays.map((stay) => {
              const isSaved = wishlistIds.includes(stay.id);
              return (
                <div
                  key={stay.id}
                  id={`stay-card-${stay.id}`}
                  onClick={() => onSelectStay(stay)}
                  className="bg-white rounded-3xl overflow-hidden border border-red-900/10 shadow-xs hover:shadow-xl hover:border-red-600 transition-all flex flex-col group cursor-pointer ring-1 ring-red-950/5"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-52 sm:h-56 shrink-0 bg-stone-100 overflow-hidden">
                    <img
                      src={stay.imageUrl}
                      alt={stay.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* City Location Tag */}
                    <div className="absolute top-3 left-3 bg-red-950/90 backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{stay.city}</span>
                    </div>

                    {/* Bookmark Heart */}
                    <button
                      id={`btn-wishlist-${stay.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(stay.id);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 flex items-center justify-center hover:bg-white shadow-sm transition-all cursor-pointer hover:scale-110"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-red-600 text-red-600' : 'text-stone-700'
                        }`}
                      />
                    </button>

                    {/* Rating Badge on Image */}
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{stay.rating}</span>
                      <span className="text-stone-300 font-normal">
                        ({stay.reviewsCount})
                      </span>
                    </div>

                    {/* Zoom icon badge */}
                    <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600/10 text-red-700">
                          {stay.propertyType}
                        </span>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: stay.starRating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        {stay.city && (
                          <span className="text-[11px] font-bold text-red-900/60 ml-auto">
                            {stay.city}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-red-950 tracking-tight leading-snug group-hover:text-red-600 transition-colors">
                        {stay.name}
                      </h3>

                      <p className="text-xs text-red-900/70 font-medium mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="truncate">{stay.location}</span>
                      </p>

                      {stay.distanceToBeachOrCenter && (
                        <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                          📍 {stay.distanceToBeachOrCenter}
                        </p>
                      )}

                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {stay.description}
                      </p>
                    </div>

                    {/* Pricing & Action */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-end justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg sm:text-xl font-black text-red-950">
                            ₹{stay.pricePerNight.toLocaleString()}
                          </span>
                          {stay.originalPrice && (
                            <span className="text-xs text-stone-400 line-through">
                              ₹{stay.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-xs text-red-900/70 font-medium">
                            /night
                          </span>
                        </div>

                        {stay.breakfastIncluded && (
                          <div className="flex items-center gap-1 text-[11px] text-red-700 font-bold mt-0.5">
                            <Utensils className="w-3 h-3 text-red-600" />
                            <span>Complimentary Breakfast</span>
                          </div>
                        )}
                      </div>

                      <button className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-all shadow-2xs cursor-pointer">
                        View & Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => setFilters(newFilters)}
        totalResultsCount={filteredStays.length}
      />
    </div>
  );
};
