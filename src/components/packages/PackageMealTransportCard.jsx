import React from 'react';
import { Utensils, Car, CheckCircle, ShieldCheck } from 'lucide-react';

export const PackageMealTransportCard = ({ meals, transport }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Meals */}
      {meals && (
        <div className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-3 shadow-xs ring-1 ring-red-950/5">
          <div className="flex items-center gap-2 text-red-950 font-black text-xs font-brand">
            <Utensils className="w-4 h-4 text-red-600" />
            <span>Meals Plan ({meals.plan})</span>
          </div>

          <div className="space-y-1.5 text-xs text-red-900/70 font-medium">
            {meals.breakfast && (
              <p>
                <strong className="text-red-950 font-bold">Breakfast:</strong> {meals.breakfast}
              </p>
            )}
            {meals.lunch && (
              <p>
                <strong className="text-red-950 font-bold">Lunch:</strong> {meals.lunch}
              </p>
            )}
            {meals.dinner && (
              <p>
                <strong className="text-red-950 font-bold">Dinner:</strong> {meals.dinner}
              </p>
            )}
          </div>

          {meals.preferences && (
            <div className="pt-2 border-t border-red-900/10 flex flex-wrap gap-1.5">
              {meals.preferences.map((pref, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold bg-red-50 text-red-800 border border-red-200 px-2.5 py-0.5 rounded-full"
                >
                  ✓ {pref}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Transport */}
      {transport && (
        <div className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-3 shadow-xs ring-1 ring-red-950/5">
          <div className="flex items-center gap-2 text-red-950 font-black text-xs font-brand">
            <Car className="w-4 h-4 text-red-600" />
            <span>Private Transfers ({transport.type})</span>
          </div>

          <div className="space-y-1.5 text-xs text-red-900/70 font-medium">
            <p>
              <strong className="text-red-950 font-bold">Pickup & Drop:</strong> {transport.pickupLocation}
            </p>
            {transport.vehicleDetails && (
              <p>
                <strong className="text-red-950 font-bold">Vehicle:</strong> {transport.vehicleDetails}
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-red-900/10 flex items-center gap-2 text-[11px] text-red-700 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-red-600" /> Toll, Parking & Chauffeur Included
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageMealTransportCard;
