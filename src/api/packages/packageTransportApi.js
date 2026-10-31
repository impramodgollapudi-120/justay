import { getCollection } from '../../lib/firebaseData';
export const packageTransportApi = { async getTransport(packageId) { return (await getCollection('packageTransport')).filter((item) => item.packageId === packageId); } };
export default packageTransportApi;
