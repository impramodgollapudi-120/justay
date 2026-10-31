import { createRecord } from '../../lib/firebaseData';
import { auth } from '../../lib/firebase';
export const packageModificationApi = {
  async requestDateChange(bookingId, newDate, guestCount) {
    if (!auth?.currentUser) throw new Error('Sign in before requesting a booking modification.');
    const ticket = await createRecord('supportTickets', { userId: auth.currentUser.uid, bookingId, type: 'date-change', newDate, guestCount, status: 'Open' });
    return { success: true, requestId: ticket.id, message: 'Modification request saved for the support team.' };
  },
};
export default packageModificationApi;
