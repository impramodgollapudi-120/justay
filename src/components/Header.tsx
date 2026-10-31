import React from 'react';
import { Menu, Bell, Building2, Briefcase, Tag, Luggage, Heart, Compass, PartyPopper } from 'lucide-react';
import { ScreenType, NavTabType } from '../types';
import { getAuth } from 'firebase/auth';

interface HeaderProps {
onOpenMenu: () => void;
onOpenNotifications: () => void;
onOpenProfile: () => void;
onNavigateHome: () => void;
currentScreen: ScreenType;
activeTab?: NavTabType;
onNavigateTab?: (tab: NavTabType, screen?: ScreenType) => void;
savedCount?: number;
unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
onOpenMenu,
onOpenNotifications,
onOpenProfile,
onNavigateHome,
currentScreen,
activeTab = 'home',
onNavigateTab,
savedCount = 0,
unreadNotificationsCount = 0,
}) => {
const user = getAuth().currentUser;

const displayName =
user?.displayName ||
user?.email?.split('@')[0] ||
'Guest';

const profileImage =
user?.photoURL ||
`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=f3f4f6&color=991b1b`;

const navLinks = [
{ id: 'home' as NavTabType, screen: 'home' as ScreenType, label: 'Home', icon: Compass },
{ id: 'events' as NavTabType, screen: 'events' as ScreenType, label: 'Events Booking', icon: PartyPopper },
{ id: 'stays' as NavTabType, screen: 'stays' as ScreenType, label: 'Resorts & Stays', icon: Building2 },
{ id: 'packages' as NavTabType, screen: 'packages' as ScreenType, label: 'Tourism', icon: Briefcase },
{ id: 'offers' as NavTabType, screen: 'offers' as ScreenType, label: 'Offers', icon: Tag },
{ id: 'bookings' as NavTabType, screen: 'bookings' as ScreenType, label: 'My Bookings', icon: Luggage },
{ id: 'wishlist' as NavTabType, screen: 'wishlist' as ScreenType, label: 'Wishlist', icon: Heart, badge: savedCount > 0 ? savedCount : undefined },
];

return ( <header className="backdrop-blur-2xl bg-white/90 sm:bg-[#FFF5F5]/90 border-b border-red-900/10 sticky top-0 z-30 px-4 sm:px-8 py-3.5 shadow-[0_4px_30px_rgba(220,38,38,0.04)] ring-1 ring-red-950/5 transition-all"> <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
{/* Left: Mobile hamburger menu & Brand Logo */} <div className="flex items-center gap-3"> <button
         id="btn-header-menu"
         onClick={onOpenMenu}
         className="md:hidden p-2.5 -ml-1 text-red-950 hover:text-red-700 hover:bg-red-600/10 rounded-full transition-colors cursor-pointer"
         aria-label="Open Navigation Menu"
       > <Menu className="w-6 h-6 stroke-[2.2]" /> </button>

```
      {/* Brand Logo */}
      <div
        id="btn-header-brand"
        onClick={onNavigateHome}
        className="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        <div className="relative w-9 h-9 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform shrink-0">
          <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current">
            <path d="M50 15 C45 35, 20 40, 20 65 C20 80, 35 85, 50 85 C65 85, 80 80, 80 65 C80 40, 55 35, 50 15 Z" fill="#DC2626" opacity="0.95" />
            <path d="M50 25 C42 42, 10 50, 10 68 C10 82, 28 88, 50 88 C72 88, 90 82, 90 68 C90 50, 58 42, 50 25 Z" fill="#991B1B" opacity="0.4" />
            <path d="M50 35 C46 50, 32 55, 32 72 C32 82, 40 85, 50 85 C60 85, 68 82, 68 72 C68 55, 54 50, 50 35 Z" fill="#D97706" />
            <circle cx="50" cy="55" r="4" fill="#FFF5F5" />
          </svg>
        </div>

        <div className="flex flex-col leading-none">
          <span className="font-extrabold tracking-[0.2em] text-2xl text-red-950 font-brand">
            JUSTAY
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.16em] font-semibold text-red-700/80 uppercase mt-0.5">
            Luxury Stays • Tourism & Tours
          </span>
        </div>
      </div>
    </div>

    {/* Center: Desktop Navigation */}
    <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 backdrop-blur-md bg-white/80 p-1.5 rounded-full border border-red-900/10 shadow-[0_2px_12px_rgba(220,38,38,0.04)] ring-1 ring-red-950/5">
      {navLinks.map((item) => {
        const Icon = item.icon;
        const isCurrent =
          currentScreen === item.screen ||
          (item.id === 'home' && currentScreen === 'home') ||
          (item.id === 'bookings' && currentScreen === 'bookings') ||
          (item.id === 'stays' && (currentScreen === 'stays' || currentScreen === 'stay_detail')) ||
          (item.id === 'packages' && (currentScreen === 'packages' || currentScreen === 'package_detail')) ||
          (item.id === 'wishlist' && currentScreen === 'wishlist') ||
          (item.id === 'offers' && currentScreen === 'offers');

        return (
          <button
            key={item.id}
            onClick={() => {
              if (onNavigateTab) {
                onNavigateTab(item.id, item.screen);
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isCurrent
                ? 'bg-red-600 text-white shadow-md shadow-red-950/20'
                : 'text-red-950/80 hover:text-red-950 hover:bg-red-50'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isCurrent ? 'bg-white text-red-600' : 'bg-red-600 text-white'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>

    {/* Right: Notifications & Dynamic User Profile */}
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        id="btn-header-notifications"
        onClick={onOpenNotifications}
        className="relative p-2.5 text-red-950 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer border border-transparent hover:border-red-200"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5 stroke-[2.2]" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#FFF5F5] shadow-xs animate-pulse">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      <button
        id="btn-header-avatar"
        onClick={onOpenProfile}
        className="flex items-center gap-2.5 pl-1.5 pr-2.5 sm:pr-3.5 py-1 rounded-full border border-red-900/10 hover:border-red-600/50 backdrop-blur-md bg-white/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer ring-1 ring-red-950/5"
        aria-label="User profile"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-red-600/80">
          <img
            src={profileImage}
            alt={`${displayName} Profile`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="hidden sm:flex flex-col text-left leading-none">
          <span className="text-xs font-bold text-red-950">
            {displayName}
          </span>
          <span className="text-[10px] text-red-600 font-semibold mt-0.5">
            Member
          </span>
        </div>
      </button>
    </div>
  </div>
</header>

);
};
