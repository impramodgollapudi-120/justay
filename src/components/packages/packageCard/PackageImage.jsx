import React from 'react';
import PackageBadge from './PackageBadge';

export const PackageImage = ({ image, title, badge }) => {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-100 group">
      <img
        src={image || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {badge && (
        <div className="absolute top-3 left-3">
          <PackageBadge badge={badge} />
        </div>
      )}
    </div>
  );
};

export default PackageImage;
