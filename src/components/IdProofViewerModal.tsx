import React from 'react';
import { X, ShieldCheck, Download, ZoomIn, CheckCircle2, User, RefreshCw } from 'lucide-react';
import { BookingDetails } from '../types';

interface IdProofViewerModalProps {
  booking: BookingDetails;
  isOpen: boolean;
  onClose: () => void;
  onOpenUpdateModal?: () => void;
}

export const IdProofViewerModal: React.FC<IdProofViewerModalProps> = ({
  booking,
  isOpen,
  onClose,
  onOpenUpdateModal,
}) => {
  if (!isOpen) return null;

  const idType = booking.idProofType || 'Govt. Photo ID (Aadhaar / Passport)';
  const idNumber = booking.idProofNumber || 'XXXX-XXXX-8921';
  const photoUrl = booking.idProofPhotoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF5F5] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-red-900/20 animate-scaleUp text-[#450A0A] ring-1 ring-red-950/5">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-200" />
            <div>
              <h3 className="text-sm font-black font-brand">Digital Check-in ID Pass</h3>
              <p className="text-[10px] text-red-100">Verified ID Photo Copy for Reception Check-in</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-red-200 hover:text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Guest Badge */}
          <div className="bg-white rounded-2xl p-3 border border-red-900/10 flex items-center justify-between text-xs ring-1 ring-red-950/5 shadow-xs">
            <div>
              <span className="text-[10px] text-red-900/60 font-semibold uppercase block">Primary Guest (18+ Verified)</span>
              <span className="font-black text-red-950 font-brand">{booking.userName || 'Guest'}</span>
              {booking.primaryGuestAge && (
                <span className="text-[10px] text-red-700 font-bold block">Age: {booking.primaryGuestAge} years</span>
              )}
            </div>
            <div className="text-right">
              <span className="text-[10px] text-red-900/60 font-semibold uppercase block">ID Document</span>
              <span className="font-bold text-red-900">{idType}</span>
              <span className="text-[10px] font-mono text-red-700 font-bold block">{idNumber}</span>
            </div>
          </div>

          {/* Photo Copy Image Card */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-red-900/20 bg-stone-900 shadow-inner group">
            <img
              src={photoUrl}
              alt="ID Proof Photo Copy"
              className="w-full h-56 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 left-2 bg-red-950/80 backdrop-blur-xs text-red-200 text-[10px] font-black px-2.5 py-1 rounded-md flex items-center gap-1 border border-red-500/40 font-brand">
              <CheckCircle2 className="w-3 h-3 text-red-400" />
              <span>Verified & Approved</span>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
              Original Copy on Record
            </div>
          </div>

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-900/10 text-[11px] text-red-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p>
              Present this photo copy along with your physical ID card at the front desk for instant contactless key handover.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-red-900/10 flex items-center justify-between gap-2">
          {onOpenUpdateModal ? (
            <button
              type="button"
              onClick={onOpenUpdateModal}
              className="text-xs font-bold text-red-700 hover:text-red-900 hover:bg-red-50 border border-red-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Update / Replace ID</span>
            </button>
          ) : (
            <span className="text-[11px] text-red-900/60 font-medium">
              Booking Ref: <strong className="text-red-950">{booking.bookingRef}</strong>
            </span>
          )}

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer font-brand"
          >
            Close ID Pass
          </button>
        </div>
      </div>
    </div>
  );
};
