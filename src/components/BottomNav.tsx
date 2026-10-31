import React from 'react';
import { Home, CalendarCheck, Briefcase, PartyPopper, Heart, User } from 'lucide-react';
import { NavTabType } from '../types';

interface BottomNavProps {
  activeTab: NavTabType;
  onTabChange: (tab: NavTabType) => void;
  savedCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  savedCount = 0,
}) => {
  const tabs = [
    { id: 'home' as NavTabType, label: 'Home', icon: Home },
    { id: 'events' as NavTabType, label: 'Events', icon: PartyPopper },
    { id: 'bookings' as NavTabType, label: 'Bookings', icon: CalendarCheck },
    { id: 'packages' as NavTabType, label: 'Tourism', icon: Briefcase },
    { id: 'wishlist' as NavTabType, label: 'Wishlist', icon: Heart, badge: savedCount > 0 ? savedCount : undefined },
  ];

  return (
    <nav className="md:hidden backdrop-blur-2xl bg-white/90 border-t border-red-900/10 fixed bottom-0 left-0 right-0 z-40 shadow-[0_-8px_32px_rgba(220,38,38,0.06)] ring-1 ring-red-950/5 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-around py-2.5 px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all relative cursor-pointer group ${
                isActive ? 'text-red-600 font-bold' : 'text-red-950/60 hover:text-red-600'
              }`}
            >
              <div className={`relative p-1 rounded-xl transition-all ${isActive ? 'bg-red-600/15 scale-105' : 'group-hover:bg-red-50'}`}>
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5] text-red-600' : 'stroke-[1.8]'}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs border border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'text-red-600 font-bold' : 'text-red-950/70'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
