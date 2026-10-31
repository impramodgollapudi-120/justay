import hotelApi from '../api/hotelApi';

export const searchService = {
  searchStays: async (query, filters) => hotelApi.searchHotels(query, filters),
};

export default searchService;
