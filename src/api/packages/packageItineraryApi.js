import { getCollection } from '../../lib/firebaseData';
export const packageItineraryApi = { async getItinerary(packageId) { return (await getCollection('packageItineraries')).filter((item) => item.packageId === packageId); } };
export default packageItineraryApi;
