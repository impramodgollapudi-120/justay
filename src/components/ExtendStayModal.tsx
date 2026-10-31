import React, { useState } from 'react';
import { X, Calendar, Plus, Minus, CheckCircle2, ShieldCheck, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { BookingDetails, StayExtensionRecord } from '../types';

interface ExtendStayModalProps {
  booking: BookingDetails;
  isOpen: boolean;
  onClose: () => void;
  onConfirmExtension: (
    bookingId: string,
    extraDays: number,
    extensionCost: number,
    newCheckOutDate: string
  ) => void;
}

export const ExtendStayModal: React.FC<ExtendStayModalProps> = ({
  booking,
  isOpen,
  onClose,
  onConfirmExtension,
}) => {
  const [extraDays, setExtraDays] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit / Debit Card' | 'Net Banking'>('UPI');

  if (!isOpen) return null;

  // Calculate price per night
  const pricePerNight = booking.pricePerExtraNight || Math.round(booking.packagePrice / Math.max(1, (booking.duration?.includes('Night') ? parseInt(booking.duration) : 3))) || 3999;
  const extensionSubtotal = pricePerNight * extraDays;
  const taxes = Math.round(extensionSubtotal * 0.12);
  const totalPayable = extensionSubtotal + taxes;

  // Calculate new checkout date
  const computeNewCheckOutDate = (currentDateStr: string, daysToAdd: number) => {
    try {
      const parsedDate = new Date(currentDateStr);
      if (!isNaN(parsedDate.getTime())) {
        const nextDate = new Date(parsedDate);
        nextDate.setDate(nextDate.getDate() + daysToAdd);
        return nextDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      }
    } catch {
      // Fallback
    }
    // Simple parser fallback if date string is like "23 May 2025"
    const parts = currentDateStr.split(' ');
    if (parts.length >= 3) {
      const dayNum = parseInt(parts[0]) || 23;
      const month = parts[1];
      const year = parts[2];
      return `${dayNum + daysToAdd} ${month} ${year}`;
    }
    return `${currentDateStr} (+${daysToAdd} Days)`;
  };

  const newCheckOutDate = computeNewCheckOutDate(booking.checkOutDate, extraDays);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmExtension(booking.id, extraDays, totalPayable, newCheckOutDate);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF5F5] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-red-900/20 animate-scaleUp text-[#450A0A] ring-1 ring-red-950/5">
        {/* Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black font-brand">Extend Your Stay</h2>
              <p className="text-[11px] text-red-100 font-medium">Add extra days with instant room confirmation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-red-200 hover:text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Booking Preview Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-red-900/10 flex items-center gap-3 ring-1 ring-red-950/5 shadow-xs">
            <img
              src={booking.imageUrl}
              alt={booking.title}
              className="w-16 h-16 rounded-xl object-cover border border-red-900/10"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-black uppercase text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Ref: {booking.bookingRef}
              </span>
              <h3 className="text-xs font-black text-red-950 truncate mt-1 font-brand">{booking.title}</h3>
              <p className="text-[11px] text-red-900/70 font-medium">{booking.location}</p>
            </div>
          </div>

          {/* Stay Dates Comparison */}
          <div className="bg-white rounded-2xl p-4 border border-red-900/10 space-y-2.5 ring-1 ring-red-950/5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-red-900">
              <span>Current Schedule:</span>
              <span className="text-red-950 font-black">{booking.checkInDate} → {booking.checkOutDate}</span>
            </div>

            <div className="pt-2 border-t border-red-900/10 flex items-center justify-between text-xs font-bold text-red-950 bg-red-50/60 p-2.5 rounded-xl border border-red-200">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>New Extended Check-out:</span>
              </div>
              <span className="font-black text-sm text-red-700 font-brand">{newCheckOutDate}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-red-800 font-semibold pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>Subject to availability: Same room locked in for extended dates</span>
            </div>
          </div>

          {/* Select Extra Days Counter */}
          <div className="bg-white rounded-2xl p-4 border border-red-900/10 ring-1 ring-red-950/5 shadow-xs">
            <label className="text-xs font-black text-red-950 block mb-2 font-brand">
              Select Number of Extra Days to Add:
            </label>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-red-50/50 p-1 rounded-xl border border-red-900/15">
                <button
                  type="button"
                  onClick={() => setExtraDays(Math.max(1, extraDays - 1))}
                  disabled={extraDays <= 1}
                  className="w-8 h-8 rounded-lg bg-white text-red-950 font-bold flex items-center justify-center hover:bg-red-100 disabled:opacity-40 cursor-pointer shadow-xs border border-red-900/10"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-black text-base text-red-950 font-brand">
                  +{extraDays} {extraDays === 1 ? 'Day' : 'Days'}
                </span>
                <button
                  type="button"
                  onClick={() => setExtraDays(Math.min(14, extraDays + 1))}
                  className="w-8 h-8 rounded-lg bg-white text-red-950 font-bold flex items-center justify-center hover:bg-red-100 cursor-pointer shadow-xs border border-red-900/10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Quick Select pills */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 5].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setExtraDays(d)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-black cursor-pointer transition-all ${
                      extraDays === d
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-red-50 text-red-950 hover:bg-red-100 border border-red-900/10'
                    }`}
                  >
                    +{d}d
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Extended Stay Pricing Breakdown */}
          <div className="bg-white rounded-2xl p-4 border border-red-900/10 space-y-2 text-xs font-semibold ring-1 ring-red-950/5 shadow-xs">
            <h4 className="text-xs font-black text-red-950 uppercase tracking-wider mb-2 font-brand">
              Applicable Charges Breakdown
            </h4>
            <div className="flex justify-between text-red-900/70">
              <span>Tariff per night:</span>
              <span className="font-bold text-red-950">₹{pricePerNight.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-900/70">
              <span>Additional Nights ({extraDays} × ₹{pricePerNight.toLocaleString()}):</span>
              <span className="font-bold text-red-950">₹{extensionSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-900/70">
              <span>Applicable Taxes & Resort Fee (12% GST):</span>
              <span className="font-bold text-red-950">₹{taxes.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-red-900/10 flex justify-between items-baseline font-black text-red-950">
              <span className="text-sm">Total Extension Amount:</span>
              <span className="text-lg text-red-700 font-brand">₹{totalPayable.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl p-3.5 border border-red-900/10 ring-1 ring-red-950/5 shadow-xs">
            <label className="text-[11px] font-bold uppercase text-red-900/70 block mb-2 font-brand">
              Payment Method for Extension
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['UPI', 'Credit / Debit Card', 'Net Banking'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPaymentMethod(m)}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer truncate ${
                    paymentMethod === m
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-red-50/50 text-red-950 border-red-900/15 hover:bg-red-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-red-900/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-red-950 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing}
            className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black py-3 px-5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 font-brand"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Extending Stay...</span>
              </div>
            ) : (
              <span>Confirm & Pay ₹{totalPayable.toLocaleString()}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
