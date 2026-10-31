import { createRecord } from '../lib/firebaseData';
import { auth } from '../lib/firebase';
export const paymentApi = {
  async processPayment({ amount, method, bookingId }) {
    if (!auth?.currentUser) throw new Error('Sign in before starting a payment.');
    // This records a pending payment request only. It does not charge a card or mark payment as successful.
    return createRecord('payments', { userId: auth.currentUser.uid, amount, method, bookingId, status: 'pending', provider: 'not-configured' });
  },
  async verifyPayment(transactionId) {
    throw new Error(`Payment verification requires a configured payment gateway. Transaction: ${transactionId}`);
  },
};
export default paymentApi;
