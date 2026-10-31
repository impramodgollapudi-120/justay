import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export const BookingStatus = ({ status = 'Confirmed' }) => {
  const getStatusBadge = () => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return {
          bg: 'bg-red-50 text-red-800 border-red-200',
          icon: CheckCircle2,
          text: 'Booking Confirmed',
        };
      case 'cancelled':
        return {
          bg: 'bg-red-100/60 text-red-900 border-red-300',
          icon: XCircle,
          text: 'Cancelled',
        };
      default:
        return {
          bg: 'bg-red-50/80 text-red-900 border-red-200',
          icon: Clock,
          text: status,
        };
    }
  };

  const current = getStatusBadge();
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${current.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {current.text}
    </span>
  );
};

export default BookingStatus;
