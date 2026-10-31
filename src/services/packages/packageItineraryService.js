import packageItineraryApi from '../../api/packages/packageItineraryApi';

export const packageItineraryService = {
  getItinerary: async (pkgId) => packageItineraryApi.getItinerary(pkgId),
};

export default packageItineraryService;
