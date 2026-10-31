import { createRecord, getUserCollection, updateRecord } from '../../lib/firebaseData';
import { auth } from '../../lib/firebase';
function uid() { if (!auth?.currentUser) throw new Error('Sign in before accessing package bookings.'); return auth.currentUser.uid; }
export const packageBookingApi = {
  async getPackageBookings() { return getUserCollection('packageBookings', uid()); },
  async getPackageBookingById(id) { return (await getUserCollection('packageBookings', uid())).find(b => b.id === id) || null; },
  async createPackageBooking(data) { return createRecord('packageBookings', { ...data, userId: uid(), status: data.status || 'Pending' }); },
  async cancelPackageBooking(id) { const b = await this.getPackageBookingById(id); if (!b) throw new Error('Package booking not found.'); await updateRecord('packageBookings', id, { status: 'Cancelled' }); return true; },
  async modifyPackageBooking(id, updates) { const b = await this.getPackageBookingById(id); if (!b) throw new Error('Package booking not found.'); const safeUpdates = { ...updates }; delete safeUpdates.userId; delete safeUpdates.id; await updateRecord('packageBookings', id, safeUpdates); return { ...b, ...safeUpdates }; },
};
export default packageBookingApi;
