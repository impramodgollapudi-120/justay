import React, { useState } from 'react';
import {
  Compass,
  Building2,
  Briefcase,
  Tag,
  Luggage,
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Heart,
  ChevronRight,
  Send,
  Lock,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { ScreenType, NavTabType } from '../types';

interface FooterProps {
  onNavigateTab?: (tab: NavTabType, screen?: ScreenType) => void;
  onOpenNotifications?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenNotifications }) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
      }, 4000);
    }
  };

  return (
    <footer className="mt-16 w-full relative z-20">
      {/* Glassmorphism Outer Container */}
      <div className="backdrop-blur-2xl bg-white/80 sm:bg-[#FFF5F5]/90 border-t border-red-900/10 shadow-[0_-12px_40px_rgba(220,38,38,0.03)] px-4 sm:px-8 lg:px-12 pt-12 pb-24 md:pb-12 text-[#450A0A]">
        <div className="max-w-[1440px] mx-auto">
          {/* Trust Guarantees Glass Cards Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="backdrop-blur-md bg-white/70 border border-red-900/10 rounded-2xl p-4.5 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-11 h-11 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-red-950">100% Verified Stays</h4>
                <p className="text-[11px] text-red-900/60 mt-0.5">Strict quality & hygiene audits</p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/70 border border-red-900/10 rounded-2xl p-4.5 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-11 h-11 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-red-950">Best Rate Assurance</h4>
                <p className="text-[11px] text-red-900/60 mt-0.5">Direct partner exclusive pricing</p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/70 border border-red-900/10 rounded-2xl p-4.5 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-11 h-11 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-red-950">24/7 VIP Concierge</h4>
                <p className="text-[11px] text-red-900/60 mt-0.5">Dedicated travel support line</p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/70 border border-red-900/10 rounded-2xl p-4.5 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-11 h-11 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-red-950">Instant Digital Pass</h4>
                <p className="text-[11px] text-red-900/60 mt-0.5">256-bit encrypted checkout</p>
              </div>
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-red-900/10">
            {/* Brand Statement (col-span-4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 flex items-center justify-center text-red-600">
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
                    Stay • Experience • Memories
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-red-900/70 leading-relaxed max-w-sm">
                India's premier luxury resort booking and experiential holiday platform. Curating timeless escapes across coastal paradises, royal havelis, and misty mountain chalets.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-red-900/70">
                <span className="flex items-center gap-1 font-semibold text-red-950">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  Verified Luxury Partner
                </span>
                <span>•</span>
                <span>ISO 9001:2025</span>
              </div>
            </div>

            {/* Quick Navigation (col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-red-950">
                Explore
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-red-900/75">
                <li>
                  <button
                    onClick={() => onNavigateTab?.('home', 'home')}
                    className="hover:text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-red-600" />
                    Featured Escapes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateTab?.('stays', 'stays')}
                    className="hover:text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-red-600" />
                    Luxury Resorts & Villas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateTab?.('packages', 'packages')}
                    className="hover:text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-red-600" />
                    Holiday Itineraries
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateTab?.('offers', 'offers')}
                    className="hover:text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-red-600" />
                    Exclusive Member Offers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateTab?.('wishlist', 'wishlist')}
                    className="hover:text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-red-600" />
                    Saved Wishlist
                  </button>
                </li>
              </ul>
            </div>

            {/* Popular Destinations (col-span-3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-red-950">
                Top Destinations
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-red-900/75">
                <li className="flex items-center justify-between">
                  <span className="hover:text-red-600 transition-colors cursor-pointer">Goa Beachfront Suites</span>
                  <span className="text-[10px] text-red-700 bg-red-600/10 px-2 py-0.5 rounded-full font-bold">120+ Stays</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="hover:text-red-600 transition-colors cursor-pointer">Udaipur Royal Palaces</span>
                  <span className="text-[10px] text-red-700 bg-red-600/10 px-2 py-0.5 rounded-full font-bold">85+ Stays</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="hover:text-red-600 transition-colors cursor-pointer">Manali Mountain Chalets</span>
                  <span className="text-[10px] text-red-700 bg-red-600/10 px-2 py-0.5 rounded-full font-bold">64+ Stays</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="hover:text-red-600 transition-colors cursor-pointer">Kerala Ayurvedic Backwaters</span>
                  <span className="text-[10px] text-red-700 bg-red-600/10 px-2 py-0.5 rounded-full font-bold">92+ Stays</span>
                </li>
              </ul>
            </div>

            {/* VIP Club Glass Card (col-span-3) */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-xl bg-white/70 border border-red-900/10 rounded-3xl p-5 shadow-xs space-y-3 ring-1 ring-red-950/5">
                <div className="flex items-center gap-2 text-red-950">
                  <Sparkles className="w-4 h-4 text-red-600" />
                  <h4 className="text-xs sm:text-sm font-extrabold text-red-950">
                    JUSTAY VIP Pass
                  </h4>
                </div>
                <p className="text-xs text-red-900/70 leading-relaxed">
                  Join 40,000+ elite travelers for private flash discounts and complimentary room upgrades.
                </p>

                {isSubscribed ? (
                  <div className="bg-red-50 border border-red-200 text-red-900 text-xs rounded-xl p-2.5 flex items-center gap-2 font-bold animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Welcome to VIP Club! Use code VIPJUSTAY</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-white/95 border border-red-900/20 rounded-xl px-3.5 py-2 text-xs font-semibold text-red-950 placeholder:text-red-900/40 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer shadow-red-950/10"
                    >
                      <span>Get VIP Access</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Security Badges */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-900/60">
            <p>© {new Date().getFullYear()} JUSTAY Hospitality Pvt Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-red-600 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-red-600 cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-red-600 cursor-pointer transition-colors">Cancellation Terms</span>
              <span className="hover:text-red-600 cursor-pointer transition-colors">Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
