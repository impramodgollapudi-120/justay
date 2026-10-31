import { getCollection } from '../../lib/firebaseData';
export const packageActivityApi = { async getActivities(packageId) { return (await getCollection('packageActivities')).filter((item) => item.packageId === packageId); } };
export default packageActivityApi;
