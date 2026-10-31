import roomApi from '../api/roomApi';

export const roomService = {
  getRoomsForHotel: async (hotelId) => roomApi.getRoomsByHotelId(hotelId),
  getRoomById: async (roomId) => roomApi.getRoomById(roomId),
};

export default roomService;
