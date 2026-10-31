import React from 'react';
import { Check } from 'lucide-react';

export const RoomFacilities = ({ facilities = [] }) => {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {facilities.map((fac, idx) => (
        <li key={idx} className="flex items-center gap-1.5 text-xs text-red-900/80 font-medium">
          <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />
          <span className="line-clamp-1">{fac}</span>
        </li>
      ))}
    </ul>
  );
};

export default RoomFacilities;
