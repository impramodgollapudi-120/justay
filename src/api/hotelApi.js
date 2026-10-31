import { getCollection, getRecord } from '../lib/firebaseData';
export const hotelApi = {
  async getAllHotels() { return getCollection('stays'); },
  async getHotelById(id) { return getRecord('stays', id); },
  async searchHotels(search, filters = {}) {
    const q = String(search || '').toLowerCase();
    return (await getCollection('stays')).filter((h) =>
      (!q || `${h.name || ''} ${h.city || ''} ${h.location || ''}`.toLowerCase().includes(q)) &&
      (!filters.propertyType || filters.propertyType === 'All Types' || h.propertyType === filters.propertyType) &&
      (filters.minPrice == null || h.pricePerNight >= filters.minPrice) &&
      (filters.maxPrice == null || h.pricePerNight <= filters.maxPrice) &&
      (filters.rating == null || h.rating >= filters.rating));
  },
};
export default hotelApi;
