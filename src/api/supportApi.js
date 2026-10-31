import { createRecord, getCollection } from '../lib/firebaseData';
import { auth } from '../lib/firebase';
export const supportApi = {
  async submitSupportTicket(ticketData) {
    if (!auth?.currentUser) throw new Error('Sign in before submitting a support request.');
    const ticket = await createRecord('supportTickets', { ...ticketData, userId: auth.currentUser.uid, status: 'Open' });
    return { success: true, ticketId: ticket.id, message: 'Your support request was saved. The support team can review it from Firebase.' };
  },
  async getFaqs() { return getCollection('faqs'); },
};
export default supportApi;
