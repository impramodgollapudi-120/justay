import { getRecord } from '../../lib/firebaseData';
export const packageDetailsApi = { async getDetails(packageId) { return getRecord('packages', packageId); } };
export default packageDetailsApi;
