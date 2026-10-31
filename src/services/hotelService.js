import hotelApi from '../api/hotelApi';

export const hotelService = {
  getHotels: async () => hotelApi.getAllHotels(),
  getHotelById: async (id) => hotelApi.getHotelById(id),
  searchHotels: async (query, filters) => hotelApi.searchHotels(query, filters),
};

export default hotelService;
