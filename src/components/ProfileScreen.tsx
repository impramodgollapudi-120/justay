import React from 'react';
import type { User } from 'firebase/auth';
import { AuthPanel } from './AuthPanel';

interface ProfileScreenProps {
  onNavigateToBookings: () => void;
  onNavigateToOffers: () => void;
  user: User | null;
}
export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigateToBookings, onNavigateToOffers, user }) => (
  <div className="mx-auto min-h-[60vh] max-w-3xl space-y-5 pb-24 text-stone-900">
    <header className="rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-black">My account</h1>
      <p className="mt-2 text-sm text-stone-600">Sign in to manage your personal bookings and wishlist. Account information is provided by Firebase Authentication.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={onNavigateToBookings} className="rounded-xl border px-4 py-2 font-semibold">My bookings</button>
        <button onClick={onNavigateToOffers} className="rounded-xl border px-4 py-2 font-semibold">Offers</button>
      </div>
    </header>
    <AuthPanel user={user} />
  </div>
);
