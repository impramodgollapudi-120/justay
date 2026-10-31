import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Star,
  Compass,
  ArrowRight,
  Layers,
  MoveHorizontal,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export interface SplashScene {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  priceStart: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tags: string[];
  vibe: string;
}

export const SPLASH_SCENES: SplashScene[] = [
  {
    id: 'splash-goa',
    title: 'The Azure Coral Villa',
    subtitle: 'Private Infinity Pool • Sunset Lagoon • 5★ Culinary',
    location: 'Candolim Beach, Goa',
    description: 'Experience pure coastal euphoria overlooking the Arabian Sea with private sun decks, chef-curated dining, and personal butler service.',
    priceStart: 12999,
    rating: 4.9,
    reviewsCount: 382,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    tags: ['Beachfront', 'Private Pool', 'Luxury Spa'],
    vibe: 'Tropical Beach Luxury',
  },
  {
    id: 'splash-udaipur',
    title: 'Fateh Garh Palace Haveli',
    subtitle: 'Regal Rajputana Architecture • Lake Pichola View',
    location: 'Udaipur, Rajasthan',
    description: 'Live like royalty surrounded by heritage stone arches, candlelit poolside terraces, classical sitar evenings, and vintage car transfers.',
    priceStart: 15499,
    rating: 4.95,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    tags: ['Heritage Palace', 'Lake Views', 'Royal Dining'],
    vibe: 'Imperial Royalty',
  },
  {
    id: 'splash-manali',
    title: 'Solang Cedar Snow Chalet',
    subtitle: 'Heated Jacuzzi • Pine Forest Trails • Mountain Bonfire',
    location: 'Solang Valley, Manali',
    description: 'Wake up to snow-clad Himalayan peaks, panoramic wooden glass bay windows, all-inclusive gourmet feasts, and private stargazing decks.',
    priceStart: 8999,
    rating: 4.85,
    reviewsCount: 298,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    tags: ['Snow View', 'Heated Jacuzzi', 'Alpine Trails'],
    vibe: 'Misty Mountain Retreat',
  },
  {
    id: 'splash-kerala',
    title: 'Kumarakom Backwater Sanctuary',
    subtitle: 'Private Houseboat Suite • Ayurvedic Spa • Sunset Cruise',
    location: 'Vembanad Lake, Kerala',
    description: 'Float seamlessly across tranquil emerald waters in handcrafted teakwood houseboats featuring authentic Kerala cuisine and certified Ayurveda therapy.',
    priceStart: 9499,
    rating: 4.92,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    tags: ['Houseboat', 'Ayurveda', 'Private Cruise'],
    vibe: 'Tranquil Water Haven',
  },
  {
    id: 'splash-wayanad',
    title: 'Canopy Whispers Treehouse Resort',
    subtitle: 'Misty Rainforest Views • Organic Farm Dining • Wildlife Walks',
    location: 'Wayanad, Kerala',
    description: 'Elevate your senses 40 feet above the forest floor with suspended canopy bridges, mist-shrouded valley views, and natural spring plunges.',
    priceStart: 7499,
    rating: 4.88,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
    tags: ['Treehouse', 'Eco-Luxury', 'Birdwatching'],
    vibe: 'Canopy Eco Escape',
  },
];

interface MovableSplashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScene: (scene: SplashScene) => void;
}

export const MovableSplashModal: React.FC<MovableSplashModalProps> = ({
  isOpen,
  onClose,
  onSelectScene,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  if (!isOpen) return null;

  const currentScene = SPLASH_SCENES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SPLASH_SCENES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SPLASH_SCENES.length) % SPLASH_SCENES.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -250) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 250) {
      handlePrev();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn select-none">
      {/* Background blurred ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <img
          src={currentScene.image}
          alt={currentScene.title}
          className="w-full h-full object-cover filter blur-3xl scale-125 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Movable Card Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col justify-between z-10">
        {/* Top Floating Glass Header */}
        <div className="backdrop-blur-2xl bg-white/15 border border-white/25 rounded-3xl px-4 py-3 flex items-center justify-between text-white mb-3 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-black tracking-wide uppercase font-brand">
              Interactive Movable Splash Showcase
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Movable hint badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold border border-white/20">
              <MoveHorizontal className="w-3.5 h-3.5 text-red-400" />
              <span>Drag / Swipe Cards Horizontally</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Movable Interactive Splash Card */}
        <div className="relative w-full h-[62vh] sm:h-[66vh] rounded-3xl overflow-hidden shadow-2xl border border-white/30 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.95, x: dragDirection === 'left' ? 80 : -80 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: dragDirection === 'left' ? -80 : 80 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
            >
              {/* Splash Image */}
              <img
                src={currentScene.image}
                alt={currentScene.title}
                className="w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col justify-between p-6 sm:p-8 lg:p-10 text-white">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="backdrop-blur-md bg-black/40 border border-white/25 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5 shadow-xs font-brand">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentScene.vibe}</span>
                  </div>

                  <div className="backdrop-blur-md bg-white/20 border border-white/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{currentScene.rating}</span>
                    <span className="text-stone-300">({currentScene.reviewsCount})</span>
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-300 font-semibold">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>{currentScene.location}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-brand tracking-tight leading-tight">
                    {currentScene.title}
                  </h2>

                  <p className="text-xs sm:text-sm lg:text-base text-stone-200 font-medium max-w-2xl line-clamp-2">
                    {currentScene.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentScene.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Action Button */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/20">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-300 block font-bold font-brand">
                        Luxury Stay Experience
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-black text-white font-brand">
                          ₹{currentScene.priceStart.toLocaleString()}
                        </span>
                        <span className="text-xs text-stone-300 font-medium">/ night starting</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectScene(currentScene)}
                      className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer text-sm group/btn font-brand"
                    >
                      <span>Explore & Book This Escape</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={() => {
              setDragDirection('right');
              handlePrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full backdrop-blur-xl bg-black/40 hover:bg-black/70 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Previous splash card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => {
              setDragDirection('left');
              handleNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full backdrop-blur-xl bg-black/40 hover:bg-black/70 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Next splash card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-3 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
          {SPLASH_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setDragDirection(idx > currentIndex ? 'left' : 'right');
                setCurrentIndex(idx);
              }}
              className={`flex-1 min-w-[80px] sm:min-w-[120px] rounded-2xl overflow-hidden p-1.5 transition-all cursor-pointer backdrop-blur-md ${
                currentIndex === idx
                  ? 'bg-white/30 border-2 border-red-500 scale-102 shadow-md'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20 opacity-70'
              }`}
            >
              <div className="relative h-12 rounded-xl overflow-hidden">
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[10px] sm:text-xs font-black text-white text-center mt-1 truncate font-brand">
                {scene.title.split(' ')[0]} {scene.title.split(' ')[1] || ''}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
