import React from 'react';
import { Calendar, Users, MapPin, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/priceFormatter';

export const PackageBookingSummary = ({
  pkg,
  travelDate,
  travelerCount = 2,
  pricePerPerson = 0,
  subtotal = 0,
  discount = 0,
  taxes = 0,
  total = 0,
  onProceedToPay,
  isProcessing = false,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-5 shadow-xs ring-1 ring-red-950/5">
      {/* Package Head */}
      <div className="flex gap-3">
        {pkg.images && pkg.images.length > 0 && (
          <img
            src={pkg.images[0]}
            alt={pkg.title}
            className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-red-900/10"
          />
        )}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-brand">
            All-Inclusive Package
          </span>
          <h4 className="text-sm font-black text-red-950 line-clamp-1 font-brand">{pkg.title}</h4>
          <p className="text-xs text-red-900/70 flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-red-500" /> {pkg.destination}
          </p>
        </div>
      </div>

      {/* Date & Guests Card */}
      <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-red-50/50 rounded-2xl text-xs text-red-950 border border-red-900/10">
        <div>
          <span className="text-[10px] text-red-900/60 block font-bold uppercase">
            Departure Date
          </span>
          <span className="font-black text-red-950 flex items-center gap-1 mt-0.5 font-brand">
            <Calendar className="w-3.5 h-3.5 text-red-600" /> {travelDate}
          </span>
          <span className="text-[11px] text-red-900/70 block mt-0.5 font-medium">{pkg.duration}</span>
        </div>
        <div>
          <span className="text-[10px] text-red-900/60 block font-bold uppercase">
            Travelers
          </span>
          <span className="font-black text-red-950 flex items-center gap-1 mt-0.5 font-brand">
            <Users className="w-3.5 h-3.5 text-red-600" /> {travelerCount} Adults
          </span>
          <span className="text-[11px] text-red-900/70 block mt-0.5 font-medium">Private cab & twin rooms</span>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="space-y-2 text-xs font-semibold">
        <div className="flex justify-between text-red-900/70">
          <span>
            {formatCurrency(pricePerPerson)} × {travelerCount} Guests
          </span>
          <span className="font-bold text-red-950">{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-red-600 font-bold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Special Promo Applied
            </span>
            <span>- {formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-red-900/70">
          <span>GST & Travel Assurance (5%)</span>
          <span className="font-bold text-red-950">{formatCurrency(taxes)}</span>
        </div>

        <div className="flex justify-between text-base font-black text-red-950 pt-3 border-t border-red-900/10 font-brand">
          <span>Total Package Amount</span>
          <span className="text-red-700">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="p-3 bg-red-50/60 border border-red-200/80 rounded-2xl flex items-center gap-2 text-[11px] text-red-900 font-medium">
        <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
        <span>100% Refundable up to 7 days before departure.</span>
      </div>

      {onProceedToPay && (
        <button
          type="button"
          disabled={isProcessing}
          onClick={onProceedToPay}
          className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-black rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-brand"
        >
          {isProcessing ? 'Confirming Holiday...' : `Pay ${formatCurrency(total)} & Confirm`}
        </button>
      )}
    </div>
  );
};

export default PackageBookingSummary;
