import React from 'react';
import { QrCode, ShieldCheck, Download, Share2 } from 'lucide-react';

export const QRCodeCard = ({ qrCodeData = 'JUSTAY-PASS-CONFIRMED', bookingRef, guestName }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    qrCodeData
  )}`;

  return (
    <div className="bg-white rounded-3xl border border-red-900/10 p-6 text-center shadow-xs max-w-sm mx-auto space-y-4 ring-1 ring-red-950/5">
      <div className="flex items-center justify-center gap-1.5 text-xs font-black text-red-950 uppercase tracking-wider font-brand">
        <ShieldCheck className="w-4 h-4 text-red-600" /> Fast-Track Digital Pass
      </div>

      <div className="p-3 bg-red-50/50 rounded-2xl inline-block border border-red-900/10 shadow-inner">
        <img src={qrUrl} alt="Booking QR Pass" className="w-44 h-44 mx-auto rounded-xl" />
      </div>

      <div>
        <span className="text-[11px] text-red-900/60 block font-medium">Booking Reference</span>
        <span className="font-mono font-bold text-red-950 text-sm bg-red-50 px-2.5 py-0.5 rounded border border-red-200 inline-block mt-0.5">{bookingRef}</span>
      </div>

      {guestName && (
        <div className="text-xs text-red-900/80">
          Guest: <span className="font-bold text-red-950">{guestName}</span>
        </div>
      )}

      <p className="text-[11px] text-red-900/60 leading-normal font-medium">
        Present this dynamic QR code at the resort concierge desk for express biometric key delivery.
      </p>
    </div>
  );
};

export default QRCodeCard;
