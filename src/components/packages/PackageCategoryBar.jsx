import React from 'react';
import { PACKAGE_CATEGORIES } from '../../constants';
import { Sparkles, Heart, Users, Compass, Flame, Coffee, Crown, Tag } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Heart,
  Users,
  Compass,
  Flame,
  Coffee,
  Crown,
  Tag,
};

export const PackageCategoryBar = ({ activeCategory = 'all', onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
      {PACKAGE_CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Sparkles;
        const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white border border-red-900/10 text-red-950 hover:bg-red-50 ring-1 ring-red-950/5'
            }`}
          >
            <IconComponent
              className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-red-600'}`}
            />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PackageCategoryBar;
