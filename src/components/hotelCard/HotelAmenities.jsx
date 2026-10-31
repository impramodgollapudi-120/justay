import React from 'react';
import { Wifi, Waves, Sparkles, Coffee, Car, Shield, Eye } from 'lucide-react';

const ICON_MAP = {
  'Swimming Pool': Waves,
  'Free High-Speed Wi-Fi': Wifi,
  'Spa & Wellness': Sparkles,
  'Complimentary Breakfast': Coffee,
  'Airport Transfers': Car,
  'Private Jacuzzi': Waves,
  'Fine-Dining Restaurant': Coffee,
  '24/7 Butler Service': Shield,
  'Ocean / Mountain View': Eye,
};

export const HotelAmenities = ({ amenities = [], max = 4 }) => {
  const visible = amenities.slice(0, max);
  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((amenity, idx) => {
        const Icon = ICON_MAP[amenity] || Sparkles;
        return (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50/50 text-red-950 text-[11px] font-semibold rounded-lg border border-red-900/10"
          >
            <Icon className="w-3.5 h-3.5 text-red-600" />
            {amenity}
          </span>
        );
      })}
      {amenities.length > max && (
        <span className="inline-flex items-center px-2 py-1 bg-red-50/30 text-red-900/60 text-[11px] font-semibold rounded-lg border border-red-900/10">
          +{amenities.length - max} more
        </span>
      )}
    </div>
  );
};

export default HotelAmenities;
