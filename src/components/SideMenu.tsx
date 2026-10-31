import React from 'react';
import {
  X,
  Home,
  Building2,
  Briefcase,
  Tag,
  Luggage,
  Heart,
  User,
  ShieldCheck,
  Headphones,
  Sparkles,
  Phone
} from 'lucide-react';
import { ScreenType, NavTabType } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType, tab?: NavTabType) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const menuLinks = [
    { label: 'Home', icon: Home, screen: 'home' as ScreenType, tab: 'home' as NavTabType },
    { label: 'Events Booking', icon: Sparkles, screen: 'events' as ScreenType, tab: 'events' as NavTabType },
    { label: 'Resorts & Stays', icon: Building2, screen: 'stays' as ScreenType, tab: 'stays' as NavTabType },
    { label: 'Tourism Packages', icon: Briefcase, screen: 'packages' as ScreenType, tab: 'packages' as NavTabType },
    { label: 'Exclusive Offers', icon: Tag, screen: 'offers' as ScreenType, tab: 'offers' as NavTabType },
    { label: 'My Bookings', icon: Luggage, screen: 'bookings' as ScreenType, tab: 'bookings' as NavTabType },
    { label: 'Saved Wishlist', icon: Heart, screen: 'wishlist' as ScreenType, tab: 'wishlist' as NavTabType },
    { label: 'My Account', icon: User, screen: 'profile' as ScreenType, tab: 'profile' as NavTabType },
  ];

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-4/5 max-w-xs bg-[#FFF5F5] text-[#450A0A] h-full shadow-2xl flex flex-col justify-between p-5 animate-slideIn border-r border-red-900/20">
        <div>
          {/* Top Row */}
          <div className="flex items-center justify-between pb-4 border-b border-red-900/15">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                J
              </div>
              <div>
                <span className="font-extrabold text-red-950 tracking-wider font-brand block">
                  JUSTAY
                </span>
                <span className="text-[9px] text-red-700/80 font-semibold uppercase">
                  Stay • Experience • Memories
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-red-800/70 hover:text-red-950 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Preview */}
          <div className="my-4 bg-red-600/10 p-3 rounded-2xl border border-red-900/15 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Pramod"
              className="w-10 h-10 rounded-full object-cover border border-red-600"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <span className="text-xs font-extrabold text-red-950 block truncate">
                Guest
              </span>
              <span className="text-[10px] text-red-600 font-bold">
                VIP Platinum • 4,800 Pts
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-1 mt-2">
            {menuLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigate(item.screen, item.tab);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-950 hover:text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-red-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Support */}
        <div className="pt-4 border-t border-red-900/15 space-y-2 text-xs font-semibold text-red-900/70">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-red-600" />
            <span>24/7 Helpline: </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
            <span>100% Verified Stays & Tours</span>
          </div>
        </div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
