import React from 'react';
import { CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';

export const PackageInclusionsExclusions = ({ inclusions = [], exclusions = [], policies = [] }) => {
  return (
    <div className="space-y-6">
      {/* Inclusions */}
      <div className="bg-red-50/50 border border-red-200/80 rounded-2xl p-5 space-y-3">
        <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5 font-brand">
          <CheckCircle2 className="w-4 h-4 text-red-600" /> What's Included in this Holiday
        </h4>
        <ul className="space-y-2">
          {inclusions.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-red-950 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Exclusions */}
      <div className="bg-red-50/30 border border-red-200/80 rounded-2xl p-5 space-y-3">
        <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5 font-brand">
          <XCircle className="w-4 h-4 text-red-700" /> What's Not Included
        </h4>
        <ul className="space-y-2">
          {exclusions.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-red-900/80 font-medium">
              <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Policies */}
      {policies && policies.length > 0 && (
        <div className="bg-red-50/40 border border-red-200/70 rounded-2xl p-4 space-y-2">
          <h5 className="text-xs font-bold text-red-900 flex items-center gap-1.5 font-brand">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" /> Cancellation & Rescheduling Policy
          </h5>
          <ul className="space-y-1">
            {policies.map((p, i) => (
              <li key={i} className="text-[11px] text-red-900/70 list-disc list-inside font-medium">
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PackageInclusionsExclusions;
