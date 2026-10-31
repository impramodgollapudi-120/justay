import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  Bed,
  Utensils,
  Car,
  Camera,
  Waves,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Calendar,
  Sparkles,
  MapPin,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { TravelPackage } from '../types';

interface PackageDetailScreenProps {
  packageData: TravelPackage;
  onBack: () => void;
  onViewItinerary: () => void;
  onBookNow: (pkg: TravelPackage) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const PackageDetailScreen: React.FC<PackageDetailScreenProps> = ({
  packageData,
  onBack,
  onViewItinerary,
  onBookNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const featureAmenities = [
    { label: 'Stay', icon: Bed },
    { label: 'Food', icon: Utensils },
    { label: 'Transport', icon: Car },
    { label: 'Sightseeing', icon: Camera },
    { label: 'Activities', icon: Waves },
  ];

  return (
    <div className="pb-32 bg-[#FFF5F5] min-h-screen animate-fadeIn text-[#450A0A]">
      {/* Toast */}
      {copiedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-red-950 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-red-500">
          Link copied to clipboard!
        </div>
      )}

      {/* Header Bar */}
      <div className="sticky top-0 backdrop-blur-2xl bg-white/90 sm:bg-[#FFF5F5]/90 z-20 px-4 sm:px-8 py-3.5 border-b border-red-900/10 flex items-center justify-between shadow-xs ring-1 ring-red-950/5">
        <button
          id="btn-detail-back"
          onClick={onBack}
          className="p-2 -ml-1 text-red-950 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h1 className="text-base sm:text-lg font-black text-red-950 tracking-tight font-brand">
          Tourism Package Details
        </h1>

        <button
          id="btn-detail-share"
          onClick={handleShare}
          className="p-2 -mr-1 text-red-950 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
          aria-label="Share package"
        >
          <Share2 className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      {/* Hero Visual Card */}
      <div className="relative h-72 sm:h-80 w-full bg-stone-900">
        <img
          src={packageData.imageUrl}
          alt={packageData.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <div className="bg-red-950/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wide border border-white/20">
            {packageData.badge || 'Verified Tourism'}
          </div>

          <div className="bg-white/95 text-red-950 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm border border-red-900/10">
            {packageData.duration}
          </div>
        </div>

        {/* Heart Bookmark on Hero */}
        <button
          id="btn-detail-wishlist"
          onClick={() => onToggleWishlist(packageData.id)}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xs text-red-950 flex items-center justify-center shadow-md hover:bg-white transition-all cursor-pointer"
          aria-label="Wishlist package"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? 'fill-red-600 text-red-600' : 'text-red-950 stroke-[2]'
            }`}
          />
        </button>

        {/* Bottom Hero Gradient & Details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 text-white">
          <h2 className="text-2xl font-black tracking-tight drop-shadow-xs font-brand">
            {packageData.title}
          </h2>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white">{packageData.rating}</span>
              <span className="text-stone-300 font-normal">
                ({packageData.reviewsCount})
              </span>
            </div>
            <span className="text-stone-400">•</span>
            <div className="flex items-center gap-1 text-xs text-stone-200">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{packageData.destination}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-4xl mx-auto space-y-4">
        {/* Pricing Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-red-900/10 shadow-xs flex items-center justify-between ring-1 ring-red-950/5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-red-950 font-brand">
                ₹{packageData.price.toLocaleString()}
              </span>
              <span className="text-xs text-red-900/60 font-medium">/person</span>
            </div>
            {packageData.originalPrice && (
              <span className="text-[11px] text-red-900/40 line-through">
                ₹{packageData.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="inline-block bg-red-50 text-red-700 border border-red-200 text-[11px] font-bold px-3 py-1 rounded-full">
              Customizable Preferences
            </span>
          </div>
        </div>

        {/* 18+ and ID Verification Assurance Card */}
        <div className="bg-red-50/60 rounded-3xl p-4 border border-red-900/10 flex items-center justify-between text-xs ring-1 ring-red-950/5">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-red-600 shrink-0" />
            <span className="text-red-950 font-bold">
              18+ Years primary guest verification • Digital check-in ID pass included
            </span>
          </div>
          <span className="text-[10px] font-black text-red-700 bg-red-100 px-2 py-0.5 rounded uppercase">
            Govt. ID Policy
          </span>
        </div>

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-5 gap-2 bg-white rounded-3xl p-3.5 border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
          {featureAmenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2 rounded-2xl bg-red-50/40 hover:bg-red-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-1">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-red-950 text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
          <h3 className="text-sm font-black text-red-950 tracking-tight mb-2 font-brand">
            Tour Overview & Experiences
          </h3>
          <p
            className={`text-xs text-red-900/80 leading-relaxed font-medium ${
              isOverviewExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {packageData.overview}
          </p>

          <button
            onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 mt-2 cursor-pointer transition-colors"
          >
            {isOverviewExpanded ? (
              <>
                Show less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Inclusions Section */}
        <div className="bg-white rounded-3xl p-5 border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
          <h3 className="text-sm font-black text-red-950 tracking-tight mb-3 font-brand">
            Tourism Inclusions
          </h3>
          <div className="space-y-2.5">
            {packageData.inclusions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 stroke-[2.5]" />
                <span className="text-xs font-semibold text-red-950">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Itinerary Trigger Card */}
        <div
          id="btn-view-itinerary-card"
          onClick={onViewItinerary}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-red-900/15 flex items-center justify-between cursor-pointer hover:border-red-600/40 shadow-xs transition-all group ring-1 ring-red-950/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-black text-red-950 group-hover:text-red-600 transition-colors font-brand">
                Day-by-Day Detailed Tourism Itinerary
              </h4>
              <p className="text-[11px] text-red-900/70 font-medium">
                Explore timeline, timings, meals & guided transfers
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200 shadow-2xs">
            View
          </span>
        </div>
      </div>

      {/* Sticky Bottom Action Bar with Glassmorphism */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/90 border-t border-red-900/10 p-3.5 sm:p-4 z-40 shadow-[0_-8px_32px_rgba(69,10,10,0.06)] ring-1 ring-red-950/5">
        <div className="max-w-4xl mx-auto flex items-center gap-3 sm:gap-4">
          <button
            id="btn-detail-book-now"
            onClick={() => onBookNow(packageData)}
            className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black py-3.5 px-6 rounded-2xl text-center text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 font-brand"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Book Tourism • ₹{packageData.price.toLocaleString()}</span>
          </button>

          <button
            id="btn-detail-bookmark"
            onClick={() => onToggleWishlist(packageData.id)}
            className="p-3.5 border border-red-900/20 hover:border-red-900/50 backdrop-blur-md bg-white rounded-2xl text-red-950 hover:bg-red-50 transition-colors cursor-pointer shadow-2xs"
            aria-label="Save bookmark"
          >
            <Bookmark
              className={`w-5 h-5 ${
                isWishlisted ? 'fill-red-600 text-red-600' : 'text-red-950 stroke-[2]'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
