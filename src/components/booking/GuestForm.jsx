import React from 'react';
import { User, Mail, Phone, FileText, ShieldCheck } from 'lucide-react';

export const GuestForm = ({ guestInfo, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...guestInfo, [name]: value });
  };

  return (
    <div className="bg-white rounded-3xl border border-red-900/10 p-6 shadow-xs space-y-4 ring-1 ring-red-950/5">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-black text-red-950 flex items-center gap-2 font-brand">
          <User className="w-4 h-4 text-red-600" /> Primary Guest Details
        </h4>
        <span className="text-[11px] text-red-900/60 font-medium">Required for official hotel registry</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-red-950 mb-1">Full Legal Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-red-900/40 absolute left-3 top-2.5" />
            <input
              type="text"
              name="fullName"
              value={guestInfo.fullName || ''}
              onChange={handleChange}
              placeholder="e.g. Your full name"
              className="w-full pl-9 pr-3 py-2.5 text-xs rounded-2xl border border-red-900/15 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-red-950 placeholder:text-red-900/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-red-950 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-red-900/40 absolute left-3 top-2.5" />
            <input
              type="email"
              name="email"
              value={guestInfo.email || ''}
              onChange={handleChange}
              placeholder="e.g. guest@example.com"
              className="w-full pl-9 pr-3 py-2.5 text-xs rounded-2xl border border-red-900/15 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-red-950 placeholder:text-red-900/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-red-950 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-red-900/40 absolute left-3 top-2.5" />
            <input
              type="tel"
              name="phone"
              value={guestInfo.phone || ''}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full pl-9 pr-3 py-2.5 text-xs rounded-2xl border border-red-900/15 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-red-950 placeholder:text-red-900/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-red-950 mb-1">Govt ID Number (Aadhaar / Passport)</label>
          <div className="relative">
            <ShieldCheck className="w-4 h-4 text-red-900/40 absolute left-3 top-2.5" />
            <input
              type="text"
              name="identityNumber"
              value={guestInfo.identityNumber || ''}
              onChange={handleChange}
              placeholder="Z8920194 or 12-digit Aadhaar"
              className="w-full pl-9 pr-3 py-2.5 text-xs rounded-2xl border border-red-900/15 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-red-950 placeholder:text-red-900/40"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-red-950 mb-1">Special Requests (Optional)</label>
        <div className="relative">
          <FileText className="w-4 h-4 text-red-900/40 absolute left-3 top-2.5" />
          <textarea
            name="specialRequests"
            rows="2"
            value={guestInfo.specialRequests || ''}
            onChange={handleChange}
            placeholder="Early check-in, dietary preferences, honeymoon bed decor, etc."
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-2xl border border-red-900/15 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-red-950 placeholder:text-red-900/40"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
