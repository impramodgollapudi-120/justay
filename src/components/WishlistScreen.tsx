import React from 'react';
import { Heart, Star, ArrowRight, Trash2 } from 'lucide-react';
import { TravelPackage, StayProperty } from '../types';

interface WishlistScreenProps {
  packages: TravelPackage[];
  stays: StayProperty[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onSelectPackage: (pkg: TravelPackage) => void;
  onSelectStay: (stay: StayProperty) => void;
  onExplore: () => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  packages,
  stays,
  wishlistIds,
  onToggleWishlist,
  onSelectPackage,
  onSelectStay,
  onExplore,
}) => {
  const savedPackages = packages.filter((p) => wishlistIds.includes(p.id));
  const savedStays = stays.filter((s) => wishlistIds.includes(s.id));
  const totalSaved = savedPackages.length + savedStays.length;

  return (
    <div className="pb-28 animate-fadeIn bg-[#FFF5F5] min-h-screen text-[#450A0A]">
      {/* Wishlist Context Toolbar */}
      <div className="backdrop-blur-xl bg-white/90 sm:bg-[#FFF5F5]/90 rounded-3xl p-4 sm:p-5 mb-5 border border-red-900/10 shadow-xs ring-1 ring-red-950/5 flex items-center justify-between">
        <div>
          <h1 className="text-base sm:text-lg font-black text-red-950 tracking-tight font-brand">
            My Saved Wishlist
          </h1>
          <p className="text-xs text-red-900/70 font-medium">
            Saved luxury properties and vacation packages for your upcoming travels
          </p>
        </div>
        <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200 shrink-0">
          {totalSaved} Saved
        </span>
      </div>

      <div>
        {totalSaved === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-red-900/10 my-6 shadow-xs ring-1 ring-red-950/5">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Heart className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h3 className="text-sm font-black text-red-950 font-brand">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-red-900/70 mt-1 max-w-xs mx-auto">
              Tap the heart icon on any package or stay to save it for quick booking later.
            </p>
            <button
              onClick={onExplore}
              className="mt-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold px-5 py-2.5 rounded-2xl shadow-xs transition-colors cursor-pointer"
            >
              Explore Packages & Stays
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedPackages.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-red-900/70 mb-2.5 font-brand">
                  Saved Packages ({savedPackages.length})
                </h3>
                <div className="space-y-3">
                  {savedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onSelectPackage(pkg)}
                      className="bg-white rounded-3xl overflow-hidden border border-red-900/10 shadow-xs p-3.5 flex gap-3.5 cursor-pointer group hover:shadow-md hover:border-red-600/30 transition-all ring-1 ring-red-950/5"
                    >
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-red-900/10">
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-black text-red-950 truncate font-brand">
                              {pkg.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleWishlist(pkg.id);
                              }}
                              className="text-red-900/40 hover:text-red-600 p-1 cursor-pointer transition-colors"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-red-900/70 mt-0.5">{pkg.duration}</p>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-red-950 mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{pkg.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between pt-2 border-t border-red-900/10">
                          <span className="text-xs font-black text-red-950">
                            ₹{pkg.price.toLocaleString()}
                          </span>
                          <span className="text-[11px] font-bold text-red-600 group-hover:translate-x-0.5 transition-transform">Book Now →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {savedStays.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-black uppercase tracking-wider text-red-900/70 mb-2.5 font-brand">
                  Saved Hotels & Stays ({savedStays.length})
                </h3>
                <div className="space-y-3">
                  {savedStays.map((stay) => (
                    <div
                      key={stay.id}
                      onClick={() => onSelectStay(stay)}
                      className="bg-white rounded-3xl overflow-hidden border border-red-900/10 shadow-xs p-3.5 flex gap-3.5 cursor-pointer group hover:shadow-md hover:border-red-600/30 transition-all ring-1 ring-red-950/5"
                    >
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-red-900/10">
                        <img
                          src={stay.imageUrl}
                          alt={stay.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-black text-red-950 truncate font-brand">
                              {stay.name}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleWishlist(stay.id);
                              }}
                              className="text-red-900/40 hover:text-red-600 p-1 cursor-pointer transition-colors"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-red-900/70 mt-0.5">{stay.location}</p>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-red-950 mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{stay.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between pt-2 border-t border-red-900/10">
                          <span className="text-xs font-black text-red-950">
                            ₹{stay.pricePerNight.toLocaleString()}/night
                          </span>
                          <span className="text-[11px] font-bold text-red-600 group-hover:translate-x-0.5 transition-transform">View Stay →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
