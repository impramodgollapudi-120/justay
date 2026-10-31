import { createRecord, getRecord, updateRecord } from '../../lib/firebaseData';
import { auth } from '../../lib/firebase';
export const packageCancellationApi = {
  async getCancellationPolicy(packageId) {
    const pkg = await getRecord('packages', packageId);
    return { policies: pkg?.policies || [], terms: pkg?.terms || [] };
  },
  async requestCancellation(bookingId, reason) {
    if (!auth?.currentUser) throw new Error('Sign in before requesting cancellation.');
    await updateRecord('packageBookings', bookingId, { status: 'Cancellation requested', cancellationReason: reason });
    const ticket = await createRecord('supportTickets', { userId: auth.currentUser.uid, bookingId, type: 'cancellation', reason, status: 'Open' });
    return { success: true, cancellationId: ticket.id, status: 'REQUESTED' };
  },
};
export default packageCancellationApi;
