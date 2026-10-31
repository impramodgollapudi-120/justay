import React from 'react';
import { Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/priceFormatter';

export const BookingSummaryCard = ({
  itemTitle,
  itemType = 'hotel',
  location,
  image,
  checkIn,
  checkOut,
  nights = 1,
  guests = { adults: 2, children: 0 },
  subtotal = 0,
  discount = 0,
  taxes = 0,
  total = 0,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-red-900/10 p-6 shadow-xs space-y-6 ring-1 ring-red-950/5">
      <div className="flex gap-4">
        {image && (
          <img src={image} alt={itemTitle} className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-red-900/10" />
        )}
        <div>
          <span className="text-[10px] uppercase font-black tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
            {itemType === 'hotel' ? 'Luxury Stay' : 'Holiday Package'}
          </span>
          <h4 className="text-base font-black text-red-950 mt-1 line-clamp-1 font-brand">{itemTitle}</h4>
          <p className="text-xs text-red-900/70 flex items-center gap-1 mt-0.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-red-600" /> {location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 py-3 border-y border-red-900/10 text-xs text-red-900/70">
        <div>
          <span className="text-red-900/50 block mb-0.5 font-medium">Dates / Duration</span>
          <span className="font-bold text-red-950 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-red-600" />
            {checkIn} - {checkOut} ({nights}N)
          </span>
        </div>
        <div>
          <span className="text-red-900/50 block mb-0.5 font-medium">Guests</span>
          <span className="font-bold text-red-950 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-red-600" />
            {guests.adults} Adults {guests.children > 0 ? `, ${guests.children} Children` : ''}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-red-900/80">
          <span>Base Tariff</span>
          <span className="font-semibold text-red-950">{formatCurrency(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-red-700 font-bold">
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-red-600" /> Coupon Discount</span>
            <span>- {formatCurrency(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-red-900/80">
          <span>GST & Luxury Hospitality Taxes (12%)</span>
          <span className="font-semibold text-red-950">{formatCurrency(taxes)}</span>
        </div>
        <div className="flex justify-between text-base font-black text-red-950 pt-3 border-t border-red-900/10">
          <span>Total Payable Amount</span>
          <span className="text-red-950">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
