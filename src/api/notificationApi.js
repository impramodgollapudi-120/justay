import { createRecord } from '../lib/firebaseData';
import { auth } from '../lib/firebase';
export const notificationApi = {
  async sendBookingConfirmationSMS(phone, bookingRef) {
    if (!auth?.currentUser) throw new Error('Sign in before creating a notification.');
    await createRecord('notifications', { userId: auth.currentUser.uid, channel: 'sms', destination: phone, bookingRef, title: 'Booking confirmation', desc: `Booking reference: ${bookingRef}`, read: false, status: 'queued' });
    return { success: true, message: 'Notification record saved. Configure an SMS provider to actually send SMS messages.' };
  },
  async sendBookingConfirmationEmail(email, bookingRef) {
    if (!auth?.currentUser) throw new Error('Sign in before creating a notification.');
    await createRecord('notifications', { userId: auth.currentUser.uid, channel: 'email', destination: email, bookingRef, title: 'Booking confirmation', desc: `Booking reference: ${bookingRef}`, read: false, status: 'queued' });
    return { success: true, message: 'Notification record saved. Configure an email provider to actually send emails.' };
  },
};
export default notificationApi;
