import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Briefcase,
  Tag,
  Luggage,
  MapPin,
  Crosshair,
  Calendar,
  Users,
  Search,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  MoveHorizontal,
  Sparkles,
  Layers,
  ArrowRight,
  Star,
  PartyPopper,
  Clock,
  UtensilsCrossed,
} from 'lucide-react';
import { Destination, SearchParams } from '../types';
import { WhyChooseUs } from './WhyChooseUs';
import { MovableSplashModal, SPLASH_SCENES, SplashScene } from './MovableSplashModal';

interface HomeScreenProps {
  destinations: Destination[];
  onNavigateToStays: (destination?: string) => void;
  onNavigateToPackages: (category?: string) => void;
  onNavigateToEvents?: () => void;
  onNavigateToOffers: () => void;
  onNavigateToBookings: () => void;
  onSelectDestination: (dest: Destination) => void;
  searchParams: SearchParams;
  onUpdateSearchParams: (params: Partial<SearchParams>) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  destinations,
  onNavigateToStays,
  onNavigateToPackages,
  onNavigateToEvents,
  onNavigateToOffers,
  onNavigateToBookings,
  onSelectDestination,
  searchParams,
  onUpdateSearchParams,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingDates, setIsEditingDates] = useState(false);
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const [isMovableModalOpen, setIsMovableModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = SPLASH_SCENES;

  // Auto-advance hero slides if not paused by hover or drag
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -40 || info.velocity.x < -200) {
      handleNextSlide();
    } else if (info.offset.x > 40 || info.velocity.x > 200) {
      handlePrevSlide();
    }
  };

  const popularLocations = destinations.map((dest) => `${dest.name}${dest.stateCountry ? `, ${dest.stateCountry}` : ''}`);

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="pb-24 md:pb-12 animate-fadeIn space-y-6 sm:space-y-8">
      {/* Movable Hero Splash Screen Banner */}
      <div className="px-1 sm:px-2">
        <div
          className="relative h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-white/40 group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative w-full h-full cursor-grab active:cursor-grabbing"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay for high readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white">
                {/* Top Badge & Movable Hint Controls */}
                <div className="flex items-center justify-between gap-3">
                  <div className="backdrop-blur-md bg-white/20 border border-white/30 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-4 h-4" />
                    <span>{currentSlide.vibe}</span>
                  </div>

                  {/* Movable Screen Trigger Button */}
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1.5 backdrop-blur-md bg-black/40 border border-white/20 px-3 py-1.5 rounded-full text-[11px] font-semibold text-stone-200">
                      <MoveHorizontal className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      <span>Drag / Swipe to change scenes</span>
                    </div>

                    <button
                      onClick={() => setIsMovableModalOpen(true)}
                      className="backdrop-blur-xl bg-white/25 hover:bg-white/40 border border-white/40 text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105"
                      title="Open full interactive 3D splash showcase"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>3D Splash Mode</span>
                    </button>
                  </div>
                </div>

                {/* Main Hero Content */}
                <div className="max-w-3xl space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-1.5 text-stone-300 text-xs sm:text-sm font-semibold">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>{currentSlide.location}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-md font-brand leading-tight">
                    {currentSlide.title}
                  </h2>

                  <p className="text-xs sm:text-base lg:text-lg text-stone-200 font-medium drop-shadow-sm line-clamp-2">
                    {currentSlide.subtitle}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onNavigateToStays(currentSlide.location.split(',')[0])}
                      className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-red-950/20 transition-all flex items-center gap-2 cursor-pointer group/cta"
                    >
                      <span>Explore Stays in {currentSlide.location.split(',')[0]}</span>
                      <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                    </button>

                    <div className="backdrop-blur-md bg-black/40 border border-white/20 px-3 py-2 rounded-xl text-xs font-semibold text-stone-200">
                      Starting ₹{currentSlide.priceStart.toLocaleString()} / night
                    </div>
                  </div>
                </div>

                {/* Bottom Pagination Dots & Slide Counter */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          activeSlide === idx
                            ? 'w-8 bg-red-500'
                            : 'w-2 bg-white/60 hover:bg-white'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-bold text-stone-300">
                    0{activeSlide + 1} / 0{heroSlides.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full backdrop-blur-xl bg-black/40 hover:bg-black/70 border border-white/30 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg hover:scale-105"
            aria-label="Previous splash screen"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full backdrop-blur-xl bg-black/40 hover:bg-black/70 border border-white/30 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg hover:scale-105"
            aria-label="Next splash screen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Search Card - Responsive Desktop Booking Bar */}
      <div className="px-1 sm:px-2">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-md border border-red-900/10 ring-1 ring-red-950/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
            {/* Destination Selector (md:col-span-4) */}
            <div className="md:col-span-4 relative pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-red-900/10 md:pr-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-red-900/70 block">
                    Where to?
                  </label>
                  {isEditingLocation ? (
                    <div className="mt-1">
                      <input
                        type="text"
                        value={searchParams.destination}
                        onChange={(e) => onUpdateSearchParams({ destination: e.target.value })}
                        placeholder="City, region, or resort"
                        className="w-full text-base font-bold text-red-950 outline-none border-b-2 border-red-600 py-0.5"
                        autoFocus
                        onBlur={() => setTimeout(() => setIsEditingLocation(false), 200)}
                      />
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {popularLocations.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => {
                              onUpdateSearchParams({ destination: loc });
                              setIsEditingLocation(false);
                            }}
                            className="text-[10px] bg-red-600/10 hover:bg-red-600/20 text-red-950 px-2 py-0.5 rounded-full cursor-pointer"
                          >
                            {loc.split(',')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingLocation(true)}
                      className="text-base font-extrabold text-red-950 hover:text-red-600 text-left w-full mt-0.5 flex items-center gap-1 cursor-pointer truncate"
                    >
                      {searchParams.destination}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => onUpdateSearchParams({ destination: 'All Destinations' })}
                  title="Search All Destinations"
                  className="p-1.5 text-red-900/50 hover:text-red-950 rounded-full hover:bg-red-600/10 transition-colors cursor-pointer"
                >
                  <Crosshair className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* Dates (md:col-span-3) */}
            <div className="md:col-span-3 relative pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-red-900/10 md:pr-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-red-900/70 block">
                    Check-in / Check-out
                  </label>
                  {isEditingDates ? (
                    <div className="flex flex-col gap-1 text-xs mt-1">
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={searchParams.checkIn}
                          onChange={(e) => onUpdateSearchParams({ checkIn: e.target.value })}
                          className="border border-red-900/30 rounded px-1.5 py-0.5 text-[11px] w-full"
                        />
                        <input
                          type="date"
                          value={searchParams.checkOut}
                          onChange={(e) => onUpdateSearchParams({ checkOut: e.target.value })}
                          className="border border-red-900/30 rounded px-1.5 py-0.5 text-[11px] w-full"
                        />
                      </div>
                      <button
                        onClick={() => setIsEditingDates(false)}
                        className="text-[10px] text-red-900 font-bold self-end cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingDates(true)}
                      className="text-left w-full cursor-pointer hover:opacity-80 mt-0.5"
                    >
                      <div className="flex items-center gap-2 text-sm font-extrabold text-red-950">
                        <span>20 May</span>
                        <span className="text-red-600">→</span>
                        <span>23 May</span>
                      </div>
                      <span className="text-[11px] text-red-900/60 block mt-0.5 font-medium">3 Nights Stay</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Guests (md:col-span-3) */}
            <div className="md:col-span-3 relative pb-3 md:pb-0">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-red-900/70 block">
                    Guests & Rooms
                  </label>
                  {isEditingGuests ? (
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateSearchParams({ guests: Math.max(1, searchParams.guests - 1) })}
                          className="w-6 h-6 bg-red-600/15 rounded-lg text-center font-bold text-red-950 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-red-950 px-1">{searchParams.guests} Adults</span>
                        <button
                          onClick={() => onUpdateSearchParams({ guests: searchParams.guests + 1 })}
                          className="w-6 h-6 bg-red-600/15 rounded-lg text-center font-bold text-red-950 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => setIsEditingGuests(false)}
                        className="text-[10px] text-red-900 font-bold ml-auto cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingGuests(true)}
                      className="text-left w-full cursor-pointer hover:opacity-80 mt-0.5"
                    >
                      <span className="text-sm font-extrabold text-red-950 block">
                        {searchParams.guests} Guests, {searchParams.rooms} Room
                      </span>
                      <span className="text-[11px] text-red-900/60 font-medium">Standard Occupancy</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Search Button (md:col-span-2) */}
            <div className="md:col-span-2">
              <button
                id="btn-search-stays"
                onClick={() => onNavigateToStays(searchParams.destination)}
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-sm shadow-red-950/20 hover:shadow-md transition-all cursor-pointer"
              >
                <span className="text-sm tracking-wide">Search</span>
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="px-1 sm:px-2">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {/* Events Booking */}
          <button
            id="btn-quick-events"
            onClick={onNavigateToEvents}
            className="bg-white/90 border-2 border-red-500/30 hover:border-red-600 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all group cursor-pointer relative overflow-hidden ring-1 ring-red-950/5"
          >
            <div className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full">
              New
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 group-hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-colors">
              <PartyPopper className="w-6 h-6 stroke-[2.2] text-red-600" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-red-950 mt-2">Events Booking</span>
            <span className="text-[11px] text-red-900/70 mt-0.5">Resorts for Parties</span>
          </button>

          {/* Stays */}
          <button
            id="btn-quick-stays"
            onClick={() => onNavigateToStays()}
            className="bg-white/90 border border-red-900/10 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs hover:border-red-600 hover:shadow-md transition-all group cursor-pointer ring-1 ring-red-950/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 group-hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-colors">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-red-950 mt-2">Luxury Stays</span>
            <span className="text-[11px] text-red-900/70 mt-0.5">Resorts & Villas</span>
          </button>

          {/* Tourism Packages */}
          <button
            id="btn-quick-packages"
            onClick={() => onNavigateToPackages('All')}
            className="bg-white/90 border border-red-900/10 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs hover:border-red-600 hover:shadow-md transition-all group cursor-pointer ring-1 ring-red-950/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 group-hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-colors">
              <Briefcase className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-red-950 mt-2">Tourism Packages</span>
            <span className="text-[11px] text-red-900/70 mt-0.5">Curated Tours & Stays</span>
          </button>

          {/* Offers */}
          <button
            id="btn-quick-offers"
            onClick={onNavigateToOffers}
            className="bg-white/90 border border-red-900/10 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs hover:border-red-600 hover:shadow-md transition-all group cursor-pointer ring-1 ring-red-950/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 group-hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-colors">
              <Tag className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-red-950 mt-2">Special Offers</span>
            <span className="text-[11px] text-red-900/70 mt-0.5">Flash Discounts</span>
          </button>

          {/* My Trips */}
          <button
            id="btn-quick-mytrips"
            onClick={onNavigateToBookings}
            className="bg-white/90 border border-red-900/10 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs hover:border-red-600 hover:shadow-md transition-all group cursor-pointer ring-1 ring-red-950/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 group-hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-colors">
              <Luggage className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-red-950 mt-2">My Bookings</span>
            <span className="text-[11px] text-red-900/70 mt-0.5">Passes & Vouchers</span>
          </button>
        </div>
      </div>

      {/* Featured Events Booking Banner */}
      <div className="px-1 sm:px-2">
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 rounded-3xl p-6 sm:p-8 text-white border border-red-800/40 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 bg-[radial-gradient(#EF4444_1px,transparent_1px)] [background-size:12px_12px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-200 text-xs font-bold uppercase tracking-wider">
                <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
                <span>Resort Events & Celebrations</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-brand leading-tight">
                Planning a Birthday Party, Pool Bash, or Wedding?
              </h3>
              <p className="text-xs sm:text-sm text-red-100/85 max-w-xl leading-relaxed">
                Rent entire resort lawns and villas. Pick your exact booking time slot (Morning, Evening, or Full Day) and choose delicious food catering or venue-only options.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-red-200">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Specify Custom Booking Hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                  <span>Optional Food / Buffet Menus</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={onNavigateToEvents}
                className="w-full sm:w-auto bg-white hover:bg-red-50 text-red-950 font-extrabold px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm hover:scale-105"
              >
                <span>Explore Event Venues</span>
                <ArrowRight className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="px-1 sm:px-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-red-950 tracking-tight">
              Popular Destinations
            </h3>
            <p className="text-xs sm:text-sm text-red-900/60 font-medium">Explore India's most sought-after holiday getaways</p>
          </div>
          <button
            onClick={() => onNavigateToPackages('All')}
            className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Destination Cards in responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="flex flex-col items-center group cursor-pointer bg-white/90 rounded-3xl p-3 border border-red-900/10 shadow-2xs hover:shadow-md transition-all ring-1 ring-red-950/5"
            >
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xs border border-red-900/10">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Search / Zoom badge */}
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center">
                  <ZoomIn className="w-3 h-3" />
                </div>
              </div>
              <span className="text-sm sm:text-base font-extrabold text-red-950 mt-3 text-center leading-tight">
                {dest.name}
              </span>
              <span className="text-xs sm:text-sm text-red-600 text-center font-bold mt-0.5">
                From ₹{dest.startPrice.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Section */}
      <WhyChooseUs />

      {/* Movable Fullscreen Splash Screen Modal */}
      <MovableSplashModal
        isOpen={isMovableModalOpen}
        onClose={() => setIsMovableModalOpen(false)}
        onSelectScene={(scene: SplashScene) => {
          setIsMovableModalOpen(false);
          onNavigateToStays(scene.location.split(',')[0]);
        }}
      />
    </div>
  );
};
