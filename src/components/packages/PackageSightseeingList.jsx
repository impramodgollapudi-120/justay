import React from 'react';
import { Ticket, Clock } from 'lucide-react';

export const PackageSightseeingList = ({ sightseeing = [], activities = [] }) => {
  return (
    <div className="space-y-4">
      {sightseeing.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-black text-red-950 uppercase tracking-wider font-brand">
            Sightseeing Tours & Attractions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sightseeing.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3.5 bg-white rounded-2xl border border-red-900/10 items-center shadow-xs ring-1 ring-red-950/5"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-red-900/10"
                  />
                )}
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h5 className="text-xs font-black text-red-950 line-clamp-1 font-brand">{item.name}</h5>
                  <div className="flex items-center gap-2 text-[11px] text-red-900/70 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-600" /> {item.duration}
                    </span>
                    {item.entryTicketIncluded && (
                      <span className="flex items-center gap-1 text-red-700 font-bold">
                        <Ticket className="w-3 h-3 text-red-600" /> Ticket Included
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activities.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-black text-red-950 uppercase tracking-wider font-brand">
            Experiential Activities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activities.map((act, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3.5 bg-red-50/40 rounded-2xl border border-red-900/10 items-center shadow-xs ring-1 ring-red-950/5"
              >
                {act.image && (
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-red-900/10"
                  />
                )}
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h5 className="text-xs font-black text-red-950 line-clamp-1 font-brand">{act.title}</h5>
                  <div className="flex items-center gap-2 text-[11px] text-red-900/70 font-medium">
                    <span>{act.schedule}</span>
                    {act.priceIncluded && (
                      <span className="text-red-700 font-bold">• Included</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageSightseeingList;
