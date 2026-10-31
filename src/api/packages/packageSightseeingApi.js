import { getCollection } from '../../lib/firebaseData';
export const packageSightseeingApi = { async getSightseeing(packageId) { return (await getCollection('packageSightseeing')).filter((item) => item.packageId === packageId); } };
export default packageSightseeingApi;
