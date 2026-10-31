import React from 'react';
import { User, Plus, Trash2, ShieldCheck } from 'lucide-react';

export const PackageTravelerForm = ({
  travelers = [],
  onAddTraveler,
  onRemoveTraveler,
  onUpdateTraveler,
  leadContact,
  onUpdateLeadContact,
}) => {
  return (
    <div className="space-y-6">
      {/* Primary Contact */}
      <div className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-4 shadow-xs ring-1 ring-red-950/5">
        <h4 className="text-sm font-black text-red-950 flex items-center gap-2 font-brand">
          <User className="w-4 h-4 text-red-600" /> Primary Lead Contact
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-bold text-red-900/70 mb-1">Full Name</label>
            <input
              type="text"
              value={leadContact.fullName || ''}
              onChange={(e) => onUpdateLeadContact({ ...leadContact, fullName: e.target.value })}
              className="w-full px-3 py-2 bg-red-50/20 border border-red-900/20 rounded-2xl font-bold text-red-950 focus:border-red-600 focus:outline-none"
              placeholder="e.g. Your full name"
            />
          </div>
          <div>
            <label className="block font-bold text-red-900/70 mb-1">Email for Vouchers</label>
            <input
              type="email"
              value={leadContact.email || ''}
              onChange={(e) => onUpdateLeadContact({ ...leadContact, email: e.target.value })}
              className="w-full px-3 py-2 bg-red-50/20 border border-red-900/20 rounded-2xl font-bold text-red-950 focus:border-red-600 focus:outline-none"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block font-bold text-red-900/70 mb-1">Mobile (for Chauffeur)</label>
            <input
              type="tel"
              value={leadContact.phone || ''}
              onChange={(e) => onUpdateLeadContact({ ...leadContact, phone: e.target.value })}
              className="w-full px-3 py-2 bg-red-50/20 border border-red-900/20 rounded-2xl font-bold text-red-950 focus:border-red-600 focus:outline-none"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="block font-bold text-red-900/70 mb-1">Special Preferences</label>
            <input
              type="text"
              value={leadContact.specialRequests || ''}
              onChange={(e) => onUpdateLeadContact({ ...leadContact, specialRequests: e.target.value })}
              className="w-full px-3 py-2 bg-red-50/20 border border-red-900/20 rounded-2xl font-bold text-red-950 focus:border-red-600 focus:outline-none"
              placeholder="Vegetarian meal, high floor room"
            />
          </div>
        </div>
      </div>

      {/* Travelers List */}
      <div className="bg-white rounded-3xl border border-red-900/10 p-5 space-y-4 shadow-xs ring-1 ring-red-950/5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black text-red-950 font-brand">
            Traveler Profiles ({travelers.length})
          </h4>
          <button
            type="button"
            onClick={onAddTraveler}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-2xl border border-red-200 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Traveler
          </button>
        </div>

        <div className="space-y-3">
          {travelers.map((traveler, index) => (
            <div
              key={traveler.id || index}
              className="p-4 bg-red-50/30 rounded-2xl border border-red-900/10 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-bold text-red-950">
                <span>Traveler {index + 1} {index === 0 ? '(Lead)' : ''}</span>
                {travelers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveTraveler(index)}
                    className="text-red-900/40 hover:text-red-600 transition cursor-pointer"
                    aria-label="Remove Traveler"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-red-900/70 mb-1">Title</label>
                  <select
                    value={traveler.title || 'Mr'}
                    onChange={(e) => onUpdateTraveler(index, 'title', e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-red-900/20 rounded-xl text-xs font-bold text-red-950 focus:border-red-600 focus:outline-none"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-red-900/70 mb-1">First Name</label>
                  <input
                    type="text"
                    value={traveler.firstName || ''}
                    onChange={(e) => onUpdateTraveler(index, 'firstName', e.target.value)}
                    placeholder="First Name"
                    className="w-full px-2.5 py-1.5 bg-white border border-red-900/20 rounded-xl text-xs font-bold text-red-950 focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-red-900/70 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={traveler.lastName || ''}
                    onChange={(e) => onUpdateTraveler(index, 'lastName', e.target.value)}
                    placeholder="Last Name"
                    className="w-full px-2.5 py-1.5 bg-white border border-red-900/20 rounded-xl text-xs font-bold text-red-950 focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-red-900/70 mb-1">Age</label>
                  <input
                    type="number"
                    value={traveler.age || 28}
                    onChange={(e) => onUpdateTraveler(index, 'age', Number(e.target.value))}
                    min="1"
                    max="100"
                    className="w-full px-2.5 py-1.5 bg-white border border-red-900/20 rounded-xl text-xs font-bold text-red-950 focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-red-900/70 mb-1">ID Document Type</label>
                  <select
                    value={traveler.idType || 'Aadhaar / Passport'}
                    onChange={(e) => onUpdateTraveler(index, 'idType', e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-red-900/20 rounded-xl text-xs font-bold text-red-950 focus:border-red-600 focus:outline-none"
                  >
                    <option value="Aadhaar">Aadhaar Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-red-900/70 mb-1">Document Number</label>
                  <input
                    type="text"
                    value={traveler.idNumber || ''}
                    onChange={(e) => onUpdateTraveler(index, 'idNumber', e.target.value)}
                    placeholder="e.g. Z8920194 or 12-digit Aadhaar"
                    className="w-full px-2.5 py-1.5 bg-white border border-red-900/20 rounded-xl text-xs font-bold text-red-950 focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageTravelerForm;
