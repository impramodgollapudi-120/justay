import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const PackageHighlights = ({ highlights = [], max = 2 }) => {
  const displayList = highlights.slice(0, max);

  return (
    <ul className="space-y-1.5">
      {displayList.map((highlight, index) => (
        <li key={index} className="flex items-start gap-2 text-xs text-stone-600">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C27F00] shrink-0 mt-0.5" />
          <span className="line-clamp-1 leading-snug">{highlight}</span>
        </li>
      ))}
    </ul>
  );
};

export default PackageHighlights;
