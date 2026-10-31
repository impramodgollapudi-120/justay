import { createRecord } from '../../lib/firebaseData';
import { auth } from '../../lib/firebase';
export const packageSupportApi = {
  async connectTourManager(bookingId) {
    if (!auth?.currentUser) throw new Error('Sign in before requesting support.');
    const request = await createRecord('supportTickets', { userId: auth.currentUser.uid, bookingId, type: 'tour-manager', status: 'Open' });
    return { success: true, requestId: request.id, status: 'REQUESTED', message: 'Your request has been saved for the support team.' };
  },
};
export default packageSupportApi;
