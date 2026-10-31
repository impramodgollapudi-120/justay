import packageBookingApi from '../../api/packages/packageBookingApi';

export const packageBookingService = {
  getAllBookings: async () => packageBookingApi.getPackageBookings(),
  getBookingById: async (id) => packageBookingApi.getPackageBookingById(id),
  createBooking: async (data) => packageBookingApi.createPackageBooking(data),
  cancelBooking: async (id) => packageBookingApi.cancelPackageBooking(id),
  modifyBooking: async (id, updates) => packageBookingApi.modifyPackageBooking(id, updates),
};

export default packageBookingService;
