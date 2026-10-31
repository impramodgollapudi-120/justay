import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Download,
  Luggage,
  ArrowRight,
  Share2,
  QrCode,
  ShieldCheck,
  Eye,
  Plus,
  Sparkles,
  UtensilsCrossed,
  Car,
  Languages,
  Activity,
  Bed,
  UserCheck
} from 'lucide-react';
import { BookingDetails } from '../types';
import { IdProofViewerModal } from './IdProofViewerModal';
import { ExtendStayModal } from './ExtendStayModal';

interface BookingSuccessScreenProps {
  booking: BookingDetails;
  onGoToBookings: () => void;
  onGoHome: () => void;
  onUpdateBooking?: (updatedBooking: BookingDetails) => void;
}

export const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({
  booking,
  onGoToBookings,
  onGoHome,
  onUpdateBooking,
}) => {
  const [currentBooking, setCurrentBooking] = useState<BookingDetails>(booking);
  const [downloaded, setDownloaded] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [showExtendStayModal, setShowExtendStayModal] = useState(false);
  const [extensionToast, setExtensionToast] = useState<string | null>(null);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleConfirmExtension = (
    bookingId: string,
    extraDays: number,
    extensionCost: number,
    newCheckOutDate: string
  ) => {
    const updated: BookingDetails = {
      ...currentBooking,
      checkOutDate: newCheckOutDate,
      extraDaysAdded: (currentBooking.extraDaysAdded || 0) + extraDays,
      totalAmount: currentBooking.totalAmount + extensionCost,
      duration: currentBooking.duration?.includes('Nights')
        ? `${(parseInt(currentBooking.duration) || 3) + extraDays} Nights Stay`
        : currentBooking.duration,
      extensionHistory: [
        ...(currentBooking.extensionHistory || []),
        {
          id: `ext-${Date.now()}`,
          dateExtended: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          extraDays,
          amountPaid: extensionCost,
          previousCheckOutDate: currentBooking.checkOutDate,
          newCheckOutDate,
        },
      ],
    };
    setCurrentBooking(updated);
    if (onUpdateBooking) {
      onUpdateBooking(updated);
    }
    setExtensionToast(`Stay successfully extended by +${extraDays} days until ${newCheckOutDate}!`);
    setTimeout(() => setExtensionToast(null), 4000);
  };

  return (
    <div className="pb-28 bg-[#FFF5F5] min-h-screen animate-fadeIn p-4 text-[#450A0A]">
      {extensionToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl border border-red-400 animate-bounce flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{extensionToast}</span>
        </div>
      )}

      <div className="max-w-md mx-auto pt-2 space-y-4">
        {/* Success Confirmation Banner */}
        <div className="bg-white rounded-3xl p-6 text-center border border-red-900/10 shadow-xs ring-1 ring-red-950/5">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <span className="text-[10px] font-black uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Booking & ID Verified
          </span>

          <h2 className="text-xl font-black text-red-950 mt-2 font-brand">
            Reservation Confirmed!
          </h2>

          <p className="text-xs text-red-900/75 mt-1 max-w-xs mx-auto">
            Your reservation for <strong className="text-red-950">{currentBooking.title}</strong> is locked in. Digital check-in pass sent to <span className="text-red-950 font-semibold">{currentBooking.userEmail}</span>.
          </p>

          <div className="mt-4 pt-3 border-t border-dashed border-red-900/20 flex items-center justify-between text-xs font-mono">
            <span className="text-red-900/60 font-sans font-medium">Booking Reference:</span>
            <span className="font-bold text-red-950 bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-200">
              {currentBooking.bookingRef}
            </span>
          </div>
        </div>

        {/* Room Check-in ID Proof Pass Card */}
        {currentBooking.idProofPhotoUrl && (
          <div className="bg-white rounded-3xl p-4 border border-red-900/10 shadow-xs space-y-3 ring-1 ring-red-950/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="text-xs font-black text-red-950 uppercase tracking-wide font-brand">
                    Express Check-in ID Pass
                  </h3>
                  <p className="text-[10px] text-red-800 font-medium">
                    18+ Age Verified • Ready for Front Desk Key Handover
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-black uppercase text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                Verified
              </span>
            </div>

            <div className="bg-red-50/40 rounded-2xl p-3 border border-red-900/10 flex items-center gap-3">
              <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-red-600 shrink-0 bg-stone-900">
                <img
                  src={currentBooking.idProofPhotoUrl}
                  alt="ID Proof Thumbnail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-red-900/60 font-bold uppercase block">
                  {currentBooking.idProofType || 'Govt. Photo ID'}
                </span>
                <span className="text-xs font-extrabold text-red-950 font-mono block truncate">
                  {currentBooking.idProofNumber || 'XXXX-XXXX-4821'}
                </span>
                <span className="text-[10px] text-red-600 font-bold block">
                  Primary Guest: {currentBooking.userName} ({currentBooking.primaryGuestAge || 26} yrs)
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowIdModal(true)}
                className="p-2 text-red-950 bg-white hover:bg-red-50 border border-red-900/20 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-red-600" />
                <span>View ID</span>
              </button>
            </div>
          </div>
        )}

        {/* Boarding Pass / Ticket Summary Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-red-900/10 shadow-xs relative ring-1 ring-red-950/5">
          {/* Trip Header Image */}
          <div className="relative h-28 w-full bg-stone-900">
            <img
              src={currentBooking.imageUrl}
              alt={currentBooking.title}
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex items-end p-4">
              <div>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block">
                  {currentBooking.type === 'event'
                    ? `Resort Event (${currentBooking.eventType || 'Celebration'})`
                    : currentBooking.type === 'package'
                    ? 'Tourism Package'
                    : 'Room Reservation'}
                </span>
                <h3 className="text-base font-black text-white leading-tight font-brand">
                  {currentBooking.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-4 space-y-3">
            {currentBooking.type === 'event' ? (
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-red-50/40 p-2.5 rounded-xl border border-red-900/10">
                    <span className="text-[10px] text-red-900/60 font-semibold block">Event Date</span>
                    <span className="font-extrabold text-red-950">{currentBooking.checkInDate}</span>
                  </div>

                  <div className="bg-red-50 p-2.5 rounded-xl border border-red-200">
                    <span className="text-[10px] text-red-900 font-semibold block">Booking Time Slot</span>
                    <span className="font-extrabold text-red-950">{currentBooking.eventTimeSlot || 'Custom Hours'}</span>
                  </div>
                </div>

                <div className="bg-red-50/40 p-2.5 rounded-xl border border-red-900/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-red-900/60 font-semibold block">Catering Requirement</span>
                    <span className="font-extrabold text-red-950">
                      {currentBooking.foodRequired ? (currentBooking.foodPackageName || 'Buffet Catering Included') : 'Venue-Only (No Catering)'}
                    </span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${currentBooking.foodRequired ? 'bg-red-100 text-red-900 border border-red-200' : 'bg-stone-200 text-stone-700'}`}>
                    {currentBooking.foodRequired ? 'Food Included' : 'Venue Only'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-red-50/40 p-2.5 rounded-xl border border-red-900/10">
                    <span className="text-[10px] text-red-900/60 font-semibold block">Check-in</span>
                    <span className="font-extrabold text-red-950">{currentBooking.checkInDate}</span>
                    <span className="text-[10px] text-red-900/70 block">From 12:00 PM</span>
                  </div>

                  <div className="bg-red-50/40 p-2.5 rounded-xl border border-red-900/10">
                    <span className="text-[10px] text-red-900/60 font-semibold block">Check-out</span>
                    <span className="font-extrabold text-red-950">{currentBooking.checkOutDate}</span>
                    <span className="text-[10px] text-red-900/70 block">Until 11:00 AM</span>
                  </div>
                </div>

                {/* Extended stay info if active */}
                {currentBooking.extraDaysAdded && currentBooking.extraDaysAdded > 0 ? (
                  <div className="p-2.5 bg-red-50 rounded-xl border border-red-200 text-xs flex items-center justify-between text-red-950 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-red-600" />
                      <span>Extended Stay Active (+{currentBooking.extraDaysAdded} Extra Days)</span>
                    </span>
                    <span className="text-[11px] text-red-700 font-bold">Confirmed</span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Tourism Preferences Summary (if Package / Tourism) */}
            {currentBooking.type === 'package' && (currentBooking.dietaryPreference || currentBooking.transportPreference) && (
              <div className="bg-red-50/40 rounded-2xl p-3 border border-red-900/10 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-red-950 font-extrabold pb-1 border-b border-red-900/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <span>Custom Tourism Preferences</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-red-900/60 block">Meals:</span>
                    <span className="font-bold text-red-950">{currentBooking.dietaryPreference || 'Vegetarian'}</span>
                  </div>
                  <div>
                    <span className="text-red-900/60 block">Transport:</span>
                    <span className="font-bold text-red-950">{currentBooking.transportPreference || 'Private AC Sedan'}</span>
                  </div>
                  <div>
                    <span className="text-red-900/60 block">Guide:</span>
                    <span className="font-bold text-red-950">{currentBooking.guideLanguage || 'English'}</span>
                  </div>
                  <div>
                    <span className="text-red-900/60 block">Tour Pace:</span>
                    <span className="font-bold text-red-950">{currentBooking.activityPace || 'Relaxed'}</span>
                  </div>
                </div>
                {currentBooking.specialRequests && (
                  <div className="pt-1 text-[11px] text-red-900/80">
                    <strong className="text-red-950">Special Request:</strong> {currentBooking.specialRequests}
                  </div>
                )}
              </div>
            )}

            {/* Guest Summary row */}
            <div className="flex items-center justify-between text-xs py-1.5 border-b border-red-900/10">
              <span className="text-red-900/70">{currentBooking.type === 'event' ? 'Expected Attendees:' : 'Guests & Rooms:'}</span>
              <span className="font-extrabold text-red-950">
                {currentBooking.type === 'event' ? `${currentBooking.guestsCount} Guests` : `${currentBooking.guestsCount} Adults, ${currentBooking.roomsCount} Room`}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1.5 border-b border-red-900/10">
              <span className="text-red-900/70">Payment Paid via:</span>
              <span className="font-extrabold text-red-950">{currentBooking.paymentMethod}</span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-extrabold text-red-950">Total Amount Paid:</span>
              <span className="text-base font-black text-red-950">₹{currentBooking.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Extend Stay Action Button */}
          {currentBooking.type !== 'event' && (
            <div className="p-3 bg-red-50/50 border-t border-red-900/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-red-950 block">Want to stay longer?</span>
                <span className="text-[10px] text-red-900/70">Add extra days subject to room availability</span>
              </div>
              <button
                type="button"
                onClick={() => setShowExtendStayModal(true)}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Extend Stay</span>
              </button>
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            id="btn-success-download"
            onClick={handleDownload}
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{downloaded ? 'Confirmation Voucher Saved!' : 'Download Boarding Pass & ID Pass'}</span>
          </button>

          <button
            id="btn-success-view-bookings"
            onClick={onGoToBookings}
            className="w-full bg-white hover:bg-red-50 text-red-950 border border-red-900/20 font-extrabold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Luggage className="w-4 h-4 text-red-600" />
            <span>View in My Bookings</span>
            <ArrowRight className="w-4 h-4 text-red-600" />
          </button>

          <button
            id="btn-success-home"
            onClick={onGoHome}
            className="w-full text-center text-xs font-bold text-red-900/70 hover:text-red-950 py-2 cursor-pointer transition-colors"
          >
            Return to Home Screen
          </button>
        </div>
      </div>

      {/* ID Proof Full-view Modal */}
      <IdProofViewerModal
        booking={currentBooking}
        isOpen={showIdModal}
        onClose={() => setShowIdModal(false)}
      />

      {/* Extend Stay Modal */}
      <ExtendStayModal
        booking={currentBooking}
        isOpen={showExtendStayModal}
        onClose={() => setShowExtendStayModal(false)}
        onConfirmExtension={handleConfirmExtension}
      />
    </div>
  );
};
