import { createRecord } from '../../lib/firebaseData';
import { auth } from '../../lib/firebase';
export const packagePaymentApi = {
  async processPackagePayment({ amount, method, bookingId, travelerCount }) {
    if (!auth?.currentUser) throw new Error('Sign in before starting a payment.');
    return createRecord('payments', { userId: auth.currentUser.uid, amount, method, bookingId, travelerCount, status: 'pending', provider: 'not-configured' });
  },
};
export default packagePaymentApi;
