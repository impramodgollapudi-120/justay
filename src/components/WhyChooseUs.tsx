import React from 'react';
import { Building2, Briefcase, Award, ShieldCheck, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Building2,
      title: 'Wide Range of Stays',
      subtitle: 'Hotels, Resorts, Villas & More',
    },
    {
      icon: Briefcase,
      title: 'Amazing Packages',
      subtitle: 'Curated for every traveler',
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      subtitle: 'Get the best deals always',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Bookings',
      subtitle: '100% safe & secure payments',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      subtitle: 'We are here to help you',
    },
  ];

  return (
    <div className="mt-8 mb-6 px-4">
      {/* Title with decorative diamonds */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-red-600 text-xs">♦♦♦</span>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red-950 font-brand">
          Why Choose Justay?
        </h3>
        <span className="text-red-600 text-xs">♦♦♦</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white/90 border border-red-900/10 rounded-2xl p-4 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow ring-1 ring-red-950/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-2.5">
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-red-950 tracking-tight leading-snug">
                {item.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-red-900/60 mt-1">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
