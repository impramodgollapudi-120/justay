import { getCollection } from '../../lib/firebaseData';
export const packageStayApi = { async getStayDetails(packageId) { return (await getCollection('packageStays')).filter((item) => item.packageId === packageId); } };
export default packageStayApi;
