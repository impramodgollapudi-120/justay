import React from 'react';

export const RoomGallery = ({ images = [], name = 'Luxury Room' }) => {
  const displayImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'];
  return (
    <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-red-50/40">
      <img src={displayImages[0]} alt={name} className="w-full h-full object-cover" />
      {displayImages.length > 1 && (
        <span className="absolute bottom-2 right-2 bg-red-950/80 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
          +{displayImages.length - 1} photos
        </span>
      )}
    </div>
  );
};

export default RoomGallery;
