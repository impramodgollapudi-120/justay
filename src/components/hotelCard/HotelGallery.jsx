import React from 'react';

export const HotelGallery = ({ images = [], name = 'Luxury Hotel' }) => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const displayImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'];

  return (
    <div className="relative group overflow-hidden rounded-2xl aspect-[16/10] bg-red-50/40">
      <img
        src={displayImages[activeIdx]}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {displayImages.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(i);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIdx === i ? 'w-5 bg-red-600' : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelGallery;
