import React, { useState } from 'react';
import { updateRecord } from '../lib/firebaseData';
import { auth } from '../lib/firebase';
import {
  Luggage,
  Calendar,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Plus,
  Sparkles,
  UserCheck,
  FileText
} from 'lucide-react';
import { BookingDetails } from '../types';
import { ExtendStayModal } from './ExtendStayModal';

interface BookingsScreenProps {
  bookings: BookingDetails[];
  onExplorePackages: () => void;
  onViewBookingDetail: (booking: BookingDetails) => void;
  onUpdateBooking?: (updatedBooking: BookingDetails) => void;
}

export const BookingsScreen: React.FC<BookingsScreenProps> = ({
  bookings,
  onExplorePackages,
  onViewBookingDetail,
  onUpdateBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending_approval' | 'completed' | 'all'>('upcoming');
  const [selectedBookingForExtension, setSelectedBookingForExtension] = useState<BookingDetails | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'pending_approval') return b.status === 'Pending';
    if (activeTab === 'upcoming') return b.status === 'Pending' || b.status === 'Confirmed';
    if (activeTab === 'completed') return b.status === 'Completed';
    return true;
  });

  const handleConfirmExtension = (
    bookingId: string,
    extraDays: number,
    extensionCost: number,
    newCheckOutDate: string
  ) => {
    if (!selectedBookingForExtension) return;
    const updated: BookingDetails = {
      ...selectedBookingForExtension,
      checkOutDate: newCheckOutDate,
      extraDaysAdded: (selectedBookingForExtension.extraDaysAdded || 0) + extraDays,
      totalAmount: selectedBookingForExtension.totalAmount + extensionCost,
      duration: selectedBookingForExtension.duration?.includes('Nights')
        ? `${(parseInt(selectedBookingForExtension.duration) || 3) + extraDays} Nights Stay`
        : selectedBookingForExtension.duration,
      extensionHistory: [
        ...(selectedBookingForExtension.extensionHistory || []),
        {
          id: `ext-${Date.now()}`,
          dateExtended: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          extraDays,
          amountPaid: extensionCost,
          previousCheckOutDate: selectedBookingForExtension.checkOutDate,
          newCheckOutDate,
        },
      ],
    };

    if (onUpdateBooking) {
      onUpdateBooking(updated);
    }
    setToastMessage(`Stay extended by +${extraDays} days until ${newCheckOutDate}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };
  const handleCancelBooking = async (booking: BookingDetails) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel booking ${booking.bookingRef}?`
    );

    if (!confirmed) return;

    try {
      if (!auth?.currentUser) {
        setToastMessage('Please log in to cancel your booking.');
        setTimeout(() => setToastMessage(null), 4000);
        return;
      }

      const bookingUserId = (booking as BookingDetails & { userId?: string }).userId;

      if (bookingUserId !== auth.currentUser.uid) {
        setToastMessage('You can only cancel your own bookings.');
        setTimeout(() => setToastMessage(null), 4000);
        return;
      }

      await updateRecord('bookings', booking.id, {
        status: 'Cancelled',
      });

      onUpdateBooking?.({
        ...booking,
        status: 'Cancelled',
      });

      setToastMessage('Booking cancelled successfully.');
      setActiveTab('all');
      setTimeout(() => setToastMessage(null), 4000);
    } catch (error) {
      console.error('Booking cancellation failed:', error);
      setToastMessage('Unable to cancel booking. Please try again.');
      setTimeout(() => setToastMessage(null), 4000);
    }
  };
  return (
    <div className="pb-28 animate-fadeIn text-[#450A0A]">
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white text-xs font-bold px-5 py-3 rounded-full shadow-2xl border border-red-300 animate-bounce flex items-center gap-2 max-w-md text-center">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bookings Context Toolbar */}
      <div className="backdrop-blur-xl bg-white/90 sm:bg-[#FFF5F5]/90 rounded-3xl p-4 sm:p-5 mb-5 border border-red-900/10 shadow-sm ring-1 ring-red-950/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-xl font-black text-red-950 tracking-tight font-brand">
              My Trips & Bookings
            </h1>
            <span className="text-[11px] font-extrabold text-red-700 bg-red-600/10 px-2.5 py-0.5 rounded-full border border-red-600/20">
              {bookings.length} Bookings
            </span>
          </div>
          <p className="text-xs text-red-900/70 font-medium mt-0.5">
            Manage confirmed itineraries, check-in ID digital passes & stay extensions
          </p>
        </div>
      </div>

      <div>
        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white border border-red-900/15 p-1.5 rounded-2xl mb-5 shadow-2xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'upcoming'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-red-950/70 hover:text-red-950 hover:bg-red-50'
            }`}
          >
            Upcoming
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'completed'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-red-950/70 hover:text-red-950 hover:bg-red-50'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-red-950/70 hover:text-red-950 hover:bg-red-50'
            }`}
          >
            All Bookings
          </button>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-red-900/15 my-6 shadow-2xs max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Luggage className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-extrabold text-red-950 font-brand">
              No {activeTab.replace('_', ' ')} trips found
            </h3>
            <p className="text-xs text-red-900/70 mt-1 max-w-xs mx-auto">
              Plan your next holiday getaway with our curated tourism packages and luxury stays.
            </p>
            <button
              onClick={onExplorePackages}
              className="mt-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Explore Tourism
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => {

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl overflow-hidden border border-red-900/10 shadow-2xs hover:shadow-md hover:border-red-600/40 transition-all group ring-1 ring-red-950/5"
                >
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start">
                    {/* Thumbnail */}
                    <div
                      onClick={() => onViewBookingDetail(b)}
                      className="relative w-full sm:w-32 h-32 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-stone-100 cursor-pointer"
                    >
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-red-950/90 backdrop-blur-xs text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-md">
                        {b.type === 'event' ? 'Event' : b.type === 'package' ? 'Tourism' : 'Room Stay'}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                          Ref: {b.bookingRef}
                        </span>
                        <span className="text-[10px] font-bold text-red-800 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-red-600" />
                          <span>{b.status}</span>
                        </span>
                      </div>

                      <h3
                        onClick={() => onViewBookingDetail(b)}
                        className="text-base font-extrabold text-red-950 truncate mt-1 group-hover:text-red-600 transition-colors cursor-pointer font-brand"
                      >
                        {b.title}
                      </h3>

                      <p className="text-xs text-red-900/70 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="truncate">{b.location}</span>
                      </p>

                      {/* Date and Badges Row */}
                      <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs">
                        <div className="flex items-center gap-1.5 text-red-950 font-bold bg-red-50 px-2.5 py-1 rounded-xl border border-red-200/50">
                          <Calendar className="w-3.5 h-3.5 text-red-600" />
                          <span>{b.checkInDate} → {b.checkOutDate}</span>
                        </div>

                        {b.extraDaysAdded && b.extraDaysAdded > 0 ? (
                          <span className="text-[10px] font-extrabold bg-red-50 text-red-900 border border-red-200 px-2.5 py-1 rounded-xl flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-red-600" />
                            <span>+{b.extraDaysAdded} Days Extended</span>
                          </span>
                        ) : null}

                        {b.primaryGuestAge && (
                          <span className="text-[10px] font-bold text-red-800 bg-red-50 px-2.5 py-1 rounded-xl border border-red-200/50 flex items-center gap-1">
                            <UserCheck className="w-3 h-3 text-red-600" />
                            <span>18+ Verified ({b.primaryGuestAge}y)</span>
                          </span>
                        )}
                      </div>

                      {/* Quick Tourism Preferences Badge */}
                      {b.type === 'package' && b.dietaryPreference && (
                        <div className="mt-1.5 text-[11px] text-red-800/80 font-medium">
                          Preferences: <strong className="text-red-950">{b.dietaryPreference}</strong> • <strong className="text-red-950">{b.transportPreference || 'AC Sedan'}</strong>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="mt-3.5 pt-3 border-t border-red-900/10 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">

                          {/* Extend Stay Button */}
                          {b.type !== 'event' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBookingForExtension(b);
                              }}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-950 border border-red-200 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 text-red-600" />
                              <span>Extend Stay</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-red-950">
                            ₹{b.totalAmount.toLocaleString()}
                          </span>
                          {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                void handleCancelBooking(b);
                              }}
                              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 border border-red-300 rounded-xl text-[11px] font-extrabold transition-colors cursor-pointer"
                            >
                              Cancel Booking
                            </button>
                          )}
                          <button
                            onClick={() => onViewBookingDetail(b)}
                            className="text-xs font-extrabold text-red-600 hover:text-red-700 flex items-center gap-0.5 cursor-pointer bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors"
                          >
                            <span>Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Extend Stay Modal */}
      {selectedBookingForExtension && (
        <ExtendStayModal
          booking={selectedBookingForExtension}
          isOpen={!!selectedBookingForExtension}
          onClose={() => setSelectedBookingForExtension(null)}
          onConfirmExtension={handleConfirmExtension}
        />
      )}
    </div>
  );
};

