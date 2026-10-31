import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  UtensilsCrossed,
  Users,
  MapPin,
  Star,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PartyPopper,
  Info,
  Check,
  ChevronRight,
  Phone,
  Mail,
  Camera,
  Heart,
  DollarSign
} from 'lucide-react';
import { EventResort, EventType, EventSlotTime, FoodPackageOption, BookingDetails } from '../types';

interface EventDetailScreenProps {
  foodPackages: Array<{ id: string; name: string; pricePerGuest: number; description: string; inclusions: string[]; popular?: boolean }>;
  resort: EventResort;
  onBack: () => void;
  onProceedToBooking: (bookingData: Partial<BookingDetails>) => void;
  savedIds?: string[];
  onToggleWishlist?: (id: string) => void;
}

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({
  foodPackages,
  resort,
  onBack,
  onProceedToBooking,
  savedIds = [],
  onToggleWishlist,
}) => {
  // Event-specific configuration states
  const [selectedEventType, setSelectedEventType] = useState<string>(resort.eventTypeSupported[0]);
  const [eventDate, setEventDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [selectedSlot, setSelectedSlot] = useState<string>(resort.availableSlots[0]);
  const [customStartTime, setCustomStartTime] = useState<string>('16:00');
  const [customEndTime, setCustomEndTime] = useState<string>('23:00');
  
  // Guest and food states
  const [guestCount, setGuestCount] = useState<number>(50);
  const [isFoodRequired, setIsFoodRequired] = useState<boolean>(true);
  const [selectedFoodPackageId, setSelectedFoodPackageId] = useState<string>('');
  const [specialFoodRequests, setSpecialFoodRequests] = useState<string>('');

  // Host contact info
  const [hostName, setHostName] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [hostEmail, setHostEmail] = useState('');

  const selectedFoodPackage = foodPackages.find((pkg) => pkg.id === selectedFoodPackageId) || foodPackages[0];
  const foodCostPerGuest = isFoodRequired && selectedFoodPackage ? selectedFoodPackage.pricePerGuest : 0;
  const totalFoodCost = foodCostPerGuest * guestCount;
  const venueCost = resort.venuePrice;
  const subtotal = venueCost + totalFoodCost;
  const taxes = Math.round(subtotal * 0.108);
  const totalAmount = subtotal + taxes;

  const isSaved = savedIds.includes(resort.id);

  const handleBook = () => {
    const timeSlotLabel = selectedSlot === 'Custom Hours'
      ? `Custom (${customStartTime} to ${customEndTime})`
      : selectedSlot;

    const bookingPayload: Partial<BookingDetails> = {
      type: 'event',
      itemId: resort.id,
      title: `${resort.name} - ${selectedEventType}`,
      imageUrl: resort.imageUrl,
      location: resort.location,
      duration: timeSlotLabel,
      checkInDate: eventDate,
      checkOutDate: eventDate,
      eventTimeSlot: timeSlotLabel,
      eventType: selectedEventType,
      foodRequired: isFoodRequired,
      foodPackageName: isFoodRequired ? (selectedFoodPackage?.name || 'Food package not selected') : 'No Food / Venue Only',
      foodPricePerGuest: foodCostPerGuest,
      totalFoodCost: totalFoodCost,
      venueRentalCost: venueCost,
      guestsCount: guestCount,
      roomsCount: 1,
      packagePrice: subtotal,
      discount: 0,
      taxesAndFees: taxes,
      totalAmount: totalAmount,
      userName: hostName,
      userEmail: hostEmail,
      userPhone: hostPhone,
    };

    onProceedToBooking(bookingPayload);
  };

  return (
    <div className="pb-28 md:pb-16 animate-fadeIn space-y-6 max-w-[1440px] mx-auto px-2 sm:px-4 text-[#450A0A]">
      {/* Top Breadcrumb & Navigation Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-red-900/10 text-xs font-bold text-red-950 hover:bg-red-50 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Back to Event Venues</span>
        </button>

        {onToggleWishlist && (
          <button
            onClick={() => onToggleWishlist(resort.id)}
            className="w-10 h-10 rounded-2xl bg-white border border-red-900/10 text-red-950 flex items-center justify-center hover:bg-red-50 transition-all cursor-pointer shadow-xs"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-600 text-red-600' : 'text-red-950'}`} />
          </button>
        )}
      </div>

      {/* Main Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Photos, Amenities, Inclusions (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Showcase Image & Gallery */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xs border border-red-900/10 ring-1 ring-red-950/5">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <img
                src={resort.imageUrl}
                alt={resort.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4">
                <div className="bg-red-950/80 backdrop-blur-md text-red-200 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <PartyPopper className="w-3.5 h-3.5 text-red-400" />
                  <span>Resort Event & Party Venue</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs text-red-200 mb-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{resort.location}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black font-brand leading-tight">
                  {resort.name}
                </h1>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5 p-3.5 bg-red-50/20 border-t border-red-900/10">
              {resort.galleryImages.map((img, idx) => (
                <div key={idx} className="h-16 sm:h-20 rounded-2xl overflow-hidden border border-red-900/10 relative group cursor-pointer">
                  <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Description & Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-red-900/10 space-y-4 ring-1 ring-red-950/5">
            <h2 className="text-lg font-black text-red-950 font-brand">About the Venue</h2>
            <p className="text-sm text-red-900/80 leading-relaxed font-medium">
              {resort.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {resort.venueFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-red-950 bg-red-50/40 p-3 rounded-2xl border border-red-900/10">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Venue Amenities */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-red-900/10 space-y-4 ring-1 ring-red-950/5">
            <h2 className="text-lg font-black text-red-950 font-brand">Party & Event Amenities Included</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {resort.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-red-950 bg-red-50/40 p-3 rounded-2xl border border-red-900/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Event Customizer & Booking Panel (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-red-900/10 space-y-5 sticky top-20 ring-1 ring-red-950/5">
            <div className="flex items-center justify-between pb-4 border-b border-red-900/10">
              <div>
                <span className="text-[11px] font-bold text-red-900/70 uppercase tracking-wider block">
                  Base Venue Rental
                </span>
                <span className="text-2xl font-black text-red-950 font-brand">
                  ₹{resort.venuePrice.toLocaleString()}
                </span>
              </div>
              <div className="bg-red-50 border border-red-200 px-3 py-1 rounded-full text-xs font-bold text-red-800 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{resort.rating} ({resort.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* 1. Occasion Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-red-950 flex items-center gap-1.5 font-brand">
                <PartyPopper className="w-4 h-4 text-red-600" />
                <span>1. Event / Party Occasion</span>
              </label>
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full p-3 rounded-2xl bg-red-50/30 border border-red-900/20 text-xs sm:text-sm font-bold text-red-950 focus:outline-none focus:border-red-600"
              >
                {resort.eventTypeSupported.map((evt) => (
                  <option key={evt} value={evt}>{evt}</option>
                ))}
              </select>
            </div>

            {/* 2. Date Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-red-950 flex items-center gap-1.5 font-brand">
                <Calendar className="w-4 h-4 text-red-600" />
                <span>2. Event Date</span>
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-3 rounded-2xl bg-red-50/30 border border-red-900/20 text-xs sm:text-sm font-bold text-red-950 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* 3. Mandatory Specified Booking Time Slot */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-red-950 flex items-center gap-1.5 font-brand">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>3. Specified Booking Time Slot *</span>
                </label>
                <span className="text-[10px] font-black bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full">
                  Required
                </span>
              </div>

              <div className="space-y-2">
                {resort.availableSlots.map((slot) => (
                  <label
                    key={slot}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold cursor-pointer transition-all ${
                      selectedSlot === slot
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-red-50/30 text-red-950 border-red-900/10 hover:bg-red-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="eventSlot"
                        checked={selectedSlot === slot}
                        onChange={() => setSelectedSlot(slot)}
                        className="accent-white w-4 h-4"
                      />
                      <span>{slot}</span>
                    </div>
                  </label>
                ))}

                {/* Custom Hours Option */}
                <label
                  className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold cursor-pointer transition-all ${
                    selectedSlot === 'Custom Hours'
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-red-50/30 text-red-950 border-red-900/10 hover:bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="eventSlot"
                      checked={selectedSlot === 'Custom Hours'}
                      onChange={() => setSelectedSlot('Custom Hours')}
                      className="accent-white w-4 h-4"
                    />
                    <span>Custom Specific Hours</span>
                  </div>
                </label>

                {selectedSlot === 'Custom Hours' && (
                  <div className="p-3 bg-red-50/40 rounded-2xl grid grid-cols-2 gap-3 border border-red-900/15">
                    <div>
                      <label className="text-[11px] font-bold text-red-950 block mb-1">Start Time</label>
                      <input
                        type="time"
                        value={customStartTime}
                        onChange={(e) => setCustomStartTime(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white border border-red-900/20 text-xs font-bold text-red-950"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-red-950 block mb-1">End Time</label>
                      <input
                        type="time"
                        value={customEndTime}
                        onChange={(e) => setCustomEndTime(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white border border-red-900/20 text-xs font-bold text-red-950"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Guest Count Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-red-950 flex items-center gap-1.5 font-brand">
                  <Users className="w-4 h-4 text-red-600" />
                  <span>4. Number of Guests</span>
                </label>
                <span className="text-xs font-black text-red-800 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min={resort.capacityMin}
                max={resort.capacityMax}
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-red-600 h-2 bg-red-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-semibold text-red-900/60">
                <span>Min: {resort.capacityMin}</span>
                <span>Max: {resort.capacityMax} Guests</span>
              </div>
            </div>

            {/* 5. Food Requirement Specification */}
            <div className="space-y-3 pt-2 border-t border-red-900/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-red-950 flex items-center gap-1.5 font-brand">
                  <UtensilsCrossed className="w-4 h-4 text-red-600" />
                  <span>5. Food & Catering Required? *</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFoodRequired(true)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isFoodRequired
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-red-50 text-red-950 border border-red-900/10 hover:bg-red-100'
                    }`}
                  >
                    Yes (Food Included)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFoodRequired(false);
                      setSelectedFoodPackageId('food-none');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      !isFoodRequired
                        ? 'bg-red-950 text-white shadow-xs'
                        : 'bg-red-50 text-red-950 border border-red-900/10 hover:bg-red-100'
                    }`}
                  >
                    No (Venue Only)
                  </button>
                </div>
              </div>

              {/* Food package selection when food is required */}
              {isFoodRequired && (
                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-bold text-red-900/70 uppercase tracking-wider block">
                    Choose Resort Food Menu:
                  </span>
                  {foodPackages.filter((p) => Number(p.pricePerGuest) > 0).map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedFoodPackageId(pkg.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        selectedFoodPackageId === pkg.id
                          ? 'bg-red-50 border-red-500 ring-2 ring-red-500/20'
                          : 'bg-red-50/30 border-red-900/10 hover:bg-red-50/70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="foodPkg"
                            checked={selectedFoodPackageId === pkg.id}
                            onChange={() => setSelectedFoodPackageId(pkg.id)}
                            className="accent-red-600"
                          />
                          <span className="text-xs font-black text-red-950 font-brand">{pkg.name}</span>
                        </div>
                        <span className="text-xs font-black text-red-800 font-brand">
                          ₹{pkg.pricePerGuest} / guest
                        </span>
                      </div>

                      <p className="text-[11px] text-red-900/75 pl-5 font-medium">
                        {pkg.description}
                      </p>

                      <div className="pl-5 space-y-1">
                        {pkg.inclusions.slice(0, 3).map((inc, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[10px] text-red-900/80 font-semibold">
                            <Check className="w-3 h-3 text-red-600 shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Breakdown Calculation */}
            <div className="bg-red-50/40 p-4 rounded-2xl border border-red-900/10 space-y-2 text-xs">
              <div className="flex justify-between text-red-900/70">
                <span>Resort Venue Booking Fee:</span>
                <span className="font-bold text-red-950">₹{venueCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-red-900/70">
                <span>
                  Food Catering ({isFoodRequired ? `${guestCount} × ₹${foodCostPerGuest}` : 'Not Required'}):
                </span>
                <span className="font-bold text-red-950">
                  ₹{totalFoodCost.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-red-900/70">
                <span>Taxes & Event Service Fees (10.8%):</span>
                <span className="font-bold text-red-950">₹{taxes.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm font-black text-red-950 pt-2 border-t border-red-900/10">
                <span>Total Estimated Price:</span>
                <span className="text-red-700 font-brand">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              onClick={handleBook}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm font-brand"
            >
              <span>Proceed with Event Booking</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-red-900/60 font-medium">
              Free cancellation up to 7 days before the event • Instant manager confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
