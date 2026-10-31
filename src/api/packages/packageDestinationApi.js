import { getCollection, getRecord } from '../../lib/firebaseData';
export const packageDestinationApi = {
  async getDestinations() { return getCollection('destinations'); },
  async getDestinationById(id) { return getRecord('destinations', id); },
};
export default packageDestinationApi;
