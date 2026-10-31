import React, { useState } from 'react';
import {
  ArrowLeft,
  ZoomIn,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Landmark,
  CheckCircle2,
  Lock,
  Calendar,
  Users,
  Tag,
  Check,
  Clock,
  Sparkles,
  UtensilsCrossed,
  Upload,
  Image as ImageIcon,
  FileText,
  AlertTriangle,
  UserCheck,
  Car,
  Languages,
  Activity,
  Bed,
  Plus,
  Minus,
  HelpCircle
} from 'lucide-react';
import { TravelPackage, StayProperty, BookingDetails, EventResort } from '../types';

interface BookingSummaryScreenProps {
  item: TravelPackage | StayProperty | EventResort;
  type: 'package' | 'stay' | 'event';
  onBack: () => void;
  onViewItinerary?: () => void;
  onBookingSuccess: (booking: BookingDetails) => void;
  eventBookingData?: Partial<BookingDetails>;
}

export const BookingSummaryScreen: React.FC<BookingSummaryScreenProps> = ({
  item,
  type,
  onBack,
  onViewItinerary,
  onBookingSuccess,
  eventBookingData,
}) => {
  const isPackage = type === 'package';
  const isEvent = type === 'event';
  const isStay = type === 'stay';
  const pkg = isPackage ? (item as TravelPackage) : null;
  const stay = isStay ? (item as StayProperty) : null;
  const eventResort = isEvent ? (item as EventResort) : null;

  // Extended Stay State (Extra Days)
  const [extraDays, setExtraDays] = useState(0);

  // Tourism Travel Requirements & Preferences State (For Tourism / Package bookings)
  const [dietaryPreference, setDietaryPreference] = useState<'Vegetarian' | 'Jain Meal' | 'Non-Vegetarian' | 'Vegan' | 'No Preference'>('Vegetarian');
  const [transportPreference, setTransportPreference] = useState<'Private AC Sedan' | 'SUV (Innova)' | 'Luxury Coach / Tempo' | 'Self-Drive / None'>('Private AC Sedan');
  const [guideLanguage, setGuideLanguage] = useState<'English' | 'Hindi' | 'Regional Language' | 'Self-Guided'>('English');
  const [activityPace, setActivityPace] = useState<'Relaxed & Leisurely' | 'Moderate' | 'High Adventure & Active'>('Relaxed & Leisurely');
  const [roomPreference, setRoomPreference] = useState<'King Bed' | 'Twin Beds' | 'Pool Facing' | 'High Floor'>('King Bed');
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment and Promo state
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit / Debit Card' | 'Net Banking'>('Credit / Debit Card');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isPaying, setIsPaying] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('Guest');
  const [upiId, setUpiId] = useState('');

  // Base nights
  const baseNights = isStay ? 3 : isPackage ? (pkg?.nights || 2) : 1;
  const totalNights = baseNights + extraDays;

  // Price calculations
  const basePricePerUnit = isEvent
    ? (eventBookingData?.packagePrice || eventResort?.venuePrice || 35000)
    : isPackage
    ? (pkg?.price || 6999)
    : (stay?.pricePerNight || 4299);

  const pricePerExtraNight = isStay ? (stay?.pricePerNight || 4299) : isPackage ? Math.round((pkg?.price || 6999) * 0.4) : 0;
  const extraStayCharges = extraDays * pricePerExtraNight;

  const baseSubtotal = isEvent
    ? (eventBookingData?.packagePrice || eventResort?.venuePrice || 35000)
    : isPackage
    ? basePricePerUnit * 2
    : basePricePerUnit * baseNights;

  const subtotal = baseSubtotal + extraStayCharges;
  const discountAmount = appliedPromo ? promoDiscount : 0;
  const taxesAndFees = Math.round((subtotal - discountAmount) * 0.108);
  const totalAmount = Math.max(0, subtotal - discountAmount + taxesAndFees);

  const handleApplyPromo = async () => {
    try {
      const { default: couponApi } = await import('../api/couponApi');
      const coupon = await couponApi.validateCoupon(promoCode, subtotal);
      setAppliedPromo(promoCode.trim().toUpperCase());
      setPromoDiscount(Number(coupon.discountAmount || 0));
    } catch (error: any) {
      setAppliedPromo(null); setPromoDiscount(0);
      alert(error?.message || 'This coupon could not be validated.');
    }
  };

  // Date calculation helper
  const calculateCheckOutDate = (_startStr: string, nights: number) => {
    const date = new Date();
    date.setDate(date.getDate() + Math.max(0, nights));
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const checkOutDateStr = isEvent
    ? (eventBookingData?.checkOutDate || calculateCheckOutDate('', 1))
    : calculateCheckOutDate('', totalNights);

  const handlePay = () => {
    setIsPaying(true);
    const today = new Date();
    const checkIn = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const newBooking: BookingDetails = {
      id: '',
      type,
      itemId: item.id,
      title: (item as any)?.name || (pkg?.title as string),
      imageUrl: item.imageUrl || '',
      location: isEvent ? (eventResort?.location || '') : isPackage ? (pkg?.destination as string) : (stay?.location as string),
      duration: isEvent ? (eventBookingData?.duration || 'Event') : isPackage ? `${pkg?.days ? pkg.days + extraDays : 1 + extraDays} Days / ${totalNights} Nights` : `${totalNights} Nights Stay`,
      checkInDate: eventBookingData?.checkInDate || checkIn,
      checkOutDate: checkOutDateStr,
      originalCheckOutDate: checkOutDateStr,
      dietaryPreference: isPackage ? dietaryPreference : undefined,
      transportPreference: isPackage ? transportPreference : undefined,
      guideLanguage: isPackage ? guideLanguage : undefined,
      activityPace: isPackage ? activityPace : undefined,
      roomPreference: isPackage ? roomPreference : undefined,
      specialRequests: specialRequests.trim() || undefined,
      extraDaysAdded: extraDays,
      pricePerExtraNight,
      extendedStayCharges: extraStayCharges,
      eventTimeSlot: eventBookingData?.eventTimeSlot,
      eventType: eventBookingData?.eventType,
      foodRequired: eventBookingData?.foodRequired,
      foodPackageName: eventBookingData?.foodPackageName,
      foodPricePerGuest: eventBookingData?.foodPricePerGuest,
      totalFoodCost: eventBookingData?.totalFoodCost,
      venueRentalCost: eventBookingData?.venueRentalCost,
      guestsCount: eventBookingData?.guestsCount || 2,
      roomsCount: eventBookingData?.roomsCount || 1,
      packagePrice: subtotal,
      discount: discountAmount,
      couponCode: appliedPromo || undefined,
      taxesAndFees,
      totalAmount,
      paymentMethod,
      paymentStatus: 'Not processed',
      status: 'Pending',
      bookingDate: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      bookingRef: `JST-${Date.now().toString(36).toUpperCase()}`,
      userName: '',
      userEmail: '',
      userPhone: '',
    };
    Promise.resolve(onBookingSuccess(newBooking)).finally(() => setIsPaying(false));
  };

  const paymentOptions = [
    {
      id: 'Credit / Debit Card' as const,
      label: 'Credit / Debit Card',
      subtitle: 'Visa, Mastercard, RuPay, Amex',
      icon: CreditCard,
    },
    {
      id: 'UPI' as const,
      label: 'UPI Instant Payment',
      subtitle: 'Google Pay, PhonePe, Paytm, BHIM',
      icon: Smartphone,
    },
    {
      id: 'Net Banking' as const,
      label: 'Net Banking',
      subtitle: 'All Major Indian & Global Banks',
      icon: Landmark,
    },
  ];

  return (
    <div className="pb-36 bg-[#FFF5F5] min-h-screen animate-fadeIn text-[#450A0A]">
      {/* Header Bar with Glassmorphism */}
      <div className="sticky top-0 backdrop-blur-2xl bg-white/90 sm:bg-[#FFF5F5]/90 z-20 px-4 sm:px-8 py-3.5 border-b border-red-900/10 flex items-center justify-between shadow-xs ring-1 ring-red-950/5">
        <button
          id="btn-booking-back"
          onClick={onBack}
          className="p-2 -ml-1 text-red-950 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h1 className="text-base sm:text-lg font-black text-red-950 tracking-tight font-brand">
          {isPackage ? 'Tourism Booking & Checkout' : isStay ? 'Room Booking & Checkout' : 'Resort Event Checkout'}
        </h1>

        <div className="w-8" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-5 space-y-5">
        {/* Selected Item Card */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs flex gap-4 items-start ring-1 ring-red-950/5">
          {/* Thumbnail Image */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-red-900/10">
            <img
              src={item.imageUrl}
              alt={(item as any)?.name || pkg?.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-red-950/70 backdrop-blur-xs text-white flex items-center justify-center">
              <ZoomIn className="w-3 h-3" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-block bg-red-600/10 text-red-700 border border-red-600/20 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {isEvent ? 'Resort Event' : isPackage ? 'Tourism Package' : 'Room Stay'}
              </span>
              {extraDays > 0 && (
                <span className="inline-block bg-red-50 text-red-800 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  +{extraDays} Ext. Days
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-black text-red-950 tracking-tight truncate font-brand">
              {(item as any)?.name || pkg?.title}
            </h2>

            <p className="text-xs text-red-900/80 font-semibold mt-0.5">
              {isEvent
                ? `Occasion: ${eventBookingData?.eventType || 'Celebration'}`
                : isPackage
                ? `${pkg?.days ? pkg.days + extraDays : 3 + extraDays} Days / ${totalNights} Nights • ${pkg?.destination}`
                : `${totalNights} Nights (${stay?.propertyType || 'Resort Suite'})`}
            </p>

            <div className="flex items-center gap-3 text-xs text-red-900/70 mt-1.5">
              <span className="font-bold text-red-950 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-red-600" />
                <span>20 May – {checkOutDateStr}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-red-600" />
                <span>2 Adults</span>
              </span>
            </div>

            {isPackage && onViewItinerary && (
              <button
                id="btn-summary-view-itinerary"
                onClick={onViewItinerary}
                className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline mt-2 block cursor-pointer"
              >
                View full tourism itinerary →
              </button>
            )}
          </div>
        </div>

        {/* Tourism Requirements & Preferences Section (for Tourism bookings) */}
        {isPackage && (
          <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs space-y-4 ring-1 ring-red-950/5">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-red-900/10">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center">
                <Sparkles className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-red-950 uppercase tracking-wide font-brand">
                  Tourism Travel Requirements & Preferences
                </h3>
                <p className="text-[11px] text-red-900/70 font-medium">
                  Specify your travel preferences for custom tour personalization
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              {/* Dietary Preference */}
              <div>
                <label className="text-[11px] font-bold text-red-900/75 uppercase flex items-center gap-1 mb-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-red-600" />
                  <span>Meal & Dietary Preference</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Vegetarian', 'Jain Meal', 'Non-Vegetarian', 'Vegan'] as const).map((diet) => (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => setDietaryPreference(diet)}
                      className={`p-2.5 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer truncate ${
                        dietaryPreference === diet
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-red-50/40 text-red-950 border-red-900/10 hover:bg-red-50'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transport Preference */}
              <div>
                <label className="text-[11px] font-bold text-red-900/75 uppercase flex items-center gap-1 mb-1.5">
                  <Car className="w-3.5 h-3.5 text-red-600" />
                  <span>Tour Transport Preference</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Private AC Sedan', 'SUV (Innova)', 'Luxury Coach / Tempo', 'Self-Drive / None'] as const).map((tr) => (
                    <button
                      key={tr}
                      type="button"
                      onClick={() => setTransportPreference(tr)}
                      className={`p-2.5 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer truncate ${
                        transportPreference === tr
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-red-50/40 text-red-950 border-red-900/10 hover:bg-red-50'
                      }`}
                    >
                      {tr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guide Language */}
              <div>
                <label className="text-[11px] font-bold text-red-900/75 uppercase flex items-center gap-1 mb-1.5">
                  <Languages className="w-3.5 h-3.5 text-red-600" />
                  <span>Tour Guide Language</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['English', 'Hindi', 'Regional Language', 'Self-Guided'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setGuideLanguage(lang)}
                      className={`p-2.5 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer truncate ${
                        guideLanguage === lang
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-red-50/40 text-red-950 border-red-900/10 hover:bg-red-50'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity Pace */}
              <div>
                <label className="text-[11px] font-bold text-red-900/75 uppercase flex items-center gap-1 mb-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-600" />
                  <span>Tour Activity Pace</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Relaxed & Leisurely', 'Moderate', 'High Adventure & Active'] as const).map((pace) => (
                    <button
                      key={pace}
                      type="button"
                      onClick={() => setActivityPace(pace)}
                      className={`p-2.5 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer truncate ${
                        activityPace === pace
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-red-50/40 text-red-950 border-red-900/10 hover:bg-red-50'
                      }`}
                    >
                      {pace}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Preference & Custom Notes */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-red-900/75 uppercase flex items-center gap-1 mb-1.5">
                  <Bed className="w-3.5 h-3.5 text-red-600" />
                  <span>Room Bed / Location Preference</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(['King Bed', 'Twin Beds', 'Pool Facing', 'High Floor'] as const).map((roomPref) => (
                    <button
                      key={roomPref}
                      type="button"
                      onClick={() => setRoomPreference(roomPref)}
                      className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all cursor-pointer truncate ${
                        roomPreference === roomPref
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-red-50/40 text-red-950 border-red-900/10 hover:bg-red-50'
                      }`}
                    >
                      {roomPref}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-red-900/75 uppercase block mb-1">
                  Special Travel Notes / Accessibility Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Senior citizen assistance, anniversary flower setup, late evening airport pickup..."
                  className="w-full bg-red-50/30 border border-red-900/20 rounded-2xl p-3 text-xs text-red-950 placeholder:text-red-900/40 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Extended Stay Option (Add Extra Days during checkout) */}
        {!isEvent && (
          <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-black text-red-950 flex items-center gap-1.5 font-brand">
                  <span>Extended Stay Option</span>
                  <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                    Subject to Availability
                  </span>
                </h3>
                <p className="text-[11px] text-red-900/70 font-medium">
                  Add extra days to extend your holiday (₹{pricePerExtraNight.toLocaleString()}/extra day)
                </p>
              </div>

              {/* Extra Days Counter */}
              <div className="flex items-center gap-1.5 bg-red-50 p-1 rounded-2xl border border-red-900/15">
                <button
                  type="button"
                  onClick={() => setExtraDays(Math.max(0, extraDays - 1))}
                  disabled={extraDays <= 0}
                  className="w-8 h-8 rounded-xl bg-white text-red-950 font-bold flex items-center justify-center hover:bg-red-100 disabled:opacity-30 cursor-pointer shadow-2xs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-14 text-center font-extrabold text-xs text-red-950">
                  {extraDays === 0 ? 'No extra' : `+${extraDays} ${extraDays === 1 ? 'Day' : 'Days'}`}
                </span>
                <button
                  type="button"
                  onClick={() => setExtraDays(Math.min(10, extraDays + 1))}
                  className="w-8 h-8 rounded-xl bg-white text-red-950 font-bold flex items-center justify-center hover:bg-red-100 cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {extraDays > 0 && (
              <div className="mt-3 p-3 bg-red-50 rounded-2xl border border-red-200 text-xs flex items-center justify-between text-red-950">
                <span className="font-bold">
                  ✓ Extended by +{extraDays} Days (New Check-out: {checkOutDateStr})
                </span>
                <span className="font-extrabold">
                  +₹{extraStayCharges.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Promo Code Input Card */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold text-red-950">Have a promo voucher?</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 bg-red-50/30 border border-red-900/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-950 focus:outline-none focus:border-red-600 font-mono"
            />
            <button
              onClick={handleApplyPromo}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold px-5 py-2.5 rounded-2xl transition-colors cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>

          {appliedPromo && (
            <div className="flex items-center justify-between text-xs text-red-800 font-bold mt-2.5 bg-red-50 px-3 py-2 rounded-xl border border-red-200">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-red-600" />
                Voucher `{appliedPromo}` applied (-₹{promoDiscount})
              </span>
              <button
                onClick={() => {
                  setAppliedPromo(null);
                  setPromoDiscount(0);
                }}
                className="text-[11px] text-red-900/50 hover:text-red-950 underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Price Details Section */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
          <h3 className="text-sm sm:text-base font-black text-red-950 tracking-tight mb-3.5 font-brand">
            Price Details & Breakdown
          </h3>

          <div className="space-y-3 text-xs font-semibold">
            {isEvent ? (
              <>
                <div className="flex justify-between text-red-900/70">
                  <span>Resort Venue Rental:</span>
                  <span className="text-red-950 font-bold">
                    ₹{(eventBookingData?.venueRentalCost || 35000).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-red-900/70">
                  <span>
                    Food Catering ({eventBookingData?.foodRequired ? `${eventBookingData?.guestsCount || 50} × ₹${eventBookingData?.foodPricePerGuest}` : 'Not Required'}):
                  </span>
                  <span className="text-red-950 font-bold">
                    ₹{(eventBookingData?.totalFoodCost || 0).toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-red-900/70">
                  <span>{isPackage ? `Tourism Package Base (${baseNights} Nights, 2 Adults)` : `Room Stay Base (${baseNights} Nights)`}:</span>
                  <span className="text-red-950 font-bold">
                    ₹{baseSubtotal.toLocaleString()}
                  </span>
                </div>

                {extraDays > 0 && (
                  <div className="flex justify-between text-red-900/80 font-semibold">
                    <span>Extended Stay ({extraDays} Extra Days @ ₹{pricePerExtraNight.toLocaleString()}/day):</span>
                    <span className="font-bold text-red-950">+₹{extraStayCharges.toLocaleString()}</span>
                  </div>
                )}
              </>
            )}

            {discountAmount > 0 && (
              <div className="flex justify-between text-red-700">
                <span>Voucher Discount:</span>
                <span>-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-red-900/70">
              <span>Taxes & GST (10.8%):</span>
              <span className="text-red-950 font-bold">
                ₹{taxesAndFees.toLocaleString()}
              </span>
            </div>

            <div className="pt-3.5 border-t border-red-900/10 flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-red-950">
                Estimated booking total
              </span>
              <span className="text-2xl font-black text-red-950">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Options Section */}
        <div className="bg-white rounded-3xl overflow-hidden border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
          <div className="p-5 border-b border-red-900/10">
            <h3 className="text-sm sm:text-base font-black text-red-950 tracking-tight font-brand">
              Preferred payment method (not charged here)
            </h3>
          </div>

          <div className="divide-y divide-red-900/10">
            {paymentOptions.map((opt) => {
              const isSelected = paymentMethod === opt.id;
              const Icon = opt.icon;
              return (
                <div key={opt.id} className={isSelected ? 'bg-red-50/50' : ''}>
                  <label
                    id={`radio-payment-${opt.id.toLowerCase().replace(/[^a-z]/g, '')}`}
                    onClick={() => setPaymentMethod(opt.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-red-600 bg-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        )}
                      </div>

                      <div>
                        <span className="text-xs sm:text-sm font-bold text-red-950 block">
                          {opt.label}
                        </span>
                        <span className="text-[10px] sm:text-xs text-red-900/60 font-medium">
                          {opt.subtitle}
                        </span>
                      </div>
                    </div>

                    <Icon className={`w-5 h-5 ${isSelected ? 'text-red-600' : 'text-stone-400'}`} />
                  </label>

                  {/* Expanded Card Fields */}
                  {isSelected && opt.id === 'Credit / Debit Card' && (
                    <div className="px-5 pb-5 pt-1 space-y-3 animate-fadeIn">
                      <div>
                        <label className="text-[10px] font-bold text-red-900/70 uppercase">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-red-900/20 rounded-2xl px-3.5 py-2.5 text-xs font-mono font-bold text-red-950 focus:border-red-600 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-red-900/70 uppercase">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-white border border-red-900/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-red-950 focus:border-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-red-900/70 uppercase">CVV / CVC</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-white border border-red-900/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-red-950 focus:border-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expanded UPI Field */}
                  {isSelected && opt.id === 'UPI' && (
                    <div className="px-5 pb-5 pt-1 animate-fadeIn">
                      <label className="text-[10px] font-bold text-red-900/70 uppercase">Enter UPI ID / VPA</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-white border border-red-900/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-red-950 mt-1 focus:border-red-600 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar with Glassmorphism */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/90 border-t border-red-900/10 p-4 z-40 shadow-lg ring-1 ring-red-950/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-red-900/80 font-semibold">
            <Lock className="w-4 h-4 text-red-600" />
            <span>256-bit Encrypted SSL • 18+ Govt. Verified Check-in</span>
          </div>

          <button
            id="btn-proceed-to-pay"
            onClick={handlePay}
            disabled={isPaying}
            className="w-full sm:w-auto sm:min-w-[280px] bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-3.5 px-6 rounded-2xl text-center text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isPaying ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting booking request...</span>
              </div>
            ) : (
              <span>Submit booking request · ₹{totalAmount.toLocaleString()}</span>
            )}
          </button>
        </div>

        {/* Mobile-only Security Guarantee Badge */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 text-red-900/60 text-[11px] font-medium mt-2">
          <Lock className="w-3.5 h-3.5 text-red-600" />
          <span>Payment gateway not connected · ID verification pending</span>
        </div>
      </div>
    </div>
  );
};
