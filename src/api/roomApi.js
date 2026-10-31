import { getCollection, getRecord } from '../lib/firebaseData';
export const roomApi = {
  async getRoomsByHotelId(hotelId) { return (await getCollection('rooms')).filter((room) => room.hotelId === hotelId); },
  async getRoomById(roomId) { return getRecord('rooms', roomId); },
};
export default roomApi;
