import React, { useState, useMemo } from 'react';
import { ArrowLeft, SlidersHorizontal, Search, Star, Heart, ZoomIn, Compass } from 'lucide-react';
import { TravelPackage, PackageCategory } from '../types';

interface PackagesScreenProps {
  packages: TravelPackage[];
  onBack: () => void;
  onSelectPackage: (pkg: TravelPackage) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  initialCategory?: string;
}

export const PackagesScreen: React.FC<PackagesScreenProps> = ({
  packages,
  onBack,
  onSelectPackage,
  wishlistIds,
  onToggleWishlist,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory>(
    (initialCategory as PackageCategory) || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating'>('recommended');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categories: PackageCategory[] = ['All', 'Beach', 'Hills', 'Adventure', 'Family', 'Heritage'];

  const filteredPackages = useMemo(() => {
    let result = packages.filter((pkg) => {
      const matchesCategory =
        selectedCategory === 'All' || pkg.category === selectedCategory;
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [packages, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pb-28 animate-fadeIn text-red-950">
      {/* Tourism Search & Header Toolbar */}
      <div className="backdrop-blur-xl bg-white/90 sm:bg-[#FFF5F5]/90 rounded-2xl p-3.5 sm:p-4 mb-4 border border-red-900/10 shadow-[0_4px_20px_rgba(220,38,38,0.03)] ring-1 ring-red-950/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="btn-packages-back"
              onClick={onBack}
              className="p-1.5 text-red-950 hover:text-red-600 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-red-950 tracking-tight font-brand">
                  Tourism & Guided Tours
                </h1>
                <span className="text-[11px] font-bold text-red-700 bg-red-600/10 px-2.5 py-0.5 rounded-full border border-red-600/20">
                  {filteredPackages.length} Curated
                </span>
              </div>
              <p className="text-xs text-red-900/70 font-medium">
                Handpicked all-inclusive luxury tourism itineraries with custom travel preferences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-red-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-search-packages"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tourism & destinations..."
                className="w-full bg-white border border-red-900/20 rounded-full pl-9 pr-8 py-2 text-xs font-medium text-red-950 placeholder:text-red-900/40 shadow-2xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-900/40 hover:text-red-950 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown button */}
            <div className="relative">
              <button
                id="btn-packages-filter"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="p-2 sm:px-3 py-2 bg-white hover:bg-red-50 border border-red-900/20 rounded-full text-xs font-bold text-red-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                aria-label="Filter tourism packages"
              >
                <SlidersHorizontal className="w-4 h-4 text-red-600" />
                <span className="hidden sm:inline">Sort</span>
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-red-900/15 py-1.5 z-30 animate-fadeIn ring-1 ring-red-950/5">
                  <div className="px-3 py-1 text-[11px] font-bold text-red-900/50 uppercase tracking-wider">
                    Sort Tourism
                  </div>
                  <button
                    onClick={() => { setSortBy('recommended'); setShowSortDropdown(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium ${sortBy === 'recommended' ? 'text-red-950 font-bold bg-red-50' : 'text-red-950 hover:bg-red-50'}`}
                  >
                    Recommended
                  </button>
                  <button
                    onClick={() => { setSortBy('price_low'); setShowSortDropdown(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium ${sortBy === 'price_low' ? 'text-red-950 font-bold bg-red-50' : 'text-red-950 hover:bg-red-50'}`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => { setSortBy('price_high'); setShowSortDropdown(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium ${sortBy === 'price_high' ? 'text-red-950 font-bold bg-red-50' : 'text-red-950 hover:bg-red-50'}`}
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => { setSortBy('rating'); setShowSortDropdown(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium ${sortBy === 'rating' ? 'text-red-950 font-bold bg-red-50' : 'text-red-950 hover:bg-red-50'}`}
                  >
                    Highest Rated
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pt-2 border-t border-red-900/10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`cat-pill-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-red-950 border border-red-900/20 hover:border-red-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Section Title */}
        <h2 className="text-base font-extrabold text-red-950 tracking-tight mt-5 mb-3 font-brand">
          Top Tourism Experiences
        </h2>

        {/* Package Cards List */}
        <div className="mt-4">
          {filteredPackages.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-red-900/15 my-4 max-w-lg mx-auto">
              <p className="text-red-900/60 text-sm font-medium">
                No tourism packages found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredPackages.map((pkg) => {
                const isSaved = wishlistIds.includes(pkg.id);
                return (
                  <div
                    key={pkg.id}
                    id={`package-card-${pkg.id}`}
                    onClick={() => onSelectPackage(pkg)}
                    className="bg-white rounded-3xl overflow-hidden border border-red-900/10 shadow-2xs hover:shadow-lg transition-all flex flex-col group cursor-pointer ring-1 ring-red-950/5"
                  >
                    {/* Hero Image Container */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100">
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Badge (Best Seller / Popular) */}
                      {pkg.badge && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-red-950/95 text-white text-[10px] font-extrabold px-3 py-1 rounded-md shadow-xs uppercase tracking-wider">
                            {pkg.badge}
                          </span>
                        </div>
                      )}

                      {/* Wishlist / Bookmark Heart */}
                      <button
                        id={`btn-wishlist-${pkg.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(pkg.id);
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/35 backdrop-blur-xs text-white flex items-center justify-center hover:bg-black/60 transition-all cursor-pointer"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isSaved ? 'fill-red-600 text-red-600' : 'text-white'
                          }`}
                        />
                      </button>

                      {/* Image Zoom lens badge */}
                      <div className="absolute bottom-3 left-3 w-6 h-6 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center">
                        <ZoomIn className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-red-950 font-bold mb-1">
                          <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded">{pkg.category} Tourism</span>
                          <span className="text-red-900/60 font-medium">{pkg.duration}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-extrabold text-red-950 tracking-tight leading-snug group-hover:text-red-600 transition-colors font-brand">
                          {pkg.title}
                        </h3>

                        <p className="text-xs text-red-900/60 mt-1.5 line-clamp-1 font-medium">
                          {pkg.tags.join(' • ')}
                        </p>
                      </div>

                      {/* Bottom Pricing & Rating */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-red-900/10">
                        <div>
                          <span className="text-lg font-black text-red-950">
                            ₹{pkg.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-red-900/60 font-medium ml-1">
                            /person
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-red-950 bg-red-50 px-2 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                          <span>{pkg.rating}</span>
                          <span className="text-red-900/50 font-normal">
                            ({pkg.reviewsCount})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
