import { createRecord, getUserCollection, getRecord, updateRecord } from '../lib/firebaseData';
import { auth } from '../lib/firebase';
function uid() { if (!auth?.currentUser) throw new Error('Sign in before accessing bookings.'); return auth.currentUser.uid; }
export const bookingApi = {
  async getBookings() { return getUserCollection('bookings', uid()); },
  async getBookingById(id) { const b = await getRecord('bookings', id); return b?.userId === uid() ? b : null; },
  async createBooking(data) { return createRecord('bookings', { ...data, userId: uid(), status: data.status || 'Pending' }); },
  async cancelBooking(id) { const b = await this.getBookingById(id); if (!b) throw new Error('Booking not found.'); await updateRecord('bookings', id, { status: 'Cancelled' }); return true; },
  async modifyBooking(id, updates) { const b = await this.getBookingById(id); if (!b) throw new Error('Booking not found.'); const safeUpdates = { ...updates }; delete safeUpdates.userId; delete safeUpdates.id; await updateRecord('bookings', id, safeUpdates); return { ...b, ...safeUpdates }; },
};
export default bookingApi;
