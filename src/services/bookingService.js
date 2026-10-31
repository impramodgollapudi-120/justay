import bookingApi from '../api/bookingApi';

export const bookingService = {
  getUserBookings: async () => bookingApi.getBookings(),
  getBookingDetails: async (id) => bookingApi.getBookingById(id),
  createBooking: async (data) => bookingApi.createBooking(data),
  cancelBooking: async (id) => bookingApi.cancelBooking(id),
  modifyBooking: async (id, updates) => bookingApi.modifyBooking(id, updates),
};

export default bookingService;
