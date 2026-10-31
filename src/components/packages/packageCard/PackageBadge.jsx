import React from 'react';
import { Sparkles, Heart, Crown, Award, Flame } from 'lucide-react';

export const PackageBadge = ({ badge = 'Best Seller' }) => {
  const getBadgeStyle = () => {
    switch (badge.toLowerCase()) {
      case 'trending now':
      case 'trending':
        return {
          bg: 'bg-red-600 text-white shadow-xs',
          icon: Flame,
        };
      case 'luxury handpicked':
      case 'luxury':
        return {
          bg: 'bg-gradient-to-r from-red-950 to-red-900 text-red-200 border border-red-500/30 shadow-xs',
          icon: Crown,
        };
      case 'honeymoon special':
      case 'honeymoon':
        return {
          bg: 'bg-red-600 text-white shadow-xs',
          icon: Heart,
        };
      case 'best seller':
      default:
        return {
          bg: 'bg-red-700 text-white shadow-xs',
          icon: Award,
        };
    }
  };

  const style = getBadgeStyle();
  const Icon = style.icon || Sparkles;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${style.bg}`}
    >
      <Icon className="w-3 h-3" />
      {badge}
    </span>
  );
};

export default PackageBadge;
