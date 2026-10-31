import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Wifi,
  Waves,
  Utensils,
  Car,
  Tv,
  Coffee,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  Bed,
  Users,
  Sparkles,
  Calendar,
  Compass,
  CreditCard,
  Building,
  Check,
  Phone,
  Maximize2
} from 'lucide-react';
import { StayProperty, SearchParams } from '../types';

interface StayDetailScreenProps {
  stay: StayProperty;
  onBack: () => void;
  onProceedToPayment: (stay: StayProperty, selectedRoom?: RoomOption) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  searchParams?: SearchParams;
}

export interface RoomOption {
  id: string;
  name: string;
  pricePerNight: number;
  originalPrice?: number;
  size: string;
  bedType: string;
  maxGuests: string;
  view: string;
  features: string[];
  image: string;
  mealPlan: string;
}

export const StayDetailScreen: React.FC<StayDetailScreenProps> = ({
  stay,
  onBack,
  onProceedToPayment,
  isWishlisted,
  onToggleWishlist,
  searchParams,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Gallery of images
  const gallery = stay.galleryImages && stay.galleryImages.length > 0
    ? stay.galleryImages
    : [stay.imageUrl];

  // Room options for this resort
  const roomOptions: RoomOption[] = [
    {
      id: 'room-deluxe',
      name: 'Deluxe Garden Suite',
      pricePerNight: stay.pricePerNight,
      originalPrice: stay.originalPrice || stay.pricePerNight + 1000,
      size: '380 sq.ft',
      bedType: '1 King Bed or 2 Twin Beds',
      maxGuests: '2 Adults, 1 Child',
      view: 'Lush Garden & Pool View',
      features: ['Private Balcony', 'Rain Shower', 'Complimentary High-speed WiFi', 'Express Room Service'],
      image: stay.galleryImages?.[0] || stay.imageUrl,
      mealPlan: stay.breakfastIncluded ? 'Complimentary Breakfast Buffet' : 'Room Only',
    },
    {
      id: 'room-ocean',
      name: 'Luxury Oceanfront Villa Room',
      pricePerNight: Math.round(stay.pricePerNight * 1.35),
      originalPrice: Math.round((stay.originalPrice || stay.pricePerNight + 1000) * 1.35),
      size: '520 sq.ft',
      bedType: '1 King Size Plush Bed',
      maxGuests: '3 Adults',
      view: 'Direct Ocean & Sunset Panorama',
      features: ['Private Sun Deck', 'Deep Soaking Tub', 'Espresso Machine', 'Sunset Cocktails Access'],
      image: stay.galleryImages?.[1] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      mealPlan: 'Breakfast & Chef Dinner Included',
    },
    {
      id: 'room-presidential',
      name: 'Royal Heritage Pool Villa',
      pricePerNight: Math.round(stay.pricePerNight * 1.85),
      originalPrice: Math.round((stay.originalPrice || stay.pricePerNight + 1000) * 1.85),
      size: '850 sq.ft',
      bedType: '2 King Bedrooms',
      maxGuests: '4 Adults, 2 Children',
      view: 'Private Plunge Pool & Tropical Courtyard',
      features: ['Private Plunge Pool', 'Dedicated 24/7 Butler', 'VIP Airport Transfer', 'Jacuzzi with Aromatherapy'],
      image: stay.galleryImages?.[2] || 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      mealPlan: 'All Meals & Butler Dining Included',
    },
  ];

  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(roomOptions[0]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const keyAmenities = [
    { label: 'Swimming Pool', icon: Waves, desc: 'Multi-tier lagoon & infinity pool' },
    { label: 'Fine Dining', icon: Utensils, desc: '3 multi-cuisine restaurants & bars' },
    { label: 'High-Speed Wi-Fi', icon: Wifi, desc: 'Complimentary high-speed fiber' },
    { label: 'Free Valet Parking', icon: Car, desc: '24/7 secured parking on premises' },
    { label: 'Coffee & Breakfast', icon: Coffee, desc: 'Daily continental & gourmet spread' },
    { label: 'Smart TV & AC', icon: Tv, desc: '55" 4K Smart TV & Climate control' },
  ];

  const nearbySpots = [
    { name: stay.distanceToBeachOrCenter || 'Beachfront Access', distance: '2-5 min walk' },
    { name: 'Local Seafood Promenade', distance: '800m away' },
    { name: 'Historic Lighthouse & Forts', distance: '2.5 km away' },
    { name: 'International Airport', distance: '45 mins drive' },
  ];

  const guestReviews = [
    {
      author: 'Arjun Sharma',
      date: 'Visited with family • April 2025',
      rating: 5,
      comment:
        'The resort exceeded our expectations! Pristine cleanliness, friendly staff, and the private pool villas are extraordinary.',
    },
    {
      author: 'Pooja Iyer',
      date: 'Romantic getaway • May 2025',
      rating: 4.8,
      comment:
        'Stunning sunset views and delicious breakfast buffet. The beach path makes morning strolls seamless. Highly recommended!',
    },
  ];

  return (
    <div className="pb-32 bg-[#FFF5F5] min-h-screen animate-fadeIn text-[#450A0A]">
      {copiedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-red-950 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-red-500">
          Resort link copied to clipboard!
        </div>
      )}

      {/* Top Navigation Bar with Glassmorphism */}
      <div className="sticky top-0 backdrop-blur-2xl bg-white/90 sm:bg-[#FFF5F5]/90 z-30 px-4 sm:px-8 py-3.5 border-b border-red-900/10 flex items-center justify-between shadow-xs ring-1 ring-red-950/5">
        <button
          id="btn-stay-detail-back"
          onClick={onBack}
          className="p-2 -ml-1 text-red-950 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
          aria-label="Go back to stays"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase font-black tracking-widest text-red-700 block font-brand">
            {stay.propertyType} Overview
          </span>
          <h1 className="text-sm sm:text-base font-black text-red-950 tracking-tight line-clamp-1 max-w-[220px] sm:max-w-md font-brand">
            {stay.name}
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <button
            id="btn-stay-detail-share"
            onClick={handleShare}
            className="p-2 text-red-950 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
            aria-label="Share resort"
          >
            <Share2 className="w-4 h-4 stroke-[2]" />
          </button>
          <button
            id="btn-stay-detail-wishlist"
            onClick={() => onToggleWishlist(stay.id)}
            className="p-2 text-red-950 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
            aria-label="Save to wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'fill-red-600 text-red-600' : 'text-red-950'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-4 space-y-6">
        {/* Hero Gallery Section */}
        <div className="space-y-2.5">
          <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xs bg-stone-900 border border-red-900/10 ring-1 ring-red-950/5">
            <img
              src={gallery[activeImageIndex] || stay.imageUrl}
              alt={stay.name}
              className="w-full h-full object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Badges on Hero */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
              <span className="bg-red-950/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1 border border-white/20">
                <Sparkles className="w-3 h-3 text-amber-400" /> {stay.starRating}-Star Luxury {stay.propertyType}
              </span>
            </div>

            {/* Price pill */}
            <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-red-900/15 text-right">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-red-950 font-brand">
                  ₹{selectedRoom.pricePerNight.toLocaleString()}
                </span>
                <span className="text-[11px] text-red-900/60 font-medium">/ night</span>
              </div>
              <span className="text-[10px] text-red-700 font-bold block">
                ✓ Free Cancellation Available
              </span>
            </div>

            {/* Photo Counter */}
            <div className="absolute bottom-3.5 left-3.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-xl">
              Photo {activeImageIndex + 1} of {gallery.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-red-600 ring-2 ring-red-600/30 scale-102'
                      : 'border-red-900/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Title, Rating & Location Strip */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs space-y-3 ring-1 ring-red-950/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-200">
                  {stay.propertyType}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  {Array.from({ length: stay.starRating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-black text-red-950 tracking-tight mt-1 font-brand">
                {stay.name}
              </h2>
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-red-50/50 border border-red-900/10 px-3.5 py-2 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm shadow-xs font-brand">
                {stay.rating}
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs font-black text-red-950 block font-brand">
                  {stay.rating >= 4.5 ? 'Exceptional' : 'Very Good'}
                </span>
                <span className="text-[11px] text-red-900/60 font-medium">
                  {stay.reviewsCount} verified reviews
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-red-900/70 pt-2 border-t border-red-900/10">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
              {stay.location}
            </span>
            {stay.distanceToBeachOrCenter && (
              <span className="flex items-center gap-1 text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded-lg border border-red-200">
                <Compass className="w-3.5 h-3.5" />
                {stay.distanceToBeachOrCenter}
              </span>
            )}
          </div>
        </div>

        {/* Resort Overview & Description */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs space-y-3 ring-1 ring-red-950/5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-red-950 tracking-tight flex items-center gap-2 font-brand">
              <Building className="w-4 h-4 text-red-600" /> Resort Overview
            </h3>
            <span className="text-[11px] text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full font-bold border border-red-200">
              Verified by JUSTAY
            </span>
          </div>

          <p className="text-xs sm:text-sm text-red-900/80 leading-relaxed font-medium">
            {isOverviewExpanded ? stay.description : `${stay.description.slice(0, 180)}...`}
          </p>

          <button
            onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isOverviewExpanded ? (
              <>
                Show Less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Read Full Resort Description <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Resort Signature Amenities */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs space-y-4 ring-1 ring-red-950/5">
          <h3 className="text-base font-black text-red-950 tracking-tight flex items-center gap-2 font-brand">
            <Sparkles className="w-4 h-4 text-red-600" /> Featured Amenities & Services
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {keyAmenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-red-50/30 border border-red-900/10 flex items-start gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-red-950">{amenity.label}</h4>
                    <p className="text-[11px] text-red-900/60 leading-tight mt-0.5">{amenity.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-red-900/10">
            {(stay.amenities ?? []).map((item, idx) => (



              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-950 text-[11px] font-bold rounded-xl border border-red-900/10"
              >
                <Check className="w-3 h-3 text-red-600" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Choose Your Room Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-red-950 tracking-tight flex items-center gap-2 font-brand">
                <Bed className="w-4 h-4 text-red-600" /> Select Room or Villa Type
              </h3>
              <p className="text-xs text-red-900/60 mt-0.5">
                All room rates include verified amenities and concierge service
              </p>
            </div>
            <span className="text-xs font-bold text-red-900/60">
              {roomOptions.length} Options Available
            </span>
          </div>

          <div className="space-y-3">
            {roomOptions.map((room) => {
              const isSelected = selectedRoom.id === room.id;
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`bg-white rounded-3xl p-4 sm:p-5 border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 ring-1 ring-red-950/5 ${
                    isSelected
                      ? 'border-red-600 ring-2 ring-red-600/30 shadow-md bg-red-50/20'
                      : 'border-red-900/10 hover:border-red-900/20 hover:shadow-xs'
                  }`}
                >
                  {/* Room Thumbnail */}
                  <div className="relative sm:w-52 h-44 sm:h-auto rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-red-900/10">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-xs">
                      {room.size}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-black text-red-950 font-brand">{room.name}</h4>
                          <p className="text-xs text-red-800 font-medium mt-0.5 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-red-600" /> {room.view}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-black text-red-950 font-brand">
                            ₹{room.pricePerNight.toLocaleString()}
                          </div>
                          {room.originalPrice && (
                            <span className="text-xs text-red-900/40 line-through">
                              ₹{room.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-[10px] text-red-900/60 block">/ night + taxes</span>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-red-900/70">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Bed className="w-3.5 h-3.5 text-red-600" />
                          <span>{room.bedType}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <Users className="w-3.5 h-3.5 text-red-600" />
                          <span>{room.maxGuests}</span>
                        </div>
                      </div>

                      {/* Room Features */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {room.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-red-50 text-red-950 px-2 py-0.5 rounded-lg border border-red-900/10 font-medium"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Select / Active Button Strip */}
                    <div className="flex items-center justify-between pt-3 border-t border-red-900/10">
                      <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600" /> {room.mealPlan}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room);
                        }}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-red-50 text-red-950 hover:bg-red-100 border border-red-900/10'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Select Room'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* House Policies & Check-in Details */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs space-y-3 ring-1 ring-red-950/5">
          <h3 className="text-base font-black text-red-950 tracking-tight flex items-center gap-2 font-brand">
            <ShieldCheck className="w-4 h-4 text-red-600" /> Property Rules, 18+ Policy & Booking Terms
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-red-900/80">
            <div className="p-3.5 bg-red-50/50 border border-red-900/10 rounded-2xl space-y-1">
              <span className="text-[11px] font-bold text-red-900 uppercase block font-brand">
                Age & ID Proof Policy
              </span>
              <p className="text-red-950 font-bold">
                18+ Years Only
              </p>
              <p className="text-red-900/70 text-[11px]">
                Valid Govt. ID photo copy must be uploaded at booking & is shown at check-in.
              </p>
            </div>

            <div className="p-3.5 bg-red-50/50 border border-red-900/10 rounded-2xl space-y-1">
              <span className="text-[11px] font-bold text-red-900 uppercase block font-brand">
                Extended Stay Option
              </span>
              <p className="text-red-950 font-bold">
                Add Extra Days Anytime
              </p>
              <p className="text-red-900/70 text-[11px]">
                Extend your stay by adding days subject to room availability & tariff.
              </p>
            </div>

            <div className="p-3.5 bg-red-50/50 border border-red-900/10 rounded-2xl space-y-1">
              <span className="text-[11px] font-bold text-red-900 uppercase block font-brand">
                Timings & Cancellation
              </span>
              <p className="text-red-950 font-medium">
                Check-in: 02:00 PM | Check-out: 11:00 AM
              </p>
              <p className="text-red-700 text-[11px] font-bold">
                ✓ Free cancellation up to 48h prior.
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs space-y-3 ring-1 ring-red-950/5">
          <h3 className="text-base font-black text-red-950 tracking-tight flex items-center gap-2 font-brand">
            <Compass className="w-4 h-4 text-red-600" /> Location & Nearby Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {nearbySpots.map((spot, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-red-50/40 rounded-2xl text-xs border border-red-900/10"
              >
                <span className="font-bold text-red-950 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-red-600" /> {spot.name}
                </span>
                <span className="text-red-900/60 font-semibold">{spot.distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Reviews Section */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs space-y-3 ring-1 ring-red-950/5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-red-950 tracking-tight flex items-center gap-2 font-brand">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Guest Reviews & Ratings
            </h3>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
              {stay.rating} / 5 Rating Score
            </span>
          </div>

          <div className="space-y-2.5">
            {guestReviews.map((rev, i) => (
              <div key={i} className="p-3.5 bg-red-50/30 rounded-2xl border border-red-900/10 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-950">{rev.author}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-red-950">{rev.rating}</span>
                  </div>
                </div>
                <p className="text-red-900/80 leading-relaxed italic font-medium">"{rev.comment}"</p>
                <span className="text-[10px] text-red-900/50 block">{rev.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking & Proceed to Payment Bar with Glassmorphism */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/90 sm:bg-[#FFF5F5]/90 border-t border-red-900/10 p-3.5 sm:p-4 z-40 shadow-[0_-8px_32px_rgba(69,10,10,0.06)] ring-1 ring-red-950/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-red-900/60 font-bold uppercase block">
              Selected Room: {selectedRoom.name}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-red-950 font-brand">
                ₹{selectedRoom.pricePerNight.toLocaleString()}
              </span>
              <span className="text-xs text-red-900/60 font-medium">/ night</span>
            </div>
            <span className="text-[11px] text-red-700 font-bold hidden sm:inline">
              ✓ All Taxes & Fees included
            </span>
          </div>

          <button
            id="btn-proceed-to-payment"
            onClick={() => onProceedToPayment(stay, selectedRoom)}
            className="flex-1 sm:flex-initial sm:min-w-[240px] bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black py-3.5 px-6 rounded-2xl text-center text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group font-brand"
          >
            <CreditCard className="w-4 h-4 text-red-100 group-hover:scale-110 transition-transform" />
            <span>Proceed to Payment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StayDetailScreen;
